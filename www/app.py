#!env/bin/python
from flask import Flask, jsonify, request
# from flask import make_response

import mysql.connector
import json 
# from dateutil.parser import parse

app = Flask(__name__)


@app.route('/')
def index():
    return 'Flask is running!'


@app.route('/data')
def names():
    data = {"names": ["John", "Jacob", "Julie", "Jennifer"]}
    return jsonify(data)

@app.route('/geoapi/v1.0/earthquakes', methods=['GET'])
def get_events():
	minlongitude = request.args.get('minlongitude', -125.69510773828125, type=float)
	minlatitude = request.args.get('minlatitude', 38.79394764206436, type=float)
	maxlongitude = request.args.get('maxlongitude', -119.31754426171875, type=float)
	maxlatitude = request.args.get('maxlatitude', 36.682994957749884, type=float)
	starttime = request.args.get('starttime', "NULL")
	endtime = request.args.get('endtime', "NULL")
	event_data = (minlongitude, minlatitude, maxlongitude, maxlatitude, starttime, endtime)
	# event_data = (minlongitude, minlatitude, maxlongitude, maxlatitude)
	# event_data = (minlongitude, 38.79394764206436, -119.31754426171875, 36.682994957749884)

	connection = mysql.connector.connect(user='root', password='p@ssw0rd', host='127.0.0.1', database='earthquake_data')
	cursor = connection.cursor()
	select_events = "select source from earthquake where MBRContains(Envelope(GeomFromText('LineString(%s %s, %s %s)')), location) = 1 AND time >= COALESCE(UNIX_TIMESTAMP(NULLIF('NULL', %s)) * 1000, time) AND time <= COALESCE(UNIX_TIMESTAMP(NULLIF('NULL', %s)) * 1000, time) order by time asc;"
	# select_events = "select source from earthquake where MBRContains(Envelope(GeomFromText('LineString(%s %s, %s %s)')), location) = 1 order by time asc;"
	cursor.execute(select_events, event_data)

	feature_list = []
	feature = {}
	for (source) in cursor:
		feature_list.append(json.loads(source[0]))

	cursor.close
	connection.close
	eventData = {
	"type" : "FeatureCollection",
	"features": feature_list
	}

	return jsonify(eventData)

@app.route('/geoapi/v1.0/faults', methods=['GET'])
def get_faults():
	minlongitude = request.args.get('minlongitude', -125.69510773828125, type=float)
	minlatitude = request.args.get('minlatitude', 38.79394764206436, type=float)
	maxlongitude = request.args.get('maxlongitude', -119.31754426171875, type=float)
	maxlatitude = request.args.get('maxlatitude', 36.682994957749884, type=float)
	show_unnamed = request.args.get('show_unnamed', False, type=bool)

	fault_data = (minlongitude, minlatitude, maxlongitude, maxlatitude)

	connection = mysql.connector.connect(user='root', password='p@ssw0rd', host='127.0.0.1', database='earthquake_data')
	cursor = connection.cursor()
	select_faults = "select source from fault where MBRWithin(shape, Envelope(GeomFromText('LineString(%s %s, %s %s)'))) = 1"
	if(show_unnamed != True):
		select_faults+=" and name NOT IN ('unnamed fault')"
	select_faults+=";"
	cursor.execute(select_faults, fault_data)

	feature_list = []
	feature = {}
	for (source) in cursor:
		try:
			feature_list.append(json.loads(source[0]))
		except ValueError:
			print "error parsing json"

	cursor.close
	connection.close
	eventData = {
	"type" : "FeatureCollection",
	"features": feature_list
	}

	return jsonify(eventData)

if __name__ == '__main__':
    app.run(debug=True)