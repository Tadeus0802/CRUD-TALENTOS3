
const express= require('express');
const cors=require('cors');
const app= express();
//invocamos a dotenv
require('dotenv').config({path:'./env/.env'});
//invoco a los archivos que contienen las rutas para las peticiones 
const cuestionarios=require('./routes/cuestionario');
const preguntas=require('./routes/preguntas');
const asignarPreguntas=require('./routes/cuestionariosPreguntas');
const login=require('./routes/login');

app.use(cors(),express.json(),express.urlencoded({extended:false}));

//peticiones de cuestionario
app.use('/',cuestionarios);
app.use("/api/cuestionarios/",cuestionarios);
app.use('/api/cuestionarios/:id',cuestionarios);

//peticiones de preguntas
app.use('/',preguntas);
app.use('/api/preguntas',preguntas);
app.use('/api/preguntas/:idpregunta',preguntas);
app.use('/api/preguntas/mostrarPreguntasHabilitadas/:idcuestionarios:estado',preguntas);


//peticiones de asignar preguntas 
app.use('/',asignarPreguntas);
app.use('/api/cuestionarios/preguntas/:idcuestionario',asignarPreguntas);
app.use('/api/cuestionarios/preguntas/',asignarPreguntas);
app.use('/api/cuestionarios/preguntas/:idpregunta',asignarPreguntas);
app.use('/api/cuestionarios/desasignarPreguntas/:idpreguntas:idcuestionarios',asignarPreguntas);
app.use('/api/cuestionarios/asignarPreguntas/:idpreguntas',asignarPreguntas);


//registro y inicio de session de usuarios 
app.use('/',login);
app.use('/api/register/',login);
app.use('/api/login/',login);

app.set("port",process.env.PORT || 3000);
app.listen(app.get("port"),err=>{
    if(err) throw err;
    console.log (`Funciona en el puerto:${process.env.PORT}`);
});
