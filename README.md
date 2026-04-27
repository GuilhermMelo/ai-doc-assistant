# 🤖 AI Document Assistant

REST API desenvolvida em Node.js + Fastify para permitir perguntas em linguagem natural sobre documentos de texto, integrada com IA via Groq.

O usuário pode:

- Criar conta
- Fazer login com JWT
- Enviar documentos
- Fazer perguntas sobre documentos
- Consultar histórico de conversas

---

# 🚀 Tecnologias Utilizadas

- Node.js
- Fastify
- PostgreSQL
- Docker
- JWT Authentication
- Groq API (LLM)
- UUID
- JavaScript

---

# 🏗️ Arquitetura

```text
Cliente (Insomnia / Frontend)
        ↓
 Fastify API
        ↓
 PostgreSQL
        ↓
 Groq API (IA)
