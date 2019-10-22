'use strict'

const shortid = require('shortid')

const Composition = require('../../models/composition')

const resolver = {
  compositions: async () => {
    const allCompositions = await Composition.find()
    return allCompositions
  },

  createComposition: async (args) => {
    const compositionInput = args.compositionInput
    const currentDate = new Date()

    const composition = new Composition({
      recording: compositionInput.recording,
      created: currentDate,
      modified: currentDate,
      shortid: shortid.generate(),
    })

    await composition.save(composition)

    return composition
  },
}

module.exports = resolver
