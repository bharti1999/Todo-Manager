const express = require('express');
const { db } = require('./db');
const { notesdb } = require('./notesDB');
const todoRoute = require('./routes/todos');
const sort = require('./routes/sort');
const notes =require('./routes/notes')
const app = express();
const port=process.env.PORT||3000

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/',express.static(__dirname + "/public"));

app.use('/todos',todoRoute);
app.use('/sort',sort);
app.use('/todos',notes);

db.sync()
    .then( () => {
        app.listen(port);
    })
    .catch((err) => {
        console.error(err);
    })

notesdb.sync()
    .then( () => {
        app.listen(3001);
    })
    .catch((err) => {
        console.error(err);
    })
