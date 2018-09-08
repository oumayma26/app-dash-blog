const mongoose = require('mongoose')
const userShema = require('./user')

const User = require('../models/user')

const comment = new mongoose.Schema({
  comment : {
    type: String,
    required: true
  },
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  article : {type: Schema.Types.ObjectId, ref : 'article'}
})

module.exports= comment;
