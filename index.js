'use strict'

const server = require('./server')

const app = server.start()

console.log(`########################################
  Running Synth API
  Location: ${app.url}
  Port: ${app.port}

  Listening for requests...`
)
