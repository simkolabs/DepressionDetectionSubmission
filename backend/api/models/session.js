const mongoose = require('mongoose')
const sessionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Sessions', sessionSchema)