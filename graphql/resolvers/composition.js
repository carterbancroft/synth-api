'use strict'

const shortid = require('shortid')

const Composition = require('../../models/composition')

const resolver = {
  compositions: async () => {
    const allCompositions = await Composition.find()
    return allCompositions
  },

  createComposition: async (args) => {
    console.log('in create')

    const compositionInput = args.compositionInput
    const currentDate = new Date()

    const composition = new Composition({
      data: compositionInput.data,
      created: currentDate,
      modified: currentDate,
      shortid: shortid.generate(),
    })

    console.log(composition)

    await composition.save(composition)

    return composition
  },
}

module.exports = resolver
