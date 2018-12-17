const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   GET api/users/detail
// @desc    Tests users detail  route
// @access  Public route
router.get('/test', ( req, res) => {
 res.json({ msg: "Users Works" });
});
// @route   GET api/users/register
// @desc    Registration
// @access  Public route
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email}).exec()
    .then(user => {
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
module.exports = router;