const express = require('express')
const { registerUser, login } = require('./controllers/users')
const { } = require('./controllers/pokemons')
const checkLoggedUser = require('./middlers/authentication')

const routers = express()

routers.post('/user', registerUser)
routers.post('/login', login)

module.exports = routers