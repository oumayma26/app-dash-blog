const router = require("express").Router();
const mongoose = require("mongoose");
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
mongoose.connect("mongodb://localhost:27017/blogApp", {
  useNewUrlParser: true
})

const Photo = require("../models/photo")
const PhotoModel = mongoose.model("Photos", Photo)


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

router.get('/img/:filename', (req,res)=>{

  res.sendFile('../../uploads/'+__dirname+req.params.filename);
});


module.exports = router;
