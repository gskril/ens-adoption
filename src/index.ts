import 'dotenv/config'
import express from 'express'
import { getStatsForSpace } from './lib'

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Your application is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.status(400).json({ message: 'Please enter a space' })
})

app.get('/:space', async (req, res) => {
  const { space } = req.params

  try {
    const stats = await getStatsForSpace(space)
    res.status(200).json(stats)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
})
