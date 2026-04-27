const authMiddleware = require('../middlewares/auth.middleware')
const controller = require('../controllers/chat.controller')

async function chatRoutes(fastify) {
  fastify.addHook('preHandler', authMiddleware)

  fastify.post('/ask', controller.ask)
  fastify.get('/history', controller.history)
}

module.exports = chatRoutes

// const { askChat } = require('../controllers/chat.controller')
// const authMiddleware = require('../middlewares/auth.middleware')

// async function chatRoutes(fastify) {
//   fastify.post(
//     '/chat/:documentId',
//     { preHandler: authMiddleware },
//     askChat
//   )
// }

// module.exports = chatRoutes