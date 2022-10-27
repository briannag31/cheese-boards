const {Sequelize, sequelize} = require('./db.js');

// TODO - define the Musician model
let Board = sequelize.define("board", {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER
})

module.exports = {
    Board
};