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
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express Router
app.use('/',require('./routes/index'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

//listening the port
app.listen(port,function(err){
   if(err){
    console.log(`Error in running the server: ${err}`); //interpolation
   }
   console.log(`Server is  running on port: ${port}`); //interpolation

});