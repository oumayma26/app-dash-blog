const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user")
const UserModel = mongoose.model("users", User)
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        
        
        const r = UserModel.findOne({username:username}).then(function(user) {
            
            if (!user) {
                
                return cb(null, false, {message: 'Incorrect username'});
            }else {

                const res3 = bcrypt.compareSync(password,user.password);
                if(res3==true){
                    return cb(null, user, {message: 'Logged In Successfully'});
                } else {

                    return cb(null, false, {message: 'Incorrect password.'});
                }
            }
            
        });

        // console.log("rrrrrr",r);
        // return UserModel.findOne({
        //     username:username, 
        //     password: password})
        //    .then(user => {
        //        if (!user) {
        //            console.log("user", user, username, "/", password);
        //            return cb(null, false, {message: 'Incorrect username or password.'});
        //        }else {
        //            console.log("no user");
        //        }
        //        return cb(null, user, {message: 'Logged In Successfully'});
        //   })
        //   .catch(err => cb(err));

    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return UserModel.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));



// let passport = require("passport");  
// let passportJWT = require("passport-jwt");  

// const User = require("../models/user")
// const UserModel = mongoose.model("users", User)


// let cfg = require("./config.js");  

// let ExtractJwt = passportJWT.ExtractJwt;  
// let Strategy = passportJWT.Strategy;  

// let opts = {}
// opts.secretOrKey= cfg.jwtSecret
// opts.jwtFromRequest= ExtractJwt.fromAuthHeaderWithScheme(cfg.authScheme)


// mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})


// module.exports = function() {  
//     var strategy = new Strategy(opts, function(payload, done) {

        
     
//         var user =users.filter(function(user) {
//             return user.id === payload.id
//         });
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//                 // or model a new user
//             }
//      });

//     passport.use(strategy);
//     return {
//         initialize: function() {
//             return passport.initialize();
//         },
//         authenticate: function() {
//             return passport.authenticate(cfg.authScheme, cfg.jwtSession);
//         }
//     };
// };