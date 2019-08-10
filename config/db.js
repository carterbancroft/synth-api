'use strict'

const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/synth'


const connect = async () => {
  const options = {
    useNewUrlParser: true,
  }

  return await mongoose.connect(url, options)
}

module.exports = {
  connect,
}
