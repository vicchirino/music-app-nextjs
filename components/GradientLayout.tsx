import { Box, Flex, Text, Image, color } from "@chakra-ui/react"

const GradientLayout: React.FC<{
  color: string
  image?: string
  title?: string
  subtitle?: string
  description?: string
  roundImage?: boolean
}> = ({ color, image, title, subtitle, description, roundImage = false }) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, 0.95) 75%)`}>
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            alt=""
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="sm" fontWeight="100">
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default GradientLayout
