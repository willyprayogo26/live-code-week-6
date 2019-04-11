const { isLogin } = require('./authenticate')
const { isAuthorizedUser, isAuthorizedJoke } = require('./authorize')

module.exports = { isLogin, isAuthorizedUser, isAuthorizedJoke }