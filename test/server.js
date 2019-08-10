'use strict'

const assert = require('assert')
const request = require('request-promise-native')

const server = require('../server')


describe('/graphql', () => {
  let app
  before(() => app = server.start())
  after(() => server.stop(app))

  it('should work', async () => {
    const graphqlQuery = `{
      compositions {
        title
      }
    }`

    const response = await request({
      baseUrl: `http://localhost:4000`,
      uri: '/graphql',
      body: {
        query: graphqlQuery,
      },
      resolveWithFullResponse: true,
      json: true,
    })

    const expected = {
      compositions: []
    }

    assert.deepEqual(response.body.data, expected)
  })
})
