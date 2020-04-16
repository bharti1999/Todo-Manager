"use strict";
let body = document.getElementById("body");
let title = document.getElementById("title");
let description = document.getElementById("description");
let due = document.getElementById("dueDate");
let priority = document.getElementsByClassName("priority");
let set = document.getElementById("set");
let setdate  = document.getElementById("setdate");
let setdateasc  = document.getElementById("setdateasc");
let setstatus = document.getElementById("setstatus");
let submit = document.getElementById("submit");
let list = document.getElementById("list");
let determinedPriority="";
let setpriority ="";
var listchangedate="";

body.onload= async function(){
    const resp = await fetch('/todos' , {method : 'GET'})
    const todos = await resp.json();

    for(let i=0;i<todos.length;i++){
        await appendToList(todos[i]);
    } 
    await expandList(list);  
};

submit.onclick= async function(){
    for(let i=0;i<priority.length;i++){
        if(priority[i].checked===true){
            determinedPriority =  priority[i].value
        }
    }
    await addNewTodoJSON(title.value , description.value , due.value , 0 ,determinedPriority );
    let newTodo = await getNewTodo();
    await appendToList(newTodo);
}

async function addNewTodoJSON(title , description , due , status ,priority){
    const resp = await fetch('/todos',{
        method : 'POST' ,
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({title , description , due , status , priority})
    })
    return resp.json();
}

async function getNewTodo(){
    const resp = await fetch('/todos' ,{ method : 'GET'})
    const todos = await resp.json();
    const newTodo = todos[todos.length-1]
    return newTodo;
}

set.onclick = async function sortByPriorityHtoL(){
    const resp = await fetch('/sort/priority' ,{ method : 'GET'})
    const todos = await resp.json();
    await removelistItems(list.childElementCount);
    for(let i=0;i<todos.length;i++){
        await appendToList(todos[i]);
    }
}

setdate.onclick =async function sortByDueDateDESC(){
    const resp = await fetch('/sort/duedatedesc' ,{ method : 'GET'})
    const todos = await resp.json();
    await removelistItems(list.childElementCount);
    for(let i=0;i<todos.length;i++){
        await appendToList(todos[i]);
    }
}

setdateasc.onclick = async function sortByDueDateASC(){
    const resp = await fetch('/sort/duedateasc' ,{ method : 'GET'})
    const todos = await resp.json();
    await removelistItems(list.childElementCount);
    for(let i=0;i<todos.length;i++){
        await appendToList(todos[i]);
    }
}

setstatus.onclick = async function sortByStatusItoC(){
    const resp = await fetch('/sort/status',{method : 'GET'})
    const todos = await resp.json();
    await removelistItems(list.childElementCount);
    for(let i=0;i<todos.length;i++){
        await appendToList(todos[i]);
    }
}

async function removelistItems(length){
    for(let i =0 ; i<length ; i++ ){
             let j  = list.children;
             j[0].parentNode.removeChild(j[0]);
         }
}


async function appendToList(todos){
        if(todos.priority=="100"){
            setpriority = "high";
        };
        if(todos.priority=="50"){
            setpriority = "medium";
        };
        if(todos.priority=="0"){
            setpriority = "low";
        };

        let listitem = document.createElement('li');
        listitem.setAttribute("id",todos.id);

        let  div = document.createElement("div");

        let liststatus = document.createElement("input");
        liststatus.setAttribute("id",+todos.id);
        liststatus.type="checkbox";

        if(todos.status==="incomplete"){
            liststatus.checked = true;
        }else{
            liststatus.checked = false;
        }
        liststatus.setAttribute("onclick","updateDatePriorityStatus(this)");

        let listtitle = document.createElement("p");
        listtitle.innerHTML=todos.title;

        let listdescription = document.createElement("p");
        listdescription.innerHTML= todos.description;
       
        let getDueDate = document.createElement("label");
        getDueDate.innerHTML= todos.due;
        getDueDate.id = "dateLabel";

        let listduedate = document.createElement("input");
        listduedate.id = "listdue"+todos.id;
        listduedate.setAttribute("type","date");
        listduedate.value=todos.due;

        listchangedate = document.createElement("button");
        listchangedate.innerHTML="Change Date";
        listchangedate.setAttribute("id",todos.id);
        listchangedate.setAttribute("onclick","updateDatePriorityStatus(this)");

        let linebreak = document.createElement("br");

        let listPriority = document.createElement("lable");
        listPriority.innerHTML= setpriority;
        listPriority.id = "priorityLabel";

        let listpriority = document.createElement("input");
        listpriority.id = "priority"+todos.id; 

        let listchangepriority = document.createElement("button");
        listchangepriority.innerHTML="Change Priority";
        listchangepriority.setAttribute("id",todos.id);
        listchangepriority.setAttribute("onclick","updateDatePriorityStatus(this)");

        div.innerHTML += liststatus.outerHTML+ listtitle.outerHTML + listdescription.outerHTML +
        getDueDate.outerHTML +listduedate.outerHTML + listchangedate.outerHTML +linebreak.outerHTML +
        linebreak.outerHTML + listPriority.outerHTML+ listpriority.outerHTML + listchangepriority.outerHTML; 
     
        listitem.appendChild(div); 
        list.appendChild(listitem);   
}

async function expandList(list){

    for(let i=0;i<list.children.length;i++){
       list.children[i].onclick= function(){
            let div = document.createElement("div");
            div.setAttribute("id","div");
            let inputnote = document.createElement("input");
            inputnote.setAttribute("placeholder","enter note");
            inputnote.setAttribute("id","inputnote")
            let addNoteButton = document.createElement("button");
            addNoteButton.setAttribute("id","addnote")
            addNoteButton.innerHTML="ADD";
            div.appendChild(inputnote);
            div.appendChild(addNoteButton);
            div.appendChild(addNoteButton);
    
            if(list.children[i].childNodes.length==1){
                getNotes(list.children[i].id);
                list.children[i].appendChild(div);    
                addNoteButton.onclick =  function(){
                    if(inputnote.value !=""){
                        let inputVal = inputnote.value;
                        let newNote = document.createElement("li");
                        newNote.innerHTML = inputVal;
                        div.appendChild(newNote);
                        addNote(list.children[i].id ,inputnote.value);
                }
                }
            }   
        };
    }
}

async function updateDatePriorityStatus(elem){
    let date = document.getElementById("listdue"+elem.id).value
    let priority = document.getElementById("priority"+elem.id).value
    let status = elem.checked;

    const resp =  await modifyDatePriorityStatusInDB(elem.id , date , priority,status);

    const  response = await fetch( `todos/${elem.id}` , {method : 'GET'})
    const todos = await response.json();
    document.getElementById("dateLabel").innerHTML = todos.due;

    if(todos.priority=="100"){
        setpriority = "high";
    };
    if(todos.priority=="50"){
        setpriority = "medium";
    };
    if(todos.priority=="0"){
        setpriority = "low";
    };
    document.getElementById("priorityLabel").innerHTML = setpriority;

}

async function modifyDatePriorityStatusInDB(id , date , priority ,status){
    const resp = await fetch(`/todos/${id}`,{
        method : 'PATCH' ,
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({id , date , priority , status})
    })
}
async function getNotes(id){
  
    const resp = await fetch(`/todos/${id}/notes` ,{ method : 'GET'})
    const notes = await resp.json();
    for(let i=0;i<notes.length;i++){
         let item = document.createElement("li");
         item.innerHTML = notes[i].notes;
         document.getElementById(id).appendChild(item);
    }
 
}

async function addNote(id , note){
    const resp = await fetch(`/todos/${id}/notes`,{
        method : 'POST' ,
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({id, note})
    })
    return resp.json();
}