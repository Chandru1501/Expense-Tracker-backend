let userEmail = document.querySelector('#emailReset')
let newPassword = document.querySelector('#passwordReset')
let resetBtn = document.querySelector('#resetBtn')
let UserNotFound = document.querySelector('#resetUserNotFound')
let url = window.location.href;
let uuid = url.split('/');
console.log(uuid[5]);

async function resetPw(event){
    try{
    UserNotFound.style.display="none";
    event.preventDefault();
    let myObj = {
     UserEmail : userEmail.value,
     newPassword : newPassword.value,
     UUID : uuid[5] 
    }

    let response = await axios.post('http://localhost:8080/password/reset-old-password',myObj);
    console.log(response);
    if(response){
        alert("password changed");
        location.reload();
    }
}
catch(err){
    console.log(err)
    if(err.response.data.message==="USER NOT FOUND"){
        UserNotFound.style.display="block";
   }
}
}