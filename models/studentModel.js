const mongoose = require('mongoose');
const User = require('./userModel');

const studentSchema = new mongoose.Schema({
    school: {
        type: String,
        trim: true,
        required: [true, "[REQUIRED ERROR] School is required!"]
    },
    grade: {
        type: String,
        enum: {
            values: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
            message: '[ENUM ERROR] Grade is invalid!'
        },
        required: [true, "[REQUIRED ERROR] Grade is required!"]
    },
    parentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Parent'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

studentSchema.pre(/^find/, function (next) {
    // this.populate({
    //     path: 'parentId',
    //     select: '-__v'
    // })
    next();
});

studentSchema.virtual('parent', {
    ref: 'Parent',
    foreignField: 'studentId',
    localField: '_id'
});

const Student = User.discriminator('Student', studentSchema);
module.exports = mongoose.model('Student');
