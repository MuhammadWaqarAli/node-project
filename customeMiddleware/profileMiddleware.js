const {body } = require('express-validator/check');
exports.validate  = (method) => {
    switch (method) {
        case 'profileValidator': {
         return [ 
            body('handle')
                .exists()
                .withMessage('Hanle field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('skills')
                .exists()
                .withMessage('skills field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('status')
                .exists()
                .withMessage('Status field required'),
            body('password').exists().isLength({ min: 6, max:18 })
           ]   
        }
        
        default: {
            return [ ];
        }
    }
}