const router = require("express").Router()
const mongoose = require("mongoose")
var ObjectId = require('mongoose').Types.ObjectId;
const article = require("../models/article")
const articleModel = mongoose.model("article", article)

const like = require('../models/like')
const likeModel = mongoose.model("like",like)

const User = require("../models/user")
const UserModel = mongoose.model("users",User)
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})
var passport = require('passport');
require('../config/passport')(passport);
const multer = require('multer');

const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });

mongoose.set('useCreateIndex', true)

router.get("/sortByDate", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const result =await articleModel.find()
        .populate("Articles", "Title")
        .sort({date: 'descending'}).exec()
    res.send(result)
});

router.get("/delete/:id",(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result= articleModel.findByIdAndRemove(
        {_id: req.params.id} ).exec();

    res.send(result);

})

router.get("/findById/:id",async(req,res)=>{
  console.log(req.params.id)
  const result = await articleModel.findOne({_id: req.params.id})
  .populate('author' )
  .populate('category')
  .populate('like')
  .exec();
  res.send(result);
})

router.post("/update/:id", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const result = await articleModel.findByIdAndUpdate({_id: req.params.id}, req.body).exec()
    res.send(result)

})

router.post('/img', upload.single('file'), function (req, res, next) {


  var document = {
    path: req.file.path,
    filename: req.file.filename,
    originalname: req.file.originalname
  //  caption: req.file.
  };

  PhotoModel(document).save(err => {
    res.send(req.file);
  });

})

router.post("/saveFile/:id", upload.single('file'), async(req,res)=> {


  // var article = {



  const result=  articleModel.findByIdAndUpdate({_id: req.params.id}, {
    $push: {
      "path": req.file.path,
       "filename": req.file.filename,
       "originalname": req.file.originalname
    }
  }).exec();

  res.send(result);
});



router.post("/save", async(req,res)=> {

      var article = {
        title: req.body.title,
        context: req.body.context,
        author: req.body.author,
        category: req.body.category
      }

    var article = articleModel(article);

    article.save();
    article.on('save', function(new_article) {


          const result=  UserModel.findByIdAndUpdate({_id: new_article.author}, {
            $push: {
              "articles" : new_article._id
            }
          }).exec();

            res.send({ article: new_article});




    })




  //  res2= UserModel.findByIdAndUpdate({_id: req.body.author}, {
  //     $push: {
  //       article : res._id
  //     }
  //   })




  })

router.get("/", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await articleModel.find()
  .populate('author' )
  .populate('category' )
  .populate('like')
  .exec();
  res.send(result);
})


/*
------------------------------------------------
Categery
------------------------------------------------
*/
const category = require("../models/category")
const categoryModel = mongoose.model("category", category)



router.get("/allCategory", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await categoryModel.find().exec();
  res.send(result);
})

router.post("/addCategory", async(req,res)=>{


  console.log(req.body);
  const result = await categoryModel(req.body).save();
  res.send(req.body);

})

router.get("/deleteCategory/:id", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await categoryModel.findOneAndDelete(
    {_id:req.params.id}).exec();
      res.send(result);
})

router.get("/:email",passport.authenticate("jwt", { session: false}), async(req,res)=> {

  const result = await UserModel.findOne({email: req.params.email})
      .populate("articles")
      .sort({date: 'descending'})
      .exec();
          res.send(result);

})



router.post("/updateCategory/:id", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await categoryModel.findByIdAndUpdate(
    {_id:req.params.id},req.body).exec();
  res.send(result);
})

router.post("/like",passport.authenticate("jwt", { session: false}),async(req,res)=>{



   const like = await likeModel.findOne({$and: [{
     user: {"$all": [req.body.user]}}, {article: req.body.article}]}).exec();

   if (like){
     const result0 = await likeModel.findByIdAndUpdate({_id:  like._id},
       {
        $pull: {
         "user": req.body.user
       },
       $inc : {"like": -1}
     },{new: true}).exec();
     const a = await articleModel.findOne({_id: req.body.article})
     .populate('like')
     .exec();
     res.send({message: 'pull', article: a});
   } else {
     const like = await likeModel.findOne({article: req.body.article}).exec();
     if(like) {
      const result1 = await likeModel.findByIdAndUpdate({_id:  like._id},
        {
         $push: {
          "user": req.body.user
        },
        $inc : {"like": 1}},{new: true}).exec();

        const a = await articleModel.findOne({_id: req.body.article})
     .populate('like')
     .exec();
      res.send({message: 'push', article: a});
    }else {



      const result2 =  likeModel({
        "article": req.body.article,
        "user": req.body.user
      }).save(function(err, model){
        if(model){

          console.log('if model')
         const r= articleModel.findByIdAndUpdate({_id: req.body.article},{
             $set :{
               "like": ObjectId(model._id)
             }
          }).exec();
        }
      });

      var   ar = await articleModel.findOne({_id: req.body.article})
      .populate('like')
      .exec();

      res.send({message: 'new-r', article:ar , id:  req.body.article});



     }



   }


})


module.exports = router;
