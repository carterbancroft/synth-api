'use strict'

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
      title: compositionInput.title,
      description: compositionInput.description,
      data: compositionInput.data,
      created: currentDate,
      modified: currentDate,
    })

    await composition.save(composition)

    return composition
  },
}

module.exports = resolver
