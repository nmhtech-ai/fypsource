const Question = require('../models/questionModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');


exports.createQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: question
        }
    });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {

    const questions = await Question.find({ "subtopicId": req.body.subtopicId });

    res.status(200).json({
        status: 'success',
        data: {
            data: questions
        }
    });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
    console.log(req.query._id);
    const question = await Question.findById(req.query._id);

    res.status(200).json({
        status: 'success',
        data: {
            question
        }
    });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {

    const question = await Question.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
        runValidators: true
    });

    await question.save();

    if (!question) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: question
        }
    });


});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.editor === "Administrator") {

            await Question.findByIdAndRemove(req.body._id);

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