const pool = require('../db/connection')

async function healthCheck(request, reply) {
  return {
    status: 'ok',
    message: 'API running'
  }
}

async function dbTest(request, reply) {
  const result = await pool.query('SELECT NOW() AS now')

  return {
    status: 'connected',
    time: result.rows[0]
  }
}

module.exports = {
  healthCheck,
  dbTest
}