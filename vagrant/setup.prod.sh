#!/usr/bin/env bash
# Script that is run during Vagrant provision to set up the development environment.

# Make non-zero exit codes & other errors fatal.
set -euo pipefail

SRC_DIR="$HOME/portfolio"
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

sudo npm update -g npm
sudo npm install -g yarn

echo '-----> Configuring Git 2.0'
git config --global push.default simple

echo '-----> Configuring NPM'
#sudo chown -R $USER:$(id -gn $USER) /home/vagrant/.config

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

echo '-----> Installing frontend npm dependencies'
cd $SRC_DIR/frontend
sudo yarn autoclean
sudo yarn install
cd ~

echo '-----> Installing backend npm dependencies'
cd $SRC_DIR/backend
sudo yarn autoclean
sudo yarn install
cd ~

echo '-----> Move to gu-port'
cd ~/gu-port 

echo '-----> Setup complete!'
