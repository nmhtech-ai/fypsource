const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router
    .route('/')
    .post(userController.getAllUsers)
    .get(userController.getAllUsers);

router
    .route('/edit')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(userController.updateUser);

router
    .route('/auth')
    .get(userController.getCurrentUser);

router
    .route('/password')
    .post(userController.updatePassword);

router
    .route('/ratings')
    .get(userController.getRatings);


module.exports = router;