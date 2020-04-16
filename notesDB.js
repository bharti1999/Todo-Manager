const Sequelize = require('sequelize');

const notesdb = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/notes.db'
})

const Notes = notesdb.define('note' ,{
    sno :{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id :{
        type : Sequelize.INTEGER,
        alloNull : false
    },
    notes :{
        type : Sequelize.STRING(100),
        allowNull : false,
    } 
});

module.exports = {
    notesdb , Notes
}