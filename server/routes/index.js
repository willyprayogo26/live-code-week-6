const router = require('express').Router()
const { userController, jokeController } = require('../controllers')
const { isLogin, isAuthorizedUser, isAuthorizedJoke } = require('../middlewares')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use(isLogin)
router.get('/jokes', jokeController.getAll)
router.get('/', jokeController.getJokeByUser)
router.post('/favorites', isAuthorizedUser, jokeController.addFavorite)
router.delete('/favorites/:id', isAuthorizedJoke, jokeController.deleteJoke)

module.exports = router