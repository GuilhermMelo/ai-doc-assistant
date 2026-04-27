// const authMiddleware = require("../middlewares/auth.middleware");

// const {
//   upload,
//   list,
//   show,
//   remove,
// } = require("../controllers/documents.controller");

// async function documentsRoutes(app) {
//   app.addHook("preHandler", authMiddleware);

//   app.post("/upload", upload);
//   app.get("/", list);
//   app.get("/:id", show);
//   app.delete("/:id", remove);
// }

// module.exports = documentsRoutes;

const authMiddleware = require("../middlewares/auth.middleware");

const {
  upload,
  list,
  show,
  remove,
} = require("../controllers/documents.controller");

async function documentsRoutes(app) {
  app.addHook("preHandler", authMiddleware);

  app.post("/upload", upload);
  app.get("/", list);
  app.get("/:id", show);
  app.delete("/:id", remove);
}

module.exports = documentsRoutes;