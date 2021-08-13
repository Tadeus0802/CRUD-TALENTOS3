const express=require('express');
const router=express.Router();
const con=require('../conection/connection');

router.get("/", (req, res) => {
res.send("Ruta Inicio");
});
  
  //Obtener todas las preguntas
  router.get("/api/preguntas", (req, res) => {
    con.query('SELECT * FROM preguntas', (error, filas) => {
      if (error)throw error;
        res.send(filas);
    });
  });
  //Mostrar preguntas habilitadas
router.get("/api/mostrarPreguntasHabilitadas/:estado",(req,res)=>{
  con.query('select * from preguntas where estado=?',[req.params.estado],(err,result)=>{
    if(err)throw err;
 //   con.query('insert into enlace where inner join preguntas where p.estado=? and p.categoria=?')
    res.send(result);
});
})

  //Mostrar una sola pregunta
  router.get('/api/preguntas/:idpregunta', (req,res)=>{
      con.query('SELECT * FROM preguntas WHERE idpreguntas = ?', [req.params.idpregunta],(error,fila)=>{
          if(error)throw error;
           res.send(fila)
      });
  });
  
  //Crear pregunta
  
router.post('/api/preguntas/', (req, res) => {
  
  con.query('select max(idpreguntas)+1 as idpreguntas from preguntas', (err, result) => {
    
    let objeto= result[0];
    var valor = objeto.idpreguntas;
    if (valor == null){
      valor = 1;
    }
    
    const data = {

      idpreguntas: valor,
      descripcion: req.body.descripcion,
     estado: req.body.estado,
     categoria:req.body.categoria
    };
    
    const sql = "insert into preguntas set ?";

  con.query(sql, data,(err,result2) => {
    if (err){
      console.log("ya existe esta pregunta");
      res.send(err);
    }
    res.send(result2);
  });

    
  });
});

  //Actualizar pregunta
 router.put('/api/preguntas/:idpregunta', (req, res) => {
    let idpregunta = req.params.idpregunta;
    let descripcion = req.body.descripcion;
    let estado = req.body.estado;
    let categoria=req.body.categoria;
    let sql = 'UPDATE preguntas SET descripcion= ?, estado= ?, categoria=? WHERE idpreguntas= ?';
    con.query(sql, [descripcion, estado,categoria,idpregunta], (error, results) => {
      if (error)throw error;
        res.send(results);
      
    });
  });
  


  
  //Eliminar pregunta
  router.delete('/api/preguntas/:idpregunta', (req,res)=>{
      let idpreguntas= req.params.idpregunta;
  
      con.query('DELETE FROM preguntas WHERE idpreguntas= ?',[idpreguntas], (error,results)=>{
        //el error ocurre al borrar una pregunta  asignada a un cuestionario o más 
          if(error){
            //por ende se deshabilita la pregunta
            con.query('update preguntas  SET estado=? where idpreguntas=?',["Deshabilitado",idpreguntas],(err,resultado)=>{
              if(err)throw err;
              res.send(resultado);
            });
          } 
          else{
            res.send(results);
          }
               
      });
  });
  module.exports=router;