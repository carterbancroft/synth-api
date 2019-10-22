'use strict'

const cors = require('cors')
const express = require('express')
const graphQlHttp = require('express-graphql')

const dbConnect = require('./config/db')
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const start = async port => {
  const app = express()

  app.use(cors()) // Setup ACAO for CORS access

  app.use('/graphql', graphQlHttp(request => {
    return {
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
    }
  }))

  const apiPort = port || 4000

  // First connect to the database.
  await dbConnect()

  // Once we're connected we can listen for incoming requests.
  return app.listen(apiPort)
}

const stop = app => {
  process.exit(0)
}

module.exports = {
  start,
  stop,
}
