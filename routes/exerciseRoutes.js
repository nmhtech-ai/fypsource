const express = require('express');
const exerciseController = require('../controllers/exerciseController');

const router = express.Router();

// router
//     .route('/')
//     .get(exerciseController.getAllQuestions)
//     .post(exerciseController.createQuestion);

// router
//     .route('/edit')
//     .get(questionController.getQuestion)
//     .delete(questionController.deleteQuestion)
//     .patch(questionController.updateQuestion);

router
    .route('/auth')
    .post(exerciseController.answerChecking);

router
    .route('/generate')
    .get(exerciseController.generateQuestion);

module.exports = router;