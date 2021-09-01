const express=require('express');
const con=require('../conection/connection');
const router = express.Router();
require('dotenv').config({path:'../env/.env'});
const jwt=require('jsonwebtoken');
const verificacion=express.Router();


verificacion.use((req,res,next)=>{
    let token=req.headers['x-access-token']||req.headers['authorization'];
    //  console.log(token);  
        if(!token){
            res.status(401).send({
                error:'Es necesario un token de autentificacion'
            })
            return
        }
        if(token.startsWith('Bearer ')){
                token=token.slice(7,token.length);
                console.log(token);
        }
        if(token){
            jwt.verify(token,process.env.KEY,(err,decoded)=>{
                if(err){
                    return res.json({
                        message:'El token no es valido'
                    })
                }
                else{
                    req.decoded=decoded;
                    next();
                }
    
            })
        }
});

//ruta inicial
router.get("/",verificacion,(req,res)=>res.send("<h1>Ruta Inicial</h1>"));

  //mostrar preguntas de un cuestionario

  router.get('/api/cuestionarios/preguntas/:idcuestionario',(req,res)=>{
    con.query(`SELECT * FROM enlaces pc INNER JOIN preguntas p ON pc.idpreguntas=p.idpreguntas WHERE pc.idcuestionarios=?`,[req.params.idcuestionario],(err,filas)=>{
        if(err)throw err;
        res.send(filas);
        
    });
});
//asignar una pregunta del cuestionario
router.post('/api/cuestionarios/asignarPregunta/:idpreguntas',verificacion,(req,res)=>{
  let idpreguntas=req.params.idpreguntas;
  let idcuestionarios=req.body.idcuestionarios;
  con.query('insert into enlaces set ?',{idcuestionarios,idpreguntas},(err,result3)=>{
    if(err){
     const data={
       icon:'error',
        title:'Esta pregunta ya esta asignada'
     }
     console.log(err);
      res.send(data);
    }
    else{
      const data={
        icon:'success',
        title:'Esta pregunta se asigno con exito'
      }
      res.send(data);
    }
   
  });
});
  

//desasignar una pregunta del cuestionario

router.delete('/api/cuestionarios/desasignarPreguntas/:idpreguntas:idcuestionarios',verificacion,(req,res)=>{
  let idpreguntas=req.params.idpreguntas;
  let idcuestionarios=req.params.idcuestionarios;
    
  con.query("delete from enlaces where idpreguntas=? and idcuestionarios=?",[idpreguntas,idcuestionarios],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

module.exports=router;