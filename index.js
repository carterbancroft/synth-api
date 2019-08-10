'use strict'

const express = require('express')
const dbConfig = require('./config/db')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const Composition = require('./models/composition')


const schema = buildSchema(`
  type Composition {
    _id: ID!
    title: String!
    data: String!
    description: String!
    created: String!
    modified: String!
  }

  input CompositionInput {
    title: String!
    description: String!
    data: String!
  }

  type Query {
    compositions: [Composition!]!
  }

  type Mutation {
    createComposition(compositionInput: CompositionInput): Composition
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)

const rootValue = {
  compositions: async () => {
    const allCompositions = await Composition.find()
    return allCompositions
  },

  createComposition: async (args) => {
    const compositionInput = args.compositionInput
    const currentDate = new Date()

    const composition = new Composition({
      title: compositionInput.title,
      description: compositionInput.description,
      data: compositionInput.data,
      created: currentDate,
      modified: currentDate,
    })

    await composition.save(composition)

    return composition
  },
}

const app = express()
const options = {
  schema,
  rootValue,
  graphiql: true,
}
app.use('/graphql', graphqlHttp(options))

dbConfig.connect().then(() => {
  app.listen(4000)
  console.log('Running a GraphQL API server as http://localhost:4000/graphql')
})
