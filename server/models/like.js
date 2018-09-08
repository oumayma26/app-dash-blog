const mongoose = require('mongoose')
const userShema = require('./user')

const User = require('../models/user')

const like = new mongoose.Schema({
  number: {
    type: number
  },
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  article : {type: Schema.Types.ObjectId, ref : 'article'}
})

module.exports= like;
