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
router.get("/api/mostrarPreguntasHabilitadas/:idcuestionarios:estado",(req,res)=>{
  let sql=`select * from preguntas where estado='${req.params.estado}'`;
    con.query(sql,(err,result)=>{
    if(err)throw err; 
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
   let error="ya existe esta pregunta";
      res.send(error);
    }
    else{
    result2.message="Se creo la pregunta con exito";
    res.send(result2.message);
    }
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
      if (error){
        let err="Ya existe esta pregunta";
        res.send(err);
      }
        else{
          results.message="Se edito la pregunta con exito";
          res.send(results.message);
        }
      
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
              resultado.message="La pregunta esta asignada a algún cuestionario, se deshabilitará";
              res.send(resultado.message);
              
            });
          } 
          else{
            results.message="La pregunta se elimino";
            res.send(results.message);
          }
               
      });
  });
  module.exports=router;