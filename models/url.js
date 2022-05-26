const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const UrlSchema = new Schema({
  originalURL: {
    type: String,
    required: true
  },

  shortenPath: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5
  }
})

model.exports = Model('Url', UrlSchema)