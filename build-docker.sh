#docker build -t NicoKrause.com/app .
meteor build ../build/ --architecture os.linux.x86_64
scp build/profilePage.tar.gz nico@le-space.de:/var/www/meteor/nicokrause.com/
