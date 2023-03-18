type Profile = {
  address: string
  name: string
  [key: string]: string
}

export type APIResponse = {
  [key: string]: {
    space: string
    stats: {
      topVoters: number
      profilesWithNames: number
      records: {
        'com.twitter': number
        'com.github': number
        url: number
        avatar: number
      }
    }
    profiles: Profile[]
  }[]
}
