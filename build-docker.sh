#docker build -t NicoKrause.com/app .

#meteor build over bundle
#meteor build ../build/ --architecture os.linux.x86_64
#scp build/profilePage.tar.gz nico@le-space.de:/var/www/meteor/nicokrause.com/

#meteor build via docker-compose 
sudo -- sh -c 'export PWD=/var/www/meteor/nicokrause.com/profilePage; docker-compose build'
