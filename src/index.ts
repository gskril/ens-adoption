import { request, gql } from 'graphql-request'

import { SNAPSHOT_HUB_API } from './constants.js'

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
    spaces: ['ens.eth'], // just use one space for testing
  }
).then((data) => data.votes)

const uniqueTopVoters = [...new Set(topVotes.map((vote) => vote.voter))]
console.log(uniqueTopVoters)

// TODO: batch resolve uniqueTopVoters with Universal Resolver to return type `Profile`
// Then have to reformat data to work across multiple Spaces
