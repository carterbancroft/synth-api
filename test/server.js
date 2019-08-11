'use strict'

const assert = require('assert')
const request = require('request-promise-native')

const server = require('../server')
const Composition = require('../models/composition')


describe('/graphql', () => {
  describe('query', () => {
    let app

    before(async () => app = await server.start())
    before(async () => {
      const mock = new Composition({
        title: 'test title',
        description: 'test description',
        data: 'test data',
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

    after(async () => await Composition.deleteMany())
    after(() => server.stop(app))


    it('should query the data from the API', async () => {
      const graphqlQuery = `{
        compositions {
          title
          description
          data
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
        compositions: [{
          title: 'test title',
          description: 'test description',
          data: 'test data'
        }]
      }

      assert.deepEqual(response.body.data, expected)
    })
  })

  describe('mutation', () => {
    it('should write data to the DB through the API')
  })
})
