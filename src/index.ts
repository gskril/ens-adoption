import { request, gql } from 'graphql-request'

import { SNAPSHOT_HUB_API } from './constants.js'

// TODO: This query's orderBy doesn't work
const topSpacesQuery = gql`
  {
    spaces(first: 5, orderBy: "followersCount", orderDirection: desc) {
      id
      name
      followersCount
    }
  }
`

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

// const topSpaces = await request<{ spaces: SnapshotSpace[] }>(
//   SNAPSHOT_HUB_API,
//   topSpacesQuery
// ).then((data) => data.spaces.map((space) => space.id))

const topSpaces = ['ens.eth']

const topVotes = await request<{ votes: SnapshotVote[] }>(
  SNAPSHOT_HUB_API,
  topVotersQuery,
  {
    spaces: topSpaces,
  }
).then((data) => data.votes)

const uniqueTopVoters = [...new Set(topVotes.map((vote) => vote.voter))]
console.log(uniqueTopVoters)

// TODO: batch resolve uniqueTopVoters with Universal Resolver to return type `Profile`
// Then have to reformat data to work across multiple Spaces
