const mongoose = require('mongoose')

const CycleSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    previousMenstration: {
        type: Date
    },
    currentMenstration: {
        type: Date
    },
    predictedMenstration: {
        type: Date
    },
    comment: {
        type: String
    }
})

module.exports = mongoose.model('Cycle', CycleSchema)