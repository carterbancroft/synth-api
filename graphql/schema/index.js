'use strict'

const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Composition {
    _id: ID!
    recording: [InstrumentRecording]
    created: String!
    modified: String!
    shortid: String!
  }

  type InstrumentRecording {
    name: String!
  }

  input CompositionInput {
    data: [InstrumentRecording!]!
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

module.exports = schema
