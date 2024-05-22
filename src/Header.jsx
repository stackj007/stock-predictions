import { Box, Image } from '@chakra-ui/react'
import logo from './assets/logo.png'

const Header = () => {
  return (
    <Box as="header" py={4} textAlign="center">
      <Image src={logo} alt={logo} />
    </Box>
  )
}

export default Header
