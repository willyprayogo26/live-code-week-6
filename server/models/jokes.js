const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jokeSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    joke: {
        type: String
    }
}, {
    timestamps: {}
})

const Joke = mongoose.model('Joke', jokeSchema)

module.exports = Joke