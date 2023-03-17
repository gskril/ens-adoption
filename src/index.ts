import 'dotenv/config'
import cron from 'node-cron'
import express from 'express'
import NodeCache from 'node-cache'

import { getStatsForSpace } from './lib'

const app = express()
const port = process.env.PORT || 3000
const cache = new NodeCache()

app.listen(port, () => console.log(`App is running on port ${port}`))

app.get('/', (req, res) => {
  res.status(400).json({ message: 'Please enter a space' })
})

app.get('/:space', async (req, res) => {
  const { space } = req.params
  const stats = cache.get(space)

  // If stats are in cache, return them. Otherwise, fetch them and cache them.
  if (stats) {
    res.status(200).json(stats)
  } else {
    try {
      const stats = await getStatsForSpace(space)
      res.status(200).json(stats)
      cache.set(space, stats)
    } catch (err) {
      res.status(400).json({ message: `Error getting space ${space}` })
    }
  }
})

const spaces = ['ens.eth']

async function updateCache() {
  const stats = await Promise.all(
    spaces.map((space) => getStatsForSpace(space))
  )
  spaces.forEach((space, index) => cache.set(space, stats[index]))
}

// Seed cache on server start
await updateCache()

// Update cache every hour
cron.schedule('0 * * * *', async () => {
  await updateCache()
})
