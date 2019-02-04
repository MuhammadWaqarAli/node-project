const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const postValidationMiddleware = require('../../customeMiddleware/postMiddleware');
const { check, validationResult, body  } = require('express-validator/check');
// loading model
const Post = require('../../models/Post')

// @route   Get api/posts/
// @desc    creating user posts
// @access  Private route
router.post('/', postValidationMiddleware.validate('create'), passport.authenticate('jwt', {session: false}),(req,res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    })
    newPost.save()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(404).json({error: true,
    message: 'user not found'}))
})

// @route   Get api/posts/
// @desc    fetch all posts
// @access  Public route
router.get('/',(req,res) => { 
    
    Post.find().sort('-1')
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.status(404).json({
        error: true, 
        message: 'No Such Post found'}))
});


// @route   Get api/posts/:id
// @desc    fetch  post detail
// @access  Public route
router.get('/:id',(req,res) => { 
    // console.log(req.params.id);
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({
                error: true, 
                message: 'No Such Post found of that user'})
        }else{
            res.status(200).json(post)
        }
        
    })
    .catch(err => res.status(404).json({
        error: true, 
        message: err}))
});

module.exports = router;