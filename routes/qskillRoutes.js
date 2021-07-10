const express = require('express');
const qskillController = require('../controllers/qskillController');

const router = express.Router();

router
    .route('/')
    .get(qskillController.getAllQSkills)
    .post(qskillController.createQSkill);

router
    .route('/edit')
    .get(qskillController.getQSkill)
    .delete(qskillController.deleteQSkill)
    .patch(qskillController.updateQSkill);

module.exports = router;