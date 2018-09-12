const express = require("express")
const router = express.Router()
const controller = require("./controller")
const helpers = require("../helpers")

router.post("/register", controller.register)
router.post("/login", controller.login)
router.get("/", helpers.isAuthenticated, controller.get)
router.put("/:email", helpers.isAuthenticated, controller.put)

module.exports = router
