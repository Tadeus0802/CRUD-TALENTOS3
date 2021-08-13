const mysql=require('mysql');
const con= mysql.createConnection({
	host:'localhost',
user:'root',
password:'',
database:'ct'
});
con.connect(err=>{
	if(err) throw err;
	console.log("Usted esta conectado a la base de datos");
})
module.exports=con;
