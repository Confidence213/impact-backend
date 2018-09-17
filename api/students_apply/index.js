const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.post("/decode_token", helpers.isAuthenticated, controller.decodeToken);
router.post("/set_password", helpers.isAuthenticated, controller.setPassword);
router.post("/generate_sign_up_form", controller.generateSignUpForm);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/", helpers.isAuthenticated, controller.get);
router.get("/:id", helpers.isAuthenticated, controller.getById);
router.put("/:email", helpers.isAuthenticated, controller.put);

module.exports = router;
