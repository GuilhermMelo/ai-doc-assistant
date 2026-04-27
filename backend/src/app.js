require('dotenv').config()

const fastify = require('fastify')({
  logger: true
})

const cors = require('@fastify/cors')
const swagger = require('@fastify/swagger')
const swaggerUI = require('@fastify/swagger-ui')

const routes = require('./routes')
const documentsRoutes = require('./routes/documents.routes')
const errorHandler = require('./middlewares/error.middleware')

async function start() {
  await fastify.register(cors, {
    origin: true
  })

  // Swagger JSON
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'AI Document Assistant API',
        description: 'API para perguntas sobre documentos usando IA',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:3001'
        }
      ]
    }
  })

  // Swagger UI
  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  })

  fastify.register(routes)

  fastify.register(documentsRoutes, {
    prefix: '/documents'
  })

  fastify.setErrorHandler(errorHandler)

  await fastify.listen({
    port: process.env.PORT || 3001,
    host: '0.0.0.0'
  })
}

start()


// require('dotenv').config()

// const fastify = require('fastify')({ logger: true })
// const cors = require('@fastify/cors')

// const routes = require('./routes')
// const documentsRoutes = require('./routes/documents.routes')
// const errorHandler = require('./middlewares/error.middleware')

// async function start() {
//   await fastify.register(cors, { origin: true })

//   fastify.register(routes)

//   fastify.register(documentsRoutes, {
//     prefix: '/documents'
//   })

//   fastify.setErrorHandler(errorHandler)

//   await fastify.listen({
//     port: process.env.PORT || 3001,
//     host: '0.0.0.0'
//   })
// }

// start()