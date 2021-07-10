const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.ObectId,
        ref: 'Topic'
    },
    subopicId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subtopic'
    },
    difficulty: {
        type: String,
        enum: {
            values: ['Basic', 'Intermediate', 'Advance'],
            message: '[ENUM ERROR] Difficulty is either: Basic, Intermediate, Advance!'
        }
    },
    question: [{
        langauge: {
            type: String,
            trim: true
        },
        problem: {
            type: String,
            trim: true
        }
    }],
    answer: {
        type: String
    },
    p1Skill: {
        type: mongoose.Schema.ObjectId,
        ref: 'QSkill'
    },
    p2Skill: {
        type: mongoose.Schema.ObjectId,
        ref: 'QSkill'
    },
    p1hints: {
        langauge: {
            type: String,
            trim: true
        },
        hints: {
            type: String,
            trim: true
        }
    },
    p2hints: {
        langauge: {
            type: String,
            trim: true
        },
        hints: {
            type: String,
            trim: true
        }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


qtypeSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'subtopicId',
        select: 'name'
    })
    this.populate({
        path: 'topicId',
        select: 'name'
    })
    this.populate({
        path: 'p1Skill',
        select: 'name'
    })
    this.populate({
        path: 'p2Skill',
        select: 'name'
    })
    next();
});

qtypeSchema.pre('save', async function (next) {
    this.updatedAt = Date.now() - 1000;
    next();
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
