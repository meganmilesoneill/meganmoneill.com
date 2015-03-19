CREATE DATABASE IF NOT EXISTS earthquake_data;

USE earthquake_data;

DROP TABLE IF EXISTS earthquake;

CREATE TABLE IF NOT EXISTS earthquake (
	id 			INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	eventid 	VARCHAR(20) NOT NULL,
	mag 		DOUBLE(4, 2),
	place		VARCHAR(255),
	time		BIGINT,
	updated		VARCHAR(255),
	tz			INTEGER,
	url			VARCHAR(255),
	detail		VARCHAR(255),
	felt		VARCHAR(255),
	cdi			VARCHAR(255),
	mmi			VARCHAR(255),
	alert		VARCHAR(255),
	status		VARCHAR(255),
	tsunami		VARCHAR(255),
	sig 		INTEGER,
	net			VARCHAR(255),
	code		VARCHAR(255),
	ids			VARCHAR(255),
	sources 	VARCHAR(255),
	types		VARCHAR(255),
	nst			INTEGER,
	dmin		DOUBLE,
	rms			DOUBLE,
	gap			DOUBLE,
	magType 	VARCHAR(255),
	type 		VARCHAR(255),
	title		VARCHAR(255),
	location 	POINT NOT NULL,
	depth		DOUBLE,
	SPATIAL INDEX (location)
)  ENGINE=MyISAM;

DROP TABLE IF EXISTS fault;

CREATE TABLE IF NOT EXISTS fault (
	id 			INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name		VARCHAR(255),
	url			VARCHAR(255),
	shape		MULTILINESTRING NOT NULL,
	SPATIAL INDEX (shape)
) ENGINE=MyISAM;
