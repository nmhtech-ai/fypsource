const mongoose = require('mongoose');

const oRatingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    difficulties: [{
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
        averageTime: {
            type: Number
        }
    }],
    ratings: [{
        skillId: {
            type: mongoose.Schema.ObjectId,
            ref: 'QSkill'
        },
        score: {
            type: Number
        },
        correctNo: {
            type: Number
        },
        wrongNo: {
            type: Number
        }
    }]
});

oRatingSchema.pre(/^find/, function (next) {
    // this.populate({
    //     path: 'userId',
    //     select: 'authId.username'
    // })
    this.populate({
        path: 'ratings.skillId',
        select: '-_v -updatedAt'
    })
    next();
});

const ORating = mongoose.model('ORating', oRatingSchema);
module.exports = ORating;
