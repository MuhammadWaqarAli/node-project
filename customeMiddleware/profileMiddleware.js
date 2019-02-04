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
        case 'experience':{
            return [
                check('company').not().isEmpty().withMessage('Company Name is required'),
                check('title').not().isEmpty().withMessage('Job Title is required'),
                check('from').not().isEmpty().withMessage('Start Date required')
            ]
        }
        
        case 'education':{
           return  [
                check('school').not().isEmpty().withMessage('School Name is required'),
                check('degree').not().isEmpty().withMessage('Degree Title is required'),
                check('fieldofstudy').not().isEmpty().withMessage('Field value required'),
                check('from').not().isEmpty().withMessage('Start Date required')
            ]
        }
        default: {
            return [ ];
        }
    }
}