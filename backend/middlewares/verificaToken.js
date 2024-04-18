import jwt from "jsonwebtoken"

import * as dotenv from "dotenv"
dotenv.config()

export function verificaToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token, process.env.JWT_KEY)
    console.log(decode)
    req.usuario_logado_id = decode.usuario_logado_id
    req.usuario_logado_nome = decode.usuario_logado_nome
    next()
  } catch (error) {
    return res.status(401).json({erro: "Falha na autenticação"})
  }
}