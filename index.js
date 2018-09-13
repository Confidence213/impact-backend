require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const batches = require("./api/batches");
const partners = require("./api/partners");
// const students = require("./api/students");
const jobDetails = require("./api/jobDetails");
const cors = require("cors");
const index = require("./api");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/", index);
app.use("/batches", batches);
app.use("/partners", partners);
// app.use("/students", students);
app.use("/jobDetails", jobDetails);
app.listen(PORT, () => console.log(`Application Running on  port ${PORT}`));
