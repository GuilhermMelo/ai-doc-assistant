

async function errorHandler(error, request, reply) {
  reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: error.message
  })
}

module.exports = errorHandler