const express = require('express');
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');
// const upload = multer({dest:'uploads/'})
const router = express.Router();
const { createProduct, getProducts, getProductsBySlug } = require('../controller/product');
const { requireSignin, adminMiddleWare } = require('../middleware/index');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate()+'_'+ file.originalname)
    }
})

const upload = multer({ storage})


router.post('/', requireSignin, adminMiddleWare, upload.array('productPictures'),  createProduct)
router.get('/:slug', getProductsBySlug)
router.get('/', getProducts)




module.exports = router;