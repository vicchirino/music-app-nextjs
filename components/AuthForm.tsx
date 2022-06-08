import React, { useState } from "react"
import { Box, Flex, Input, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useSWRConfig } from "swr"
import { auth } from "../lib/mutations"
import NextImage from "next/image"

const AuthForm: React.FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    const user = await auth(mode, { email, password })

    setIsLoading(false)
    router.push("/")
  }

  return (
    <Box
      sx={{
        height: "100vh",
        widows: "100vw",
        bg: "black",
      }}>
      <Flex justify="center" align="center" height="100px">
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh -100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={e => setEmail(e.target.value)}
              marginBottom="10px"
            />
            <Input
              placeholder="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              marginBottom="10px"
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}>
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
