import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const salt = bcrypt.genSaltSync()
  const { email, password } = JSON.parse(req.body)
  let user

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName: "Test-1 asd",
        lastName: "Test-2 asd ",
      },
    })
  } catch (e) {
    res.status(401)
    res.json({ erro: "User already exists" })
    return
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    "auth_credentials",
    { expiresIn: "8h" }
  )

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSize: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  )
  res.status(200)
  res.json(user)
}
