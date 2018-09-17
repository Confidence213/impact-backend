const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/:id/students", controller.getStudentsByBatch);
router.get("/search", controller.search);
router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/", helpers.isAuthenticated, controller.post);
router.put("/:id", helpers.isAuthenticated, controller.put);
router.delete("/:id", helpers.isAuthenticated, controller.deleteById);

module.exports = router;
