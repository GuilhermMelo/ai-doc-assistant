require('dotenv').config()

const AI_BASE_URL = process.env.AI_BASE_URL || 'https://api.groq.com/openai/v1'
const AI_API_KEY = process.env.GROQ_API_KEY
const AI_MODEL = process.env.AI_MODEL || 'llama3-8b-8192'

async function askAboutDocument({ documentContent, question }) {
  try {
    if (!AI_API_KEY) {
      throw new Error('Chave da IA não configurada no .env')
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const messages = [
      {
        role: 'system',
        content:
          'Você é um assistente que responde perguntas baseado APENAS no conteúdo do documento fornecido. Se a resposta não estiver no documento, diga isso explicitamente.'
      },
      {
        role: 'user',
        content: `Documento:
${documentContent}

Pergunta:
${question}`
      }
    ]

    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        temperature: 0.2
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    const data = await response.json()

    if (response.status === 401) {
      throw new Error('IA: chave inválida ou expirada')
    }

    if (response.status === 429) {
      throw new Error('IA: limite de requisições atingido')
    }

    if (response.status >= 500) {
      throw new Error('IA: serviço indisponível no momento')
    }

    if (!response.ok) {
      console.log(data)
      throw new Error('IA: erro ao consultar API')
    }

    if (!data.choices || !data.choices[0]) {
      console.log(data)
      throw new Error('IA: resposta inválida da API')
    }

    return data.choices[0].message.content
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('IA: tempo limite excedido')
    }

    throw error
  }
}

module.exports = {
  askAboutDocument
}








// require('dotenv').config()

// const AI_BASE_URL = process.env.AI_BASE_URL || 'https://api.groq.com/openai/v1'
// const AI_API_KEY = process.env.GROQ_API_KEY
// const AI_MODEL = process.env.AI_MODEL || 'llama3-8b-8192'

// async function askAboutDocument({ documentContent, question }) {
//   try {
//     if (!AI_API_KEY) {
//       throw new Error('Chave da IA não configurada no .env')
//     }

//     const controller = new AbortController()
//     const timeout = setTimeout(() => controller.abort(), 15000)

//     const messages = [
//       {
//         role: 'system',
//         content:
//           'Você é um assistente que responde perguntas baseado APENAS no conteúdo do documento fornecido. Se a resposta não estiver no documento, diga isso explicitamente.'
//       },
//       {
//         role: 'user',
//         content: `Documento:
// ${documentContent}

// Pergunta:
// ${question}`
//       }
//     ]

//     const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${AI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: AI_MODEL,
//         messages,
//         temperature: 0.2
//       }),
//       signal: controller.signal
//     })

//     clearTimeout(timeout)

//     if (response.status === 401) {
//       throw new Error('IA: chave inválida ou expirada')
//     }

//     if (response.status === 429) {
//       throw new Error('IA: limite de requisições atingido')
//     }

//     if (response.status >= 500) {
//       throw new Error('IA: serviço indisponível no momento')
//     }

//     const data = await response.json()

//     return data.choices[0].message.content
//   } catch (error) {
//     if (error.name === 'AbortError') {
//       throw new Error('IA: tempo limite excedido')
//     }

//     throw error
//   }
// }

// module.exports = {
//   askAboutDocument
// }