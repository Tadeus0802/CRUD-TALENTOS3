const express=require('express');
const con=require('../conection/connection');
const router = express.Router();

//ruta inicial
router.get("/",(req,res)=>res.send("<h1>Ruta Inicial</h1>"));

  //mostrar preguntas de un cuestionario

  router.get('/api/cuestionarios/preguntas/:idcuestionario',(req,res)=>{
    con.query(`SELECT * FROM enlaces pc INNER JOIN preguntas p ON pc.idpreguntas=p.idpreguntas WHERE pc.idcuestionarios=?`,[req.params.idcuestionario],(err,filas)=>{
        if(err)throw err;
        res.send(filas);
        
    });
});
//asignar una pregunta del cuestionario
router.post('/api/cuestionarios/asignarPregunta/:idpreguntas',(req,res)=>{
  let idpreguntas=req.params.idpreguntas;
  let idcuestionarios=req.body.idcuestionarios;
  con.query('insert into enlaces set ?',{idcuestionarios,idpreguntas},(err,result3)=>{
    if(err){
      console.log("ya hay una pregunta asignada a este cuestionario") 
    }
    res.send(result3);
  });
});
  

//desasignar una pregunta del cuestionario

router.delete('/api/cuestionarios/desasignarPreguntas/:idpreguntas:idcuestionarios',(req,res)=>{
  let idpreguntas=req.params.idpreguntas;
  let idcuestionarios=req.params.idcuestionarios;
    
  con.query("delete from enlaces where idpreguntas=? and idcuestionarios=?",[idpreguntas,idcuestionarios],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

module.exports=router;