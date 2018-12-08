const mongoose = require("mongoose")
const userSchema = require("./user")
var Schema = mongoose.Schema;

const User = require("../models/user")
const UserModel = mongoose.model("user", User)

const like = require('../models/like')


const categorySchema = require("./category")

const category = require("../models/category")
const categoryModel = mongoose.model("category", category)

const article = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    context: String,
    date: { type: Number, default: Date.now},
    author: {type : Schema.Types.ObjectId , ref : "user"},
    category: { type : Schema.Types.ObjectId , ref :'category' },

    imgProfilePath : String,
    avatar: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
    },

    filename: {type: String},

    path:  { type: String },

    originalname: {type: String},

    caption: { type: String },
    like: {type : Schema.Types.ObjectId, ref : 'like'}
})


module.exports = article;
