import 'dotenv/config'
import cron from 'node-cron'
import express from 'express'
import NodeCache from 'node-cache'
import cors from 'cors'

import { getStatsForSpace } from './lib'
import { TOP_SPACES } from './constants'
import { Result } from './types'

const spaces = TOP_SPACES
const cache = new NodeCache()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.listen(port, () => console.log(`App is running on port ${port}`))

app.get('/', (req, res) => {
  res.status(400).json({ message: 'Please enter a space' })
})

app.get('/space/:space', async (req, res) => {
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
      console.log(`Added ${space} to cache`)
    } catch (err) {
      res.status(400).json({ message: `Error getting space ${space}` })
    }
  }
})

app.get('/all', async (req, res) => {
  const stats = cache.mget(spaces)

  // reformat stats to be an array
  const statsArray = Object.keys(stats).map((key) => stats[key]) as Result[]

  // remove any null values
  const filteredStatsArray = statsArray.filter((stat) => stat !== null)

  // order by # of voters then # of primary names set
  const sortedStatsArray = filteredStatsArray.sort((a, b) => {
    if (a.stats.topVoters === b.stats.topVoters) {
      return b.stats.profilesWithNames - a.stats.profilesWithNames
    }
    return b.stats.topVoters - a.stats.topVoters
  })

  res.status(200).json(sortedStatsArray)
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

// Update cache every 5 hours
cron.schedule('0 */5 * * *', async () => {
  await updateCache()
})
