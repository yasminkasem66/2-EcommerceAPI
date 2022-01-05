const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/auth')

const { validateSigninRequest, validateSignupRequest, isRequestValidated }=require('../validators/auth')
router.post('/signup',validateSignupRequest,isRequestValidated, signup)


router.post('/signin', validateSigninRequest, isRequestValidated,  signin)
// router.post('/profile', requireSignin, (req, res) => {
//     return res.status(200).json({ user:"profile" })
// })



module.exports = router;