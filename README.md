# AI Doc Assistant

Assistente inteligente para leitura, análise e extração de informações de documentos utilizando IA.

## Tecnologias
- Node.js
- Fastify
- PostgreSQL
- Docker
- JavaScript
- IA (Groq API)

## Funcionalidades
- Upload de documentos
- Leitura de PDF e DOCX
- Extração de texto
- Perguntas sobre arquivos
- Resumos automáticos
- API REST

## Como rodar

```bash
docker compose up -d
cd backend
npm install
npm run dev


PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aidocdb
DB_USER=postgres
DB_PASSWORD=postgres
GROQ_API_KEY=your_key


---

# Próxima fase técnica
## Fase 1 — Backend profissional
Vamos criar:

```text id="nextphase1"
routes/
controllers/
services/
middlewares/
utils/
