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
// @access  Private route
router.get('/detail', passport.authenticate('jwt', {session: false}) , (req,res) => { 
    const error = {};
    Profile.findOne({
        user: req.user.id
    })
    .populate('user',['name','email','avatar'])
    .then( profile => {
        if(!profile){
            error.message = 'No such profile found';
            res.status(404).json(error);
        }
        res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    get profile by handle
// @access  Public route
router.get('/handle/:handle',(req, res) => {
    const error = {};
    Profile.findOne({handle:req.params.handle})
    .populate('user',['name','email','avatar'])
    .then(profile => {
        if(!profile){
            error.error = true;
            error.message = 'No Such Profile Found';
            res.status(404).json(error)
        }
        res.status(200).json(profile);
    }).catch(err => {
        error.error = true;
        error.message = err;
        res.status(404).json(error)
    })
})

// @route   GET api/profile/user/:user_id
// @desc    get profile by user id 
// @access  Public route
router.get('/user/:user_id',(req, res) => {
    const error = {};
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','email','avatar'])
    .then(profile => {
        if(!profile){
            error.error = true;
            error.message = 'No Such Profile Found';
            return res.status(404).json(error)
        }
        res.status(200).json(profile);
    }).catch(err => {
        error.error = true;
        error.message = 'No Such Profile found';
        res.status(404).json(error)
    })
})

// @route   GET api/profile
// @desc    get all profile list
// @access  Public route
router.get('/',(req, res) => {
    const error = {};
    Profile.find()
    .populate('user',['name','email','avatar'])
    .then(profilea => {
        if(!profiles){
            error.error = true;
            error.message = 'No Such Profile Found';
            return res.status(404).json(error)
        }
        res.status(200).json(profiles);
    }).catch(err => {
        error.error = true;
        error.message = 'No Such Profile Found';
        res.status(404).json(error)
    })
})

// @route   POST api/profile
// @desc    add or update profiel
// @access  private route

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
    
    Profile.findOne({
        user: req.user.id
    }).then( profile => {
        if(profile){
           
            Profile.findOneAndUpdate(
                req.user.id, 
                {$set: fieldsData}, 
                {new: true}
            )
            .then(profile => {res.json(profile)})
            .catch(err => {
                console.log(err);
                res.status(404).json(err)
            });
        } else{
            // create
            Profile.findOne({handle: req.body.handle})
            .then(handle => {
                if(handle){
                    error.message = 'that handle is already exist'
                    res.status(400).json(error);
                }     
                new Profile(fieldsData).save()
                .then(profile => res.json(profile))
                .catch(err => {console.log(err)}); 
            })
        }
    })
    .catch((err) =>{
        res.status(404).json('OOOO');
    });
});

// @route   POST api/profile/education
// @desc    add education to profile
// @access  Private route
router.post('/education',profilevalidationMiddleware.validate('education'),passport.authenticate('jwt',{session:false}),(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    error = {};
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile){
            error.error = true;
            error.message = 'No Such Profile Found';
            return res.status(404).json(error)
        }
        const newEducation = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }
        profile.education.unshift(newEducation);
        profile.save();
        res.status(200).json(profile);
    }).catch(err => {
        error.error = true;
        error.message = 'No Such Profile Found';
        res.status(404).json(error)
    })
})

// @route   POST api/profile/experience
// @desc    add experience to profile
// @access  Private route
router.post('/experience',profilevalidationMiddleware.validate('experience'),passport.authenticate('jwt',{session:false}),(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    error = {};
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile){
            error.error = true;
            error.message = 'No Such Profile Found';
            return res.status(404).json(error)
        }
        const newExperience = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }
        profile.experience.unshift(newExperience);
        profile.save();
        res.status(200).json(profile);
    }).catch(err => {
        error.error = true;
        error.message = 'No Such Profile Found';
        res.status(404).json(error)
    })
})

// @route   Delete api/profile/experience/:exp_id
// @desc    add experience to profile
// @access  Private route
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req, res) => {
    
    const error = {};
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile){
            error.error = true;
            error.message = 'No Such Profile Found';
            return res.status(404).json(error)
        }
        const remIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id)
        profile.experience.splice(remIndex,1)
        profile.save()
        .then(profile =>  res.status(200).json(profile))
        .catch(err => res.status(404).json(err))
    }).catch(err => {
        error.error = true;
        error.message = 'No Such Profile Found';
        res.status(404).json(err)
    })
})

// @route   Delete api/profile/education/:edu_id
// @desc    delete education from profile
// @access  Private route
router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req, res) => {
    
    const error = {};
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile){
            error.error = true;
            error.message = 'No Such Profile Found';
            return res.status(404).json(error)
        }
        const remIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id)
        profile.education.splice(remIndex,1)
        profile.save()
        .then(profile =>  res.status(200).json(profile))
        .catch(err => res.status(404).json(err))
    }).catch(err => {
        error.error = true;
        error.message = 'No Such Profile Found';
        res.status(404).json(err)
    })
})

// @route   Delete api/profile/delete
// @desc    delete profile
// @access  Private route
router.delete('/delete',passport.authenticate('jwt',{session:false}),(req, res) => {
    
    const error = {};
    Profile.findOneAndRemove({user: req.user.id})
    .then(
        User.findByIdAndRemove({_id : req.user.id})
        .then( res.status(200).json(
            {
                success: true,
                message: 'user has been deleted.'
            })
        )
        .catch(err => res.status(404).json(err))
    ).catch(err => {
        error.error = true;
        error.message = 'No Such Profile Found';
        res.status(404).json(err)
    })
})
module.exports = router;