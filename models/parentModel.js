const mongoose = require('mongoose');
const User = require('./userModel');

const parentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

parentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'studentId',
        select: '-__v'
    })
    next();
});

const Parent = User.discriminator('Parent', parentSchema);
module.exports = mongoose.model('Parent');
