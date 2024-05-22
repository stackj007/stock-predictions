import { useEffect, useState } from 'react'
import { Box, Button, Center, Container } from '@chakra-ui/react'
import Header from './Header'
import TickerInputForm from './TickerInputForm'
import TickersDisplay from './TickersDisplay'
import LoadingPanel from './LoadingPanel'
import OutputPanel from './OutputPanel'
import axios from 'axios'
import { dates } from './utils/dates'

const App = () => {
  const [tickers, setTickers] = useState([])
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)

  const fetchStockData = async () => {
    if (tickers.length > 0) {
      setLoading(true)
      try {
        const responses = await Promise.all(
          tickers.map(async (ticker) => {
            const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${
              dates.startDate
            }/${dates.endDate}?apiKey=${
              import.meta.env.VITE_POLYGON_API_KEY
            }`
            const response = await axios.get(url)

            if (response.status === 200) {
              return response.data
            } else {
              throw new Error('Error fetching data')
            }
          })
        )
        setReport(JSON.stringify(responses, null, 2))
      } catch (error) {
        console.error('Error fetching stock data', error)
        setReport('There was an error fetching the stock data.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Container maxW="container.md" centerContent>
      <Header />

      <Box mt={4} width="100%">
        {!loading && !report && (
          <>
            <TickerInputForm tickers={tickers} setTickers={setTickers} />
            <TickersDisplay tickers={tickers} setTickers={setTickers} />

            <Center>
              <Button mt={4} onClick={fetchStockData} colorScheme="teal">
                Generate Report
              </Button>
            </Center>
          </>
        )}
        {loading && <LoadingPanel />}
        {report && <OutputPanel report={report} />}
      </Box>
    </Container>
  )
}

export default App
