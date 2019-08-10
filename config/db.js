'use strict'

const mongoose = require('mongoose')
const dbName = 'synth'
const url = `mongodb://localhost:27017/${dbName}`


const connect = async () => {
  const options = {
    useNewUrlParser: true,
  }

  return await mongoose.connect(url, options)
}

module.exports = connect
