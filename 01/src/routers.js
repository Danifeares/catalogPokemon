const express = require('express')
const {} = require('./controllers/users')
const {} = require('./controllers/pokemons')
const checkLoggedUser = require('./middlers/authentication')

const routers = express()



module.exports = routers