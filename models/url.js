const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true
  },

  shortenPath: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5
  },

  useCount: {
    type: Number,
    default: 0
  }
})

module.exports = Model('Url', UrlSchema)
