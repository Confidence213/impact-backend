const jwt = require("jsonwebtoken")
const models = require("../models")

module.exports = {
    isAuthenticated: async (req, res, next) => {
        // (1) Check for token from various ways
        const token =
            req.body.token ||
            req.query.token ||
            req.headers.authorization && 
            req.headers.authorization.split(" ")[1] ||
            undefined

        if (token === undefined) {
            return res.send({
                message: "token not found"
            })
        }

        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);

            let account = models.accounts.findOne({ where: { email: decoded.email } }).then(account => {
                if (account === null) {
                    return res.send({
                        message: "No account is associated with that token"
                    })
                }

                req.decoded = decoded
                next()
            })
        } catch (err) {
            res.send({
                message: "token not valid",
                error: err
            })
        }

    }
}
