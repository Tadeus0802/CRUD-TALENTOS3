const mysql=require('mysql');
const pool=mysql.createPool({
	connectionLimit:1000,
	host:"sql248.main-hosting.eu",
	user:'u836417525_enc',
	password:'T@lentos2021',
	database:'u836417525_enc'
});
var con=pool;
module.exports=con;
