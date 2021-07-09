const User = require("../models/userModel");
const Auth = require("../models/authModel");
const Student = require("../models/studentModel");
const Parent = require("../models/parentModel");
const catchAsync = require("../utils/catchAsync");
const { STUDENT } = require("../utils/roles");

exports.getUser = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findOne({ _id: req.user._id }, async (err, user) => {
            if (err) throw err;
            if (user) {
                res.status(200).json({
                    status: 'success',
                    data: user
                });
            }
        });
    } else {
        res.status(401).json({
            status: 'error',
            message: '[ERROR] Unauthorized',
            data: {
                isAuthenticated: false
            }
        });
    };
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.editor === "Administrator") {
            const userId = req.body._id;
            const user = await User.findOne({ _id: userId });
            console.log(user);
            if (user.role === "Student") {
                const parent = await User.findById(user.parentId);
                await Auth.findByIdAndRemove(parent.authId._id);
                await User.findByIdAndRemove(parent._id);
                await Auth.findByIdAndRemove(user.authId._id);
                await User.findByIdAndRemove(userId);
                res.status(200).json({
                    status: 'success',
                    data: null
                });
            } else if (user.role === "Parent") {
                const student = await User.findById(user.studentId);
                await Auth.findByIdAndRemove(student.authId._id);
                await User.findByIdAndRemove(student._id);
                await Auth.findByIdAndRemove(user.authId._id);
                await User.findByIdAndRemove(userId);
                res.status(200).json({
                    status: 'success',
                    data: null
                });
            } else {
                await Auth.findByIdAndRemove(user.authId._id);
                await User.findByIdAndRemove(userId);
                res.status(200).json({
                    status: 'success',
                    data: null
                });
            }
        } else {
            res.status(401).json({
                status: 'error',
                message: '[ERROR] Unauthorized',
                data: {
                    unAuthorized: true
                }
            });
        }
    } else {
        res.status(401).json({
            status: 'error',
            message: '[ERROR] Unauthorized',
            data: {
                isAuthenticated: false
            }
        });
    };
});

exports.updateUser = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        const userId = req.body._id;
        const user = await User.findOne({ _id: userId });
        const auth = await Auth.findOne({ _id: user.authId._id });
        //Auth Info
        auth.username = req.body.username;
        if (req.body.password !== null && req.body.password !== "") {
            auth.password = req.body.password;
        };
        await auth.save();
        if (user.role === "Student") {

            //User info
            user.fullname = req.body.fullname;
            user.nickname = req.body.nickname;
            user.gender = req.body.gender;
            user.mobile = req.body.mobile;
            user.email = req.body.email;
            user.birthdate = req.body.birthdate;
            user.grade = req.body.grade;
            user.school = req.body.school;
            await user.save();

        } else if (user.role === "Parent") {

            //User info
            user.fullname = req.body.fullname;
            user.nickname = req.body.nickname;
            user.gender = req.body.gender;
            user.mobile = req.body.mobile;
            user.email = req.body.email;
            user.birthdate = req.body.birthdate;
            await user.save();

        } else {

            //User info
            user.fullname = req.body.fullname;
            user.nickname = req.body.nickname;
            user.gender = req.body.gender;
            user.mobile = req.body.mobile;
            user.email = req.body.email;
            user.birthdate = req.body.birthdate;
            user.role = req.body.role;
            user.group = req.body.group;
            await user.save();

        }

        console.log("\x1b[43m\x1b[34m%s\x1b[0m", `[SUCCESS] User information updated [${req.body.username}]`);

        res.status(200).json({
            status: 'success',
            data: user
        });
    } else {
        res.status(401).json({
            status: 'error',
            message: '[ERROR] Unauthorized',
            data: {
                isAuthenticated: false
            }
        });
    };
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.group === 'Developers') {
            User.find({ group: req.body.group }, (err, docs) => {
                if (err) throw err;
                if (docs) {
                    res.send(docs);
                }
            })
        } else {
            if (req.body.role === 'Student') {
                Student.find({ $and: [{ group: req.body.group }, { role: req.body.role }] }, function (err, docs) {
                    if (err) throw err;
                    if (!docs) {
                        console.log("No user found");
                    } else {
                        res.send(docs);
                    }
                });
            } else {
                Parent.find({ $and: [{ group: req.body.group }, { role: req.body.role }] }, function (err, docs) {
                    if (err) throw err;
                    if (!docs) {
                        console.log("No user found");
                    } else {
                        res.send(docs);
                    }
                });
            }

        }
    } else {
        res.status(401).json({
            status: 'error',
            message: '[ERROR] Unauthorized',
            data: {
                isAuthenticated: false
            }
        });
    }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    Auth.findOne({ username: req.body.username }, async (err, user) => {
        if (user) {
            bcrypt.compare(req.body.oldPassword, user.password, async (err, result) => {
                if (err) throw err;
                if (req.body.oldPassword != req.body.newPassword) {
                    if (result === true) {
                        user.password = req.body.newPassword;
                        await user.save();

                        res.status(200).json({
                            status: 'success',
                            message: '[SUCCESS] Password Changed!',
                            data: {
                                success: true,
                                duplicated: false
                            }
                        });
                    } else {
                        res.status(400).json({
                            status: 'error',
                            message: '[FAILURE] Incorrect password!',
                            data: {
                                success: false,
                                duplicated: false
                            }
                        });
                    }
                } else {
                    res.status(400).json({
                        status: 'error',
                        message: '[FAILURE] Cannot use the same password!',
                        data: {
                            success: false,
                            duplicated: true
                        }
                    });
                }
            });
        }
    });
});