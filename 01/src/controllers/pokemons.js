const pool = require('../conection')

const registerPokemon = async (req, res) => {
  const { nome, habilidades, imagem, apelido } = req.body
  try {
    if (!nome || !habilidades) {
      return res.status(400).json({ message: "Os campos nome e habilidades são obrigatórios" })
    }
    if (typeof habilidades !== 'string') {
      return res.status(406).json({ message: "Habilidades devem ser listadas em forma de texto e separadas por vírgula" })
    }
    const userID = req.user.id
    const queryPokemon = 'insert into pokemons (usuario_id, nome, habilidades, imagem, apelido) values ($1, $2, $3, $4, $5) returning *;'
    const params = [userID, nome, habilidades, imagem, apelido]
    const { rows } = await pool.query(queryPokemon, params)
    return res.status(201).json(rows[0])
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const nicknameUpdate = async (req, res) => {
  const { apelido } = req.body
  const { id } = req.params
  try {
    if (!apelido) {
      return res.status(400).json({ message: 'O campo apelido é obrigatório.' })
    }
    const queryNickname = 'update pokemons set apelido = $1 where id = $2 returning *'
    const { rows } = await pool.query(queryNickname, [apelido, id])
    return res.status(200).json(rows[0])
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const pokemonsListing = async (req, res) => {
  try {
    const queryList = `
    select
    p.id,
    u.nome as usuario,
    p.nome,
    p.apelido,
    p.habilidades,
    p.imagem
    from usuarios u join pokemons p
    on u.id = p.usuario_id
    where p.usuario_id = $1;
    `
    const userID = req.user.id

    const { rows } = await pool.query(queryList, [userID])

    const list = rows.map((pokemon) => ({
      id: pokemon.id,
      usuario: pokemon.usuario,
      nome: pokemon.nome,
      apelido: pokemon.apelido,
      habilidades: pokemon.habilidades.split(','),
      imagem: pokemon.imagem
    }))

    return res.status(200).json(list)

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const findPokemon = async (req, res) => {
  const { id } = req.params
  const userID = req.user.id
  try {
    const { rowCount } = await pool.query('select * from pokemons where id = $1 and usuario_id = $2', [id, userID])
    if (rowCount < 1) {
      return res.status(404).json({ mensagem: 'id não localizado ou o pokemon não pertence ao usuário logado.' })
    }

    const queryList = `
    select
    p.id,
    u.nome as usuario,
    p.nome,
    p.apelido,
    p.habilidades,
    p.imagem
    from usuarios u join pokemons p
    on u.id = p.usuario_id
    where p.id = $1;
    `


    const { rows } = await pool.query(queryList, [id])

    const list = {
      id: rows[0].id,
      usuario: rows[0].usuario,
      nome: rows[0].nome,
      apelido: rows[0].apelido,
      habilidades: rows[0].habilidades.split(','),
      imagem: rows[0].imagem
    }

    return res.status(200).json(list)
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const pokemonDelete = async (req, res) => {
  const { id } = req.params
  const userID = req.user.id
  try {
    const { rowCount } = await pool.query('select * from pokemons where id = $1 and usuario_id = $2', [id, userID])
    if (rowCount < 1) {
      return res.status(404).json({ mensagem: 'id não localizado ou o pokemon não pertence ao usuário logado.' })
    }
    const queryDelete = 'delete from pokemons where id = $1'
    await pool.query(queryDelete, [id])
    return res.status(200).json({ mensagem: `Pokemon de id ${id} deletado com sucesso.` })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }

}

module.exports = {
  registerPokemon,
  nicknameUpdate,
  pokemonsListing,
  findPokemon,
  pokemonDelete
}