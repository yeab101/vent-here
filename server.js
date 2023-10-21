const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const vents = require('./routes/ventsRoute')
const app = express();
const url = 'mongodb+srv://yeabsera:yeabsera@yabacl.1g1qs4c.mongodb.net/vent-here?retryWrites=true&w=majority'

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/vents', vents)
app.use(express.static('public'));
app.listen(3000, console.log('listening on port 3000...'))
