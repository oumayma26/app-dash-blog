const mongoose = require("mongoose");
var Schema = mongoose.Schema;



const category = new mongoose.Schema({

  name : {
    type: String,
    required: true
  }
})



module.exports = category;
