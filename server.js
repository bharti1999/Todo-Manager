const express = require('express');
const { db } = require('./db');
const todoRoute = require('./routes/todos');
const sort = require('./routes/sort');
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/',express.static(__dirname + "/public"));

app.use('/todos',todoRoute);
app.use('/sort',sort);

db.sync()
    .then( () => {
        app.listen(3000);
    })
    .catch((err) => {
        console.error(err);
    })
