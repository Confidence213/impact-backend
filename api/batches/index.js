const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.get("/:id/students", controller.getBatchesByBatch);
router.post("/", helpers.isAuthenticated, controller.post);
router.put("/:id", helpers.isAuthenticated, controller.put);
router.delete("/:id", helpers.isAuthenticated, controller.deleteById);

module.exports = router;
