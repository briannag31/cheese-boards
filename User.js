const {Sequelize, sequelize} = require('./db.js');

// TODO - define the Musician model
let User = sequelize.define("user", {
    name: Sequelize.STRING,
    email: Sequelize.STRING
})

module.exports = {
    User
};