import mysql.connector
import urllib2
import json
import sys
from bs4 import BeautifulSoup

def convertGeographyToMultilineString(geography):
	multilinestring = [];
	coordinates = geography["coordinates"]
	for linestring in coordinates:
		point_list = []
		for point in linestring:
			point_list.append(str(point[0]) + ' ' + str(point[1]))
		multilinestring.append('(' + ', '.join(point_list) + ')')

	return 'MULTILINESTRING(' + ', '.join(multilinestring) + ')'



datafile = open("quaternary.geojson")
connection = mysql.connector.connect(user='root', password='p@ssw0rd', host='127.0.0.1', database='earthquake_data')
cursor = connection.cursor()
print datafile.name
data = json.load(datafile)

insert_fault = "INSERT INTO fault (name, url, shape, source) VALUES (%s, %s, GeomFromText(%s), %s)"

i = 0
for feature in data['features']:
	description = BeautifulSoup(feature['properties']['Description'])
	links = description.findAll("a")
	fault_link = None
	for link in links:
		fault_link = link['href']
		break

	fault_name = (feature['properties']['Name'].encode('ascii'))
	fault_link = fault_link.encode('ascii')
	fault_shape = convertGeographyToMultilineString(feature['geometry'])

	fault_json = {
		"type": "Feature",
		"properties": {
			"name": fault_name,
			"url": fault_link
		},
		"geometry": feature["geometry"]
	}

	fault_data = (fault_name, fault_link, fault_shape, json.dumps(fault_json))
	cursor.execute(insert_fault, fault_data);
	print('creating fault record')
	connection.commit()

cursor.close()
connection.close()
datafile.close()

