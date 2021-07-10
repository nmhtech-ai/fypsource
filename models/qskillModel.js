const mongoose = require('mongoose');

const qskillSchema = new mongoose.Schema({
    name: [{
        language: {
            type: String
        },
        description: {
            type: String
        }
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

qskillSchema.pre('save', async function (next) {
    this.updatedAt = Date.now() - 1000;
    next();
})

const QSkill = mongoose.model('QSkill', qskillSchema);
module.exports = QSkill;
