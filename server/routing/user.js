const router = require("express").Router()
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    ObjectId = Schema.ObjectId;

const jwt = require("jsonwebtoken");
const User = require("../models/user")

mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})

const UserModel = mongoose.model("users",User)

const article = require("../models/article")
const articleModel = mongoose.model("article", article)

var passport = require('passport');
require('../config/passport')(passport);



    router.post("/register", (req,res)=>{
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                req.body.password = hash;
                UserModel(req.body).save(err => {
                    res.send(err)
                });
            });

        })
    })

    router.get("/articles/:username", async(req,res)=> {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
        const result = await UserModel.findOne({username: req.params.username})
            .populate("articles", "title")
            .populate("articles", "date")
            .sort({date: 'descending'})
            .exec();
                res.send(result);

    })

    router.post("/update/:id", async(req,res)=>{
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");

        const result = await UserModel.findByIdAndUpdate({_id: req.params.id}, req.body).exec()
        res.send(result)
    })

    router.get("/delete/:id",(req,res)=>{
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      user =  UserModel.findOneAndDelete(
           {_id: req.params.id} ).exec();

       res.send(user);
   })

   router.post("/addArticle/:username",async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    const u = await UserModel.findOne({username:req.params.username}).exec();

    req.body.author= u._id;

     articleModel(req.body).save(function(err,article){

        var a = article;
        const result =  UserModel.findOneAndUpdate(
                    {username: req.params.username},
                    {
                        $push: {
                        articles: a.id
                    }
                }
                ).exec();

        res.send(a);
    })
  })

  //delete article
  router.get("/deleteArticle/:username/:articleId", async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let index= req.params.index;
    const u = await UserModel.findOne({username:req.params.username}).exec();
    console.log(u)
    const result = await UserModel.findByIdAndUpdate({_id: u.id},
        { $pull : {
           "articles": req.params.articleId
        }
    })

    res.send(result)
  })

  router.get("/",  passport.authenticate("jwt", { session: false}),async(req,res)=>{
    var token = getToken(req.headers);
    console.log("token",token)
       if (token) {
      const result = await UserModel.find();
      res.send(result);
    }else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

  })


  router.get("/searchByName/:name",async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    const u = await UserModel.findOne({$or: [ { name: req.params.name }, { lastname: req.params.name } ] }).exec();
    res.send(u);
  });


  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  module.exports = router;
