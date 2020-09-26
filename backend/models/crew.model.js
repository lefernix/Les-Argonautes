const mongoose = require('mongoose')

const Schema = mongoose.Schema

const crewSchema = new Schema({
    member : {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const Crew = mongoose.model('Crew', crewSchema)

module.exports = Crew