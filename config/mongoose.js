const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://varsha:harsh@atlascluster.pznuoqu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
db.once('open',function(){
    console.log("Connected to database :: MongoDB");
});

module.exports=db;


