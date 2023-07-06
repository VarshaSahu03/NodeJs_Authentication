//doesn't make everytime new instance its refers to same express in index.js
const express = require('express');
const router = express.Router();
const homeCotroller=require('../controllers/home_controller')
console.log('router loaded');

//use home controller
router.get('/',homeCotroller.home);
module.exports = router;

