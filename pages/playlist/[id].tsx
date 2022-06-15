import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

const PlayList = ({ playlist }) => {
  return <div>playlist</div>
}

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.ACCESS_TOKEN)
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist },
  }
}

export default PlayList
