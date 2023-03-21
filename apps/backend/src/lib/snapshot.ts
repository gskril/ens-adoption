import { request, gql } from 'graphql-request'

import { SNAPSHOT_HUB_API } from '../constants.js'
import { SnapshotVote } from '../types.js'

function getUnixTimeSixMonthsAgo() {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 6)
  return Math.floor(currentDate.getTime() / 1000)
}

export async function getTopVoters(space: string) {
  const topVotersQuery = gql`
    query ($skip: Int, $spaces: [String], $time: Int) {
      votes(
        first: 1000
        skip: $skip
        orderBy: "vp"
        where: { created_gte: $time, space_in: $spaces }
      ) {
        proposal {
          title
        }
        space {
          id
        }
        voter
        created
        vp
      }
    }
  `

  const unixTimeSixMonthsAgo = getUnixTimeSixMonthsAgo()

  const allVotes = new Array() as SnapshotVote[]

  // keep looping until we get less than 1000 votes in a single request
  while (allVotes.length % 1000 === 0) {
    const votes = await request<{ votes: SnapshotVote[] }>(
      SNAPSHOT_HUB_API,
      topVotersQuery,
      {
        skip: allVotes.length,
        spaces: [space],
        time: unixTimeSixMonthsAgo,
      }
    ).then((data) => data.votes)

    allVotes.push(...votes)
  }

  const uniqueTopVoters = [...new Set(allVotes.map((vote) => vote.voter))]

  console.log(
    `Found ${allVotes.length} votes for ${space} in the last 6 months, with ${uniqueTopVoters.length} unique voters.`
  )

  return {
    dao: space,
    addresses: uniqueTopVoters,
  }
}
