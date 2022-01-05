const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../../controller/admin/auth')
const { requireSignin } = require('../../middleware')
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../../validators/auth')


router.post('/signin', validateSigninRequest , isRequestValidated , signin)

router.post('/signup', validateSignupRequest , isRequestValidated ,signup)
router.post('/signout' ,signout)
// router.post('/profile', requireSignin, (req, res) => {
//     return res.status(200).json({ user:"profile" })
// })



module.exports = router;