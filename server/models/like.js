const mongoose = require('mongoose')
const userShema = require('./user')
var Schema = mongoose.Schema;
const User = require('../models/user')

const like = new mongoose.Schema({

  user: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required : true

  }],
  article : {
    type: Schema.Types.ObjectId,
    ref : 'article',
    required : true,
    unique: true
  },
  like:{
    type: Number,
    default : 1
  }
})

module.exports= like;
