
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




router.post('/login', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await UserModel.findOne({
      email: req.body.email
  }).populate("roles", "name").exec();
  console.log(result);
  if (result) {
        const res3 = bcrypt.compareSync( req.body.password,result.password);
                if(res3==true) {
                  const token = jwt.sign({data: result},  'oumayma')
                  res.send({message: "User found",
                  token : token,
                  email: result.email,

                user: result,
                _id : result._id});
                } else {
                  res.send({message: "User not found"});
                }
   }
});

module.exports = router;
