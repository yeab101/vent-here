const mongoose = require('mongoose');

const ventSchema = mongoose.Schema({
    name: String,
    vent: { 
        type: String, 
        minlength: 10, 
        maxlength: 1000
    },
    isPublished: { 
        type: Boolean, 
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Vent = mongoose.model('Vent', ventSchema)

module.exports = Vent