import { Box, Container } from '@chakra-ui/react'
import React, { useState } from 'react'

const App = () => {
  const [tickers, setTickers] = useState([])
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)

  return (
    <Container maxW="container.md" centerContent>
      <Box mt={4} width="100%">
        {!loading && !report && <p>Welcome to Dodgy Stock Predictions</p>}
        {loading && <p>Loading ...</p>}
        {report && <p>Report: {report}</p>}
      </Box>
    </Container>
  )
}

export default App
