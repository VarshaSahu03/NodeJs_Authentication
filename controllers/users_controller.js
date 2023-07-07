const User=require('../models/user');
module.exports.profile=function(req,res){
    return res.render('profile',{
        title:"Profile"
    });
}
//render the signUp
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
          title:'Codeial | signUp'
    });
}
//render the signIn
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
          title:'Codeial | signIn'
    });
}
//get the sign Up data
module.exports.create = function(req,res){
    //TODO later
    //if password is wrong
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    //email should  be unique
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');return}
        //new user
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in finding user in signing up');return}
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');

        }
    });
}
//create a session for user
module.exports.createSession = function(req,res){
    //TODO later
}