
echo "building bundle..."
meteor build /Users/nico/Desktop/sinicokrause.com --architecture os.linux.x86_64
echo "stopping remote docker..."
ssh root@www.le-space.de "docker stop romantic_fermat"
echo "copying bundle.tar.gz to remote server"
scp /Users/nico/Desktop/sinicokrause.com/it.nicokrause.com.tar.gz root@www.le-space.de:/var/www/meteor/nicokrause.com/
echo "start remote docker "
ssh root@www.le-space.de "docker start romantic_fermat"
echo "visit http://www.nicokrause.com"