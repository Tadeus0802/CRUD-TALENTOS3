const express= require('express');
const cors=require('cors');
const app= express();
const routerCuestionarios=require('./routes/rutasCuestionario');
const routerPreguntas=require('./routes/rutasPreguntas');
const routerAsignarPreguntas=require('./routes/rutasCuestionariosPreguntas');
app.use(cors(),express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas de cuestionario
app.use('/',routerCuestionarios);
app.use("/api/cuestionarios/",routerCuestionarios);
app.use('/api/cuestionarios/:id',routerCuestionarios);

//rutas de preguntas
app.use('/',routerPreguntas);
app.use('/api/preguntas',routerPreguntas);
app.use('/api/preguntas/:idpregunta',routerPreguntas);
app.use('/api/mostrarPreguntasHabilitadas/:idcuestionarios:estado',routerPreguntas);


//rutas de asignar preguntas 
app.use('/',routerAsignarPreguntas);
app.use('/api/cuestionarios/preguntas/:idcuestionario',routerAsignarPreguntas);
app.use('/api/cuestionarios/preguntas/',routerAsignarPreguntas);
app.use('/api/cuestionarios/preguntas/:idpregunta',routerAsignarPreguntas);
app.use('/api/cuestionarios/desasignarPreguntas/:idpreguntas:idcuestionarios',routerAsignarPreguntas);
app.use('/api/cuestionarios/asignarPreguntas/:idpreguntas',routerAsignarPreguntas);

app.set("port",process.env.PORT || 3000);
app.listen(app.get("port"),err=>{
    if(err) throw err;
    console.log (`Funciona en el puerto: 3000`);
});
