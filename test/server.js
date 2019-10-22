'use strict'

// 3rd party
const assert = require('assert')
const request = require('request-promise-native')

// Project
const server = require('../server')
const Composition = require('../models/composition')


const TEST_PORT = 4001

// Start an instance of the app that we can test again.
let app
before(async () => app = await server.start(TEST_PORT))
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
    console.dir(err.message)
    throw(err)
  })
}

describe('/graphql', () => {
  describe('query', () => {
    before(async () => {
      const mock = new Composition({
        recording: [
          {
            instrument: 'Bass',
            data: [true, false]
          }
        ],
        created: new Date(),
        modified: new Date(),
        shortid: 'someshortid',
      })

      await mock.save()
    })
    afterEach(async () => await Composition.deleteMany())

    it('should query the data from the API', async () => {
      const query = `{
        compositions {
          recording {
            instrument
            data
          }
          shortid
        }
      }`

      const response = await makeGraphQlRequest(query)

      const expected = {
        compositions: [{
          recording: [
            {
              instrument: 'Bass',
              data: [true, false]
            }
          ],
          shortid: 'someshortid',
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
            recording:[{instrument: "Bass", data: [true, false]}]
          }
        ){
          recording {
            instrument
            data
          }
        }
      }`

      const response = await makeGraphQlRequest(mutation)

      const expected = {
        createComposition: {
          recording: [
            {
              instrument: 'Bass',
              data: [true, false]
            }
          ]
        }
      }

      assert.deepEqual(response.body.data, expected)
    })
  })
})
