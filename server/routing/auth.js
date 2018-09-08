
const router = require("express").Router();
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const jwt = require("jsonwebtoken");
const passport = require("passport");
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})

const User = require("../models/user")
const UserModel = mongoose.model("users", User)






router.post('/login', function (req, res, next) {



            passport.authenticate('local', {session: false}, (err, user, info) => {
               console.log(user)

                if (err || !user) {
                    return res.status(400).json({
                        message: 'Something is not right',
                        user   : user
                    });
                }
               req.login(user, {session: false}, (err) => {

                   if (err) {
                       res.send(err);
                   } else {
                    const token = jwt.sign(user, 'your_jwt_secret');
                    return res.status(200).json({
                        message: 'User found',
                        user   : user,
                        token : token
                    });
                   }

                });


            })(req, res);





});

module.exports = router;
