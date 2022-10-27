const {Sequelize, sequelize} = require('./db.js');

const Cheese = sequelize.define("cheese", {
    title: Sequelize.STRING,
    description: Sequelize.STRING
})

module.exports = {
    Cheese
};