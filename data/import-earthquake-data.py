from __future__ import division
import mysql.connector
import urllib2
import json
import datetime

def add_month(source_date):
	month = source_date.month + 1
	year = source_date.year
	if(month > 12):
		year+=1
		month = 1
	return datetime.datetime(year, month, 1)

def get_latest_event_date(cursor):
	cursor.execute("select max(time) from earthquake;")
	row = cursor.fetchone()
	if row is not None:
		timestamp = row[0]
		print (timestamp)
		return datetime.datetime.fromtimestamp(timestamp/1e3)
	else:
		return datetime.datetime(2013, 2, 1)



def save_features(cursor, data):
	# insert_earthquake_event = "INSERT INTO earthquake (eventid, time, place, title, mag, url, location, depth, source) VALUES (%s, %s, %s, %s, %s, %s, GeomFromText(%s), %s, %s)"
	insert_earthquake_event = "INSERT INTO earthquake (eventid, time, place, title, mag, url, location, depth, source) VALUES (%s, %s, %s, %s, %s, %s, GeomFromText(%s), %s, %s) ON DUPLICATE KEY UPDATE eventid = eventid;"
	i = 0
	total = len(data['features'])

	for feature in data['features']:
		i+=1
		feature_id = feature['id']

		progress_text = "....... (" + str(i) + " of " + str(total) + ") " + "{0:.0f}%".format(i/total * 100) + " complete"

		geometry = feature['geometry']
		coordinates = geometry['coordinates']
		location = 'POINT(' + str(coordinates[0]) + ' ' + str(coordinates[1]) + ')'
		properties = feature['properties']
		insert_earthquake_data = (feature_id, properties['time'], properties['place'], properties['title'], properties['mag'], properties['url'], location, coordinates[2], json.dumps(feature))
		cursor.execute(insert_earthquake_event, insert_earthquake_data);
		print('creating earthquake record: ' + feature_id + progress_text)
		connection.commit()

def assign_fault(cursor):
	select_unassigned_events = "SELECT id, eventid, X(location) as longitude, Y(location) as latitude from earthquake where faultid IS NULL;"
	select_nearest_fault = "select id, name, url, ST_Distance(GeomFromText('POINT(%s %s)'), shape) as faultdist from fault ORDER BY faultdist LIMIT 1;"
	update_event = "UPDATE earthquake SET faultid=%s, faultdist=%s WHERE id=%s;"

	cursor2 = connection.cursor(buffered=True)
	cursor2.execute(select_unassigned_events)
	cursor3 = connection.cursor()

	rows = cursor2.fetchall()
	for row in rows:
		id = row[0]
		eventid = row[1]
		longitude = row[2]
		latitude = row[3]
		select_nearest_fault_data = (longitude, latitude)
		cursor.execute(select_nearest_fault, select_nearest_fault_data)
		row2 = cursor.fetchone()
		if row2 is not None:
			faultid = row2[0]
			faultdist = row2[3]
			update_event_data = (faultid, faultdist, id)
			cursor3.execute(update_event, update_event_data)
			connection.commit()
	cursor3.close()
	cursor2.close()


connection = mysql.connector.connect(user='root', password='p@ssw0rd', host='127.0.0.1', database='earthquake_data')
cursor = connection.cursor()
initial_date = get_latest_event_date(cursor)
print(initial_date.strftime("%Y-%m-%d"))

startdate = initial_date
today = datetime.datetime.today()
while startdate <= today:
	enddate = add_month(startdate)
	query = "http://comcat.cr.usgs.gov/fdsnws/event/1/query?"
	query += "starttime=" + startdate.strftime("%Y-%m-%d")
	if enddate <= today:
		query+= "&endtime=" + enddate.strftime("%Y-%m-%d")
	query+="&orderby=time&format=geojson"

	print('loading events: ' + query)
	response = urllib2.urlopen(query)
	print response.info()

	data = json.load(response)
	save_features(cursor, data)
	assign_fault(cursor)
	response.close();
	startdate = add_month(startdate)

cursor.close()
connection.close()
