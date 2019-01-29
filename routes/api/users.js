const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const keys = require('../../config/key');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validator = require('validator');
const registerMiddleware = require('../../customeMiddleware/registerMiddleware');
const { check, validationResult, body  } = require('express-validator/check');

// @route   GET api/users/register
// @desc    Registration
// @access  Public route
// in below route we will passing validation as a middleware and have to pass param same as field
router.post('/register', registerMiddleware.validate('registerUser'), (req, res) => {
    User.findOne({ email: req.body.email})
    .then(user => {

        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        // checking if already exist
        if(user){
            return res.status(400).json({ email: 'Email Already Exist'})
        }else{
            const avatar = gravatar.url(req.body.email,{
                s: '200', // size of avatar
                r: 'pg', // rating
                d: 'mm' // Default
            })

            const NewUser = new User({
                name:req.body.name,
                email:req.body.email,
                password: req.body.password,
                avatar,
            })

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(NewUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    NewUser.password = hash ;
                    NewUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    });
});

// @route   GET api/users/login
// @desc    User Login
// @access  Public route
router.post('/login', registerMiddleware.validate('loginUser'), (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
        
    User.findOne({email})
        .then(user => {
            const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
            // check for email
           if(!user){
                return res.status(404).json({email: 'User Not Found'});
           } 
           // check for password
           bcrypt.compare(password, user.password)
            .then(isCorrectPass => {
                if(isCorrectPass){
                    // user data 
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    // creating json web token
                    jwt.sign(
                        payload, 
                        keys.secretOrKey,
                        {expiresIn: 3600},
                        (err, token) =>{
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                        );
                }else{
                    return res.status(400).json({password: 'Incorrect Password'});
                }
            }) 
            .catch((err) =>{
                console.log(err);
            }) 
        })
});

// @route   GET api/users/current
// @desc    check current user from payload
// @access  private route

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email 
    });
});
module.exports = router;