const router = require("express").Router()
const mongoose = require("mongoose")

const article = require("../models/article")
const articleModel = mongoose.model("article", article)
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})



router.get("/sortByDate", async(req,res)=>{
    const result =await articleModel.find()
        .populate("Articles", "Title")
        .sort({date: 'descending'}).exec()
    res.send(result)
});

router.get("/delete/:id",(req,res)=>{
     articleModel.findByIdAndRemove(
        {_id: req.params.id} ).exec();

    res.send("ok");

})

router.post("/update/:id", async(req,res)=>{
    const result = await articleModel.findByIdAndUpdate({_id: req.params.id}, req.body).exec()
    res.send(result)

})

router.post("/save", async(req,res)=> {
    articleModel(req.body).save(err => {

        res.send(err)
    });
})

module.exports = router;
