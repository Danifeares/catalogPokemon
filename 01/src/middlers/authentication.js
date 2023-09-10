const pool = require('../conection')
const jwt = require('jsonwebtoken')
const passwordJWT = require('../passwordJWT')

const userAuthentication = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Não autorizado' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, passwordJWT)
    const { rows, rowCount } = await pool.query('select * from usuarios where id = $1;', [id])
    if (rowCount < 1) {
      return res.status(401).json({ mensagem: 'Não autorizado' })
    }

    req.user = rows[0]

    next()

  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ mensagem: 'Não autorizado' })
  }
}

module.exports = userAuthentication