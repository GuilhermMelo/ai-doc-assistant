const { healthCheck, dbTest } = require('../controllers/health.controller')

async function healthRoutes(fastify, options) {
  fastify.get('/health', healthCheck)
  fastify.get('/db-test', dbTest)
}

module.exports = healthRoutes