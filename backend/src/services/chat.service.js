const pool = require('../db/connection')
const { askAboutDocument } = require('./ai.service')

async function askQuestion({ userId, documentId, question }) {
  const docResult = await pool.query(
    `
    SELECT id, content
    FROM documents
    WHERE id = $1 AND user_id = $2
    LIMIT 1
    `,
    [documentId, userId]
  )

  if (docResult.rows.length === 0) {
    throw new Error('DOCUMENT_NOT_FOUND')
  }

  const document = docResult.rows[0]

  const answer = await askAboutDocument({
    documentContent: document.content,
    question
  })

  const chatResult = await pool.query(
    `
    INSERT INTO chats (
      user_id,
      document_id,
      question,
      answer
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id, question, answer, created_at
    `,
    [userId, documentId, question, answer]
  )

  return chatResult.rows[0]
}

async function getHistory({
  userId,
  documentId,
  limit = 20,
  offset = 0
}) {
  let query = `
    SELECT id, document_id, question, answer, created_at
    FROM chats
    WHERE user_id = $1
  `

  const params = [userId]

  if (documentId) {
    query += ` AND document_id = $2`
    params.push(documentId)
  }

  query += `
    ORDER BY created_at DESC
    LIMIT $${params.length + 1}
    OFFSET $${params.length + 2}
  `

  params.push(limit, offset)

  const result = await pool.query(query, params)

  return result.rows
}

module.exports = {
  askQuestion,
  getHistory
}


// const pool = require('../db/connection')
// const { askAboutDocument } = require('./ai.service')

// async function askDocumentQuestion({ userId, documentId, question }) {
//   const result = await pool.query(
//     `
//     SELECT id, title, content
//     FROM documents
//     WHERE id = $1 AND user_id = $2
//     LIMIT 1
//     `,
//     [documentId, userId]
//   )

//   if (result.rows.length === 0) {
//     throw new Error('Documento não encontrado')
//   }

//   const document = result.rows[0]

//   const answer = await askAboutDocument({
//     documentContent: document.content,
//     question
//   })

//   return {
//     documentId: document.id,
//     title: document.title,
//     question,
//     answer
//   }
// }

// module.exports = {
//   askDocumentQuestion
// }