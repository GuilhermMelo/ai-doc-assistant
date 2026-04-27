const controller = require('../controllers/auth.controller')

async function authRoutes(fastify) {
  fastify.post('/register', controller.register)
  fastify.post('/login', controller.login)
}

module.exports = authRoutes