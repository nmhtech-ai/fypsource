const express = require('express');
const subtopicController = require('../controllers/subtopicController');

const router = express.Router();

router
    .route('/')
    .get(subtopicController.getAllSubtopics)
    .post(subtopicController.createSubtopic);

router
    .route('/edit')
    .get(subtopicController.getSubtopic)
    .delete(subtopicController.deleteSubtopic)
    .patch(subtopicController.updateSubtopic);

module.exports = router;