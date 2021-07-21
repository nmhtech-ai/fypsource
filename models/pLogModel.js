const mongoose = require('mongoose');
const Log = require('./logModel');

const pLogSchema = new mongoose.Schema({
    exerciseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exercise'
    },
    questionId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
    },
    userInput: {
        type: String,
        trim: true
    },
    status: {
        type: String
    },
    time: {
        type: Number
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

pLogSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'questionId',
        select: '-__v -userId'
    })
    next();
});

const PLog = Log.discriminator('PLog', pLogSchema);
module.exports = mongoose.model('PLog');
