const express = require('express')
const { registerUser, login } = require('./controllers/users')
const { } = require('./controllers/pokemons')
const userAuthentication = require('./middlers/authentication')
const test = require('./controllers/pokemons')

const routers = express()

routers.post('/user', registerUser)
routers.post('/login', login)

routers.use(userAuthentication)

routers.get('/teste', test)

module.exports = routers