//require express
const express=require('express');
//express call
const app = express();
//port num
const  port=8000;

//listening the port
app.listen(port,function(err){
   if(err){
    console.log(`Error in running the server: ${err}`); //interpolation
   }
   console.log(`Server is  running on port: ${port}`); //interpolation

});