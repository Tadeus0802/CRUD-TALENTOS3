//invocamos idcuestionarios y titulo
var idcuestionario2=sessionStorage.getItem("idcuestionario");
var titulo=sessionStorage.getItem("titulo");
var token=sessionStorage.getItem('token');
//guardamos idcuestionarios y titulo
sessionStorage.setItem("idcuestionarios",idcuestionario2);
sessionStorage.setItem("titulo",titulo);
sessionStorage.setItem('token',token);

//invocamos nombre de usuario
var usuario=sessionStorage.getItem("usuario");

//guardamos nombre de usuario
sessionStorage.setItem("usuarioCreador",usuario);