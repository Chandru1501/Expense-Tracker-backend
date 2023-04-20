var type = document.querySelector('#type');
console.log(type.textContent);

if(type.textContent==="SignUp") {

//................................... SIGN-UP ....................................................

let username = document.querySelector('#username');
let email = document.querySelector('#email');
let btn = document.querySelector('#btn');
let password = document.querySelector('#password');
let userFound = document.querySelector('#userFound');

btn.addEventListener('click',()=>{
userFound.style.display="none";
})

let forms  = document.querySelector('form');

forms.onsubmit = addUser;

function addUser(event){
    event.preventDefault();
let myObj = {
    username : username.value,
    email : email.value,
    password : password.value
}

console.log(myObj);
postUser(myObj);
}

async function postUser(myObj){
  console.log(myObj);
 axios.post("https://18.212.23.246:8080/user/add-user",myObj)
 .then((response)=>{
    console.log(response);
    location.replace('https://18.212.23.246:8080/login.html') })
 .catch((err)=>{
  console.log(err.response.status);
  if(err.response.status==409){
     userFound.style.display="block";
  }
 })
 
}

}

else if (type.textContent==="Login"){

//........................................... LOGIN ................................................................

let userEmail = document.querySelector('#emailLogin');
let userPassword = document.querySelector('#passwordLogin');
let Loginbtn = document.querySelector('#Loginbtn');
let WrongPwd = document.querySelector('#wrongpassword');
let UserNotFound = document.querySelector('#userNotFound');
let forgotPassword = document.querySelector('#forgotPassword');

Loginbtn.addEventListener('click',()=>{
    WrongPwd.style.display="none";
    UserNotFound.style.display="none";
})

let form  = document.querySelector('form');

form.onsubmit = login

function login(event){
  console.log('login function called');
  event.preventDefault();
  let myLogin = {
    email : userEmail.value,
    password : userPassword.value 
  }
console.log(myLogin);
 userLogin(myLogin);
}

async function userLogin(myLogin){
axios.post('https://18.212.23.246:8080/user/login',myLogin)
.then((response)=>{
    console.log(response);
    if(response.data.status=="login Successfull"){
        if(localStorage.getItem("token")==null && localStorage.getItem('username')==null){
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("username",response.data.username)
            location.replace('https://18.212.23.246:8080/expensetracker-frontend/expenses/expense.html')
        }
        else{
           localStorage.removeItem("token");
           localStorage.removeItem('username');
           localStorage.setItem("token",response.data.token)
           localStorage.setItem("username",response.data.username)
          location.replace('https://18.212.23.246:8080/expensetracker-frontend/expenses/expense.html')
        }    
    }
})
.catch((err)=>{
    if(err.response.status==404){
        console.log("404 : true");
        UserNotFound.style.display="block";
    }
    if(err.response.status==401){
        console.log("401 : true");
        WrongPwd.style.display="block";
    }
  })
}

}

else if (type.textContent==="Forgot Password")  {
//................................Reset Password..........................................

let resetBtn = document.querySelector('#resetBtn');
let EmailReset = document.querySelector('#emailReset');
let resetUserNotFound = document.querySelector('#resetUserNotFound');

let form  = document.querySelector('form');

form.onsubmit = resetPw;

function resetPw(event)  {
    event.preventDefault();
    resetUserNotFound.style.display="none";
  let userEmail = EmailReset.value;
  console.log(userEmail);
  let resetemail = {
    Email :  userEmail
  }
  
  postNow(resetemail);

}


async function postNow(resetemail){
  try{
  let response = await axios.post('https://18.212.23.246:8080/password/forgotpassword',resetemail)
  console.log(response);
      alert("Password reseting link has been sent to your mail ID");
  }
  catch(err){
    console.log(err.response.data.status);
    if(err.response.data.status==="userNotFound"){
    resetUserNotFound.style.display = "block"
         }
      }
   }
}