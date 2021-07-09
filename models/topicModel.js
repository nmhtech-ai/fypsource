const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "[REQUIRED ERROR] Code is required!"]
    },
    name: [
        {
            language: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    grade: {
        type: String,
        enum: {
            values: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
            message: '[ENUM ERROR] Grade is invalid!'
        },
        required: [true, "[REQUIRED ERROR] Grade is required!"]
    },
    semester: {
        type: String,
        enum: {
            values: ['A', 'B'],
            message: '[ENUM ERROR] Semester is invalid!'
        },
        required: [true, "[REQUIRED ERROR] Semester is required!"]
    },
    subtopicId: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Subtopic'
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

topicSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'subtopicId',
        select: '-__v -topicId -updatedAt'
    })
    next();
});

// topicSchema.virtual('subtopics', {
//     ref: 'Subtopic',
//     foreignField: '_id',
//     localField: 'subtopicId'
// });

topicSchema.pre('save', async function (next) {
    this.updatedAt = Date.now() - 1000;
    next();
})

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
