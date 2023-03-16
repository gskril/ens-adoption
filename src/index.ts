import 'dotenv/config'
import express from 'express'

import { getProfiles } from './ens.js'
import { getTopVoters } from './snapshot.js'

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Your application is running on port ${port}`)
})

app.get('/', async (req, res) => {
  const { space } = req.query

  if (typeof space !== 'string') {
    return res.status(400).json({ message: 'Invalid space. Must be a string' })
  }

  try {
    const stats = await getStatsForSpace(space)
    res.status(200).json(stats)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong', err })
  }
})

async function getStatsForSpace(space: string) {
  const topVoters = await getTopVoters(space)
  const profiles = await getProfiles(topVoters.addresses)

  // count number of profiles that have a name
  const nameStats = profiles.filter(
    (profile) => profile.name !== undefined
  ).length

  // count number of profiles that have certain text records
  const recordsStats = profiles.reduce(
    (acc: { [key: string]: number }, profile) => {
      profile.textRecords?.forEach((record) => {
        const key = Object.keys(record)[0]
        if (acc[key]) {
          acc[key]++
        } else {
          acc[key] = 1
        }
      })
      return acc
    },
    {}
  )

  const result = {
    space,
    stats: {
      topVoters: topVoters.addresses.length,
      profilesWithNames: nameStats,
      records: recordsStats,
    },
    profiles,
  }

  return result
}
