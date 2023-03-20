import { DecodedContentHash } from '@ensdomains/ensjs/utils/contentHash'

export type ProfileFromENS = {
  isMigrated: boolean | null
  createdAt: string | null
  address?: string | undefined
  name?: string | null | undefined
  decryptedName?: string | null | undefined
  match?: boolean | undefined
  message?: string | undefined
  records?:
    | {
        contentHash?: string | DecodedContentHash | null | undefined
        texts?:
          | {
              key: string | number
              type: 'text' | 'addr' | 'contentHash'
              coin?: string | undefined
              value: string
            }[]
          | undefined
        coinTypes?:
          | {
              key: string | number
              type: 'text' | 'addr' | 'contentHash'
              coin?: string | undefined
              value: string
            }[]
          | undefined
      }
    | undefined
}

type Profile = {
  address: string
  name: string
  textRecords: {
    [key: string]: string
  }
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

export type SnapshotVote = {
  created: number
  proposal: SnapshotProposal
  space: SnapshotSpace
  voter: string
  vp: number
}
