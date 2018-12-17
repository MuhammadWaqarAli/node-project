const router = require('express').Router();

// @route   GET api/users/detail
// @desc    Tests users detail  route
// @access  Public route
router.get('/test', ( req, res) => {
 res.json({ msg: "Users Works" });
});

module.exports = router;