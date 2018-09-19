# docker-guacamole-selenium
## Instructions to setup Apache Guacamole to remote into Docker Selenium Nodes:

1) Bring up all the containers:
#### docker-compose up -d
Building the containers is not needed,since all use pre-existing images.

2) Apache Guacamole is up but unless the database is configured for Apache Guacamole, the web client will not come up.
Hence to setup the DB, run the "initdb.sql" file. This file has been provided by Apache itself for a basic db setup for Apache Guacamole.
#### cat initdb.sql | docker exec -i <NAME_OF_MYSQL_DOCKER_CONTAINER> mysql -uroot -pexample guacamole_db
Eg: cat initdb.sql | docker exec -i docker-guacamole-selenium_mysql_1 mysql -uroot -pexample guacamole_db

3) Once the database for Apache Guacamole is setup, go to "http://localhost:8080/guacamole" to check if the guacamole web client is up. The default user being used for this project is "guacadmin". The password for it is "guacadmin". 
Login using these credentials.

4) Once you login, you would not see any connections on your dashboard, since you have not configured any. Go to the settings panel on the right top to setup a connection to your "docker-chrome-node". This node is already up using the docker-compose file and Apache Guacamole would help us setup a VNC connection to that node. Note that the "debug" version of the chrome node is used so it has the option for a VNC connection; the normal node does not have VNC connection.

5) Go to "Connections" tab in Settings and add a new Connection. Name it as you want and then add network connection parameters:
Hostname - chrome (this "chrome" is the same name of the docker chrome container that is mentioned in the docker-compose file)
Port - 5900 (port where VNC connection is open - again mentioned in the docker-compose file)
Password - secret (this is the default password that the chrome debug node has for its VNC connection)

6) Once you open the connection, you can go to the Google Chrome in the remote box and search for "http://wordpress:80". The wordpress docker instance that you have will be seen. Note "wordpress" is the name of the container as mentioned in docker-compose file.

This completes the setup to see the chrome node's UI through Apache Guacamole.

## Instructions to run test container to run Selenium tests on Wordpress in the docker chrome/firefox nodes
1) Build the docker image for test
#### docker-compose build

2) Start the containers
#### docker-compose up -d

3) The "test" container will start and go down. To check whether the tests are running successfully:
#### docker-compose run test
Here "test" is the name of container in docker-compose file. This will run the selenium test and show its output on the command prompt. This way you can verify if the test is successfull or not.

If the test (seleniumTest.js) is changed then run steps 1-3 again to see it in effect.
