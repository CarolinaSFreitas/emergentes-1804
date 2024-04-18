import { Cliente } from "../models/Cliente.js"

export async function clienteIndex(req, res) {
  try {
    const clientes = await Cliente.findAll()
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).send(error)
  }
}

function validaSenha(senha) {

  const mensa = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

export async function clienteCreate(req, res) {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    res.status(400).json("Erro... Informe nome, email e senha")
    return
  }

  const mensagem = validaSenha(senha)
  if (mensagem.length > 0) {
    res.status(400).json({ erro: mensagem.join(", ") })
    return
  }

  try {
    const cliente = await Cliente.create({
      nome, email, senha
    })
    res.status(201).json(cliente)
  } catch (error) {
    res.status(400).send(error)
  }
}