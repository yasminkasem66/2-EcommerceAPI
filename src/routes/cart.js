const express = require('express');
const router = express.Router();
const { addItemToCart} = require('../controller/cart');
const { requireSignin, userMiddleWare } = require('../middleware/index');

router.post('/addtocart', requireSignin, userMiddleWare, addItemToCart)
// router.get('/', getCategories)




module.exports = router;