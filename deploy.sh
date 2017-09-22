
echo "building bundle..."
meteor build /Users/nico/Desktop/nicokrause.com --architecture os.linux.x86_64
echo "stopping remote docker..."
ssh nico@www.le-space.de "docker stop brave_goldstine"
echo "copying bundle.tar.gz to remote server"
scp /Users/nico/Desktop/sinicokrause.com/it.nicokrause.com.tar.gz nico@www.le-space.de:/var/www/meteor/nicokrause.com/
echo "start remote docker "
ssh nico@www.le-space.de "docker start brave_goldstine"
echo "visit http://www.nicokrause.com"
