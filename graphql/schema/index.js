'use strict'

const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Composition {
    _id: ID!
    data: [Boolean!]!
    created: String!
    modified: String!
    shortid: String!
  }

  input CompositionInput {
    data: [Boolean!]!
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
