let body = document.getElementById("body");
let title = document.getElementById("title");
let description = document.getElementById("description");
let due = document.getElementById("dueDate");
let priority = document.getElementsByClassName("priority");
let set = document.getElementById("set");
let setdate  = document.getElementById("setdate");
let setdateasc  = document.getElementById("setdateasc");
let submit = document.getElementById("submit");
let list = document.getElementById("list");
let secondlist = document.getElementById("secondlist");
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
    //event.preventDefault();
    console.log(due.value);
    await addNewTodoJSON(title.value , description.value , due.value , "incomplete" ,determinedPriority );
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

async function sortByStatusItoC(){

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
        let listtitle = document.createElement("p");
        listtitle.innerHTML=todos.title;
        let listdescription = document.createElement("p");
        listdescription.innerHTML= todos.description;
        //debugger
        let listduedate = document.createElement("input");
        //listduedate.setAttribute("id","listdue"+todos.id);
        listduedate.id = "listdue"+todos.id;
        console.log(listduedate)
        // let i=document.getElementById("listdue"+todos.id);
        
        // i.value="aaa";
        //console.log(`hiiiii5 ${listduedate.value}`);
        //listduedate.setAttribute("type","date");
        //listduedate.setAttribute("value",todos.due);
        //
        //listduedate.innerHTML=todos.due;
        console.log(todos.due);
        console.log(listduedate);
        //listduedate.value="${todos.due}";
        listduedate.value=todos.due;
        //console.log(`hiiiii ${listduedate.value}`);
        listchangedate = document.createElement("button");
        listchangedate.innerHTML="Change Date";
        listchangedate.setAttribute("value",listduedate.value);
        //console.log(`hiiiii2 ${listduedate.value}`);
        listchangedate.setAttribute("id",todos.id);
        listchangedate.setAttribute("onclick","updateDate(this)");
        //console.log(listchangedate);
        //listchangedate.onclick = updateDate(listduedate);
        let listpriority = document.createElement("input");
        listpriority.setAttribute("value",setpriority);
        let listchangepriority = document.createElement("button");
        listchangepriority.innerHTML="Change Priority";

        //console.log(`hiiiii3 ${listduedate.value}`);
        div.innerHTML += listtitle.outerHTML + listdescription.outerHTML + listduedate.outerHTML + listchangedate.outerHTML
        + listpriority.outerHTML + listchangepriority.outerHTML; 
        //console.log(`hiiiii4 ${listduedate.value}`);
        //console.log(div);
        // listitem.innerHTML = "id : " + todos.id + "  title : " +listtitle.innerHTML +  "  description : " +listdescription.innerHTML
        // + " due : " + todos.due + " status : " + todos.status + " priority : " + setpriority;
        listitem.appendChild(div); 
        list.appendChild(listitem);
        
        //await expandList(listitem);    
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
                list.children[i].appendChild(div); 
                addNoteButton.onclick = function(){
                    let inputVal = inputnote.value;
                    let newNote = document.createElement("li");
                    newNote.innerHTML = inputVal;
                    div.appendChild(newNote);
                }
            }   
        };
    }
}



async function updateDate(elem){
    console.log(document.getElementById("listdue1").value);
   console.log(elem.id+" " +elem.value);
//    console.log(elem.value);
    // const resp = await modifyDateInDB(elem.id , elem.value);
    // const todos = await resp.json();
    // console.log("taken" + todos)
}

async function modifyDateInDB(id , date ){
    const resp = await fetch('/todos/id',{
        method : 'PATCH' ,
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({id,date})
    })
    return resp.json();
}