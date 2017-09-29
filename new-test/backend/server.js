const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4200;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mernToys', { useMongoClient: true })
.then(() => {
    console.log("Mongoose Running");
})
.catch(err => {
    console.log('Mongoose Tango Down: ', err.stack);
    process.exit(1);
})

const toyRouter = require('./src/routes/toyRouter');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/toys', toyRouter);

app.listen(port, () => {
    console.log('Server running on port: ', port);
})