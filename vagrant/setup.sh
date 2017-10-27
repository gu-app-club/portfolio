#!/usr/bin/env bash
# Script that is run during Vagrant provision to set up the development environment.

# Make non-zero exit codes & other errors fatal.
set -euo pipefail

SRC_DIR="$HOME/gu-port"
cd "$SRC_DIR"

# Suppress prompts during apt-get invocations.
export DEBIAN_FRONTEND=noninteractive

# Remove the old MySQL 5.6 PPA repository, if this is an existing Vagrant instance.
sudo rm -f /etc/apt/sources.list.d/ondrej-ubuntu-mysql-5_6-xenial.list

if [[ ! -f /etc/apt/sources.list.d/nodesource.list ]]; then
    echo '-----> Adding APT repository for Node.js'
    curl -sSf https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
    echo 'deb https://deb.nodesource.com/node_7.x xenial main' | sudo tee /etc/apt/sources.list.d/nodesource.list > /dev/null
fi

echo '-----> Installing/updating APT packages'
sudo -E apt-get -yqq update
sudo -E apt-get -yqq install --no-install-recommends \
    git \
    libmemcached-dev \
    libmysqlclient-dev \
    mysql-server-5.7 \
    nodejs \
    dos2unix \

sudo npm update -g npm
sudo npm install -g yarn

echo '-----> Configuring Git 2.0'
git config --global push.default simple

echo '-----> Configuring NPM'
sudo chown -R $USER:$(id -gn $USER) /home/vagrant/.config

echo '-----> Removing ^M line-endings'
dos2unix ~/gu-port/backend/setup.sh 
dos2unix ~/gu-port/backend/build.sh 

echo '-----> Installing golang'
wget -q https://storage.googleapis.com/golang/go1.9.1.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.9.1.linux-amd64.tar.gz
rm go1.9.1.linux-amd64.tar.gz

echo '-----> Configuring GOPATH'
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

echo '-----> Installing go dependencies'
/home/vagrant/gu-port/backend/setup.sh

echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc

echo '-----> Adding aliases' 
echo "alias start='sudo sh ~/gu-port/scripts/start.sh'" >> ~/.bashrc

echo '-----> Adding Doggo 🐶'
echo "sh ~/gu-port/scripts/doggo.sh" >> ~/.bashrc

echo '-----> Initialising MySQL database'
# Re-enable blank password root logins, which are disabled by default in MySQL 5.7.
sudo mysql -e 'ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY ""';
# The default `root@localhost` grant only allows loopback interface connections.
mysql -u root -e 'DROP DATABASE IF EXISTS gu_port_testing'
mysql -u root -e 'DROP DATABASE IF EXISTS gu_port_dev'
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS gu_port_testing'
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS gu_port_dev'

mysql -u root gu_port_testing < $SRC_DIR/vagrant/gu-port-testing.sql
mysql -u root gu_port_dev < $SRC_DIR/vagrant/gu-port-dev.sql

echo '-----> Installing npm dependencies'
cd ./frontend
sudo yarn autoclean
sudo yarn install
cd ~

echo '-----> Move to gu-port'
cd ~/gu-port 

echo '-----> Setup complete!'
