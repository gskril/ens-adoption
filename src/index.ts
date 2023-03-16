import 'dotenv/config'

import { getProfiles } from './ens.js'
import { getTopVoters } from './snapshot.js'

const topVoters = await getTopVoters(['ens.eth'])
const profiles = await getProfiles(topVoters)

// count number of profiles that have a name
const profilesWithNames = profiles.filter(
  (profile) => profile.name !== undefined
).length

// count number of profiles that have certain text records
const records = profiles.reduce((acc: { [key: string]: number }, profile) => {
  acc['topVoters'] = topVoters.length
  acc['profilesWithNames'] = profilesWithNames

  profile.textRecords?.forEach((record) => {
    const key = Object.keys(record)[0]
    if (acc[key]) {
      acc[key]++
    } else {
      acc[key] = 1
    }
  })
  return acc
}, {})

console.log(records)

// TODO: refactor script to work across multiple Snapshot Spaces
