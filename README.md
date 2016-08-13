# profilePage
a simple editable profilePage for freelancers made with meteor. 

see a demo at http://www.nicokrause.com (not editable without admin login)

1. install meteor from www.meteor.com on your machine
2. clone this project into your project folder
3. type: 'meteor'
4. go to http://localhost:3000


##TODO
- make glassfish a secure server with letsencrypt
- add webcall section
	-- add HTML & JS to webcall template
	-- add config params to webapp in sources 
	-- add config params glassfish / tomcat 

- add yoga section
- add trips section
- add coworking section
- add press section
- add blog (all kind of stuffs e.g. software stuffs, travel, coworking, remote working)
- translation 
	https://github.com/TAPevents/tap-i18n-db
	https://github.com/TAPevents/tap-i18n
- download CV as PDF (siehe footer im PDF)


##BUGS
- appear does not exist in home section for skills



##Nice2Have
- add webrtc call communication 
- make already edited texts editable (what exactly?!)
- improve delete of hobbies (* at the wrong position)
- make nicer links to SocialMedia 
	- eventually show logos of the technology by hovering over the skills
	- put links to the technologies
- implement a WebRTC for profile!
- add markdown for texts (textareas)
- add clone me on github flag on webpage

##Info
``
	docker run -d  -e ROOT_URL=http://www.nicokrause.com  -e MONGO_URL=mongodb://username:password@nicokrause.com/dbname -v /var/www/meteor/nicokrause.com:/bundle -p 3002:80 --log-driver=syslog     meteorhacks/meteord:base
``


##Done:
- 2016-08-13 problem with glassfish jdk - update jdk to 8
			- apt-get update
- 2016-08-13 changed password on docker glassfish 
				- connect to docker: docker exec -it sharp_austin bash
				- https://docs.oracle.com/cd/E26576_01/doc.312/e24938/change-admin-password.htm#GSRFM00004
- 2016-08-13 added glassfish docker to ashtanga
		- docker run -d -p 4848:4848 -p 8080:8080 -p 8181:8181 tutum/glassfish
			- https://github.com/tutumcloud/glassfish
			- admin frontend https://www.le-space.de:4848/

	

- 2016-08-05 added github link
- 2016-08-05 added new branch "relaunch" with new template
- 2016-08-05 add spiderable
- 2016-04-25 deploy on own server
- 2016-04-24  
- 2015-12-23 edit content e.g.  through in place textboxes
				https://github.com/nate-strauser/meteor-x-editable-bootstrap/
				http://vitalets.github.io/x-editable/demo-bs3.html?c=inline
- 2015-12-23 global persistant vars (contact, bio, safe in db) (realized through config document (key,value))
- 2015-12-20 disable account creation (not necessary)
- 2015-12-20 secure database backend
- 2015-12-20 sort skills languages, hobbies
- 2015-12-20 hide forms when not login
- 2015-12-20 prevent update of users
- 2015-12-20 remove insecure
- animated div changing in size based on parent size (skills)
- added trips to experiences - now its possible to mix trips into experiences 
- once data are loaded from meteor - it does not the autocomplete (complete new implementation of workman:meteor-editable)	
	http://meteor-editable.meteor.com/docs
	https://atmospherejs.com/workman/meteor-editable

##Known bugs:
- when click on x-editable error:  'string.replace is not a function'	






