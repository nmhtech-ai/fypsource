const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Topic'
    },
    name: [
        {
            language: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    qskillId: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'QSkill'
        }
    ],
    qtypeId: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'QType'
        }
    ],
    // description: {
    //     type: String,
    //     trim: true
    // },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

subtopicSchema.pre(/^find/, function (next) {
    // this.populate({
    //     path: 'topicId',
    //     select: '-__v -subtopicId -updatedAt'
    // })
    this.populate({
        path: 'qtypeId',
        select: '-__v -subtopicId -updatedAt'
    })
    next();
});

subtopicSchema.pre('save', async function (next) {
    this.updatedAt = Date.now() - 1000;
    next();
})

const Subtopic = mongoose.model('Subtopic', subtopicSchema);
module.exports = Subtopic;
