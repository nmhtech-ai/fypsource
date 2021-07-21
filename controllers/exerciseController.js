const Question = require('../models/questionModel');
const Exercise = require('../models/exerciseModel');
const ORating = require('../models/oRatingModel');
const TRating = require('../models/tRatingModel');
const PLogs = require('../models/pLogModel');
const Skill = require('../models/qskillModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

const tokenize = (input) => {
    let question = input;
    let token = [];

    let qSteps = question.split("=");
    for (let i = 0; i < qSteps.length; i++) {
        input = qSteps[i];

        numbers = input.split(/[*/+-]+/);
        operators = input.split(/[^+-]+/).filter((el) => el != "");

        for (let k = 0; k < numbers.length; k++) {
            token.push(numbers[k]);
            if (k !== numbers.length - 1) {
                token.push(operators[k]);
            }
        }
        if (i !== qSteps.length - 1) {
            token.push("=");
        }
    }
    return token;
};


const ratingOverall = async (userId, id, up, time) => {

    let ratings = [];
    let oRatings = await ORating.findOne({ "userId": userId });
    let index = -1;

    if (oRatings !== null) {
        ratings = oRatings.ratings;
        for (let i = 0; i < ratings.length; i++) {
            if (id == ratings[i].skillId._id) {
                index = i;
            }
        }

        if (index === -1) {
            if (up) {
                let score = ratingAlgo(1, 0, time);
                const rating = {
                    skillId: id,
                    score: score,
                    correctNo: 1,
                    wrongNo: 0,
                }
                oRatings.ratings.push(rating);
                await oRatings.save();


            } else {
                let score = ratingAlgo(0, 1, time);
                const rating = {
                    skillId: id,
                    score: score,
                    correctNo: 0,
                    wrongNo: 1,
                }
                oRatings.ratings.push(rating);
                await oRatings.save();
            }
        } else {
            let c = oRatings.ratings[index].correctNo;
            let w = oRatings.ratings[index].wrongNo;
            let newScore = 0;
            if (up) {
                newScore = ratingAlgo(c + 1, w, time);
                c = c + 1;
            } else {
                newScore = ratingAlgo(c, w + 1, time);
                w = w + 1;
            }
            oRatings.ratings[index].score = newScore;
            oRatings.ratings[index].correctNo = c;
            oRatings.ratings[index].wrongNo = w;
            await oRatings.save();
        }
    }
}

const ratingAlgo = (c, w, time) => {
    let score = 0;
    if (c - w < 0) {
        score = (Math.log(Math.max(2, Math.abs(c - w))) + (25 / time)) * -1;
    } else {
        score = Math.log(Math.max(2, Math.abs(c - w))) * (25 / time);
    }
    return score;
}

const ratingType = async (userId, id, up, time) => {
    let ratings = [];
    let tRatings = await TRating.findOne({ "userId": userId });
    let index = -1;


    if (tRatings !== null) {
        ratings = tRatings.ratings;
        for (let i = 0; i < ratings.length; i++) {
            if (id == ratings[i].typeId._id) {
                index = i;
            }
        }

        if (index === -1) {
            if (up) {
                let score = ratingAlgo(1, 0, time);
                const rating = {
                    typeId: id,
                    score: score,
                    correctNo: 1,
                    wrongNo: 0,
                }
                tRatings.ratings.push(rating);
                await tRatings.save();
            } else {
                let score = ratingAlgo(0, 1, time);
                const rating = {
                    typeId: id,
                    score: score,
                    correctNo: 0,
                    wrongNo: 1,
                }
                tRatings.ratings.push(rating);
                await tRatings.save();
            }
        } else {
            let c = tRatings.ratings[index].correctNo;
            let w = tRatings.ratings[index].wrongNo;
            let newScore = 0;
            if (up) {
                newScore = ratingAlgo(c + 1, w, time);
                c = c + 1;
            } else {
                newScore = ratingAlgo(c, w + 1, time);
                w = w + 1;
            }
            tRatings.ratings[index].score = newScore;
            tRatings.ratings[index].correctNo = c;
            tRatings.ratings[index].wrongNo = w;
            await tRatings.save();
        }
    }

    return true;
};

exports.answerChecking = catchAsync(async (req, res, next) => {

    let qSteps = [];
    let uSteps = [];
    let check = [];
    let question = await Question.findById(req.body.questionId);
    let userInput = req.body.userInput;
    let time = req.body.userTime;
    let userId = req.user._id;
    let hints = null;

    if (question !== null) {
        qSteps = tokenize(question.answer);
        uSteps = tokenize(userInput);
        let number = (qSteps.length > uSteps.length) ? qSteps.length : uSteps.length;
        for (let i = 0; i < number; i++) {
            check.push(qSteps[i] === uSteps[i]);
        }
    }

    // Comprehension
    // ratingOverall(req.user._id, "60f0b0ecd84a1c06a80c99bd", false, time);
    // Speed
    // ratingOverall(req.user._id, "60f0b08ad84a1c06a80c99b7", false, time);
    // Calculation
    // ratingOverall(req.user._id, "60f0b056d84a1c06a80c99b1", false, time);
    // Number Sense
    // ratingOverall(req.user._id, "60f0b02cd84a1c06a80c99ab", false, time);

    // //check time
    await ratingOverall(userId, "60f0b08ad84a1c06a80c99b7", true, time);

    if (uSteps.length > qSteps.length || uSteps.length < qSteps.length) {
        //Comprehension
        await ratingOverall(userId, "60f0b0ecd84a1c06a80c99bd", false, time);
        const skill = await Skill.findById("60f0b0ecd84a1c06a80c99bd");
        hints = skill.hints[0].description;
    } else if (uSteps.length === qSteps.length) {

        if (check[1]) {
            await ratingType(userId, String(question.p1Type), true, time);
        } else {
            await ratingType(userId, String(question.p1Type), false, time);
            if (hints !== null) hints = hints + "\n" + question.p1hints[1].hints;
            else hints = question.p1hints[1].hints;
        }
        if (check[3]) {
            await ratingType(userId, String(question.p2Type), true, time);
        } else {
            await ratingType(userId, String(question.p2Type), false, time);
            if (hints !== null) hints = hints + "\n" + question.p2hints[1].hints;
            else hints = question.p2hints[1].hints;
        }

        if (check[1] && check[3]) {
            // Number Sense
            await ratingOverall(userId, "60f0b02cd84a1c06a80c99ab", check[0], time);
            await ratingOverall(userId, "60f0b02cd84a1c06a80c99ab", check[2], time);
            await ratingOverall(userId, "60f0b02cd84a1c06a80c99ab", check[4], time);
            if (!(check[0] && check[2] && check[4])) {
                const skill = await Skill.findById("60f0b02cd84a1c06a80c99ab");
                if (hints !== null) hints = hints + "\n" + skill.hints[0].description;
                else hints = skill.hints[0].description;
            }
        }

        if (check[0] && check[1] && check[2] && check[3] && check[4]) {
            //Comphrehension
            await ratingOverall(userId, "60f0b0ecd84a1c06a80c99bd", check[7], time)

            if (!check[7]) {
                const skill = await Skill.findById("60f0b0ecd84a1c06a80c99bd");
                if (hints !== null) hints = hints + "\n" + skill.hints[0].description;
                else hints = skill.hints[0].description;

            }

            await ratingOverall(userId, "60f0b056d84a1c06a80c99b1", check[6], time);

            if (!check[6]) {
                await ratingOverall(userId, "60f0b056d84a1c06a80c99b1", false, time);
            }

            if (check[7]) {
                //Calculation
                if (!check[8]) {
                    await ratingOverall(userId, "60f0b056d84a1c06a80c99b1", false, time);
                }
            }

            if (check[6] === false || check[8] === false) {
                const skill = await Skill.findById("60f0b056d84a1c06a80c99b1");
                if (hints !== null) hints = hints + "\n" + skill.hints[0].description;
                else hints = skill.hints[0].description;
            }
        }

        if (check[6] && check[7] && check[8]) {
            //Calculation
            await ratingOverall(userId, "60f0b056d84a1c06a80c99b1", check[10], time);
            if (!check[10]) {
                const skill = await Skill.findById("60f0b056d84a1c06a80c99b1");
                if (hints !== null) hints = hints + "\n" + skill.hints[0].description;
                else hints = skill.hints[0].description;
            }
        }
    }


    let status = "Correct";
    for (let i = 0; i < check.length; i++) {
        if (!check[i]) {
            status = "Incorrect"
        }
    }
    const plog = new PLogs({
        performerId: null,
        userId: userId,
        actionType: "Exercise",
        description: null,
        exerciseId: null,
        questionId: req.body.questionId,
        userInput: userInput,
        status: status
    });

    await plog.save();

    res.status(201).json({
        status: 'success',
        data: check,
        correct: status,
        hints: hints
    });
});

// const adaptiveExercise = catchAsync(async (req, res, next) => {

// });

exports.generateQuestion = catchAsync(async (req, res, next) => {
    const q1 = await PLogs.findOne({ $and: [{ userId: req.user._id }, { questionId: "60efff0d2030f6985063e13e" }] });
    const q2 = await PLogs.findOne({ $and: [{ userId: req.user._id }, { questionId: "60f002a42030f6985063e153" }] });
    const q3 = await PLogs.findOne({ $and: [{ userId: req.user._id }, { questionId: "60f094df70413aa0e8087695" }] });
    const q4 = await PLogs.findOne({ $and: [{ userId: req.user._id }, { questionId: "60f0966a9d71423e20f7e8ad" }] });
    let question = null;
    let tRatings = null;
    if (q1 === null) {
        question = await Question.findById("60efff0d2030f6985063e13e");
    } else if (q2 === null) {
        question = await Question.findById("60f002a42030f6985063e153");
    } else if (q3 === null) {
        question = await Question.findById("60f094df70413aa0e8087695");
    } else if (q4 === null) {
        question = await Question.findById("60f0966a9d71423e20f7e8ad");
    } else {

        tRatings = await TRating.findOne({ "userId": req.user._id });
        let min = 100;
        let minPost = -1;
        for (let i = 0; i < tRatings.ratings.length; i++) {
            if (tRatings.ratings[i].score < min) {
                min = tRatings.ratings[i].score;
                minPost = i;
                // console.log(tRatings.ratings[i].typeId);
            }
        }

        question = await Question.findOne({ $or: [{ p1Type: tRatings.ratings[minPost].typeId }, { p2Type: tRatings.ratings[minPost].typeId }] });
        // console.log(question);

        // let pastQ = null;
        // do {

        //     question = await Question.find({ $or: [{ p1Type: tRatings.ratings[minPost].typeId }, { p2Type: tRatings.ratings[minPost].typeId }] });

        //     for (let i =)
        //         pastQ = await PLogs.findOne({ $and: [{ userId: req.user._id }, { questionId: question._id }] });
        //     if (pastQ !== null) {
        //         console.log("NONE");
        //         continue;
        //     } else {
        //         break;
        //     }
        // } while (1);


        // console.log(question);



    }

    res.status(201).json({
        status: 'success',
        data: {
            question
        }
    });
});

exports.getInitializeTest = catchAsync(async (req, res, next) => {
    const exercise = await Exercise.find({ $and: [{ subtopicId: req.body.subtopicId }, { initialize: { $eq: true } }] });

    res.status(201).json({
        status: 'success',
        data: {
            data: exercise
        }
    });
});

exports.createExercise = catchAsync(async (req, res, next) => {

    const exercise = await Exercise.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: exercise
        }
    });
});

exports.getAllExercises = catchAsync(async (req, res, next) => {

    const exercises = await Exercise.find({ "subtopicId": req.body.subtopicId });

    res.status(200).json({
        status: 'success',
        data: {
            data: exercises
        }
    });
});

exports.getExercise = catchAsync(async (req, res, next) => {
    const exercise = await Exercise.findById(req.body._id);

    res.status(200).json({
        status: 'success',
        data: {
            data: exercise
        }
    });
});

exports.updateExercise = catchAsync(async (req, res, next) => {

    const exercise = await Exercise.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
        runValidators: true
    });

    await exercise.save();

    if (!exercise) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: exercise
        }
    });


});

exports.deleteExercise = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.body.editor === "Administrator") {

            await Exercise.findByIdAndRemove(req.body._id);

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