// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.schema");
const { getCurrentUser } = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');


router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.get('/me', protect, getCurrentUser);


module.exports = router;
