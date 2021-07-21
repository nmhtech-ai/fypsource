const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    initialize: {
        type: Boolean,
        default: false
    },
    subtopicId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subtopic'
    },
    questionsId: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
    }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
