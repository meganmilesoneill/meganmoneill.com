import mysql.connector
import json 

def get_tasks():
	connection = mysql.connector.connect(user='root', password='p@ssw0rd', host='127.0.0.1', database='earthquake_data')
	cursor = connection.cursor()
	select_events = "select source from earthquake where MBRContains(Envelope(GeomFromText('LineString(%s %s, %s %s)')), location) = 1 order by time asc;"
	event_data = (-125.69510773828125, 38.79394764206436, -119.31754426171875, 36.682994957749884)
	cursor.execute(select_events, event_data)

	events_list = []
	for (source) in cursor:
		events_list.append(json.loads(source[0]))

	cursor.close
	connection.close
	eventData = {
	"type" : "FeatureCollection",
	"features": events_list
	}

	return eventData

print get_tasks()
