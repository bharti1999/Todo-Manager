const { Router } = require("express");
const { Todos } = require('../db')

const route = Router();

route.get('/' , async (req,res)=>{
    const todos = await Todos.findAll();
    res.send(todos);
})

route.get('/:id' , async (req,res)=>{

    if(isNaN(Number(req.params.id))){
        return res.status(404).send({
                error :  "Invalid todo id"
            })
    }

   const todo = await Todos.findByPk(req.params.id); 

    if(!todo){
        res.status(400).send({
            error : "No todo found for the id = " + req.params.id
        })
        return;
    }
    res.send(todo);
})


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
    const element = await Todos.findOne({
        where : {id : req.params.id}
    })

    if(req.body.status === undefined){
        if(req.body.priority === "low" && req.body.status === undefined){
            req.body.priority = 0;
            element.priority = req.body.priority;
        }else if(req.body.priority === "medium" && req.body.status === undefined){
            req.body.priority = 50;
            element.priority = req.body.priority;
        }else if(req.body.priority === "high" && req.body.status === undefined){
            req.body.priority = 100;
            element.priority = req.body.priority;
        }
        else{
            element.due = req.body.date;
        }
    }
    if(req.body.status === true){
        req.body.status = "complete";
        element.status = req.body.status;
    }else{
        req.body.status = "incomplete";
        element.status = req.body.status;
    }
     await element.save();
    res.status(201).send({  success : 'new task added ' , data : element });
})




module.exports= route;