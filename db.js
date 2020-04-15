const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/todos.db'
})

const Todos = db.define('todo' ,{
    id :{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title :{
        type : Sequelize.STRING(100),
        allowNull : false,
    },
    description:{
        type : Sequelize.STRING(100),
        allowNull : true,
    },
    due :{
        type : Sequelize.DATEONLY,
        allowNull : false,
    },
    status :{
        type : Sequelize.STRING(100),
        allowNull : false,
    },
    priority :{
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    
});

module.exports = {
    db , Todos
}