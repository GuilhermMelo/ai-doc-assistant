const authMiddleware = require(
  '../middlewares/auth.middleware'
)

const {
  upload,
  list,
  show
} = require(
  '../controllers/documents.controller'
)

async function documentsRoutes(app) {
  app.addHook('preHandler', authMiddleware)

  app.post('/upload', upload)
  app.get('/', list)
  app.get('/:id', show)
}

module.exports = documentsRoutes