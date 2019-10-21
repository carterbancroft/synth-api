'use strict'

// 3rd party
const assert = require('assert')
const request = require('request-promise-native')

// Project
const server = require('../server')
const Composition = require('../models/composition')


// Start an instance of the app that we can test again.
let app
before(async () => {
  console.log('IN server.start')
  app = await server.start()
  console.log('after')
})
after(() => server.stop(app))

// Helper to make requests to teh GraphQL endpoint.
async function makeGraphQlRequest(query) {
  return await request({
    baseUrl: `http://localhost:${app.address().port}`,
    method: 'POST',
    uri: '/graphql',
    body: {
      query,
    },
    resolveWithFullResponse: true,
    json: true,
  }).catch(err => {
    console.log(err.message)
    throw(err)
  })
}

describe('/graphql', () => {
  describe('query', () => {
    before(async () => {
      console.log('IN!')
      const mock = new Composition({
        data: ['data'],
        created: new Date(),
        modified: new Date(),
        shortid: 'someshortid',
      })

      await mock.save().catch(err => console.log(err))
    })
    afterEach(async () => await Composition.deleteMany())

    it('should query the data from the API', async () => {
      const query = `{
        compositions {
          data
          shortid
        }
      }`

      const response = await makeGraphQlRequest(query)

      const expected = {
        compositions: [{
          data: ['data'],
          shortid: 'someshortid',
        }]
      }

      assert.deepEqual(response.body.data, expected)
    })
  })


  describe('mutation', () => {
    afterEach(async () => await Composition.deleteMany())

    it.only('should write data to the DB through the API', async () => {
      console.log('in')
      const mutation = `mutation {
        createComposition(
          compositionInput: {
            data:['test']
          }
        ){
          data
        }
      }`

      const response = await makeGraphQlRequest(mutation)

      const expected = {
        createComposition: {
          data: 'data',
        }
      }

      assert.deepEqual(response.body.data, expected)
    })
  })
})
