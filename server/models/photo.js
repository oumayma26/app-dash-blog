const mongoose = require("mongoose")

var Schema = mongoose.Schema;


const photoSchema = new mongoose.Schema({

    filename: {type: String},

    path:  { type: String },

    originalname: {type: String},

    caption: { type: String }
})


module.exports = photoSchema;