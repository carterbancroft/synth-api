'use strict'

const express = require('express')
const graphQlHttp = require('express-graphql')

const dbConfig = require('./config/db')
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const API_DOMAIN = 'http://localhost'
const PORT = 4000

const app = express()

const graphQlOptions = {
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
}
app.use('/graphql', graphQlHttp(graphQlOptions))

// First connect to the database and then listen for requests on port 4000
dbConfig.connect().then(() => {
  app.listen(PORT)

  console.log(`#############################
 Running Synth API
 Location: ${API_DOMAIN}
 Port: ${PORT}

 Listening for requests...
  `)
})
