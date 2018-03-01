const express = require('express');
const app = express();
app.use(express.static('server/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Mongoose setup-- ODM (object document mapper-- helps go from mongoose docs to js code)
//this would usually go in a module like pool
const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/games';

mongoose.connection.on('connected', function () {
    console.log('mongoose connected to: ', databaseUrl);
})

mongoose.connection.on('error', function (error) {
    console.log('mongoose connection error: ', error);
})

mongoose.connect(databaseUrl);

//router
const gameRouter = require('./routers/game-router');
app.use('/games', gameRouter);

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('listening on port: ', app.get('port'));
})
