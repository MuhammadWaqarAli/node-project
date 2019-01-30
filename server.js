const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const passport = require('passport');

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Db Instanse 
const db = require('./config/key').mongoURI;

// Connect to mondoDB 
mongoose
    .connect(db)
    .then(() => {
        console.log('MongoDB is connected')
    })
    .catch((err) => {
        console.log(err)
    })
    app.use('/api/users',users);
    app.use('/api/posts',posts);
    app.use('/api/profile',profile);

    // passport middleware
    app.use(passport.initialize());

    // config passport
    require('./config/passport')(passport);
    

const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log('Now Node running on port ' + port)
);