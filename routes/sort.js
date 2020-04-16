const { Router } = require("express");
const { Todos , db} = require('../db');

const route = Router();

route.get('/priority' , async (req,res)=>{
    const todos = await Todos.findAll({
        attributes : ['id' , 'title', 'description' , 'due' , 'status', 'priority'] ,
        order : [
            [ 'priority' , 'DESC'] ,
        ]     
    });
    return res.send(todos);
})

route.get('/duedatedesc' , async (req,res)=>{
    const todos = await Todos.findAll({
        attributes : ['id' , 'title', 'description' , 'due' , 'status', 'priority'] ,
        order : [
            [ 'due' , 'DESC'] ,
        ]     
    });
    return res.send(todos);
})
route.get('/duedateasc' , async (req,res)=>{
    const todos = await Todos.findAll({
        attributes : ['id' , 'title', 'description' , 'due' , 'status', 'priority'] ,
        order : [
            [ 'due' , 'ASC'] ,
        ]     
    });
    return res.send(todos);
})
route.get('/status' , async (req,res)=>{
    const todos = await Todos.findAll({
        attributes : ['id' , 'title', 'description' , 'due' , 'status', 'priority'] ,
        order : [
            [ 'status' , 'DESC'] ,
        ]     
    });
    return res.send(todos);
})

module.exports= route;