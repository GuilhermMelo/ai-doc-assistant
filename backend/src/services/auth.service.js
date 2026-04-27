const bcrypt = require('bcrypt')
const pool = require('../db/connection')

async function registerUser({ name, email, password }) {
  const exists = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  )

  if (exists.rows.length > 0) {
    throw new Error('EMAIL_EXISTS')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, passwordHash]
  )

  return result.rows[0]
}

async function loginUser({ email, password }) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )

  const user = result.rows[0]

  if (!user) {
    throw new Error('INVALID_LOGIN')
  }

  const valid = await bcrypt.compare(password, user.password_hash)

  if (!valid) {
    throw new Error('INVALID_LOGIN')
  }

  return user
}

module.exports = {
  registerUser,
  loginUser
}