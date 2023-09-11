const express = require('express')
const { registerUser, login } = require('./controllers/users')
const { 
  registerPokemon, 
  nicknameUpdate, 
  pokemonsListing, 
  findPokemon,
  pokemonDelete
} = require('./controllers/pokemons')
const userAuthentication = require('./middlers/authentication')


const routers = express()

routers.post('/user', registerUser)
routers.post('/login', login)

routers.use(userAuthentication)

routers.post('/pokemon', registerPokemon)
routers.patch('/nickname/:id', nicknameUpdate)
routers.get('/listingAll', pokemonsListing)
routers.get('/pokemon/:id', findPokemon)
routers.delete('/pokemon/:id', pokemonDelete)

module.exports = routers