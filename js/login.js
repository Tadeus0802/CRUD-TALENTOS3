//login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then(result=>{
          // console.log(result.user);
       // console.log(result.user.displayName);
       var nombre=result.user.displayName;
       sessionStorage.setItem("usuario",nombre);
       window.location.replace('../html/presentacion.html');
    });
});
$('#logout').click(()=>{
    firebase.auth()
    .signOut()
    .then(err=>{
        if(err)console.log(err);
        alert("Session cerrada");
        window.location.replace('../index.html');
    })
    .catch(err=>{
        if(err)console.log(err);
    })
});

