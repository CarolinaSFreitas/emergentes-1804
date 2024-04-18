import bcrypt from "bcrypt"

import * as dotenv from "dotenv"
dotenv.config()

import { Cliente } from "../models/Cliente.js"

export async function loginCliente(req, res) {
  const { email, senha } = req.body

  const mensaErroPadrao = {
    id: 0, 
    msg: "Erro... Login ou senha incorreto"
  }

  if (!email || !senha) {
    res.status(400).json(mensaErroPadrao)
    return
  }

  // verifica se o email está cadastrado
  try {
    const cliente = await Cliente.findOne({ where: { email } })

    if (cliente == null) {
      res.status(400).json(mensaErroPadrao)
      return
    }

    // se encontrado, compara a criptografia da senha armazenada
    // com a criptografia da senha informada
    if (bcrypt.compareSync(senha, cliente.senha)) {
      res.status(200).json(cliente)
    }
    else {
      res.status(400).json(mensaErroPadrao)
      return
    }
  } catch (error) {
    res.status(400).json(error)
  }
}