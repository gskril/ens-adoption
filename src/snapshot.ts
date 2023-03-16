import { request, gql } from 'graphql-request'

import { SNAPSHOT_HUB_API } from './constants.js'

export async function getTopVoters(spaces: string[]) {
  const topVotersQuery = gql`
    query ($spaces: [String]) {
      votes(
        first: 1000
        orderBy: "vp"
        where: { created_gte: 1662678000, space_in: $spaces }
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
      spaces,
    }
  ).then((data) => data.votes)

  const uniqueTopVoters = [
    ...new Set(topVotes.map((vote) => vote.voter)),
  ].slice(0, 100)

  return uniqueTopVoters
}
