import { Box, Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import GradientLayout from "../components/GradientLayout"
import { useMe } from "../lib/hooks"
import prisma from "../lib/prisma"

export default function Home({ artists }) {
  const { user, isLoading } = useMe()
  if (isLoading) {
    return null
  }
  return (
    <GradientLayout
      color="purple"
      roundImage
      title={`${user?.firstName} ${user?.lastName}`}
      subtitle="Profile"
      description={`${user.playlistsCount} public playlists`}
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2">
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">Only visibile for you</Text>
        </Box>
        <Flex>
          {artists.map(artist => (
            <Box key={artist.name} paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" width="100%" padding="15px">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                  alt="image"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}
