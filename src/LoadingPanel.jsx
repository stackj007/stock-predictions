import { Box, Spinner, Text } from '@chakra-ui/react'

const LoadingPanel = () => {
  return (
    <Box
      textAlign="center"
      mt={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Spinner size="xl" color="teal.500" />
      <Text id="api-message" mt={2}>
        Querying Stocks API
      </Text>
    </Box>
  )
}

export default LoadingPanel
