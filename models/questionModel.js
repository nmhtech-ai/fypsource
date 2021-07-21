const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Topic'
    },
    subtopicId: {
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
    p1Type: {
        type: mongoose.Schema.ObjectId,
        ref: 'QType'
    },
    p2Type: {
        type: mongoose.Schema.ObjectId,
        ref: 'QType'
    },
    p1hints: [{
        language: {
            type: String,
            trim: true
        },
        hints: {
            type: String,
            trim: true
        },
        difficulty: {
            type: String,
            enum: {
                values: ['Basic', 'Intermediate', 'Advance'],
                message: '[ENUM ERROR] Difficulty is either: Basic, Intermediate, Advance!'
            }
        }
    }],
    p2hints: [{
        language: {
            type: String,
            trim: true
        },
        hints: {
            type: String,
            trim: true
        },
        difficulty: {
            type: String,
            enum: {
                values: ['Basic', 'Intermediate', 'Advance'],
                message: '[ENUM ERROR] Difficulty is either: Basic, Intermediate, Advance!'
            }
        }
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


questionSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'subtopicId',
        select: 'name'
    })
    this.populate({
        path: 'topicId',
        select: 'name'
    })
    // this.populate({
    //     path: 'p1Type',
    //     select: 'name'
    // })
    // this.populate({
    //     path: 'p2Type',
    //     select: 'name'
    // })
    next();
});

questionSchema.pre('save', async function (next) {
    this.updatedAt = Date.now() - 1000;
    next();
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
