'use strict'

const mongoose = require('mongoose')
const dbName = 'synth'
const uri = `mongodb://localhost:27017/${dbName}_${process.env.NODE_ENV}`

const connect = async () => {
  const options = {
    useNewUrlParser: true,
  }

  return await mongoose.connect(uri, options)
}

module.exports = connect
