








require("dotenv").config();

const fastify = require("fastify")({
  logger: true,
});

const cors = require("@fastify/cors");
const multipart = require("@fastify/multipart");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");

const routes = require("./routes");
const documentsRoutes = require("./routes/documents.routes");
const errorHandler = require("./middlewares/error.middleware");

async function start() {
  try {
    // CORS CORRIGIDO
    await fastify.register(cors, {
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });

    // Upload de arquivos
    await fastify.register(multipart, {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    });

    // Swagger JSON
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: "AI Document Assistant API",
          description: "API para perguntas sobre documentos usando IA",
          version: "1.0.0",
        },
        servers: [
          {
            url: `http://localhost:${process.env.PORT || 3001}`,
          },
        ],
      },
    });

    // Swagger UI
    await fastify.register(swaggerUI, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "list",
        deepLinking: false,
      },
    });

    // Rotas
    await fastify.register(routes);
    await fastify.register(documentsRoutes, {
      prefix: "/documents",
    });

    // Error handler
    fastify.setErrorHandler(errorHandler);

    // Start
    await fastify.listen({
      port: Number(process.env.PORT) || 3001,
      host: "0.0.0.0",
    });

    console.log(
      `Servidor rodando em http://localhost:${process.env.PORT || 3001}`
    );
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();





