//login
var provider = new firebase.auth.GoogleAuthProvider();
const login=document.getElementById('login');
const logout=document.getElementById('logout');
const formLogin=document.getElementById('send');
const formRegister=document.getElementById('register');


if(login){
    login.onclick=function(){
        firebase.auth()
        .signInWithPopup(provider)
        .then(result=>{
              // console.log(result.user);
           // console.log(result.user.displayName);
           var nombre=result.user.displayName;
           sessionStorage.setItem("usuario",nombre);
           window.location.replace('./html/presentacion.html');
        });
    }
}

if(logout){
    logout.onclick=function(){
        firebase.auth()
        .signOut()
        .then(err=>{
            if(err)console.log(err);
            Swal.fire({
                title: '¿Quiere cerrar sesion?',
                showCancelButton: true,
                confirmButtonText: `Confirmar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.setItem('user',null)
                   window.location.replace('../index.html')
                };  
            })
            
            
        })
        .catch(err=>{
            if(err)console.log(err);
        })
    }
}

if(formLogin){
   formLogin.addEventListener('submit',  event=>{
       event.preventDefault();
       const data={
           user:document.getElementById('user').value,
           password:document.getElementById('password').value
       }
       fetch('http://localhost:3000/api/login',{
           method:'Post',
           mode:'cors',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify(data)
       })
       .then(response=>response.json())
       .then(datas=>{
           console.log(datas.success)
        if(datas.success){
            sessionStorage.setItem('usuario',datas.user);
            sessionStorage.setItem('idUser',datas.idUser);
            Swal.fire({icon:datas.icon,title:datas.title,text:datas.text,showConfirmButton:datas.showConfirmButton,timer:datas.timer})
           .then(event=>window.location.replace("./html/presentacion.html"))
        }
        else{
            Swal.fire({icon:datas.icon,title:datas.title,text:datas.text,showConfirmButton:data.showConfirmButton,timer:datas.timer})
        }
       })
        .catch(err=>console.log(err))
   })
}

