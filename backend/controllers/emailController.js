import nodemailer from "nodemailer"
import md5 from "md5"
import { Usuario } from "../models/Usuario.js";
import { Troca } from "../models/Troca.js";

async function main(nome, email, hash) {

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 465,
    secure: false,
    auth: {
      user: "d61ebc4c72487a",
      pass: "4348eff98fa9ba"
    }
  });

  const link = "http://localhost:3000/usuarios/trocasenha/"+hash

  let mensa = "<h4>Sistema de Revenda de Veículos</h4>"
  mensa += `<h5>Estimado Usuário: ${nome}</h5>`
  mensa += "<h5>Você solicitou a troca de senha...</h5>"
  mensa += `<a href="${link}">Alterar a senha</a>`

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Revenda Avenida" <revenda@example.com>', // sender address
    to: email, // list of receivers
    subject: "Troca de Senha", // Subject line
    text: `Copie e cole o link ${link} para alterar a senha`, // plain text body
    html: mensa, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export async function enviaEmail(req, res) {
  const { email } = req.body

  try {
    const usuario = await Usuario.findOne({where: {email}})

    if (usuario == null) {
      res.status(400).json({erro: "E-mail inválido..."})
      return
    }

    const hash = md5(usuario.nome + email + Date.now())

    main(usuario.nome, email, hash).catch(console.error)

    await Troca.create({email, hash})

    res.status(200).json({msg: "Ok! E-mail enviado com sucesso"})
  } catch (error) {
    res.status(400).json({error})
  }
} 