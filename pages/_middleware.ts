import { NextResponse } from "next/server"

const signedinPaged = ["/", "/playlist", "/library"]

export default function middleware(req) {
  if (signedinPaged.find(p => p === req.nextUrl.pathname)) {
    const token = req.cookies.ACCESS_TOKEN
    if (token) {
      return NextResponse.redirect("/signin")
    }
  }
}
