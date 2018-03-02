const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//create schema
//here is where you can say what properties you want to have
//its to define what properties you want to have
const GameSchema =  new mongoose.Schema(
    {
        name: {type: String, required: true},
        rating: {type: Number, default: 1 } ,
        published: Date,
        dateAdded:{type: Date, default: Date()},
        voteCount: {type: Number, default: 0}
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

router.put('/vote/:id', (req, res) => {
    const id = req.params.id;
    const voteUpdate = req.body;
    console.log(voteUpdate, id);
    Game.findByIdAndUpdate (
        {"_id": id },
        {$set: {voteUpdate}},
        (error, updatedGame) => {
            if (error) {
                console.log('error on vote count:' , error);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
                console.log('vote updated');
                
            }
        }
    )
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Game.findByIdAndRemove( 
        {"_id": id},
        (error, updatedGame) => {
            if (error) {
                console.log('error on delete:' , error);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
})

module.exports = router;