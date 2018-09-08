const mongoose = require("mongoose")
const userSchema = require("./user")
var Schema = mongoose.Schema;

const User = require("../models/user")
const UserModel = mongoose.model("user", User)

const article = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },
    context: String,
    date: { type: Number, default: Date.now},
    author: {type : Schema.Types.ObjectId , ref : "user"}
})


module.exports = article;