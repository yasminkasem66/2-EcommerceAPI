const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

const { createCategory, getCategories} = require('../controller/category');
const { requireSignin, adminMiddleWare } = require('../middleware/index');

// const upload = multer({dest:'uploads/'})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + '_' + file.originalname)
    }
});

const upload = multer({ storage });

router.post('/', requireSignin, adminMiddleWare, upload.single('categoryImage'),   createCategory)
router.get('/', getCategories)




module.exports = router;