

$(document).ready(function () {
    let url = 'http://localhost:3000/api/cuestionarios/preguntas/';
    let urlPreguntas = 'http://localhost:3000/api/preguntas/mostrarPreguntasHabilitadas/';
    let urlAsignar = 'http://localhost:3000/api/cuestionarios/asignarPregunta/';
    let opcion = null;
    const token=sessionStorage.getItem('token');
    let idpreguntas, idcuestionarios;
    document.getElementById("mostrarNombre").innerHTML+=sessionStorage.getItem("usuarioCreador");

    //idcuestionario es igual al valor de la llave idcuestionario2 mediante el metodo del objeto sessionStorage, y es convertida a numero mediante la función parseInt
    idcuestionarios =parseInt(sessionStorage.getItem("idcuestionarios"),10);
    let titulo=sessionStorage.getItem("titulo");
    
    //document.getElementById("titulo").innerHTML=`Cuestionario N°: ${idcuestionarios} <br> `;
    document.getElementById("subtitulo").innerHTML=`Título: ${titulo}`;
    let estado="Habilitado";
    //MOSTRAR PREGUNTAS EN EL MODAL DE ASIGNAR PREGUNTAS
    let tablaPreguntas = $('#tablaPreguntas').DataTable({
        "ajax": {
            "url": urlPreguntas +idcuestionarios+estado,
            "dataSrc": "",
            "headers":{
                'authorization':token
            }
        },
        "columns": [
            {"data": "idpreguntas"},
            {"data": "descripcion"},
            {"data": "categoria"},
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnAsignar'>Asignar al cuestionario</button></div></div>" }
        ],
        'language':{
            "url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
    });

    //MOSTRAR PREGUNTAS DE CUESTIONARIO
    let tablaCuestionarios = $('#tablaCuestionario').DataTable({
        "ajax": {
            "url": url + idcuestionarios,
            "dataSrc": "",
             "headers":{
                    'authorization':token
                }
        },
        "columns": [
            {"data": "idpreguntas"},
            {"data": "descripcion"},
            {"data": "categoria"},

            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-danger btn-sm btnBorrar'>Desasignar</button></div></div>" }
       ],
     'language':{
            "url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
    });

    //ASIGNAR PREGUNTAS
    $("#btnAsignar").click(function () {
        opcion = 'asignar';
        idpreguntas = null;

        $("#formCuestionario").trigger("reset");
        $(".modal-header").css("background-color", "#23272b");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Asignar Pregunta");
        $('#modalCRUD2').modal('show');  

        $('.btnAsignar').click(function(){
            fila = $(this).closest("tr");  
            idpreguntas = parseInt(fila.find('td:eq(0)').text()); 
            //fila.find('td:eq(3)').html("<div class='text-center'><div class='btn-group'><button class='btn btn-success btn-sm btnAsignar'>Asignado!</button></div></div>"); 
                
            //asignamos la pregunta a x cuestionario
            if (opcion == 'asignar') {
                fetch(urlAsignar+idpreguntas,{
                    method:'post',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':token
                    },
                    body:JSON.stringify({idcuestionarios:idcuestionarios})
                })
                .then(response=>response.json())
                .then(data=>Swal.fire({icon:data.icon,title:data.title}).then(()=>tablaCuestionarios.ajax.reload(null,false)))
            }
        })
    });

    //BORRAR PREGUNTAS
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);

        let idpreguntas = parseInt($(this).closest('tr').find('td:eq(0)').text(),10);
       
      
       Swal.fire({
            title: '¿Quiere desasignar del cuestionario?',
            showCancelButton: true,
            confirmButtonText: `Confirmar`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/cuestionarios/desasignarPreguntas/'+idpreguntas+idcuestionarios,{
                    method:'delete',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':token
                    }   
                })
                .then(response=>Swal.fire('¡Pregunta Desasignada!', '', 'success').then(()=>tablaCuestionarios.ajax.reload(null,false)))
               
            }
        })
    });

                   
});