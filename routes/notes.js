const { Router } = require("express");
const { Notes } = require('../notesDB');

const route = Router();


route.post('/:id/notes' , async (req,res)=>{
    
    //console.log("here"+req.body.id)
    const newNote = await Notes.create({
        id : req.body.id,
        notes : req.body.note
    })
     res.status(201).send({ success : 'new task added ' , data : newNote });
})

 route.get('/:id/notes' , async (req,res)=>{

    console.log("here"+req.params.id)
    const notes = await Notes.findAll({
        where : {id : req.params.id}
    })

     res.send(notes);
 })

module.exports= route;