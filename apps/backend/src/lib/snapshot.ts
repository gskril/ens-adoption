import { request, gql } from 'graphql-request'

import { SNAPSHOT_HUB_API } from '../constants.js'

function getUnixTimeSixMonthsAgo() {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 6)
  return Math.floor(currentDate.getTime() / 1000)
}

export async function getTopVoters(space: string) {
  const unixTimeSixMonthsAgo = getUnixTimeSixMonthsAgo()

  const topVotersQuery = gql`
    query ($spaces: [String]) {
      votes(
        first: 1000
        orderBy: "vp"
        where: { created_gte: unixTimeSixMonthsAgo, space_in: $spaces }
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

  const topVotes = await request<{ votes: SnapshotVote[] }>(
    SNAPSHOT_HUB_API,
    topVotersQuery,
    {
      spaces: [space],
    }
  ).then((data) => data.votes)

  const uniqueTopVoters = [
    ...new Set(topVotes.map((vote) => vote.voter)),
  ].slice(0, 100)

  return {
    dao: space,
    addresses: uniqueTopVoters,
  }
}
