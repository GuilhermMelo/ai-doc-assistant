const pdf = require("pdf-parse");

const {
  createDocument,
  listDocuments,
  getDocumentById,
  deleteDocument,
} = require("../services/documents.service");

async function upload(request, reply) {
  try {
    const file = await request.file();

    if (!file) {
      return reply.status(400).send({
        message: "Arquivo não enviado",
      });
    }

    const chunks = [];

    for await (const chunk of file.file) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    let content = "";
    const title = file.filename;

    if (file.mimetype === "application/pdf") {
      try {
        const data = await pdf(buffer);

        content = (data.text || "").trim();

        if (!content) {
          content = `PDF enviado (${title}), mas sem texto extraível.`;
        }
      } catch (err) {
        console.error("Erro parse PDF:", err);

        content = `PDF enviado (${title}), mas falhou ao extrair texto.`;
      }
    } else {
      content = buffer.toString("utf-8").trim();
    }

    const document = await createDocument({
      title,
      content,
      userId: request.user.id,
    });

    return reply.status(201).send({
      message: "Upload realizado com sucesso",
      document,
    });
  } catch (error) {
    console.error("ERRO UPLOAD:", error);

    return reply.status(500).send({
      message: "Erro ao processar arquivo",
    });
  }
}

async function list(request, reply) {
  try {
    const documents = await listDocuments(request.user.id);
    return reply.send(documents);
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao listar documentos",
    });
  }
}

async function show(request, reply) {
  try {
    const { id } = request.params;

    const document = await getDocumentById(
      id,
      request.user.id
    );

    if (!document) {
      return reply.status(404).send({
        message: "Documento não encontrado",
      });
    }

    return reply.send(document);
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao buscar documento",
    });
  }
}

async function remove(request, reply) {
  try {
    const { id } = request.params;

    await deleteDocument(id, request.user.id);

    return reply.send({
      message: "Documento excluído com sucesso",
    });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({
      message: "Erro ao excluir documento",
    });
  }
}

module.exports = {
  upload,
  list,
  show,
  remove,
};