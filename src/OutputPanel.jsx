import { Box, Text } from '@chakra-ui/react'

const OutputPanel = ({ report }) => {
  return (
    <Box mt={4}>
      <Text as="h2" fontWeight="semibold" mb={2}>
        Your Report 😜
      </Text>
      <Text>{report}</Text>
    </Box>
  )
}

export default OutputPanel
