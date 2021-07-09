const express = require('express');
const topicController = require('../controllers/topicController');

const router = express.Router();

router
    .route('/')
    .get(topicController.getAllTopics)
    .post(topicController.createTopic);

router
    .route('/edit')
    .get(topicController.getTopic)
    .delete(topicController.deleteTopic)
    .patch(topicController.updateTopic);

module.exports = router;