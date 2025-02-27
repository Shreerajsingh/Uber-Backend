const express = require('express');

const { AuthController } = require('../controllers');
const authController = new AuthController();

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/signin', authController.signin);

module.exports = Router;