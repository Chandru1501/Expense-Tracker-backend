var amount = document.querySelector("#amount");
var income = document.querySelector('#income');
var description = document.querySelector("#descriptioninput");
var category = document.querySelector("#categoryinput");
var date = document.querySelector('#dateInput');

let list = document.querySelector("#items");

var descriptionChoose = document.querySelector("#description");
var categoryChoose = document.querySelector("#category");

const addexpense = document.getElementById("submiting");

descriptionChoose.addEventListener("change",() =>{
var descriptionval = descriptionChoose.options[descriptionChoose.selectedIndex].textContent;
description.value=descriptionval;
})

categoryChoose.addEventListener("change",() =>{
  var categoryval = categoryChoose.options[categoryChoose.selectedIndex].textContent;
  category.value= categoryval;
})

var username = document.querySelector('name');
username.textContent = localStorage.getItem('username');

let form  = document.querySelector('form');

form.onsubmit = additem;

async function additem(event){
  event.preventDefault();
  let dateformat = date.value.split("-").reverse().join("/");
  let Income=income.value;
  if(Income==""){
    Income=0;
  }
myObj = {
    amount: amount.value,
    income: Income,
    date : dateformat,
    description: description.value,
    category: category.value,
}
console.log(myObj);
 let res = await postexpense(myObj);
 if(res){
     location.replace('./expense-table.html');
  }
  else{
    alert("somthing went wrong")
  }
}

var isOur;
async function postexpense(myObj){
  try{
    let token = localStorage.getItem('token');
    console.log(token);
  let response = await axios.post('https://18.212.23.246:8080/user/add-expense',myObj,{ headers : {"authorization" : token } })
  console.log("posted");
  return response;
  }
  catch(err){
    console.log(err);
  }
}

/// payment

document.querySelector('#rzp-button1').onclick = async function(){
  let token = localStorage.getItem('token');
  let response = await axios.get('https://18.212.23.246:8080/purchase/premiummembership',{ headers : { "authorization" : token } });
  console.log(response);

  var options = {
    "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
    "order_id": response.data.order.id , //This is a Order ID

    "handler": async function (response) {
  
      alert("you are our premium user");
      //  location.reload();
      await axios.post('https://18.212.23.246:8080/purchase/updatetransactionstatus',{
        payment_Id : response.razorpay_payment_id,
        order_Id : options.order_id
      },
      {headers : {"authorization" : token }}
    )
    location.reload();
    },
  }


  var rzp1 = new Razorpay(options);

  document.getElementById('rzp-button1').onclick = function(e){
    rzp1.open();
    e.preventDefault();
}

rzp1.on('payment.failed', async function (response){
  console.log(response.error.metadata);
        alert("somthing went wrong");
       await axios.post('https://18.212.23.246:8080/purchase/updatefailurestatus',{
        order_Id : response.error.metadata.order_id,
        payment_Id : response.error.metadata.payment_id
      },
      { headers : { "authorization" : token } })
});

}



//before premium

let premiumBtn = document.querySelector('#rzp-button1');
let premiumtext = document.querySelector('#premium-text');
let beforePremiumOptions = document.querySelector('.beforePremium');


// after premium

let tospacing = document.querySelector('#tospacing');
let premiumUser = document.querySelector('#premiumUser');
let afterPremiumOptions = document.querySelector('.afterPremium');





document.addEventListener('DOMContentLoaded',( async function (){

  let token = localStorage.getItem('token');
  let response = await axios.get('https://18.212.23.246:8080/user/getdetails',{ headers : { "authorization" : token } });
  console.log(response.data.isour);
  isOur = response.data.isour;
  if(response.data.isour=='true'){
    tospacing.style.display="block";
    afterPremiumOptions.style.display="block";
    premiumUser.style.display="block";
  }
  else{
    premiumBtn.style.display="block";
    premiumtext.style.display="block";
    beforePremiumOptions.style.display="block";
  }
}))