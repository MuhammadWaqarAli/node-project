const {check } = require('express-validator/check');
exports.validate  = (method) => {
    switch (method) {
        case 'create': {
         return [ 
             check('text').not().isEmpty().withMessage('Post Context is required'),
             check('name').not().isEmpty().withMessage('User name is required'),
             check('avatar').not().isEmpty().withMessage('User avatar is required'),
         ]
        }
        default: []
    }
}