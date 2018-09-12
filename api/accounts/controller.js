const models = require("./../models")
const bcrypt = require('bcryptjs')
const moment = require('moment')
const jwt = require("jsonwebtoken")


module.exports = {
    // ---------------------------------------------------------------------------
    // GET /accounts
    get: (req, res) => {
        models.accounts.findAll({ limit: 100 }).then(employee => {
            if (employee === null) {
                return res.send({
                    message: "data not fund"
                })
            }

            res.send({
                data: employee
            })
        })
    },
    // ---------------------------------------------------------------------------
    // GET /accounts/login
    login: async (req, res) => {

        try {

            //1. find the accunt
            let account = await models.accounts.findOne({ where: { email: req.body.email } }).then(account => account)

            //2. check if the account is exist
            if (account === null) {
                return res.send({
                    message: "account not found"
                })
            }

            //3. password validation
            const validPassword = bcrypt.compareSync(
                req.body.password,
                account.password
            )
            if (!validPassword) {
                return res.send({
                    message: "password is not valid"
                })
            }

            //4. create payload
            let token_data = {}
            token_data.payload = {
                name: `${account.first_name} ${account.last_name}`,
                email: account.email
            }
            token_data.secret = process.env.JWT_SECRET
            token_data.options = {
                expiresIn: "30d" // EXPIRATION: 30 days
            }
            const token = jwt.sign(token_data.payload, token_data.secret, token_data.options)
            res.send({
                message: "You are logged in",
                email: req.body.email,
                token: token
            })


        } catch (err) {
            res.send({
                message: "error",
                error: err
            })
        }

    },
    // ---------------------------------------------------------------------------
    // GET /accounts/:emp_no
    getById: (req, res) => {
        req.params.emp_no = JSON.parse(req.params.emp_no)
        models.employees.findOne({ where: { emp_no: req.params.emp_no } }).then(employee => {
            if (employee === null) {
                return res.send({
                    message: "data not fund"
                })
            }

            res.send({
                data: employee
            })
        })
    },
    // ---------------------------------------------------------------------------
    // POST /accounts/register
    register: async (req, res) => {
        const SALT_WORK_FACTOR = 10
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

        req.body.password = bcrypt.hashSync(req.body.password, salt);

        models.accounts.create(req.body).then(account => {
            res.send({
                message: "insert account data success",
                data: account
            })
        }).catch(err => {
            res.send({
                message: "error",
                error: err
            })
        })

    },
    // ---------------------------------------------------------------------------
    // PUT /accounts/:email
    put: async (req, res) => {
        console.log(req.decoded)
        
        // models.accounts.findOne({ where: { emp_no: req.params.emp_no } }).then(employee => {
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

    }
  
}
