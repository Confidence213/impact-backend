const models = require("./../models");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  // ---------------------------------------------------------------------------
  // GET /students_apply
  get: (req, res) => {
    models.students_apply.findAll({ limit: 100 }).then(student => {
      if (student === null) {
        return res.send({
          message: "data not fund"
        });
      }

      res.send({
        data: student
      });
    });
  },
  // ---------------------------------------------------------------------------
  // GET /students_apply/:id
  getById: (req, res) => {
    console.log("test");
    const id = JSON.parse(req.params.id);

    models.students_apply.findAll({ where: { id: id } }).then(student => {
      if (student === null) {
        return res.send({
          message: "data not fund"
        });
      }

      res.send({
        data: student
      });
    });
  },
  // ---------------------------------------------------------------------------
  // POST /students_apply
  post: (req, res) => {
    models.students_apply
      .create(req.body)
      .then(student => {
        res.send({
          message: "insert data success",
          data: student
        });
      })
      .catch(err =>
        res.send({
          message: "error",
          error: err
        })
      );
  },

  // ---------------------------------------------------------------------------
  // DELETE /students_apply/:id
  deleteById: async (req, res) => {
    req.params.id = JSON.parse(req.params.id);

    models.students_apply
      .findOne({ where: { id: req.params.id } })
      .then(student => {
        if (student) {
          return student
            .destroy()
            .then(deleted_student =>
              res.send({
                message: "delete data success",
                data: deleted_student
              })
            )
            .catch(err => Promise.reject(err));
        } else {
          res.send({
            message: "data not found"
          });
        }
      })
      .catch(err => {
        res.send({
          message: "error",
          error: err
        });
      });
  }
};
