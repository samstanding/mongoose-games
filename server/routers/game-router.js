const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//create schema
//here is where you can say what properties you want to have
//its to define what properties you want to have
const GameSchema =  new mongoose.Schema(
    {
        name: String,
        rating: {type: Number, default: 1 } ,
        published: Date
    }
);

//need to turn this schema into a model
//('name of model, where the schema is, 'collection you're putting things in-- in db')
//
const Game = mongoose.model('Game', GameSchema, 'games');

//create a new document, an instance of our model-- 

// let myGame = new Game ( 
//     {
//         name: 'Final Fantasy VII',
//         rating: 10,
//         published: new Date ('1997- 01-31')
//     }
// );

// //save the game to the database--save function comes from mongoose
// myGame.save();

router.get('/', (req, res) => {
    //use Game from model to send commmands to mongod
    //order does matter-- mongo sends the error first 
    Game.find({}, (error, foundGames) => {
        if (error) {
            console.log('error:' , error);
            res.sendStatus(500);
        } else {
            console.log(foundGames);
            res.send(foundGames);
        }
    });
});

router.post('/', (req, res) => {
    let newGame = new Game( req.body);//if you don't tie to to your model the save wont exist
    console.log('Game to save is: ', newGame);
    newGame.save((error, savedGame) => {
        if (error) {
            console.log('error on add game:' , error);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const gameUpdate = req.body;
    Game.findByIdAndUpdate(
       { "_id": id },
        {$set: gameUpdate},
        (error, updatedGame) => {
            if (error) {
                console.log('error on add game:' , error);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
})

module.exports = router;