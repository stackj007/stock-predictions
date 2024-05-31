const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post('/api/stocks', async (req, res) => {
  const { tickers, startDate, endDate } = req.body

  try {
    const stockData = await Promise.all(
      tickers.map(async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${process.env.POLYGON_API_KEY}`
        const response = await axios.get(url)
        if (response.status === 200) {
          return response.data
        } else {
          throw new Error('Error fetching data')
        }
      })
    )
    res.json(stockData)
  } catch (error) {
    console.error('Error fetching stock data', error)
    res.status(500).send('There was an error fetching the stock data.')
  }
})

app.post('/api/report', async (req, res) => {
  const { stockData } = req.body

  console.log(
    'Received stock data for report generation:',
    JSON.stringify(stockData, null, 2)
  )

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are an AI that analyzes stock data and generates a report.',
          },
          {
            role: 'user',
            content: `Analyze the following stock data and provide a report:\n${JSON.stringify(
              stockData,
              null,
              2
            )}`,
          },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('OpenAI response:', response.data)

    if (response.status === 200) {
      res.json(response.data.choices[0].message.content)
    } else {
      throw new Error('Error generating report')
    }
  } catch (error) {
    console.error(
      'Error generating report',
      error.response ? error.response.data : error.message
    )
    res.status(500).send('There was an error generating the report.')
  }
})

console.log('Polygon API Key:', process.env.POLYGON_API_KEY)
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
