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
sudo apt-get install -y python python-pip python-virtualenv 
sudo apt-get install -y python-bs4
sudo apt-get install -y gunicorn
sudo apt-get install -y supervisor
# sudo apt-get install -y python-software-properties
# sudo apt-get install -y python-setuptools python-dev build-essential 
# sudo easy_install pip 
# sudo pip install --upgrade virtualenv

echo
echo **************************************************
echo Installing python-mysql
echo **************************************************
sudo apt-get install -y python-dev libmysqlclient-dev

sudo apt-get update -y

echo
echo **************************************************
echo Configuring Site
echo **************************************************
sudo adduser wwwuser
sudo adduser wwwuser sudo
passwd wwwuser

cd /vagrant/www/
# sudo mkdir /home/www && cd /home/www
sudo virtualenv env
source env/bin/activate

sudo pip install Flask==0.10.1
pip install MySQL-python
sudo dpkg -i /vagrant/mysql-connector-python_2.0.3-1ubuntu14.04_all.deb
pip install mysql-connector-python --allow-external mysql-connector-python

sudo rm /etc/nginx/sites-enabled/default
sudo cp /vagrant/config/www/nginx.config /etc/nginx/sites-available/www
sudo ln -s /etc/nginx/sites-available/www /etc/nginx/sites-enabled/www
sudo service nginx restart

sudo cp /vagrant/config/www/supervisor.config /etc/supervisor/conf.d/www.conf
sudo pkill gunicorn
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start www


