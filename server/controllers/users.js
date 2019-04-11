const { User } = require('../models')
const { bcrypt, jwt } = require('../helpers')

class userController {
    static register (req, res) {
        User.create({
            ...req.body
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            if(err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            } else if(err.errors.password) {
                res.status(400).json({
                    message: err.errors.password.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static login (req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user && bcrypt.comparePassword(req.body.password, user.password)) {
                let token = jwt.jwtSign({
                    id: user.id
                })
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                    "access_token": token
                })
            } else {
                res.status(400).json({
                    message: 'Invalid email/password'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = userController