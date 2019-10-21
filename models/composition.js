'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const compositionSchema = new Schema({
  recording: {
    type: [{ name: String, data: [Boolean] }],
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  modified: {
    type: Date,
    required: true,
  },
  shortid: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Composition', compositionSchema)
