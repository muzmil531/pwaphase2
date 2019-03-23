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
  var finalData=storeDB.getAll();
  finalData.onsuccess=function(event){
    console.log(event.target.result);
    display(event.target.result);
  }
}
function display(data) {
  var parent =document.querySelector(".card");
  for (var i = 0; i <data.length; i++) {
    var child=document.createElement("div");
    child.classList.add("child");
    var image=document.createElement("img");
    image.src="https://akoretax.com/wp-content/uploads/2017/10/administrator-icon-5154.png";
    image.alt=data[i].name;
    child.append(image);
    parent.append(child);

    
    var name=document.createElement("h3");
    name.textContent=data[i].name;
    child.append(name);
    parent.append(child);

    var role=document.createElement("h4");
    role.textContent=data[i].role;
    child.append(role);
    parent.append(child);

    var link=document.createElement("a");
    link.href="resume.html?id="+data[i].id;
    link.textContent="View Profile";
    child.append(link);

    var brake=document.createElement("br");
    child.append(brake);
    parent.append(child);

  }
}
