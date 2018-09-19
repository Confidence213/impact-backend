const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.get("/:id/students", controller.getBatchesByBatch);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.deleteById);

module.exports = router;
