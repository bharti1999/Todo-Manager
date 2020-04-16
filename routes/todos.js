const { Router } = require("express");
const { Todos } = require('../db')

const route = Router();

route.get('/' , async (req,res)=>{
    const todos = await Todos.findAll();
    res.send(todos);
})

// route.get('/:id' , async (req,res)=>{

//     if(isNaN(Number(req.params.id))){
//         return res.status(404).send({
//                 error :  "Invalid todo id"
//             })
//     }

//    const todo = await Todos.findByPk(req.params.id); 

//     if(!todo){
//         res.status(400).send({
//             error : "No todo found for the id = " + req.params.id
//         })
//         return;
//     }
//     res.send(todo);
// })

route.post('/' , async (req,res)=>{

    if(typeof req.body.title != "string"){
        return res.status(400).send({ error : "title name not provided "})
    }
    if(req.body.status === "true"){
        req.body.status = "complete";
    }else{
        req.body.status = "incomplete";
    }

    const newTodo = await Todos.create({
        title : req.body.title,
        description : req.body.description,
        due : req.body.due,
        status : req.body.status,
        priority : req.body.priority 
    })

    res.status(201).send({ success : 'new task added ' , data : newTodo });
})

route.patch('/:id', async (req,res)=>{
    console.log("patch"+req.body.id);
    console.log("date"+req.body.date)
    console.log("priority"+req.body.priority);
    console.log("status"+req.body.status);
    const element = await Todos.findOne({
        where : {id : req.body.id}
    })
    //let priority = 1000;

    if(req.body.priority ==="low"){
         req.body.priority = 0;
    }else if(req.body.priority === "medium"){
         req.body.priority = 50;
    }else{
         req.body.priority = 100;
    }

    if(req.body.status === true){
        req.body.status = "complete";
    }else{
        req.body.status = incomplete;
    }

console.log(req.body.status);

    element.due = req.body.date;
    element.priority = req.body.priority;
    element.status = req.body.status;
    await element.save();
    res.status(201).send({ success : 'new task added '})
})




module.exports= route;