const express = require('express');
const { check, validationResult,body } = require('express-validator/check');
exports.validate  = (method) => {
    switch (method) {
        case 'registerUser': {
         return [ 
            body('name', "User Name is required")
            .exists()
            .isAlpha()
            .isLength({min:3, max:30}),
            body('email').exists().isEmail(),
            body('password').exists().isLength({ min: 6, max:18 })
           ]   
        }
        case 'loginUser':{
            return [ 
                body('name', "User Name is required")
                .exists()
                .isAlpha()
                .isLength({min:3, max:30}),
                body('email').exists().isEmail(),
                body('password').exists().isLength({ min: 6, max:18 })
            ]   
        }
        default: {
            return [ ];
        }
    }
}