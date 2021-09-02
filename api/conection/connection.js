const mysql=require('mysql');
const pool=mysql.createPool({
	connectionLimit:10,
/*
	host:"sql248.main-hosting.eu",
	user:'u836417525_enc',
	password:'T@lentos2021',
	database:'u836417525_enc'	
	*/
		host:"localhost",
		user:"root",
		password:"",
		database:"ct"
	
});
var con=pool;
module.exports=con;
