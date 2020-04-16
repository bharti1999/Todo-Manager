const { Router } = require("express");
const { Notes } = require('../notesDB');

const route = Router();


route.post('/:id/notes' , async (req,res)=>{
    
    console.log("get"+req.params.id);
    const newNote = await Notes.create({
        id : req.params.id,
        notes : req.body.note
    })
     res.status(201).send({ success : 'new task added ' , data : newNote });
})

 route.get('/:id/notes' , async (req,res)=>{

    console.log("post"+req.params.id)
    const notes = await Notes.findAll({
        where : {id : req.params.id}
    })

     return res.send(notes);
 })

module.exports= route;