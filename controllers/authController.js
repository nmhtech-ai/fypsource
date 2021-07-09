const Auth = require("../models/authModel");
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const Parent = require("../models/parentModel");
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

            studentInfo.parentId = parentInfo._id;

            await studentInfo.save();

            const stu = await Student.findById(studentInfo._id).populate('parent');
            console.log(stu);
            const ptu = await Parent.findById(parentInfo._id);
            console.log(ptu);

            console.log("\x1b[43m\x1b[34m%s\x1b[0m", `[SUCCESS] Users information created [${req.body.susername}] and [${req.body.pusername}]`);

            res.status(200).json({
                status: 'success',
                data: null
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

                console.log("\x1b[43m\x1b[34m%s\x1b[0m", `[SUCCESS] User information created [${req.body.username}]`);

                const user = await User.findById(newUserInfo._id);

                res.status(200).json({
                    status: 'success',
                    data: user
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
            req.logIn(user, (err) => {
                if (err) throw err;
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