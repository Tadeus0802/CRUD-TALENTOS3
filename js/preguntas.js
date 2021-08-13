$(document).ready(function () {
    let url = 'http://localhost:3000/api/preguntas/';
    let opcion = null;

    let idpreguntas, descripcion,estado,categoria;
    document.getElementById("mostrarNombre").innerHTML+=sessionStorage.getItem("usuarioCreador");
    //MOSTRAR
    let tablaCuestionario = $('#tablaCuestionario').DataTable({
        "ajax": {
            "url": url,
            "dataSrc": ""
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
                $.ajax({

                    url: url + idpreguntas,
                    method: 'delete',
                    data: { idpreguntas: idpreguntas },

                    success: function () {
                        tablaCuestionario.ajax.reload(null, false);
                        Swal.fire('¡Pregunta Eliminado!', '', 'success')
                    }
                });
               
            }
        })
    });
    
    //submit para el CREAR y EDITAR
    $('#formCuestionario').submit(function (e) {
        e.preventDefault();

        idpreguntas = $.trim($('#idpreguntas').val());
        descripcion = $.trim($('#descripcion').val());
        estado = $.trim($('#estado').val());
        categoria=$.trim($('#categoria').val());
        if (opcion == 'crear') {
            if ($("#estado").prop('checked')==true){
                estado = "Habilitado"
            }
            else{
                estado = "Deshabilitado"
            }
            $("#estado").prop('checked',true)//para que se reinicie el checkbox
            $.ajax({
                url: url,
                method: 'post',
                contentType: 'application/json',

                data: JSON.stringify({descripcion: descripcion, estado: estado,categoria:categoria}),

                success: function (data) {
                    tablaCuestionario.ajax.reload(null, false);
                }
            });
        }
        
        if (opcion == 'editar') {
            if ($("#estado").prop('checked')==true){
                estado = "Habilitado"
            }
            else{
                estado = "Deshabilitado"
            }
            $("#estado").prop('checked',true)//para que se reinicie el checkbox
            $.ajax({
                url: url + idpreguntas,
                method: 'put',
                contentType: 'application/json',
                data: JSON.stringify({ idpreguntas: idpreguntas, descripcion: descripcion, estado: estado,categoria:categoria}),
                success:()=>{
                    tablaCuestionario.ajax.reload(null, false);
                }
            });
        }
        $('#modalCRUD').modal('hide');
    });
});