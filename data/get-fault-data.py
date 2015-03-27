import mysql.connector
import json 

def get_faults():
    # data = {"names": ["John", "Jacob", "Julie", "Jennifer"]}
    # return jsonify(data)
	connection = mysql.connector.connect(user='root', password='p@ssw0rd', host='127.0.0.1', database='earthquake_data')
	cursor = connection.cursor()
	select_faults = "select source from fault where MBRWithin(shape, Envelope(GeomFromText('LineString(%s %s, %s %s)'))) = 1;"
	fault_data = (-125.69510773828125, 38.79394764206436, -119.31754426171875, 36.682994957749884)
	cursor.execute(select_faults, fault_data)

	feature_list = []
	for (source) in cursor:
		if source[0] is not None:
			print source[0]
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

	return eventData

print get_faults()
