const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'itemtype',
    collection: 'logs'
}

const logSchema = new mongoose.Schema({
    performerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    actionType: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, baseOptions);

logSchema.pre(/^find/, function (next) {
    // this.populate({
    //     path: 'performerId',
    //     select: 'authId'
    // })
    // this.populate({
    //     path: 'userId.authId',
    //     // populate: {
    //     //     path: 'authId',
    //     //     select: 'username'
    //     // }
    // })
    next();
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;