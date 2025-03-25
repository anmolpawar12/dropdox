1. change your spring.datasource.password=anmol to what every you mysql password is in application.properties
2. run the script for db details create database anmol;

use anmol;

create table files
(
	filename varchar(255) not null,
	filepath varchar(500) not null
	primary key,

)
;
3.cd frontend
4.npm install
5.npm start
6.For back run BackendApplication from ide 
