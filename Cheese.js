const {Sequelize, sequelize} = require('./db.js');

// TODO - define the Musician model
let Cheese = sequelize.define("cheese", {
    title: Sequelize.STRING,
    description: Sequelize.STRING
   
})

module.exports = {
    Cheese
};