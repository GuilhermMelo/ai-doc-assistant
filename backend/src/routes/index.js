// const healthRoutes = require('./health.routes')

// async function routes(fastify, options) {
//   fastify.register(healthRoutes)
// }

// module.exports = routes

const healthRoutes = require('./health.routes')
const authRoutes = require('./auth.routes')

async function routes(fastify) {
  fastify.register(healthRoutes)
  fastify.register(authRoutes, { prefix: '/auth' })
}

module.exports = routes