import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = JSON.parse(req.body)

  const user = await prisma.user.findUnique({
    where: {
      email: email, // email
    },
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
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
  } else {
    res.status(401)
    res.json({ error: "Credentials are incorrect" })
  }
}
