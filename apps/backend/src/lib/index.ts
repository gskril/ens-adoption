import { getProfiles } from './ens.js'
import { getTopVoters } from './snapshot.js'

export async function getStatsForSpace(space: string) {
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

  console.log('Got stats for space', space)

  return result
}
