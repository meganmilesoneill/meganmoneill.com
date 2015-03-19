#!/bin/bash

path="/vagrant"

echo
echo **************************************************
echo Updating Packages
echo **************************************************
sudo apt-get update -y

echo
echo **************************************************
echo Installing general VM utilities
echo **************************************************
sudo apt-get install -y gcc make wget cron curl 
#sudo apt-get install -y libxml2 libxml2-dev libzip-dev libbz2-dev curl libcurl4-openssl-dev libcurl3 libcurl3-gnutls libjpeg62 libjpeg62-dev libpng12-0 libpng12-dev libmcrypt-dev libmcrypt4 libxslt1-dev libxml2-dev libcupsys2
sudo apt-get install -y vim unzip curl
sudo apt-get install -y vim git
sudo apt-get install -y debconf-utils

echo
echo **************************************************
echo Installing MySQL 5.6
echo **************************************************
# sudo apt-get install -y libaio1
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password p@ssw0rd'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password p@ssw0rd'
sudo apt-get install -y mysql-server-5.6 --fix-missing --fix-broken
sudo apt-get install -y libmysqlclient-dev
sudo apt-get install -y mysql-client-5.6
#sudo apt-get install -y libapache2-mod-auth-mysql

echo
echo **************************************************
echo Installing nginx
echo **************************************************
sudo apt-get install -y nginx
sudo service nginx start

echo
echo **************************************************
echo Installing python
echo **************************************************
sudo apt-get install -y python-software-properties
sudo apt-get install -y python-setuptools python-dev build-essential 
sudo easy_install pip 
sudo pip install --upgrade virtualenv
sudo apt-get install -y python-bs4

echo
echo **************************************************
echo Installing python-mysql
echo **************************************************

sudo apt-get install -y python-dev libmysqlclient-dev
pip install MySQL-python
sudo dpkg -i mysql-connector-python_2.0.3-1ubuntu14.04_all.deb

sudo apt-get update -y


# sudo add-apt-repository ppa:webupd8team/java
# sudo apt-get update
# sudo apt-get install -y python-setuptools python-dev build-essential 
# sudo easy_install pip 
# sudo pip install --upgrade virtualenv
# sudo add-apt-repository ppa:ubuntugis/ppa
# sudo apt-get update
# sudo apt-get install gdal-bin

# sudo apt-get install -y oracle-java8-installer

# sudo curl -L -O https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.4.2.zip
# sudo unzip elasticsearch-1.4.2.zip
# sudo cp -r elasticsearch-1.4.2 /usr/local
# cd /usr/local/elasticsearch-1.4.2
#sudo ./bin/plugin -i elasticsearch/marvel/latest
#sudo ./bin/elasticsearch -d
#sudo pip install elasticsearch
