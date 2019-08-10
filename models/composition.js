'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const compositionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  modified: {
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model('Composition', compositionSchema)
