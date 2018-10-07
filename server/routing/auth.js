
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

router.post("/updateCategory/:id", async(req,res)=>{

});

// router.post('/login', function (req, res, next) {

//   console.log(req.params.username);
//   passport.authenticate('local', {session: false}, (err, user, info) => {


//                 if (err || !user) {
//                     return res.status(400).json({
//                         message: 'Something is not right',
//                         user   : user
//                     });
//                 }
//                req.login(user, {session: false}, (err) => {

//                    if (err) {
//                        res.send(err);
//                    } else {
//                     const token = jwt.sign(user, 'your_jwt_secret');
//                     return res.status(200).json({
//                         message: 'User found',
//                         user   : user,
//                         token : token
//                     });
//                    }

//                 });


//             })(req, res);

// });

router.post('/login', async (req, res) => {
  const result = await UserModel.findOne({
      email: req.body.email
  }).exec();
  console.log(result);
  if (result) {
        const res3 = bcrypt.compareSync( req.body.password,result.password);
                if(res3==true){
                  const token = jwt.sign({data: result},  'oumayma')
                  res.send({message: "User found", token : token});
                }else {
                  res.send({message: "User not found"});
                }
   }
});

module.exports = router;
