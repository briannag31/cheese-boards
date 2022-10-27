const {sequelize} = require('./db.js');
const {Board, User, Cheese} = require('./index')

describe('Board, User, and Cheese Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test('can create a Board', async () => {
       const testBoard = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
        expect(testBoard.description).toBe("good cheese");
       
    })

    test('can create a User', async () => {
        const testUser = await User.create({name: "Brianna", email: "brianna@brianna.com"})
        expect(testUser.email).toBe("brianna@brianna.com");
    })
  
     test('can create a Cheese', async () => {
        const testCheese = await Cheese.create({title: "Gouda", description: "delicious"})
        expect(testCheese.description).toBe("delicious");
     })

})