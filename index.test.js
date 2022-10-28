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

     test('can find Board', async () => {
        const testBoard = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
        const foundBoard = await Board.findAll();
        expect(foundBoard.length).toBe(2);
        expect(testBoard.type).toBe("soft cheese");
    });
    test('can find Cheese', async () => {
        const foundCheese = await Cheese.findAll();
        const testCheese = await Cheese.create({title: "Gouda", description: "delicious"})
        expect(foundCheese.length).toBe(1);
        expect(testCheese.title).toBe("Gouda");
    });
    test('can find User', async () => {
        const foundUsers = await User.findAll();
        const testUser = await User.create({name: "Brianna", email: "brianna@brianna.com"})
        expect(foundUsers.length).toBe(1);
        expect(testUser.name).toBe("Brianna");
    });
    test('can delete Board', async () => {
        const testBoard = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
        const foundBoard = await Board.findAll();
        const deletedBoard = await foundBoard[0].destroy();
        expect(deletedBoard.type).toBe("soft cheese");
    });
    test('can delete Cheese', async () => {
        const testCheese = await Cheese.create({title: "Gouda", description: "delicious"})
        const foundCheese = await Cheese.findAll();
        const deletedCheese = await foundCheese[0].destroy();
        expect(deletedCheese.title).toBe("Gouda");
    });
    test('can delete User', async () => {
        const testUser = await User.create({name: "Brianna", email: "brianna@brianna.com"})
        const foundUsers = await User.findAll();
        const deletedUser = await foundUsers[0].destroy();
        expect(deletedUser.name).toBe("Brianna");
    });
    test('can update Board', async () => {
        const testBoard = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
        const foundBoard = await Board.findAll();
        const updatedBoard = await foundBoard[0].update({rating: 3});
        expect(updatedBoard.rating).toBe(3);
    });
    test('can update Cheese', async () => {
        const testCheese = await Cheese.create({title: "Gouda", description: "delicious"})
        const foundCheese = await Cheese.findAll();
        const updatedCheese = await foundCheese[0].update({description: "the best"});
        expect(updatedCheese.description).toBe("the best");
    });
    test('can update User', async () => {
        const testUser = await User.create({name: "Brianna", email: "brianna@brianna.com"})
        const foundUsers = await User.findAll();
        const updatedUser = await foundUsers[0].update({email: "brianna@gmail.com"});
        expect(updatedUser.email).toBe("brianna@gmail.com");
    });
})