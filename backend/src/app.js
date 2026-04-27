require('dotenv').config()

const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')

const routes = require('./routes')
const errorHandler = require('./middlewares/error.middleware')

async function start() {
  await fastify.register(cors, { origin: true })

  fastify.register(routes)

  fastify.setErrorHandler(errorHandler)

  await fastify.listen({
    port: process.env.PORT || 3001,
    host: '0.0.0.0'
  })
}

start()