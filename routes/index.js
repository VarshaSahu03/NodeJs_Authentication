//doesn't make everytime new instance its refers to same express in index.js
const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller')
console.log('router loaded');

//use home controller
router.get('/',homeController.home);
router.use('/users',require('./users'));
module.exports = router;

