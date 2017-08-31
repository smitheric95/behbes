#!/usr/bin/env bash

shareroot="/vagrant"
working_dir=$shareroot"/webApp"
webroot="/var/www/dev.behbes.club"
password="pass"

# switch to root
echo "[INSTALL] Switching user to root..."
sudo su -
if [ "$USER" = "root" ]; then
    echo "Successfully switched to root."
else
    exit 1
fi

# Setting to make script abort if error occurs
#set -e

# create webroot if it doesn't already exist
echo "[INSTALL] Checking for webroot..."
if ! [ -d $webroot ]; then
    echo "[INSTALL] Webroot directory does not exist. Creating webroot."
    mkdir -p $webroot || { echo "[INSTALL] Failed to create webroot. Exiting." ; exit 1; }
else
    echo "[INSTALL] Webroot exists. Continuing."
fi

# update packages
echo "[INSTALL] Updating packages..."
apt-get update

# Install Apache2
echo "[INSTALL] Installing Apache..."
apt-get install -y apache2

# Configure Apache to load from shared directory (if needed)
echo "[INSTALL] Linking Vagrant shared folder with webroot..."
if ! [ -L $webroot ]; then
    rm -rf $webroot
    ln -fs $shareroot $webroot
fi

# Install MySQL + dependencies
echo "[INSTALL] Setting options for MySQL install..."
export DEBIAN_FRONTEND=noninteractive
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password password $password"
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password_again password $password"

# Changes from previous version:
#   - package libapache2-mod-auth-mysql is unmaintined and therefore removed
echo "[INSTALL] Installing MySQL..."
apt-get -y install mysql-server php-mysql

# Install PHP + dependencies
# Changes from previous version:
#   - package php5-sqlite is obsolete and not needed for this project
echo "[INSTALL] Installing PHP..."
apt-get -y install php libapache2-mod-php php-mcrypt php-curl 

# Enable PHP extension
phpenmod mcrypt

# Install phpMyAdmin
echo "[INSTALL] Setting options for phpMyAdmin install..."
debconf-set-selections <<< "phpmyadmin phpmyadmin/dbconfig-install boolean true"
debconf-set-selections <<< "phpmyadmin phpmyadmin/app-password-confirm password $password"
debconf-set-selections <<< "phpmyadmin phpmyadmin/mysql/admin-pass password $password"
debconf-set-selections <<< "phpmyadmin phpmyadmin/mysql/app-pass password $password"
debconf-set-selections <<< "phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2"

echo "[INSTALL] Installing phpMyAdmin..."
apt-get install -y phpmyadmin

# Install git (needed for composer)
echo "[INSTALL] Installing git..."
apt-get install -y git

echo "[INSTALL] Installing zip..."
apt-get install -y zip

echo "[INSTALL] Installing htop..."
apt-get install -y htop

# Install Composer
echo "[INSTALL] Installing Composer..."
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Install PHP dependencies with Composer
echo "[INSTALL] Installing PHP dependencies..."
su vagrant << EOF
echo $USER
composer --working-dir=$working_dir install
EOF

# Configure apache to rewrite
echo "[INSTALL] Writing Apache virtual host file..."
echo -e "<VirtualHost *:80>" > /etc/apache2/sites-available/000-default.conf
echo -e "\tDocumentRoot ${webroot}" >> /etc/apache2/sites-available/000-default.conf
echo -e "\t<Directory ${webroot}>" >> /etc/apache2/sites-available/000-default.conf
echo -e "\t\tAllowOverride All" >> /etc/apache2/sites-available/000-default.conf
echo -e "\t</Directory>" >> /etc/apache2/sites-available/000-default.conf
echo -e "\tErrorLog /var/log/apache2/error.log" >> /etc/apache2/sites-available/000-default.conf
echo -e "\tCustomLog /var/log/apache2/access.log combined" >> /etc/apache2/sites-available/000-default.conf
echo -e "</VirtualHost>" >> /etc/apache2/sites-available/000-default.conf

# Enable Apache mod_rewrite
echo "[INSTALL] Enabling Apache mod_rewrite..."
a2enmod rewrite

# Make Apache prefer PHP files over other files
echo "[INSTALL] Making Apache prefer PHP files..."
sed -i.bak -r "s/(\s+)(\w+)\s(\w+\.\w+)\s(\w+\.\w+)\s(\w+\.\w+)\s(\w+\.\w+)\s(\w+\.\w+)\s(\w+\.\w+)/\1 \2 \6 \3 \4 \5 \7 \8/" /etc/apache2/mods-available/dir.conf

# Restart Apache
echo "[INSTALL] Restarting Apache..."
service apache2 restart

# Install Node.js and npm 
echo "[INSTALL] Installing Node.js and npm..."
apt-get install -y nodejs
apt-get install -y npm

# Upgrade npm to latest version
echo "[INSTALL] Upgrading npm to latest version"
npm install -g npm

# Upgrade Node.js to latest version
echo "[INSTALL] Upgrading Node.js to latest version..."
npm cache clean -f
npm install -g n
n stable

# Link nodejs executable to /usr/bin/node to fix error with Ionic
ln -s /usr/bin/nodejs /usr/bin/node

# Install Ionic
echo "[INSTALL] Installing Ionic..."
npm install -g cordova ionic

# Fix node-sass package to work with the Linux VM
npm rebuild node-sass --force

# Run Ionic initially to answer "yes" to any questions
yes | ionic

# Start PHP server
cwd=`pwd`
cd $working_dir 
nohup php -S localhost:8100 -t public public/index.php > /var/log/phpd.log 2>&1 &
cd $cwd

# Start Ionic server
cd $working_dir"/public/myApp"
nohup sh -c "ionic serve --nobrowser > /var/log/ionicd.log 2>&1" &
cd $cwd

