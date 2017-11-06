#old bundle config
#docker run -d -e ROOT_URL=http://www.nicokrause.com -e MONGO_URL=mongodb://nicokrause_com -e MONGO_OPLOG_URL=mongodb://nicokrause.com/nicokrause_com_oplog -v /var/www/meteor/nicokrause.com:/bundle -p 3002:80 --log-driver=syslog meteorhacks/meteord:base

sudo docker run -d -e PWD=/var/www/meteor/nicokrause.com/profilePage -e MONGO_URL=mongodb://nicokrause_com:omnamahshivaya@nicokrause.com/nicokrause_com -p 3002:3000 --log-driver=syslog  profilepage_meteor
