
const { check, validationResult } = require('express-validator');


validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
    check('lastName')
        .notEmpty()
        .withMessage('lastName is required'),
    check('email')
        .isEmail()
        .withMessage('valid Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage(' password must be at least 6 chars long')
    
]
validateSigninRequest = [
    check('email')
        .isEmail()
        .withMessage('valid Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage(' password must be at least 6 chars long')
    
]

const isRequestValidated = (req, res , next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({err:errors.array()[0].msg})
    }
    next();
 }
module.exports = {
    validateSignupRequest,
    isRequestValidated,
    validateSigninRequest
}