const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/", controller.post);
router.delete("/:id", helpers.isAuthenticated, controller.deleteById);

module.exports = router;
