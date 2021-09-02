const formRegister=document.getElementById('register');

if(formRegister){
    formRegister.addEventListener('submit', event=>{
        event.preventDefault();
        const data={
            user:document.getElementById('user').value,
            password:document.getElementById('password').value,
            fullName:document.getElementById('fullName').value,
            rol:document.getElementById('rol').value
        }
        fetch('http://localhost:3000/api/register',{
            method:'Post',
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(datas=>{
           if(datas.success){
            Swal.fire({icon:datas.icon,title:datas.title,text:datas.text,showConfirmButton:datas.showConfirmButton,timer:datas.timer})
             .then(event=>window.location.replace('../index.html'))
           } 
           else{
            Swal.fire({icon:datas.icon,title:datas.title,text:datas.text,showConfirmButton:datas.showConfirmButton,timer:datas.timer});
           }
        })
        .catch(err=>console.log(err))
    })
}