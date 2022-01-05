const express = require('express');
const { initialData } = require('../../controller/admin/initData');
const router = express.Router();



router.post('/', initialData);




module.exports = router;