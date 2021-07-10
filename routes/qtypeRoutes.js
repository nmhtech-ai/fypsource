const express = require('express');
const qtypeController = require('../controllers/qtypeController');

const router = express.Router();

router
    .route('/')
    .get(qtypeController.getAllQTypes)
    .post(qtypeController.createQType);

router
    .route('/edit')
    .get(qtypeController.getQType)
    .delete(qtypeController.deleteQType)
    .patch(qtypeController.updateQType);

module.exports = router;