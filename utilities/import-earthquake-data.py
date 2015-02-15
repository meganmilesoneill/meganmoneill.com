from datetime import datetime
from elasticsearch import Elasticsearch, NotFoundError
import urllib2
import json

es = Elasticsearch()

response = urllib2.urlopen("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
print response.info()

data = json.load(response)

for feature in data['features']:
	print(feature['id'])
	feature_id = feature['id']
	try:
		result = es.get(index='earthquake-data', doc_type='earthquake', id=feature_id)
	except NotFoundError:
		print('creating earthquake record')
		result = es.index(index='earthquake-data', doc_type="earthquake", id=feature_id, body=feature)
		print(result['created'])
	else:
		print('feature already exists in elasticsearch: ' + feature_id)	

response.close()
