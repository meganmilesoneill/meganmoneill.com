from datetime import datetime
from elasticsearch import Elasticsearch, NotFoundError
#import urllib2
import json
import sys
from bs4 import BeautifulSoup

es = Elasticsearch()

datafile = open("../data/quaternary.geojson")
#print response.info()
print datafile.name
data = json.load(datafile)

i = 0
for feature in data['features']:
	description = BeautifulSoup(feature['properties']['Description'])
	links = description.findAll("a")
	fault_link = None
	for link in links:
		fault_link = link['href']
		break

	fault = {
		"type": "Feature",
		"properties": {
			"name": feature['properties']['Name'].encode('ascii'),
			"url": fault_link.encode('ascii')
		},
		"geometry": {
			"type": feature["geometry"]["type"].encode('ascii'),
			"coordinates": feature["geometry"]["coordinates"][0]
		}
	}
	print fault
	try:
		result = es.index(index="earthquake-data", doc_type="fault", id=i, body=fault)
		print "fault successfully indexed: " + fault["properties"]["name"]
	except:
		print "error indexing fault: " + fault["properties"]["name"]
		print sys.exc_info()
	i+=1
	if i > 15:
		break

datafile.close()
