const mongoose = require('mongoose');

const oRatingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    ratings: [{
        skillId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Skill'
        },
        score: {
            type: Number
        }
    }]
});

oRatingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'userId',
        select: 'authId.username'
    })
    this.populate({
        path: 'rating.skillId',
        select: '-_v -updatedAt'
    })
    next();
});

const ORating = mongoose.model('ORating', oRatingSchema);
module.exports = ORating;
