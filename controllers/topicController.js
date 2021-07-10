const Topic = require('../models/topicModel');
const Subtopic = require('../models/subtopicModel');
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.createTopic = factory.createOne(Topic);

exports.getAllTopics = catchAsync(async (req, res, next) => {

    const topics = await Topic.find({ grade: req.body.grade });

    res.status(200).json({
        status: 'success',
        data: {
            data: topics
        }
    });
});

exports.getTopic = catchAsync(async (req, res, next) => {
    const topic = await Topic.findById(req.body._id);

    res.status(200).json({
        status: 'success',
        data: {
            data: topic
        }
    });
});

exports.updateTopic = catchAsync(async (req, res, next) => {

    const topic = await Topic.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
        runValidators: true
    });

    await topic.save();

    if (!topic) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: topic
        }
    });


});

exports.deleteTopic = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.editor === "Administrator") {
            const topic = await Topic.findById(req.body._id);
            if (topic.subtopicId.length !== 0) {
                topic.subtopicId.forEach(async (el) => await Subtopic.findByIdAndRemove(el._id));
            }

            await Topic.findByIdAndRemove(req.body._id);

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