import { useState } from 'react'
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
        const response = await axios.post(
          'http://localhost:5000/api/stocks',
          {
            tickers,
            startDate: dates.startDate,
            endDate: dates.endDate,
          }
        )

        const stockData = response.data
        const openaiResponse = await generateReport(stockData)

        setReport(openaiResponse)
      } catch (error) {
        console.error('Error fetching stock data', error)
        setReport('There was an error fetching the stock data.')
      } finally {
        setLoading(false)
      }
    }
  }

  const generateReport = async (stockData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/report',
        {
          stockData,
        }
      )

      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Error generating report')
      }
    } catch (error) {
      console.error('Error generating report', error)
      return 'There was an error generating the report.'
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
            <Button mt={4} onClick={fetchStockData} colorScheme="teal">
              Generate Report
            </Button>
            <p>Welcome to Dodgy Dave Stock Predictions</p>
          </>
        )}
        {loading && <LoadingPanel />}
        {report && <OutputPanel report={report} />}
      </Box>
    </Container>
  )
}

export default App
