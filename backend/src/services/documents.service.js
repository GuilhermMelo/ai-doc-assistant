const pool = require("../db/connection");

async function createDocument({
  title,
  content,
  userId,
}) {
  const result = await pool.query(
    `
    INSERT INTO documents (
      title,
      content,
      user_id
    )
    VALUES ($1, $2, $3)
    RETURNING id, title, content, created_at
    `,
    [title, content, userId]
  );

  return result.rows[0];
}

async function listDocuments(userId) {
  const result = await pool.query(
    `
    SELECT id, title, created_at
    FROM documents
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
}

async function getDocumentById(id, userId) {
  const result = await pool.query(
    `
    SELECT id, title, content, created_at
    FROM documents
    WHERE id = $1
      AND user_id = $2
    LIMIT 1
    `,
    [id, userId]
  );

  return result.rows[0];
}

async function deleteDocument(id, userId) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      DELETE FROM chats
      WHERE document_id = $1
        AND user_id = $2
      `,
      [id, userId]
    );

    await client.query(
      `
      DELETE FROM documents
      WHERE id = $1
        AND user_id = $2
      `,
      [id, userId]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createDocument,
  listDocuments,
  getDocumentById,
  deleteDocument,
};