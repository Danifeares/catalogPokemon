const express = require('express')
const { registerUser } = require('./controllers/users')
const { } = require('./controllers/pokemons')
const checkLoggedUser = require('./middlers/authentication')

const routers = express()

routers.post('/user', registerUser)

module.exports = routers