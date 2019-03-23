function addData(){
  // Carrer objective
  var carrier=document.querySelector("#objective").value;
  //Personal information
  var name=document.querySelector("#name").value;
  var father=document.querySelector("#father").value;
  var email=document.querySelector("#email").value;
  var role=document.querySelector("#role").value;
  var mobile=document.querySelector("#mobile").value;
  //Graduation Details
  var college1=document.querySelector("#college1").value;
  var degree1=document.querySelector("#degree1").value;
  var branch1=document.querySelector("#branch1").value;
  var marks1=document.querySelector("#marks1").value;
  //Intermediate marks1
  var college2=document.querySelector("#college2").value;
  var degree2=document.querySelector("#degree2").value;
  var branch2=document.querySelector("#branch2").value;
  var marks2=document.querySelector("#marks2").value;
  //SSC Details
  var college3=document.querySelector("#college3").value;
  var degree3=document.querySelector("#degree3").value;
  var marks3=document.querySelector("#marks3").value;

  // Skills
  var skills=document.querySelector("#skills").value;
var request;
var idb=window.indexedDB || window.mozIndexDB || window.msIndexedDB || window.webkitIndexedDB;
if (!idb in window){
  alert("Browser Not Supported");
}
var open=idb.open("DataStorage",1)//CREATING indexedDB
console.log("indexedDB is Created");

open.onupgradeneeded=function(event){
  var request=event.target.result;
  request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
  console.log("objectstore created");
}
open.onerror=function(error){
  console.log("Object store is not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
  storeDB.put({
    carrier:carrier,
    name:name,
    father:father,
    email:email,
    role:role,
    mobile:mobile,

  education:[
      {
      college:college1,
      degree:degree1,
      branch:branch1,
      marks:marks1
    },
    {
    college:college2,
    degree:degree2,
    branch:branch2,
    marks:marks2
   },
   {
     college:college3,
     degree:degree3,
     branch:"",
     marks:marks3
   }
 ],
skills:{
skill:skills
}
});
window.open('index.html');
}
}