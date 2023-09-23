//require express
const express=require('express');
//cookie parser
const cookieParser=require('cookie-parser');
//nodemailer
const nodemailer=require('nodemailer');
const bodyparser=require('body-parser');
//express call
const app = express();
//port num
const  port=8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle = require('./config/google');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(express.static('public'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');



//download pdf
const path = require('path');
// Serve static files (like your resume.pdf)
app.use(express.static(path.join(__dirname)));

// Handle the download request
app.get('/download', (req, res) => {
  const file = path.join(__dirname, './public/resume.pdf');
  res.download(file, 'resume.pdf');
});


//contact

app.use(express.urlencoded({ extended: true }));

app.get('/profile', (req, res) => {
    // Assuming user is defined in your session or request
    res.render('profile', { user: req.user });
});


// const nodemailer = require('nodemailer');

app.post('/send', (req, res) => {
    // Destructure form data from the request body
    const { name, email, subject, message } = req.body;

    // Create a transporter using your email service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'varsha981sahu@gmail.com', // Replace with your email
            pass: 'mfemgdrcfvlpqyrd' // Replace with your password
        }
    });

    // Email data
    const mailOptions = {
        from: email, // Sender's email
        to: 'varsha981sahu@gmail.com', // Recipient's email (where you want to receive messages)
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error: Something went wrong. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Message sent successfully!');
        }
    });
});


///////////////////////////////////////////////////////////
// const express = require('express')
// const bodyParser = require('body-parser')
// const mongoose = require("mongoose");
// // const passport = require("passport");
// const passportLocalMongoose
// 	= require("passport-local-mongoose");

// mongoose.connect(
// "mongodb+srv://varsha:harsh@cluster1.tkzilvd.mongodb.net/?retryWrites=true&w=majority", {
// 	useNewUrlParser: true
// });

// // const app = express()

// app.use(passport.initialize());

// const userSchema = new mongoose.Schema({
// 	username: String,
// 	password: String,
// });

// userSchema.plugin(passportLocalMongoose);

// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(function (user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
// 	User.findById(id, function (err, user) {
// 		done(err, user);
// 	});
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: true
// }))

// app.get('/send', function (req, res) {
// 	res.sendFile('profile.ejs', {
// 		root: __dirname
// 	});
// });

// app.get('/changepassword', function (req, res) {
// 	res.sendFile('changepassword.html', {
// 		root: __dirname
// 	});
// });

// app.post('/register', function (req, res) {
// 	User.register({
// 		username: req.body.username
// 	}, req.body.password, function (err) {
// 		if (err) {
// 			res.send(err);
// 		} else {
// 			res.send('successfully registered')
// 		}
// 	});
// });

// app.post('/changepassword', function (req, res) {
// 	User.findByUsername(req.body.username, (err, user) => {
// 		if (err) {
// 			res.send(err);
// 		} else {
// 			user.changePassword(req.body.oldpassword,
// 			req.body.newpassword, function (err) {
// 				if (err) {
// 					res.send(err);
// 				} else {
// 					res.send('successfully change password')
// 				}
// 			});
// 		}
// 	});
// });


////////////////////////////////////////////////////////////////




//mongo store is used to store the session cookie in the db
app.use(session({
   name:'codeial',
   //todo change the secret before deployment in production mode
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie:{
      maxAge:(1000*60*100)
   },
   store: MongoStore.create({
      mongoUrl: 'mongodb+srv://varsha:harsh@cluster1.tkzilvd.mongodb.net/?retryWrites=true&w=majority'
    },
  {
      mongooseConnection: db,
      autoRemove: 'disabled'
  },
      function(err){
         console.log(err || 'connect mongodb setup ok');
      }

   )

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express Router
app.use('/',require('./routes/index'));

//listening the port
app.listen(port,function(err){
   if(err){
    console.log(`Error in running the server: ${err}`); //interpolation
   }
   console.log(`Server is  running on port: ${port}`); //interpolation

});


//https://drive.google.com/file/d/1B30beyLHnvu7HR8ciWicfb5C_kFDGig4/view


