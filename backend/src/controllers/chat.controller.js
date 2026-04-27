const { z } = require('zod')
const {
  askQuestion,
  getHistory
} = require('../services/chat.service')

async function ask(request, reply) {
  try {
    const schema = z.object({
      document_id: z.string().uuid(),
      question: z.string().min(1)
    })

    const { document_id, question } =
      schema.parse(request.body)

    const result = await askQuestion({
      userId: request.user.id,
      documentId: document_id,
      question
    })

    return reply.status(201).send(result)
  } catch (error) {
    if (error.message === 'DOCUMENT_NOT_FOUND') {
      return reply.status(404).send({
        message: 'Documento não encontrado'
      })
    }

    return reply.status(400).send({
      message: error.message
    })
  }
}

async function history(request, reply) {
  const result = await getHistory({
    userId: request.user.id,
    documentId: request.query.document_id,
    limit: Number(request.query.limit || 20),
    offset: Number(request.query.offset || 0)
  })

  return reply.send({
    chats: result
  })
}

module.exports = {
  ask,
  history
}

// const { z } = require('zod')
// const { askDocumentQuestion } = require('../services/chat.service')

// async function askChat(request, reply) {
//   const paramsSchema = z.object({
//     documentId: z.string().uuid()
//   })

//   const bodySchema = z.object({
//     question: z.string().min(1)
//   })

//   const { documentId } = paramsSchema.parse(request.params)
//   const { question } = bodySchema.parse(request.body)

//   const result = await askDocumentQuestion({
//     userId: request.user.id,
//     documentId,
//     question
//   })

//   return reply.send(result)
// }

// module.exports = {
//   askChat
// }