const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "ALUMNI AREA"
  });
});

module.exports = router;
