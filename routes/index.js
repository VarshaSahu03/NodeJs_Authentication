const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));

// respond with index.html when a GET request is made to the homepage
router.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/views/profile.ejs");
});
  
// route for handling PDF request
router.get("/downloadPDF", (req, res) => {
    res.download("public/Resume.pdf");
});
  
// export router middleware and use it in app.js
// module.exports = router;
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;