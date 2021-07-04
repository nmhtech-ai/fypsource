const mongoose = require('mongoose');
const User = require('./userModel');

const parentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: [true, '[REQUIRED ERROR] A parent must link with a studentId!']
    }
})

parentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'studentId',
        select: '-__v'
    })
    next();
});

const Student = User.discriminator('Student', parentSchema);
module.exports = mongoose.model('Student');
