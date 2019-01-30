const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const profilevalidationMiddleware = require('../../customeMiddleware/profileMiddleware');
const { check, validationResult, body  } = require('express-validator/check');

// load profile model 
const Profile = require('../../models/Profile');

// load user model 
const User  = require('../../models/User');

// @route   GET api/profile
// @desc    get current user profile route
// @access  Public route
router.get('/', passport.authenticate('jwt', {session: false}) , (req,res) => { 
    const error = {};
    Profile.findOne({
        user: req.user.id
    }).then( profile => {
        if(!profile){
            error.message = 'No such profile found';
            res.status(404).json(error);
        }
        res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/add
// @desc    get current user profile route
// @access  Public route

// the below route for both add and update
router.post('/',profilevalidationMiddleware.validate('profileValidator'), passport.authenticate('jwt', {session: false}) , (req,res) => { 
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    const error = {};
    const fieldsData = {};
    fieldsData.user = req.user.id;
    if(req.body.handle) fieldsData.handle = req.body.handle;
    if(req.body.company) fieldsData.company = req.body.company;
    if(req.body.website) fieldsData.website = req.body.website;
    if(req.body.location) fieldsData.location = req.body.location;
    if(req.body.status) fieldsData.status = req.body.status;
    if(req.body.bio) fieldsData.bio = req.body.bio;
    if(req.body.githubusername) fieldsData.githubusername = req.body.githubusername;

    // we have to set skills in array but we getting in comma seperated format so split out by comma
   
    
    if(typeof req.body.skills !== 'undefined'){
        fieldsData.skills = req.body.skills.split(',');
    }
    // now social filed 
    fieldsData.social = {};

    if(req.body.youtube) fieldsData.social.youtube = req.body.youtube;
    if(req.body.facebook) fieldsData.social.facebook = req.body.facebook;
    if(req.body.linkedin) fieldsData.social.linkedin = req.body.linkedin;
    if(req.body.twitter) fieldsData.social.twitter = req.body.twitter;
    console.log(req.user.id);
    Profile.findOne({
        user: req.user.id
    }).then( profile => {
        if(profile){
            // update
            Profile.findByIdAndUpdate(
                {user: req.user.id}, 
                {$set: fieldsData}, 
                {new: true})
                .then(profile => console.log(profile));
        } else{
            // create
            Profile.findOne({handle: req.body.handle})
            .then(handle => {
                if(handle){
                    error.message = 'that handle is already exist'
                    res.status(400).json(error);
                }     
                new Profile().save().then(profile => res.json(profile)); 
            })
        }
        res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;