const { Joke } = require('../models')

module.exports = {
    isAuthorizedUser: (req, res, next) => {
        try {
            if(req.user.id.toString() === req.body.userId.toString()) {
                next()
            } else {
                res.status(401).json({
                    message: 'Unauthorized'
                })
            }
        } catch (err) {
            res.status(403).json({
                message: 'Forbidden'
            })
        }
    },

    isAuthorizedJoke: (req, res, next) => {
        try {
            Joke.findOne({
                _id: req.params.id
            })
            .then(joke => {
                if(req.user.id.toString() === joke.userId.toString()) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    }) 
                }
            })
            .catch(err => {
                res.status(403).json({
                    message: err.message
                })
            })
        } catch (err) {
            res.status(403).json({
                message: 'Forbidden'
            })
        }
    }
}