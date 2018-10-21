const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const role= new mongoose.Schema({
  name : {
    type: String,
    required : true,
    unique : true
  }
})

module.exports= role;
