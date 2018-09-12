require("dotenv").config()

const PORT = process.env.PORT || 3000

const express = require("express")
const logger = require("morgan")
const bodyParser = require('body-parser');

const employees = require("./api/employees")
const accounts = require("./api/accounts")
const cors = require("cors")
const index = require("./api")

const app = express()

app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use("/", index)
app.use("/employees", employees)
app.use("/accounts", accounts)

app.listen(PORT, () => console.log(`Application Running on  port ${PORT}`));