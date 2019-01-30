const {check } = require('express-validator/check');
exports.validate  = (method) => {
    switch (method) {
        case 'profileValidator': {
         return [ 
            check('handle')
                .not().isEmpty()
                .withMessage('Handle field required')
                .isLength({min:2,max:40})
                .withMessage('Handle Must be between 2 aqnd 40 Char'),
            check('status')
                .not().isEmpty()
                .withMessage('Status field required'),
            check('skills')
                .not().isEmpty()
                .withMessage('skills field required'),
            // check('website')
            //     .isURL()
            //     .withMessage('Not a valid URL'),
            // check('youtube')
            //     .isURL()
            //     .withMessage('Not a valid URL'),
            // check('facebook')
            //     .isURL()
            //     .withMessage('Not a valid URL'),
            // check('linkedin')
            //     .isURL()
            //     .withMessage('Not a valid URL'),
            // check('twitter')
            //     .isURL()
            //     .withMessage('Not a valid URL'),
            // check('status')
            //     .not().isEmpty()
            //     .withMessage('Status field required'),
            // check('from')
            //     .not().isEmpty()
            //     .withMessage('From field required'),
            // check('fieldofstudy')
            //     .not().isEmpty()
            //     .withMessage('fieldofstudy field required')
           ]   
        }
        
        default: {
            return [ ];
        }
    }
}