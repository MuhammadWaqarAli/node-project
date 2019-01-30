const {body, check } = require('express-validator/check');
exports.validate  = (method) => {
    switch (method) {
        case 'registerUser': {
         return [ 
            check('name').not().isEmpty().withMessage('User Name required'),       
            check('email')
            .isEmail()
            .withMessage('Email is not valid'),
            check('password')
            .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
            .matches(/\d/).withMessage('Password must contain a number')
           ]
        }
        case 'loginUser': {
            return [ 
                
                check('email')
                .isEmail()
                .withMessage('Email is not valid'),
                check('password')
                .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
                .matches(/\d/).withMessage('must contain a number')
            ]   
        }
        default: {
            return [ ];
        }
    }
}