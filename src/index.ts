import 'dotenv/config'

import { getProfiles } from './ens.js'
import { getTopVoters } from './snapshot.js'

const space = 'ens.eth'
const topVoters = await getTopVoters(space)
const profiles = await getProfiles(topVoters.addresses)

// count number of profiles that have a name
const profilesWithNames = profiles.filter(
  (profile) => profile.name !== undefined
).length

// count number of profiles that have certain text records
const stats = profiles.reduce((acc: { [key: string]: number }, profile) => {
  acc['topVoters'] = topVoters.addresses.length
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

const result = {
  space,
  profiles,
  stats,
}

console.log(result)

// TODO: refactor script to work across multiple Snapshot Spaces
