import { useState } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Header from './Header'
import TickerInputForm from './TickerInputForm'
import TickersDisplay from './TickersDisplay'
import LoadingPanel from './LoadingPanel'

const App = () => {
  const [tickers, setTickers] = useState([])
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)

  return (
    <Container maxW="container.md" centerContent>
      <Header />

      <Box mt={7} width="100%">
        {!loading && !report && (
          <>
            <TickerInputForm tickers={tickers} setTickers={setTickers} />
            <TickersDisplay tickers={tickers} setTickers={setTickers} />
          </>
        )}

        {loading && <LoadingPanel />}
        {report && <p>Report: {report}</p>}
      </Box>
    </Container>
  )
}

export default App
