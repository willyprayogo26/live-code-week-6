const axios = require('axios')
const { Joke } = require('../models')

class jokeController {
    static getAll (req, res) {
        axios
            .get(`https://icanhazdadjoke.com`, {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getJokeByUser (req, res) {
        Joke.find({
            userId: req.user.id
        })
        .populate('userId')
        .then(jokes => {
            res.status(200).json(jokes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addFavorite (req, res) {
        Joke.create({
            ...req.body
        })
        .then(joke => {
            res.status(201).json(joke)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteJoke (req, res) {
        Joke.findOneAndDelete({
            _id: req.params.id
        })
        .then(joke => {
            if(joke) {
                res.status(200).json({
                    message: 'Joke successfully deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Joke not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = jokeController