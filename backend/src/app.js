require('dotenv').config()

const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const pool = require('./db/connection')

async function start() {
  await fastify.register(cors, { origin: true })

  fastify.get('/health', async () => {
    return { status: 'ok', message: 'API running' }
  })

  fastify.get('/db-test', async () => {
    const result = await pool.query('SELECT NOW()')
    return {
      status: 'connected',
      time: result.rows[0]
    }
  })

  const PORT = process.env.PORT || 3001

  await fastify.listen({
    port: PORT,
    host: '0.0.0.0'
  })
}

start()