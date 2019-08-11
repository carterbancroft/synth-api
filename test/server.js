'use strict'

// 3rd party
const assert = require('assert')
const request = require('request-promise-native')

// Project
const server = require('../server')
const Composition = require('../models/composition')


// Start an instance of the app that we can test again.
let app
before(async () => app = await server.start())
after(() => server.stop(app))

// Helper to make requests to teh GraphQL endpoint.
async function makeGraphQlRequest(query) {
  let response

  try {
    response = await request({
      method: 'POST',
      baseUrl: `http://localhost:${app.address().port}`,
      uri: '/graphql',
      body: {
        query,
      },
      resolveWithFullResponse: true,
      json: true,
    })
  }
  catch (err) {
    console.log(err.message)
    throw(err)
  }

  return response
}

describe('/graphql', () => {
  describe('query', () => {
    before(async () => {
      const mock = new Composition({
        title: 'title',
        description: 'description',
        data: 'data',
        created: new Date(),
        modified: new Date(),
      })

      try {
        await mock.save()
      }
      catch (err) {
        console.log(err)
        throw err
      }
    })
    afterEach(async () => await Composition.deleteMany())

    it('should query the data from the API', async () => {
      const query = `{
        compositions {
          title
          description
          data
        }
      }`

      const response = await makeGraphQlRequest(query)

      const expected = {
        compositions: [{
          title: 'title',
          description: 'description',
          data: 'data'
        }]
      }

      assert.deepEqual(response.body.data, expected)
    })
  })


  describe('mutation', () => {
    afterEach(async () => await Composition.deleteMany())

    it('should write data to the DB through the API', async () => {
      const mutation = `mutation {
        createComposition(
          compositionInput: {
            title:"title",
            description:"desc",
            data:"data"
          }
        ){
          title
          description
          data
        }
      }`

      const response = await makeGraphQlRequest(mutation)

      const expected = {
        createComposition: {
          title: 'title',
          description: 'desc',
          data: 'data',
        }
      }

      assert.deepEqual(response.body.data, expected)
    })
  })
})
