//invocamos idcuestionarios y titulo
var idcuestionario2=sessionStorage.getItem("idcuestionario");
var titulo=sessionStorage.getItem("titulo");

//guardamos idcuestionarios y titulo
sessionStorage.setItem("idcuestionarios",idcuestionario2);
sessionStorage.setItem("titulo",titulo);


//invocamos nombre de usuario
var usuario=sessionStorage.getItem("usuario");

//guardamos nombre de usuario
sessionStorage.setItem("usuarioCreador",usuario);