$(document).ready(function() {   
    //url de la api
    let url = 'http://localhost:3000/api/cuestionarios/';
    let opcion = null;
    //campos de la api

    let id, fecha,usuario,descripcion;  
    //mostramos el nombre del usuario
        document.getElementById("mostrarNombre").innerHTML+=sessionStorage.getItem("usuarioCreador");
    //MOSTRAR
    let tablaCuestionarios = $('#tablaCuestionarios').DataTable({            
        "ajax":{
            "url": url,
            "dataSrc":""
        },
        "columns":[
            {"data":"idcuestionarios"},
            {"data":"fechaCreacion"},
            {"data":"usuarioCreador"},
            {"data":"descripcion"},
            {"data":"estado"},

            {"defaultContent": 

            "<div class='text-center'> <div class='btn-group'> <a href='preguntascuestionario.html'><button  class='btn btn-secondary btn-sm btnVer'>Ver</button></a> <button class='btns btn btn-info btn-sm btnEditar'>Editar</button> <button class='btn btn-danger btn-sm btnBorrar'>Borrar</button><button class='btn btn-info btn-sm btnClonar'>Clonar</button> </div></div>"}

        ],
        'language':{
            "url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        
    });
    
    

    //CREAR
    $("#btnCrear").click(function(){
        opcion='crear';            
        id=null;
        $("#formArticulos").trigger("reset");
        $(".modal-header").css( "background-color", "#23272b");
        $(".modal-header").css( "color", "white" );
        $(".modal-title").text("Crear Artículo");
        $('#modalCRUD').modal('show');	 
        $("#estado").prop("checked", true);  
    });  

    //EDITAR        
    $(document).on("click", ".btnEditar", function(){		            
        opcion='editar';
        fila = $(this).closest("tr");	        
        id = parseInt(fila.find('td:eq(0)').text());
        fecha = fila.find('td:eq(1)').text();
        usuario = fila.find('td:eq(2)').text();
        descripcion = fila.find('td:eq(3)').text();   
        estado = fila.find('td:eq(4)').text();        
        $("#id").val(id);
        $("#fecha").val(fecha);
        $("#usuario").val(usuario);
        $("#descripcion").val(descripcion);
        $("#estado").val(estado);           
        $(".modal-header").css("background-color", "#7303c0");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar Artículo");		
        $('#modalCRUD').modal('show');	
        	   
    });

    //VER
    $(document).on("click",".btnVer",function(){
        let fila2=$(this).closest("tr");
      //cuestionario almacena idcuestionario y lo guardamos con un metodo del objeto sessionStorage
        let cuestionario_=parseInt(fila2.find('td:eq(0)').text());
            console.log(cuestionario_);
        //enviamos la variable id2, que almacena el id de un cuestionario a una   llave  con el metodo del objeto sessionStorage
            sessionStorage.setItem("idcuestionario",cuestionario_);
        let titulo_cuestionario=fila2.find('td:eq(3)').text();
        sessionStorage.setItem("titulo",titulo_cuestionario);
    });

    //CLONAR
    $(document).on("click",".btnClonar",function(){
        let fila2=$(this).closest("tr");
        let id = fila2.find('td:eq(0)').text();
        let fecha = fila2.find('td:eq(1)').text();
        let descripcion = fila2.find('td:eq(3)').text();   
        let estado = fila2.find('td:eq(4)').text();        
        usuario = sessionStorage.getItem("usuarioCreador"); 
        $.ajax({
        url:url,
        method:"post",
        contentType:"application/json",
        data:JSON.stringify({id:id,fecha:fecha,usuario:usuario,descripcion:descripcion,estado:estado}),
        success:function(){
            tablaCuestionarios.ajax.reload(null,false);
            Swal.fire("Cuestionario Clonado");
        }
    })
    })


     //BORRAR
    $(document).on("click", ".btnBorrar", function(){
        fila = $(this);           
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());            
        Swal.fire({
            title: '¿Confirma eliminar el cuestionario?',                
            showCancelButton: true,
            confirmButtonText: `Confirmar`,                
            }).then((result) => {               
            if (result.isConfirmed) {
                $.ajax({
                    url: url+id,
                    method: 'delete',                        
                    data:  {id:id},    
                    success: function(data) {
                    if(data=="No se elimino el cuestionario,tiene preguntas habilitadas"){
                        Swal.fire({
                            icon:"error",
                            title:data
                        });
                        tablaCuestionarios.ajax.reload(null,false);
                    }
                    else{
                        Swal.fire({
                            icon:"success",
                            title:data
                        });
                        tablaCuestionarios.ajax.reload(null,false);
                    }
                    }
                });
            } 
            })
    });   

    //submit para el CREAR y EDITAR
    $('#formArticulos').submit(function(e){                                     
        e.preventDefault();
        id = $.trim($('#id').val());    
        fecha = $.trim($('#fecha').val());
        usuario = sessionStorage.getItem("usuarioCreador");    
        descripcion = $.trim($('#descripcion').val()); 
        estado = $.trim($('#estado').val());   
        if(opcion=='crear'){ 
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
                data:  JSON.stringify({fecha:fecha, usuario:usuario, descripcion:descripcion, estado: estado}),                       

                success: function(data) {                       
                    tablaCuestionarios.ajax.reload(null, false);                        
                }
            });	
        }
         
        
        if(opcion=='editar'){
            if ($("#estado").prop('checked')==true){
                estado = "Habilitado"
            }
            else{
                estado = "Deshabilitado"
            }
            $("#estado").prop('checked',true)//para que se reinicie el checkbox
            $.ajax({    

                url: url+id,
                method: 'put',                                        
                contentType: 'application/json',  
                data:  JSON.stringify({id:id, fecha:fecha , usuario:usuario, descripcion:descripcion, estado:estado}),
                success: function() {
                    tablaCuestionarios.ajax.reload(null, false);      
                }
            });	
            
        }   
            		        
        $('#modalCRUD').modal('hide');											     			
    });

});