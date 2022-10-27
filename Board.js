const {Sequelize, sequelize} = require('./db.js');

const Board = sequelize.define("board", {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER
})

module.exports = {
    Board
};