const mongoose = require('mongoose');

const qtypeSchema = new mongoose.Schema({
    subtopicId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subtopic'
    },
    name: [{
        language: {
            type: String
        },
        description: {
            type: String
        }
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

qtypeSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'subtopicId',
        select: '-__v -topicId -updatedAt -qtypeId -qskillId'
    })
    next();
});

qtypeSchema.pre('save', async function (next) {
    this.updatedAt = Date.now() - 1000;
    next();
})

const QType = mongoose.model('QType', qtypeSchema);
module.exports = QType;
