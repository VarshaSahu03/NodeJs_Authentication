//require express
const express=require('express');
//cookie parser
const cookieParser=require('cookie-parser');
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
const MongoStore = require('connect-mongo');
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

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
   store: new MongoStore({
      mongoUrl: "mongodb://127.0.0.1/"
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