const router = require("express").Router()
const mongoose = require("mongoose")

const article = require("../models/article")
const articleModel = mongoose.model("article", article)
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})



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

router.post("/save", async(req,res)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
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

router.post("/addCategory", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  categoryModel(req.body).save(err=>{
    res.send(err);
  })
})

router.get("/allCategory", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await categoryModel.find().exec();
  res.send(result);
})

router.get("/deleteCategory/:id", async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const result = await categoryModel.findByIdAndRemove(
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
