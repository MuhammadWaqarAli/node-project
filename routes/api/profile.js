const express = require('express');
const router = express.Router();


// @route   GET api/users/profile
// @desc    Tests profile  route
// @access  Public route
router.get('/test',(req,res) => { 
    res.json({
        msg:'profile works'
    }) 
});

module.exports = router;