import { Op } from "sequelize"
import { Filme } from "../models/Filme.js"

export async function filmeIndex(req, res) {
  try {
    const filmes = await Filme.findAll({
      where: { destaque: true },
      order: [['id', 'desc']]
    })
    res.status(200).json(filmes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmeCreate(req, res) {
  const { titulo, genero, duracao, preco, foto, sinopse } = req.body

  if (!titulo || !genero || !duracao || !preco || !foto || !sinopse) {
    res.status(400).json("Erro... Informe titulo, genero, duracao, preco, foto, sinopse do filme")
    return
  }

  try {
    const filme = await Filme.create({
      titulo, genero, duracao, preco, foto, sinopse
    })
    res.status(201).json(filme)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmeUpdate(req, res) {

  const { id } = req.params

  const { titulo, genero, duracao, preco, foto, sinopse } = req.body

  if (!titulo || !genero || !duracao || !preco || !foto || !sinopse) {
    res.status(400).json("Erro... Informe titulo, genero, duracao, preco, foto, sinopse do filme")
    return
  }

  try {
    const filme = await Filme.update({
      titulo, genero, duracao, preco, foto, sinopse
    },
      {
        where: { id }
      })
    res.status(200).json(filme)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmeDelete(req, res) {

  const { id } = req.params

  try {
    await Filme.destroy({
      where: { id }
    })
    res.status(200).json({ msg: "Ok! Filme removido com sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmeShow(req, res) {

  const { id } = req.params

  try {
    const filme = await Filme.findByPk(id)
    res.status(200).json(filme)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function filmePesquisa(req, res) {
  const { palavra } = req.params

  try {
    const filmes = await Filme.findAll({
      where: { titulo: {
        [Op.like]: '%'+palavra+'%'
      }},
      order: [['id', 'desc']]
    })
    res.status(200).json(filmes)
  } catch (error) {
    res.status(400).send(error)
  }
}
