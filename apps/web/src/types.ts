export type Profile = {
  address: string
  name?: string | undefined
  textRecords: {
    [key: string]: string
  }
}

export type APIResponse = {
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
}
