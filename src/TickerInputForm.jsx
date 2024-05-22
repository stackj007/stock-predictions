/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'

const TickerInputForm = ({ tickers, setTickers }) => {
  const [tickerInput, setTickerInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tickerInput.length > 2) {
      setTickers([...tickers, tickerInput.toUpperCase()])
      setTickerInput('')
    } else {
      alert(
        'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
      )
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} mt={4}>
      <FormControl>
        <FormLabel htmlFor="ticker-input" textAlign="center" mb={7}>
          Add up to 3 stock tickers below to get a super accurate stock
          predictions report
        </FormLabel>

        <Box display="flex" alignItems="center">
          <Input
            id="ticker-input"
            value={tickerInput}
            onChange={(e) => setTickerInput(e.target.value)}
            placeholder="MSFT"
          />

          <Button type="submit" ml={2}>
            Add
          </Button>
        </Box>
      </FormControl>
    </Box>
  )
}

export default TickerInputForm
