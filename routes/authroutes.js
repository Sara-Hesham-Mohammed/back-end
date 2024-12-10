const { Router } = require('express');
const authController = require('../controllers/authcontrollers');
const authRouter = Router();
authRouter.post('/signup', authController.postUser);
module.exports = authRouter;
authRouter.post('/signup', authController.postLogin);