const Subtopic = require('../models/subtopicModel');
const Topic = require('../models/topicModel');
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');


exports.createSubtopic = catchAsync(async (req, res, next) => {
    const subtopic = await Subtopic.create(req.body);
    const topic = await Topic.findById(subtopic.topicId);
    topic.subtopicId.push(subtopic._id);
    await topic.save();

    res.status(201).json({
        status: 'success',
        data: {
            data: subtopic
        }
    });
});

exports.getAllSubtopics = catchAsync(async (req, res, next) => {

    const subtopics = await Subtopic.find({ "topicId._id": req.body._id });

    res.status(200).json({
        status: 'success',
        data: {
            data: subtopics
        }
    });
});

exports.getSubtopic = catchAsync(async (req, res, next) => {
    const subtopic = await Subtopic.findById(req.body._id);

    res.status(200).json({
        status: 'success',
        data: {
            data: subtopic
        }
    });
});

exports.updateSubtopic = catchAsync(async (req, res, next) => {

    const subtopic = await Subtopic.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
        runValidators: true
    });

    if (!topic) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: subtopic
        }
    });


});

exports.deleteSubtopic = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.editor === "Administrator") {

            const subtopic = await Subtopic.findById(req.body._id);
            const topic = await Topic.findById(subtopic.topicId);
            topic.subtopicId.pull(subtopic._id)
            await Subtopic.findByIdAndRemove(subtopic._id);


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