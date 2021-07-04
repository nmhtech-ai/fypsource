const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "[MODEL ERROR] Username is required!"]
    },
    password: {
        type: String,
        select: false,
        required: [true, "[MODEL ERROR] Password is required!"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

authSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

authSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.updatedAt = Date.now() - 1000;
    next();
})

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;
