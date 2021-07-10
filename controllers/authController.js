const Auth = require("../models/authModel");
const User = require("../models/userModel");
const ORating = require('../models/oRatingModel');
const TRating = require('../models/tRatingModel');
const Student = require("../models/studentModel");
const Parent = require("../models/parentModel");
const Log = require("../models/logModel");
const catchAsync = require("../utils/catchAsync");
const passport = require('passport');

exports.signup = catchAsync(async (req, res, next) => {

    console.log(req.body);

    if (req.body.group === 'Clients') {

        const dupStudent = await Auth.findOne({ username: req.body.susername });
        const dupParent = await Auth.findOne({ username: req.body.pusername });

        if (dupStudent === null && dupParent === null) {
            //Auth Info
            const studentAuth = new Auth({
                username: req.body.susername,
                password: req.body.spassword
            })

            await studentAuth.save();

            //Create user info
            const studentInfo = new Student({
                fullname: req.body.sfullname,
                nickname: req.body.snickname,
                gender: req.body.sgender,
                mobile: req.body.smobile,
                email: req.body.semail,
                birthdate: req.body.sbirthdate,
                role: "Student",
                group: "Clients",
                authId: studentAuth._id,
                grade: req.body.sgrade,
                school: req.body.sschool
            });

            await studentInfo.save();

            //Auth Info
            const parentAuth = new Auth({
                username: req.body.pusername,
                password: req.body.ppassword
            })

            await parentAuth.save();

            //Create user info
            const parentInfo = new Parent({
                fullname: req.body.pfullname,
                nickname: req.body.pnickname,
                gender: req.body.pgender,
                mobile: req.body.pmobile,
                email: req.body.pemail,
                birthdate: req.body.pbirthdate,
                role: "Parent",
                group: "Clients",
                authId: parentAuth._id,
                studentId: studentInfo._id
            });

            await parentInfo.save();

            //Create Rating Profile
            const oRating = new ORating({
                userId: studentInfo._id
            });
            const tRating = new TRating({
                userId: studentInfo._id
            });

            await oRating.save();
            await tRating.save();

            //Link Parent, Rating Profile to student
            studentInfo.parentId = parentInfo._id;
            studentInfo.oRatingId = oRating._id;
            studentInfo.tRatingId = tRating._id;

            await studentInfo.save();

            const studentLog = new Log({
                performerId: null,
                userId: studentInfo._id,
                actionType: "User Created",
                description: `[SUCCESS] Users information created [${req.body.susername}]`,
            })

            const parentLog = new Log({
                performerId: null,
                userId: parentInfo._id,
                actionType: "User Created",
                description: `[SUCCESS] Users information created [${req.body.pusername}]`,
            })

            await studentLog.save();
            await parentLog.save();

            console.log("\x1b[43m\x1b[34m%s\x1b[0m", `[SUCCESS] Users information created [${req.body.susername}] and [${req.body.pusername}]`);

            res.status(200).json({
                status: 'success',
                data: {
                    studentLog: studentLog,
                    parentLog: parentLog
                }
            });

        } else if (dupStudent !== null && dupParent !== null) {
            res.status(409).json({
                status: 'error',
                message: 'Username exists',
                data: {
                    sduplicate: true,
                    pduplicate: true
                }
            });
            console.log("\x1b[41m\x1b[37m%s\x1b[0m", `[ERROR] Both student and parent username already exists [${req.body.susername}]`);
        } else if (dupStudent !== null) {
            res.status(409).json({
                status: 'error',
                message: 'Username exists',
                data: {
                    sduplicate: true,
                    pduplicate: false
                }
            });
            console.log("\x1b[41m\x1b[37m%s\x1b[0m", `[ERROR] Student username already exists [${req.body.susername}]`);
        } else if (dupParent !== null) {
            res.status(409).json({
                status: 'error',
                message: 'Username exists',
                data: {
                    sduplicate: false,
                    pduplicate: true
                }
            });
            console.log("\x1b[41m\x1b[37m%s\x1b[0m", `[ERROR] Parent username already exists [${req.body.pusername}]`);
        }

    } else {
        Auth.findOne({ username: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) {
                res.status(409).json({
                    status: 'error',
                    message: 'Username exists'
                });
                console.log("\x1b[41m\x1b[37m%s\x1b[0m", `[ERROR] Username already exists [${req.body.username}]`);
            }
            else {
                //Auth Info
                const newAuth = new Auth({
                    username: req.body.username,
                    password: req.body.password
                })

                await newAuth.save();

                //Create user info
                const newUserInfo = new User({
                    fullname: req.body.fullname,
                    nickname: req.body.nickname,
                    gender: req.body.gender,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    birthdate: req.body.birthdate,
                    role: req.body.role,
                    group: req.body.group,
                    authId: newAuth._id,
                });

                await newUserInfo.save();

                const systemLog = new Log({
                    performerId: null,
                    userId: newUserInfo._id,
                    actionType: "User Created",
                    description: `[SUCCESS] Users information created [${req.body.username}]`,
                })

                await systemLog.save();

                console.log("\x1b[43m\x1b[34m%s\x1b[0m", `[SUCCESS] User information created [${req.body.username}]`);

                const log = await Log.findById(systemLog._id);
                const user = await User.findById(newUserInfo._id);

                res.status(200).json({
                    status: 'success',
                    data: {
                        user: user,
                        log: log
                    }
                });
            }
        });
    }
});


exports.login = catchAsync(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(409).json({
                status: 'error',
                message: '[ERROR] Authentication Failure',
                data: {
                    isAuthenticated: false,
                    user: null
                }
            });
        } else {
            req.logIn(user, async (err) => {
                if (err) throw err;

                const systemLog = new Log({
                    performerId: user._id,
                    userId: null,
                    actionType: "User Login",
                    description: `[SUCCESS] User login [${user.username}]`,
                })

                await systemLog.save();

                res.status(200).json({
                    status: 'success',
                    data: {
                        isAuthenticated: true,
                        id: req.user._id,
                        fullname: req.user.fullname,
                        username: req.user.username,
                        createdAt: req.user.createdAt
                    }
                });
            })
        }
    })(req, res, next);
});

exports.logout = catchAsync(async (req, res, next) => {
    req.logout();
    res.status(200).json({
        status: 'success',
        data: null
    });
});