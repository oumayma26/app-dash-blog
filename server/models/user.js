const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Article = require("../models/article")
const ArticleModel = mongoose.model("article", Article)

const user = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    date: { type: Number, default: Date.now},
    articles: [{
        type: Schema.Types.ObjectId,
        ref: "article"
    }]

})



module.exports = user;