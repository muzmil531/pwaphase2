var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}

//communication with index data base
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webitIndexedDB;
if(!idb in navigator){
  alert("Browser is not supporting");
}
var open=idb.open("DataStorage",1);
console.log("IndexedDB is created");

open.onupgradeneeded=function(event){
  var request=event.target.result;
  var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("Object store is not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
  var info=storeDB.get(paramValue);
  info.onsuccess=function(data){
    console.log(data.target.result);
    display(data.target.result);
  }
}

var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data){
  var img=document.createElement("img");
  img.src="https://akoretax.com/wp-content/uploads/2017/10/administrator-icon-5154.png";
  left.append(img);

    var h2=document.createElement("h1");
    h2.textContent=data.name;
    left.append(h2);

    var h3=document.createElement("h3");
    h3.textContent="S/O "+data.father;
    left.append(h3);

  var role=document.createElement("h4");
  role.textContent=data.role;
  left.append(role);

  var email=document.createElement("h4");
  email.textContent=data.email;
  left.append(email);

  var mobile=document.createElement("h4");
  mobile.textContent=data.mobile;
  left.append(mobile);

  var carrier=document.createElement("h1");
  carrier.textContent="Carrier Objective :";
  right.append(carrier);

  var objectives=document.createElement("p");
  objectives.textContent=data.carrier;
  right.append(objectives);

  var carrier=document.createElement("h1");
  carrier.textContent="Education Details :";
  right.append(carrier);

  var table=document.createElement("table");

  let row='';
 row +=  "<th>"+"Degree"+"</th>"+
 "<th>"+"Institute"+"</th>"+
 "<th>"+"Course"+"</th>"+
 "<th>"+"Percentage"+"</th>"+
 "</tr>";

 for(i in data.education){
   row += "<tr>"+"<td>"+data.education[i].degree+"</td>"+
   "<td>"+data.education[i].college+"</td>"+
   "<td>"+data.education[i].branch+"</td>"+
   "<td>"+data.education[i].marks +"</td>"+"</tr>";
 }

  table.innerHTML=row;
  right.append(table);

  var technical=document.createElement("h1");
  technical.textContent="Skills :";
  right.append(technical);

  var skill=document.createElement("p");
  skill.textContent=data.skills.skill;
  right.append(skill);



}
