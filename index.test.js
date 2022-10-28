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

    test('User can have many Boards', async () => {
        await sequelize.sync({ force: true }); 
        const testUser = await User.create({name: "Brianna", email: "brianna@brianna.com"})
        const testBoard1 = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
        const testBoard2 = await Board.create({type: "hard cheese", description: "aight cheese", rating: 4})
        const testBoard3 = await Board.create({type: "medium cheese", description: "meh cheese", rating: 3})
        await testUser.addBoard(testBoard1);  
        await testUser.addBoard(testBoard2); 
        await testUser.addBoard(testBoard3);         

        const sharkBoard = await testUser.getBoards();

        expect(sharkBoard.length).toBe(3);
        expect(testUser[0] instanceof Board).toBeTruthy;
    });

    test('Many boards can have many cheeses & many cheeses can be on many boards', async () => {
            await sequelize.sync({ force: true });

            const testBoard1 = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
            const testBoard2 = await Board.create({type: "hard cheese", description: "aight cheese", rating: 4})

            const testCheese1 = await Cheese.create({title: "Gouda", description: "delicious"})
            const testCheese2 = await Cheese.create({title: "Parmesan", description: "hard"})

            await testBoard1.addCheese(testCheese1);
            await testBoard1.addCheese(testCheese2);
            await testBoard2.addCheese(testCheese2);
    
            const sharkBoard = await testBoard1.getCheeses()
            const charcBoard = await testBoard2.getCheeses()
            const cheese1Boards = await testCheese1.getBoards()
            const cheese2Boards = await testCheese2.getBoards()
    
            expect(sharkBoard.length).toBe(2);
            expect(charcBoard.length).toBe(1);
            expect(cheese1Boards.length).toBe(1); 
            expect(cheese2Boards.length).toBe(2);
        });

        test('Boards can be eager loaded with Cheese', async () => {
            await sequelize.sync({ force: true })

            const testBoard = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})

            const testCheese1 = await Cheese.create({title: "Gouda", description: "delicious"})
            const testCheese2 = await Cheese.create({title: "Parmesan", description: "hard"})
       
            await testBoard.addCheese(testCheese1);
            await testBoard.addCheese(testCheese2);
    
            const boardsWithCheeses = await Board.findAll({
                include: [
                    {
                        model: Cheese,
                        as: 'cheeses'
                    }
                ]  
            });

            expect(boardsWithCheeses[0].cheeses.length).toBe(2); 
        });

        test('Cheeses can be eager loaded with Boards', async () => {
            await sequelize.sync({ force: true })

            const testCheese1 = await Cheese.create({title: "Gouda", description: "delicious"})
            const testCheese2 = await Cheese.create({title: "Parmesan", description: "hard"})

            const testBoard1 = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
            const testBoard2 = await Board.create({type: "hard cheese", description: "aight cheese", rating: 4})
            const testBoard3 = await Board.create({type: "funky cheese", description: "amazing", rating: 5})

            await testBoard1.addCheese(testCheese1);
            await testBoard1.addCheese(testCheese2);
            await testBoard2.addCheese(testCheese2);
            await testBoard3.addCheese(testCheese2);

            const cheeseOnBoards = await Cheese.findAll({
                include: [
                    {
                        model: Board,
                        as: 'boards'
                    }
                ]  
            });

            expect(cheeseOnBoards[1].boards.length).toBe(3); 
        });

        test('Users can be eager loaded with Boards', async () => {
            await sequelize.sync({ force: true })
            
            const testUser = await User.create({name: "Brianna", email: "brianna@brianna.com"})

            const testBoard1 = await Board.create({type: "soft cheese", description: "good cheese", rating: 5})
            const testBoard2 = await Board.create({type: "hard cheese", description: "aight cheese", rating: 4})
            const testBoard3 = await Board.create({type: "funky cheese", description: "amazing", rating: 5})

            await testUser.addBoard(testBoard1);
            await testUser.addBoard(testBoard2);
            await testUser.addBoard(testBoard3);
     
            const usersWithBoards = await User.findAll({
                include: [
                    {
                        model: Board,
                        as: 'boards'
                    }
                ]  
            });
            
            expect(usersWithBoards[0].boards.length).toBe(3); 
        });
})