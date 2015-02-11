sudo apt-get update
sudo apt-get install -y apache2

sudo apt-get install -y vim unzip curl

sudo apt-get install -y python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install -y python-setuptools python-dev build-essential 
sudo easy_install pip 
sudo pip install --upgrade virtualenv 
# sudo apt-get install -y oracle-java8-installer

# sudo curl -L -O https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.4.2.zip
# sudo unzip elasticsearch-1.4.2.zip
# sudo cp -r elasticsearch-1.4.2 /usr/local
# cd /usr/local/elasticsearch-1.4.2
#sudo ./bin/plugin -i elasticsearch/marvel/latest
#sudo ./bin/elasticsearch -d
#sudo pip install elasticsearch
