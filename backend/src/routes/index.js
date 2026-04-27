const healthRoutes = require('./health.routes')
const authRoutes = require('./auth.routes')
const chatRoutes = require('./chat.routes')

async function routes(fastify) {
  fastify.register(healthRoutes)
  fastify.register(authRoutes, {
    prefix: '/auth'
  })
  fastify.register(chatRoutes, {
    prefix: '/chat'
  })
}

module.exports = routes



// const healthRoutes = require('./health.routes')
// const authRoutes = require('./auth.routes')
// const chatRoutes = require('./chat.routes')

// async function routes(fastify) {
//   fastify.register(healthRoutes)
  
//   fastify.register(authRoutes, { prefix: '/auth' })
// fastify.register(chatRoutes)
// }

// module.exports = routes