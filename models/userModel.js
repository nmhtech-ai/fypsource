const mongoose = require('mongoose');
const roles = require('../utils/roles');
const groups = require('../utils/groups');

const baseOptions = {
    discriminatorKey: 'itemtype',
    collection: 'users'
}

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: [true, "[REQUIRED ERROR] Fullname is required!"]
    },
    nickname: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female'],
            message: '[ENUM ERROR] Gender is either: Male or Female!'
        },
        required: [true, "[REQUIRED ERROR] gender is required!"]
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    birthdate: {
        type: String
    },
    role: {
        type: String,
        enum: {
            values: [
                roles.ADMIN,
                roles.BASIC,
                roles.DEVELOPER,
                roles.EDITOR,
                roles.TEACHER,
                roles.PARENT,
                roles.STUDENT],
            message: '[ENUM ERROR] Role is invalid!'
        },
        required: [true, "[REQUIRED ERROR] Role is required!"]
    },
    group: {
        type: String,
        enum: {
            values: [
                groups.CLIENTS,
                groups.DEVELOPERS],
            message: '[ENUM ERROR] Group is either: Clients OR Developers!'
        },
        required: [true, "[REQUIRED ERROR] Role is required!"]
    },
    authId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Auth',
        required: [true, '[REQUIRED ERROR] A user must link with a authId!']
    }
}, baseOptions);

userSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'authId',
        select: '-__v'
    })
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;