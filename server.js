const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const app = express();

// Db Instanse 
const db = require('./config/key').mongoURI;

// Connect to mondoDB 
mongoose
    .connect(db)
    .then(() => {
        console.log(users)
    })
    .catch(() => {
        console.log(err)
    })
    app.use('/api/users',users);
    app.use('/api/posts',posts);
    app.use('/api/profile',profile);
    app.get('/', (req, res) => {
        res.send('Hello Wiki we are glad that you become a node developer ');
    });

const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log('Now Node running on port ' + port)
);