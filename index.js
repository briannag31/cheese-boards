const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require("./User")

Board.belongsTo(User)
User.hasMany(Board)

Board.belongsToMany(Cheese, {through: "cheese_board"})
Cheese.belongsToMany(Board, {through: "cheese_board"})

module.exports = {
    Board,
    Cheese,
    User
};
