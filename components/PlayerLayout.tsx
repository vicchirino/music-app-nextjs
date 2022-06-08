import { Box } from "@chakra-ui/layout"
import Sidebar from "./Sidebar"

const PlayerLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "250px",
          left: 0,
        }}>
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
        }}>
        Player
      </Box>
    </Box>
  )
}

export default PlayerLayout
