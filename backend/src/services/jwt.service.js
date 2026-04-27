// const jwt = require('jsonwebtoken')

// function generateToken(user) {
//   return jwt.sign(
//     {
//       id: user.id,
//       email: user.email
//     },
//     process.env.JWT_SECRET || 'secret_dev',
//     { expiresIn: '7d' }
//   )
// }

// module.exports = { generateToken }

const jwt = require('jsonwebtoken')

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}

module.exports = {
  generateToken
}