const router = require("express").Router()
const mongoose = require("mongoose")

const article = require("../models/article")
const articleModel = mongoose.model("article", article)
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})

const multer = require('multer');

const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
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

router.post("/save", upload.single('file'), async(req,res)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var document = {
      path: req.file.path,
      filename: req.file.filename,
      originalname: req.file.originalname
      //  caption: req.file.
    };

    articleModel(req.body).save(err => {
        res.send(err)
    });
  })

router.get("/", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await articleModel.find()
  .populate('author' )
  .populate('category' )
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

  // // res.header("Access-Control-Allow-Credentials", "true");
  //  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
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



router.post("/updateCategory/:id", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await categoryModel.findByIdAndUpdate(
    {_id:req.params.id},req.body).exec();
  res.send(result);
})


module.exports = router;
