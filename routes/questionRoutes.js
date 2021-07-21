const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

router
    .route('/')
    .get(questionController.getAllQuestions)
    .post(questionController.createQuestion);

router
    .route('/edit')
    .get(questionController.getQuestion)
    .delete(questionController.deleteQuestion)
    .patch(questionController.updateQuestion);

module.exports = router;