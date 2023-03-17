import 'dotenv/config'
import cron from 'node-cron'
import express from 'express'
import NodeCache from 'node-cache'

import { getStatsForSpace } from './lib'
import { TOP_SPACES } from './constants'

const app = express()
const port = process.env.PORT || 8080

const spaces = TOP_SPACES
const cache = new NodeCache()

app.listen(port, () => console.log(`App is running on port ${port}`))

app.get('/', (req, res) => {
  res.status(400).json({ message: 'Please enter a space' })
})

app.get('/:space', async (req, res) => {
  const { space } = req.params
  const stats = cache.get(space)

  if (stats) {
    // If stats are in cache, return them
    res.status(200).json(stats)
  } else {
    // If stats are not in cache, fetch them and add them to cache
    try {
      const stats = await getStatsForSpace(space)
      res.status(200).json(stats)
      cache.set(space, stats)
      spaces.push(space)
    } catch (err) {
      res.status(400).json({ message: `Error getting space ${space}` })
    }
  }
})

async function updateCache() {
  const startTime = Date.now()

  const stats = await Promise.all(
    spaces.map((space) => getStatsForSpace(space))
  )
  spaces.forEach((space, index) => cache.set(space, stats[index]))

  const endTime = Date.now()
  const timeTaken = endTime - startTime
  console.log(`Cache updated in ${timeTaken / 1000} seconds`)
}

// Seed cache on server start
await updateCache()

// Update cache every hour
cron.schedule('0 * * * *', async () => {
  await updateCache()
})
