'use strict'

const server = require('./server')

server.start()
  .then(app => {
    const port = app.address().port
    console.log(`Listening for requests at http://localhost:${port}...`)
  })
