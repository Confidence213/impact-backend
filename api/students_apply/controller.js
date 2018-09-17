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
  // GET /students_apply/login
  login: async (req, res) => {
    try {
      //1. find the accunt
      let student = await models.students_apply
        .findOne({ where: { email: req.body.email } })
        .then(student => student);

      //2. check if the student is exist
      if (student === null) {
        return res.send({
          message: "student not found"
        });
      }

      //3. password validation
      const validPassword = bcrypt.compareSync(
        req.body.password,
        student.password
      );
      if (!validPassword) {
        return res.send({
          message: "password is not valid"
        });
      }

      //4. create payload
      let token_data = {};
      token_data.payload = {
        name: `${student.first_name} ${student.last_name}`,
        email: student.email
      };
      token_data.secret = process.env.JWT_SECRET;
      token_data.options = {
        expiresIn: "30d" // EXPIRATION: 30 days
      };
      const token = jwt.sign(
        token_data.payload,
        token_data.secret,
        token_data.options
      );
      res.send({
        message: "You are logged in",
        email: req.body.email,
        token: token
      });
    } catch (err) {
      res.send({
        message: "error",
        error: err
      });
    }
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
  // POST /students_apply/register
  register: async (req, res) => {
    const SALT_WORK_FACTOR = 10;
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

    req.body.password = bcrypt.hashSync(req.body.password, salt);

    models.students_apply
      .create(req.body)
      .then(student => {
        res.send({
          message: "insert student data success",
          data: student
        });
      })
      .catch(err => {
        res.send({
          message: "error",
          error: err
        });
      });
  },
  // ---------------------------------------------------------------------------
  // PUT /students_apply/:email
  put: async (req, res) => {
    console.log(req.decoded);

    // models.students_apply.findOne({ where: { emp_no: req.params.emp_no } }).then(employee => {
    //     if (employee) {
    //         return employee.update(req.body).then(updated_employee => res.send({
    //             message: "update data success",
    //             data: updated_employee
    //         })).catch(err => Promise.reject(err))
    //     } else {
    //         res.send({
    //             message: "data not found",
    //         })
    //     }
    // }).catch(err => {
    //     res.send({
    //         message: "error",
    //         error: err
    //     })
    // })

    // using async await
    // try {
    //     let employee = await models.employees.findOne({ where: { emp_no: req.params.emp_no } }).then(employee => employee)

    //     if (employee) {
    //         await employee.update(req.body).then(updated_employee => res.send({
    //             message: "update data success",
    //             data: updated_employee
    //         }))
    //     } else {
    //         res.send({
    //             message: "data not found",
    //         })
    //     }
    // } catch (err) {
    //     res.send({
    //         message: "error",
    //         error: err
    //     })
    // }
  },
  // ---------------------------------------------------------------------------
  // POST /students_apply/generate_sign_up_form
  generateSignUpForm: async (req, res) => {
    let email = req.body.email;

    models.students_apply.findOne({ where: { email: email } }).then(student => {
      if (student === null) {
        return res.send({
          message: "Data Not Found"
        });
      } else if (student.passowrd !== null) {
        //generate token
        let token_data = {};
        token_data.payload = {
          name: `${student.fullName}`,
          email: student.email
        };
        token_data.secret = process.env.JWT_SECRET;
        token_data.options = {
          expiresIn: "1d" // EXPIRATION: 1 days
        };
        const token = jwt.sign(
          token_data.payload,
          token_data.secret,
          token_data.options
        );

        //email config
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SYSTEM_EMAIL,
            pass: process.env.SYSTEM_EMAIL_PASSWORD
          }
        });

        const mailOptions = {
          from: process.env.SYSTEM_EMAIL, // sender address
          to: student.email, // list of receivers
          subject: "Signup to IB-Alumni Using This URL", // Subject line
          html: `<p>Set your password: ${
            process.env.CLIENT_URL
          }/signup/${token} </p>` // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.send({
              error: error
            });
          }
          console.log("Message sent: %s", info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.send({
            message: "Success"
          });
        });
      }
    });
  },
  // ---------------------------------------------------------------------------
  // POST /students_apply/set_password
  setPassword: async (req, res) => {
    let password = req.body.password;
    let email = req.decoded.email;
    const SALT_WORK_FACTOR = 10;
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    password = bcrypt.hashSync(password, salt);

    models.students_apply
      .findOne({ where: { email: email } })
      .then(student => {
        if (student) {
          return student
            .update({ password: password })
            .then(updated_student =>
              res.send({
                message: "update data success",
                data: updated_student
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
  },
  // ---------------------------------------------------------------------------
  // POST /students_apply/decode_token
  decodeToken: async (req, res) => {
    if (req.decoded) {
      res.send({
        decoded: req.decoded
      });
    } else {
      res.send({
        message: "token not valid"
      });
    }
  }
};
