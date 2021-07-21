const Subtopic = require('../models/subtopicModel');
const QType = require('../models/qtypeModel');
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');


exports.createQType = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const qtype = await QType.create(req.body);
    console.log(qtype);
    const subtopic = await Subtopic.findById(qtype.subtopicId);
    subtopic.qtypeId.push(qtype._id);
    await subtopic.save();

    res.status(201).json({
        status: 'success',
        data: {
            data: qtype
        }
    });
});

exports.getAllQTypes = catchAsync(async (req, res, next) => {

    const qtype = await QType.find({ "subtopicId._id": req.body._id });

    res.status(200).json({
        status: 'success',
        data: {
            data: qtype
        }
    });
});

exports.getQType = catchAsync(async (req, res, next) => {
    const qtype = await QType.findById(req.body._id);

    res.status(200).json({
        status: 'success',
        data: {
            data: qtype
        }
    });
});

exports.updateQType = catchAsync(async (req, res, next) => {

    const qtype = await QType.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
        runValidators: true
    });

    await qtype.save();

    if (!qtype) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: qtype
        }
    });


});

exports.deleteQType = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.editor === "Administrator") {

            const qtype = await QType.findById(req.body._id);
            const subtopic = await Subtopic.findById(qtype.subtopicId);
            if (subtopic !== null) {
                if (subtopic.qtypeId !== null) {
                    subtopic.qtypeId.pull(qtype._id)
                }
            }
            await QType.findByIdAndRemove(qtype._id);


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