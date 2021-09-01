const {Router}= require('express');
const bcryptjs=require('bcryptjs');
const con=require('../conection/connection');
const jwt=require('jsonwebtoken');
require('dotenv').config({path:'../env/.env'});
const router=Router();

router.get('/',(req,res)=>res.send('Pagina principal'));

//REGISTER
router.post('/api/register/',async (req,res)=>{
con.query('select max(idUser)+1 as idUser from users',async (err,result)=>{
    if(err)throw err;
    if(result[0].idUser==null){
        result[0].idUser=1;
    }
   
    const data={
        idUser:result[0].idUser,
        user:req.body.user,
        password:await bcryptjs.hash(req.body.password,8),
        rol:req.body.rol,
        fullName:req.body.fullName
    };
    con.query('insert into users set ?',data,(err,result)=>{
        if(err){
            const datas={
                success:false,
                icon:'error',
                title:'REGISTRO FALLIDO',
                text:'el usuario ya existe',
                showConfirmButton:false,
                timer:3000
            }
        res.send(datas);
        }
       else{
        
        const datas={
            success:true,
            icon:'success',
            title:'REGISTRO COMPLETADO',
            text:'',
            showConfirmButton:false,
            timer:3000,
        };
        res.send(datas);
       }
    })
});
});

//LOGIN 

router.post('/api/login/',async (req,res)=>{
   await  bcryptjs.hash(req.body.password,8);
    const data={
        user:req.body.user,
        password:req.body.password
    };
    const {user}=data;
    con.query('select * from users where user=?',[user],async (err,result)=>{
        if(err)throw err;
        if(result.length==0 || !(await bcryptjs.compare(data.password,result[0].password))){
            err={ 
                icon:'error',
                title:'SESSION FALLIDA',
                text:'usuario o contraseña incorrectos',
                showConfirmButton:false,
                timer:1500,
                success:false
            };
            res.send(err);
        }
        else{
            const datas={    
                icon:'success',
                title:'SESSION INICIADA',
                text:`Bienvenido ${user}`,
                showConfirmButton:true,
                timer:1500,
                user:user,
                idUser:result[0].idUser,
                success:true,
                token:jwt.sign({check:true},process.env.KEY,{expiresIn:'7d'})
            };
            res.send(datas);
        }
    });
});

module.exports=router;