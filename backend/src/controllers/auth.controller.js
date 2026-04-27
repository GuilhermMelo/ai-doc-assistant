const {
  registerUser,
  loginUser
} = require('../services/auth.service')

async function register(request, reply) {
  try {
    const user = await registerUser(request.body)

    return reply.status(201).send({ user })
  } catch (error) {
    return reply.status(400).send({
      message: error.message
    })
  }
}

async function login(request, reply) {
  try {
    const data = await loginUser(request.body)

    return reply.send(data)
  } catch (error) {
    return reply.status(401).send({
      message: error.message
    })
  }
}

module.exports = {
  register,
  login
}



// const { z } = require('zod')
// const {
//   registerUser,
//   loginUser
// } = require('../services/auth.service')

// const { generateToken } = require('../services/jwt.service')

// const registerSchema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   password: z.string().min(6)
// })

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6)
// })

// async function register(req, reply) {
//   try {
//     const data = registerSchema.parse(req.body)

//     const user = await registerUser(data)

//     return reply.status(201).send({
//       user
//     })
//   } catch (error) {
//     if (error.message === 'EMAIL_EXISTS') {
//       return reply.status(409).send({
//         message: 'Email já cadastrado'
//       })
//     }

//     return reply.status(400).send({
//       message: 'Dados inválidos'
//     })
//   }
// }

// async function login(req, reply) {
//   try {
//     const data = loginSchema.parse(req.body)

//     const user = await loginUser(data)

//     const token = generateToken(user)

//     return reply.send({
//       token
//     })
//   } catch {
//     return reply.status(401).send({
//       message: 'Login inválido'
//     })
//   }
// }

// module.exports = {
//   register,
//   login
// }