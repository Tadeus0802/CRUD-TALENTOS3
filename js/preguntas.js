

//while(sessionStorage.getItem('usuario')!=null){
    $(document).ready(function () {
        let url = 'http://localhost:3000/api/preguntas/';
        let opcion = null;
        const token=sessionStorage.getItem('token');
        let idpreguntas, descripcion,estado,categoria;
        document.getElementById("mostrarNombre").innerHTML+=sessionStorage.getItem("usuarioCreador");
        //MOSTRAR
        let tablaCuestionario = $('#tablaCuestionario').DataTable({
            "ajax": {
                "url": url,
                "dataSrc": "",
                "headers":{
                    'authorization':token
                }
            },
            "columns": [
    
                { "data": "idpreguntas" },
                { "data": "descripcion" },
                { "data": "estado" },
                {"data":"categoria"},
                { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar'>Editar</button><button class='btn btn-danger btn-sm btnBorrar'>Borrar</button></div></div>" }
            ],
            'language':{
                "url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
     },
           
        });
    
        //CREAR
        $("#btnCrear").click(function () {
            opcion = 'crear';
    
            idpreguntas = null;
    
            $("#formCuestionario").trigger("reset");
            $(".modal-header").css("background-color", "#23272b");
            $(".modal-header").css("color", "white");
            $(".modal-title").text("Crear Pregunta");
            $('#modalCRUD').modal('show');
        });
    
        //EDITAR        
        $(document).on("click", ".btnEditar", function () {
            opcion = 'editar';
            fila = $(this).closest("tr");
    
            idpreguntas = parseInt(fila.find('td:eq(0)').text());
            descripcion = fila.find('td:eq(1)').text();
            estado = fila.find('td:eq(2)').text();
            categoria=fila.find('td:eq(3)').text();
            $("#idpreguntas").val(idpreguntas);
            $("#descripcion").val(descripcion);
            $("#estado").val(estado);
            $("#categoria").val(categoria);
            $(".modal-header").css("background-color", "#7303c0");
            $(".modal-header").css("color", "white");
            $(".modal-title").text("Editar Artículo");
            $('#modalCRUD').modal('show');
        });
    
        //BORRAR
        $(document).on("click", ".btnBorrar", function () {
            fila = $(this);
            idpreguntas = parseInt($(this).closest('tr').find('td:eq(0)').text());
            Swal.fire({
                title: '¿Queres eliminar la pregunta?',
                showCancelButton: true,
                confirmButtonText: `Confirmar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(url+idpreguntas,{
                        method:'delete',
                        mode:'cors',
                        headers:{
                            'Content-Type':'application/json',
                            'authorization':token
                        }
                    })
                    .then(response=>response.json())
                    .then(data=>Swal.fire({icon:data.icon,title:data.title}).then(()=>tablaCuestionario.ajax.reload(null,false)))
                    .catch(err=>console.log(err))
                   
                }
            })
        });
        
        //submit para el CREAR y EDITAR
        $('#formCuestionario').submit(function (e) {
            e.preventDefault();
           let idpreguntas= $.trim($('#idpreguntas').val());
            const data={
            descripcion:document.getElementById("descripcion").value,
            estado : document.getElementById('estado').checked,
            categoria:document.getElementById('categoria').value
    }
            
           
            if (opcion == 'crear') {
                fetch(url,{
                    method:'post',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':token
                    },
                    body:JSON.stringify(data)
                })
                .then(response=>response.json())
                .then(data=>Swal.fire({icon:data.icon,title:data.title}).then(()=> tablaCuestionario.ajax.reload(null, false)))
                .catch(err=> console.log(err))
            }
            
            if (opcion == 'editar') {
                fetch(url+idpreguntas,{
                    method:'put',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':token
                    },
                    body:JSON.stringigy(data)
                })
                .then(response=>response.json())
                .then(data=>Swal.fire({icon:data.icon,title:data.title}).then(()=> tablaCuestionario.ajax.reload(null, false)))
                .catch(err=>console.log(err))
            }
            $('#modalCRUD').modal('hide');
        });
    });
