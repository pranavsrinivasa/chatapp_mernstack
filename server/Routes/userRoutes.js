const express = require("express");
const { loginController, signupController, fetchAllUsersController } = require("../Controllers/userController");
const { protect } = require("../Middleware/authMiddleware")
const Router = express.Router();

Router.post('/login',loginController);
Router.post('/sign-up', signupController);
Router.get('/fetchUsers',protect,fetchAllUsersController);

module.exports = Router;