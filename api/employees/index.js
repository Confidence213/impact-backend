const express = require("express")
const router = express.Router()
const controller = require("./controller")
const helpers = require("../helpers")

router.get("/search", helpers.isAuthenticated, controller.search)
router.get("/", helpers.isAuthenticated, controller.get)
router.get("/:emp_no", helpers.isAuthenticated, controller.getById)
router.post("/", helpers.isAuthenticated, controller.post)
router.put("/:emp_no", helpers.isAuthenticated, controller.put)
router.delete("/:emp_no", helpers.isAuthenticated, controller.deleteById)

module.exports = router
