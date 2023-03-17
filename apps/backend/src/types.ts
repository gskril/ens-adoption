type Profile = {
  address: string
  name: string
  [key: string]: string
}

type Result = {
  name: string
  voters_count: number
  primary_set: number
  twitter_set: number
  avatar_set: number
  voters: Profile[]
}

type SnapshotSpace = {
  id: string
  name: string
  followersCount: number
}

type SnapshotProposal = {
  link: string
  network: string
  title: string
  votes: number
}

type SnapshotVote = {
  created: number
  proposal: SnapshotProposal
  space: SnapshotSpace
  voter: string
  vp: number
}
