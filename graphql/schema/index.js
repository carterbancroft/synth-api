'use strict'

const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Composition {
    _id: ID!
    recording: [InstrumentRecording!]!
    created: String!
    modified: String!
    shortid: String!
  }

  input CompositionInput {
    recording: [InstrumentRecordingInput!]!
  }

  type InstrumentRecording {
    instrument: String!
    data: [Boolean!]!
  }

  input InstrumentRecordingInput {
    instrument: String!
    data: [Boolean!]!
  }

  type Query {
    compositions: [Composition!]!
    composition(shortid: String!): Composition!
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
