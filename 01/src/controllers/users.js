const pool = require('../conection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordJWT = require('../passwordJWT')

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body
  try {
    if (!nome || !email || !senha) {
      return res.status(403).json({ mensagem: "nome, email e senha são obrigatórios!" })
    }
    const emailVerification = 'select email from usuarios where email = $1'
    const { rowCount } = await pool.query(emailVerification, [email])
    if (rowCount >= 1) {
      return res.status(409).json({ mensagem: "Email já existe" })
    }

    const encryptedPassword = await bcrypt.hash(senha, 8)
    
    const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *'
    const params = [nome, email, encryptedPassword]
    const { rows } = await pool.query(query, params)
    return res.status(201).json(rows[0])
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: 'Internal server error' })
  }
}

module.exports = {
  registerUser
}