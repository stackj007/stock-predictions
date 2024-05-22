import { Box, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react'

const TickersDisplay = ({ tickers, setTickers }) => {
  const handleRemove = (tickerToRemove) => {
    setTickers(tickers.filter((ticker) => ticker !== tickerToRemove))
  }

  return (
    <Box mt={4}>
      {tickers.length > 0 ? (
        tickers.map((ticker, index) => (
          <Tag
            key={index}
            size="lg"
            colorScheme="teal"
            borderRadius="full"
            m={1}
          >
            <TagLabel>{ticker}</TagLabel>
            <TagCloseButton onClick={() => handleRemove(ticker)} />
          </Tag>
        ))
      ) : (
        <Text>Your Tickers will appear here ...</Text>
      )}
    </Box>
  )
}

export default TickersDisplay
