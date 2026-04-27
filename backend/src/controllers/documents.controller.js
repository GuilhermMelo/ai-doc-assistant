const { z } = require('zod')

const {
  createDocument,
  listDocuments,
  getDocumentById
} = require('../services/documents.service')

async function upload(request, reply) {
  try {
    const schema = z.object({
      title: z.string().min(1),
      content: z.string().min(1)
    })

    const data = schema.parse(request.body)

    const document = await createDocument({
      ...data,
      userId: request.user.id
    })

    return reply.status(201).send({
      document
    })
  } catch (error) {
    return reply.status(400).send({
      message: 'Dados inválidos'
    })
  }
}

async function list(request, reply) {
  const documents = await listDocuments(
    request.user.id
  )

  return reply.send({
    documents
  })
}

async function show(request, reply) {
  const { id } = request.params

  const document = await getDocumentById(
    id,
    request.user.id
  )

  if (!document) {
    return reply.status(404).send({
      message: 'Documento não encontrado'
    })
  }

  return reply.send({
    document
  })
}

module.exports = {
  upload,
  list,
  show
}
