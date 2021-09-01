const express=require('express');
const router=express.Router();
const con=require('../conection/connection');

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

router.get("/", (req, res) => res.send("Ruta Inicio"));

//convertir estado de booleano a habilitado/desabilitado
function conv(param){
  if(param){
      return "Habilitado";
  }
  else{
      return "Deshabilitado";
  }
}  

  //Obtener todas las preguntas
  router.get("/api/preguntas",verificacion, (req, res) => {
    con.query('SELECT * FROM preguntas', (error, filas) => {
      if (error)throw error;
        res.send(filas);
    });
  });
  //Mostrar preguntas habilitadas
router.get("/api/preguntas/mostrarPreguntasHabilitadas/:idcuestionarios:estado",verificacion,(req,res)=>{
 
  let sql=`select * from preguntas where preguntas.idpreguntas not in (SELECT enlaces.idpreguntas FROM enlaces WHERE enlaces.idcuestionarios =${req.params.idcuestionarios}) and preguntas.estado='${req.params.estado}'`;
    con.query(sql,(err,result)=>{
      if(err)throw err; 
     res.send(result);  
  });

});


  //Mostrar una sola pregunta
  router.get('/api/preguntas/:idpregunta',verificacion, (req,res)=>{
      con.query('SELECT * FROM preguntas WHERE idpreguntas = ?', [req.params.idpregunta],(error,fila)=>{
          if(error)throw error;
           res.send(fila)
      });
  });
  
  //Crear pregunta
  
router.post('/api/preguntas/',verificacion, (req, res) => {
  
  con.query('select max(idpreguntas)+1 as idpreguntas from preguntas', (err, result) => {
    
    let objeto= result[0];
    var valor = objeto.idpreguntas;
    if (valor == null){
      valor = 1;
    }
    
    const data = {

      idpreguntas: valor,
      descripcion: req.body.descripcion,
     estado: conv(req.body.estado),
     categoria:req.body.categoria
    };
    
    const sql = "insert into preguntas set ?";

  con.query(sql, data,(err,result2) => {
    if (err){
   const data={
     icon:'error',
     title:"ya existe esta pregunta"
   }
   console.log(err); 
   res.send(data);
    }
    else{
    const data={
      icon:'success',
      title:"Se creo la pregunta con exito"
    }
    res.send(data);
    }
  });

    
  });
});

  //Actualizar pregunta
 router.put('/api/preguntas/:idpregunta',verificacion, (req, res) => {
    let idpregunta = req.params.idpregunta;
    let descripcion = req.body.descripcion;
    let estado = conv(req.body.estado);
    let categoria=req.body.categoria;
    let sql = 'UPDATE preguntas SET descripcion= ?, estado= ?, categoria=? WHERE idpreguntas= ?';
    con.query(sql, [descripcion, estado,categoria,idpregunta], (error, results) => {
      if (error){
        const data={
          icon:'error',
          title:"Ya existe esta pregunta"
        } 
               res.send(data);
      }
        else{
          const data={
            icon:'success',
            title:"Se edito la pregunta con exito"
          }
          res.send(data);
        }
      
    });
  });
  


  
  //Eliminar pregunta
  router.delete('/api/preguntas/:idpregunta',verificacion, (req,res)=>{
      let idpreguntas= req.params.idpregunta;
  
      con.query('DELETE FROM preguntas WHERE idpreguntas= ?',[idpreguntas], (error,results)=>{
        //el error ocurre al borrar una pregunta  asignada a un cuestionario o más 
          if(error){
            //por ende se deshabilita la pregunta
            con.query('update preguntas  SET estado=? where idpreguntas=?',["Deshabilitado",idpreguntas],(err,resultado)=>{
              if(err)throw err;
              const data={
                icon:'error',
                title:"La pregunta esta asignada a algún cuestionario, se deshabilitará"
              }
              res.send(data);
              
            });
          } 
          else{
            const data={
              icon:'success',
              title:"La pregunta se elimino"
            }
            res.send(data);
          }
               
      });
  });
  module.exports=router;