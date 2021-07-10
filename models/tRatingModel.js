const mongoose = require('mongoose');

const tRatingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    ratings: [{
        typeId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Skill'
        },
        score: {
            type: Number
        }
    }]
});

tRatingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'userId',
        select: 'authId.username'
    })
    this.populate({
        path: 'rating.typeId',
        select: '-_v -updatedAt'
    })
    next();
});

const TRating = mongoose.model('TRating', tRatingSchema);
module.exports = TRating;
