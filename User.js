const {Sequelize, sequelize} = require('./db.js');

let User = sequelize.define("user", {
    name: Sequelize.STRING,
    email: Sequelize.STRING
})

module.exports = {
    User
};