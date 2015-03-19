import mysql.connector
import urllib2
import json

response = urllib2.urlopen("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
print response.info()

data = json.load(response)
connection = mysql.connector.connect(user='root', password='p@ssw0rd', host='127.0.0.1', database='earthquake_data')
cursor = connection.cursor()

insert_earthquake_event = "INSERT INTO earthquake (eventid, time, place, title, mag, url, location) VALUES (%s, %s, %s, %s, %s, %s, GeomFromText(%s))"

for feature in data['features']:
	feature_id = feature['id']
	geometry = feature['geometry']
	coordinates = geometry['coordinates']
	location = 'POINT(' + str(coordinates[0]) + ' ' + str(coordinates[1]) + ')'
	properties = feature['properties']
	earthquake_data = (feature_id, properties['time'], properties['place'], properties['title'], properties['mag'], properties['url'], location)
	cursor.execute(insert_earthquake_event, earthquake_data);
	print('creating earthquake record')
	connection.commit()

response.close();

cursor.close()
connection.close()
