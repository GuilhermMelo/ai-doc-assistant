// const controller = require('../controllers/auth.controller')

// async function authRoutes(fastify) {
//   fastify.post('/register', controller.register)
//   fastify.post('/login', controller.login)
// }

// module.exports = authRoutes

const {
  register,
  login
} = require('../controllers/auth.controller')

async function authRoutes(app) {
  app.post('/register', register)
  app.post('/login', login)
}

module.exports = authRoutes
