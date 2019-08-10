'use strict'

const { buildSchema } = require('graphql')

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

module.exports = schema
