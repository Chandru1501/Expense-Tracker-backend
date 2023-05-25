let userEmail = document.querySelector('#emailReset')
let newPassword = document.querySelector('#passwordReset')
let resetBtn = document.querySelector('#resetBtn')
let UserNotFound = document.querySelector('#resetUserNotFound')

let url = window.location.href;
let uuid = url.split('/');
console.log(uuid[5]);

// resetBtn.addEventListener('click',resetPw);

let form  = document.querySelector('form');

form.onsubmit = resetPw

async function resetPw(e){
    try{
    UserNotFound.style.display="none";
    e.preventDefault();
    let myObj = {
     UserEmail : userEmail.value,
     newPassword : newPassword.value,
     UUID : uuid[5] 
    }
console.log(myObj);
    
    let response = await axios.post('https://expense.chandraprakash.tech/password/reset-old-password',myObj);
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