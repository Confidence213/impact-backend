const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/:id/students", helpers.isAuthenticated, controller.getStudentsByBatch);
router.get("/search", helpers.isAuthenticated, controller.search);
router.get("/", helpers.isAuthenticated, controller.get);
router.get("/:id", helpers.isAuthenticated, controller.getById);
router.post("/", helpers.isAuthenticated, controller.post);
router.put("/:id", helpers.isAuthenticated, controller.put);
router.delete("/:id", helpers.isAuthenticated, controller.deleteById);

module.exports = router;
