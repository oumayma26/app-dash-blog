var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/user');
var config = require('./config'); // get db config file
const mongoose = require("mongoose")
const UserModel = mongoose.model("users",User)

module.exports = function(passport) {
  var opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwtSecret;

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    UserModel.findOne({id: jwt_payload.id}, function(err, user)
     {
          if (err) {
            console.log(err);
              return done(err, false);
          }
          if (user) {
            console.log(user)
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
