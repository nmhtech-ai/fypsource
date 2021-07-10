const QSkill = require('../models/qskillModel');
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');


exports.createQSkill = catchAsync(async (req, res, next) => {
    const qskill = await QSkill.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: qskill
        }
    });
});

exports.getAllQSkills = catchAsync(async (req, res, next) => {

    const qskill = await QSkill.find();

    res.status(200).json({
        status: 'success',
        data: {
            data: qskill
        }
    });
});

exports.getQSkill = catchAsync(async (req, res, next) => {
    const qskill = await QSkill.findById(req.body._id);

    res.status(200).json({
        status: 'success',
        data: {
            data: qskill
        }
    });
});

exports.updateQSkill = catchAsync(async (req, res, next) => {

    const qskill = await QSkill.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
        runValidators: true
    });

    await qskill.save();

    if (!qskill) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: qskill
        }
    });


});

exports.deleteQSkill = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.editor === "Administrator") {

            await QSkill.findByIdAndRemove(req.body._id);

            res.status(200).json({
                status: 'success',
                data: {
                    data: null
                }
            });
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
    }


});