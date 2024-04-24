#!/bin/bash

set -e

echo "====================Updating Ubuntu===================="
sudo apt update

echo "====================Installing Node.js===================="
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "====================Node.js version===================="
node -v

echo "====================Installing NPM===================="
sudo npm install -g npm@latest

echo "====================NPM version===================="
npm -v

echo "====================Cloning repository with Next.js project===================="
git clone https://github.com/CarolinaSFreitas/emergentes-1804 || { echo "Failed to clone repository"; exit 1; }

echo "====================Changing directory===================="
cd emergentes-1804 || { echo "Failed to change directory"; exit 1; }

echo "====================Installing dependencies===================="
npm install || { echo "Failed to install dependencies"; exit 1; }

echo "====================Building Next.js project===================="
npm run build || { echo "Failed to build project"; exit 1; }

echo "====================Installing PM2===================="
sudo npm install pm2@latest -g

echo "====================Starting project with PM2===================="
pm2 start npm --name emergentes-1804 -- run start -- -p 3000 || { echo "Failed to start project with PM2"; exit 1; }

echo "====================Listing Next.js project with PM2===================="
pm2 list emergentes-1804

echo "Initialization completed successfully"
