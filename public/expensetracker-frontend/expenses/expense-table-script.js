var totalAmount = document.querySelector('amount');
totalAmount.textContent = Number(0);
var Username = document.querySelector('name');

let list = document.querySelector("#items");

var username = document.querySelector('name');
username.textContent = localStorage.getItem('username');

function displayitems(myObj) {
  
  totalAmount.textContent= Number(totalAmount.textContent) + Number(myObj.amount);
  var mydata ={
    date : myObj.date,
    income : myObj.income,
    amount : myObj.amount,
    description : myObj.description,
    category : myObj.category
  }
  
  var tr = document.createElement('tr');
  
  for(item in mydata){
    var td = document.createElement('td');
    td.textContent = mydata[item];
    tr.appendChild(td);
  }
  
var deleteBtn = document.createElement('button');
var editbtn = document.createElement("button");

deleteBtn.className="btn btn-danger delete";
editbtn.className="btn btn-success edit";

deleteBtn.appendChild(document.createTextNode("Delete"));
editbtn.appendChild(document.createTextNode("Edit"));
tr.appendChild(deleteBtn);
tr.appendChild(editbtn);

list.appendChild(tr);

deleteBtn.onclick=() =>{
  if(confirm('Are You Sure can we delete that item ? ')){
    list.removeChild(tr);
    deleteExpense(myObj.id);
  }
}
deleteBtn.addEventListener("click",()=>{
  setTimeout(()=>{
    location.reload();
  },600);
})

editbtn.onclick =() => {
  
}

}

window.addEventListener("DOMContentLoaded",showOnscreen);


let rowsPerpage = document.querySelector('#rowsperpage');
let rows;
rowsPerpage.addEventListener('change',()=>{
  rows = rowsPerpage.options[rowsPerpage.selectedIndex].textContent;
  localStorage.setItem("RowsPerpage",rows)
})

let pagination = document.querySelector('.pagination');

async function showOnscreen() {
  let titles = ["Date","Income","Expense","Description","Category","Options"]
  let headrow = document.createElement('tr');
  titles.forEach((data)=>{
    let head = document.createElement('th');
    head.textContent=data;
    headrow.appendChild(head);
  })
  list.appendChild(headrow);

  let data = await getAllExpenses();
  let pageData = data.pageData;
  console.log(pageData)
  Showpagination(pageData);
  data.expense.forEach(expense => {
    displayitems(expense);
  })
}


async function getAllExpenses(PageNo){
  try{
    let rows = localStorage.getItem("RowsPerpage");
    if(rows==null || rows==undefined){
      rows=10
    }
    if(PageNo==undefined){
      let token = localStorage.getItem("token");
      console.log(rows);
      console.log(token);
    let response = await axios.get(`https://18.212.23.246:8080/user/get-expenses`,{ headers : { "authorization" : token ,"noofrows" : rows }});
    verify(response.data.headers);
    UserTotalExpensesData = response.data.expense;
    console.log(response.data);
    return response.data;
    }
    else{
      let token = localStorage.getItem("token");
      let rows = localStorage.getItem("RowsPerpage");
      if(rows==null || rows==undefined){
        rows=10
      }
      console.log(token);
      console.log(rows);
    let response = await axios.get(`https://18.212.23.246:8080/user/get-expenses?page=${PageNo}`,{ headers : { "authorization" : token ,"noofrows" : rows }});
    verify(response.data.headers);
    UserTotalExpensesData = response.data.expense;
    return response.data;
    }
  }
  catch(err){
    console.log(err);
  }
}


async function deleteExpense(expenseid){
  try{
  let token = localStorage.getItem("token");
  console.log(token);
  let response = await axios.get(`https://18.212.23.246:8080/user/delete-expense/${expenseid}`,{ headers : { "authorization" : token } });
  console.log(`${id} deleted`);
  }
  catch(err){
    console.log(err);
  }
}

async function verify(isour) {
  console.log(isour.isour);
  if(isour.isour==="true"){
    location.replace('/premium/table-page.html')
  }
}



async function Showpagination(pageData)  {
  console.log(pageData);
  if(pageData.hasPreviousPage){
    Btn2 = document.createElement('button');
    Btn2.textContent = pageData.previousPage;
    Btn2.className="btn btn-warning"
    pagination.appendChild(Btn2)
    Btn2.addEventListener('click',async()=>{
      let data = await getAllExpenses(pageData.previousPage);
      pagination.innerHTML="";
      Showpagination(data.pageData);
      list.innerHTML="";
      totalAmount.textContent=Number(0);
      console.log(data)
      newPage(data)
    })
  }

  Btn1 = document.createElement('button');
  Btn1.textContent = pageData.currentPage;
  Btn1.className="btn btn-success"
  pagination.appendChild(Btn1)

  if(pageData.hasNextPage){
    Btn3 = document.createElement('button');
    Btn3.textContent = pageData.nextPage;
    Btn3.className="btn btn-warning"
    pagination.appendChild(Btn3)
    Btn3.addEventListener('click',async()=>{

     let response = await getAllExpenses(pageData.nextPage);
     pagination.innerHTML="";
     Showpagination(response.pageData);
     totalAmount.textContent=Number(0);
     list.innerHTML="";
     newPage(response)
    })
  }
}

 async function newPage(data){
 let titles = ["Date","Income","Expense","Description","Category","Options"]
 let headrow = document.createElement('tr');
 titles.forEach((data)=>{
   let head = document.createElement('th');
   head.textContent=data;
   headrow.appendChild(head);
 })
 list.appendChild(headrow);
  data.expense.forEach(expense => {
    displayitems(expense);
  })
 }
 
