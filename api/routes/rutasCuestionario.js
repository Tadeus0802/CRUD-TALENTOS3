const express=require('express');
const router=express.Router();
const con=require('../conection/connection');
router.get('/',(req,res)=>res.send('<h1>Ruta de inicio</h1>'));


//crear un cuestionario|

router.post('/api/cuestionarios/',(req,res)=>{
con.query('select * from cuestionarios where descripcion=?',[req.body.descripcion],(err,result)=>{
if(err)throw err;
if(result[0]){
    if(req.body.descripcion==result[0].descripcion){
        con.query('select max(idcuestionarios)+1 as idcuestionarios from cuestionarios',(err,result)=>{
            if(err) throw err;
             let result2=result[0];
            var result3=result2.idcuestionarios;
            if(result3==null){
              result3=1
            }
            //id del cuestionario clon
           let idcuestionariosOrg=result3;
             const data={
                   idcuestionarios:idcuestionariosOrg,
            usuarioCreador:req.body.usuario,
            descripcion:req.body.descripcion+"(Clon)",
            estado:req.body.estado
        };
        const sql="insert into cuestionarios set ?";
        con.query(sql,data,err=>{
            if(err){
                console.log("ya existe este cuestionario");
            }
        });
        //id del cuestionario original
        let idAntiguo=req.body.id;
        con.query("select * from enlaces where idcuestionarios=?",[idAntiguo],(err,result)=>{
            for(let i=0;i<result.length;i++){
                con.query("insert into enlaces set ?",{idcuestionarios:idcuestionariosOrg,idpreguntas:result[i].idpreguntas},(err,result)=>{
                    if(err) throw err;
                });
            }
        });
        res.send(result);
        });
    
    }
    else{
        con.query('select max(idcuestionarios)+1 as idcuestionarios from cuestionarios',(err,result)=>{
            if(err) throw err;
             let result2=result[0];
            var result3=result2.idcuestionarios;
            if(result3==null){
                result3=1
            }
           
             const data={
                   idcuestionarios:result3,
            usuarioCreador:req.body.usuario,
            descripcion:req.body.descripcion,
            estado:req.body.estado
        };
        const sql="insert into cuestionarios set ?";
        con.query(sql,data,err=>{
            if(err){
                console.log("ya existe este cuestionario");
            }
            res.send(data);
        });
        });
    }
}
else{
            con.query('select max(idcuestionarios)+1 as idcuestionarios from cuestionarios',(err,result)=>{
            if(err) throw err;
             let result2=result[0];
            var result3=result2.idcuestionarios;
            if(result3==null){
                result3=1
            }
           
             const data={
                   idcuestionarios:result3,
            usuarioCreador:req.body.usuario,
            descripcion:req.body.descripcion,
            estado:req.body.estado
        };
        const sql="insert into cuestionarios set ?";
        con.query(sql,data,err=>{
            if(err){
                console.log("ya existe este cuestionario");
            }
            res.send(data);
        });
        });
}
})  

});


//mostrar todos los cuestionarios


router.get('/api/cuestionarios/',(req,res)=>{
    con.query('select * from cuestionarios',(err,filas)=>{
    if(err)throw err;
    res.send(filas);

    });
});

//mostrar un cuestionario


router.get('/api/cuestionarios/:id',(req,res)=>{
    con.query(`select * from cuestionarios where idcuestionarios=?`,[req.params.id],(err,fila)=>{
        if(err)throw err;
        res.send(fila);

    });
});


//editar un cuestionario


router.put('/api/cuestionarios/:id',(req,res)=>{
    let usuario=req.body.usuario;
    let descripcion=req.body.descripcion;
    let estado=req.body.estado;
    let id=req.params.id;
    let sql="update cuestionarios set usuarioCreador=?,descripcion=?,estado=? where idcuestionarios=?";
    con.query(sql,[usuario,descripcion,estado,id],(err,result)=>{
        if(err)throw err;
        res.send(result);

    });
});


//eliminar un cuestionario

router.delete('/api/cuestionarios/:id',(req,res)=>{
    let idcuestionarios=req.params.id
    con.query('delete from cuestionarios where idcuestionarios=?',[idcuestionarios],(err,result)=>{
        //el error ocurre al eliminar un cuestionario con preguntas asignadas
        if(err){
            //por ende se deshabilita el cuestionario
            con.query("update cuestionarios set estado=? where idcuestionarios=?",["Deshabilitado",idcuestionarios],(err2,result2)=>{
            result2.messsage="No se elimino el cuestionario,tiene preguntas habilitadas";
            res.send(result2.messsage);
            });
        }
        else{
            let success="Se elimino el cuestionario";
            res.send(success);
        }
    });
});

module.exports=router;
