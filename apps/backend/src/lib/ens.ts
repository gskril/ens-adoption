import { ENS } from '@ensdomains/ensjs'
import { ethers } from 'ethers'

import { ProfileFromENS } from '../types'

export async function getProfiles(addresses: string[]) {
  const provider = new ethers.providers.AlchemyProvider(
    'homestead',
    process.env.ALCHEMY_API_KEY
  )

  const ENSInstance = new ENS()
  await ENSInstance.setProvider(provider)

  const profiles = await Promise.all(
    addresses.map((address) =>
      ENSInstance.getProfile(address, {
        texts: [
          'avatar',
          'com.twitter',
          'com.github',
          'eth.ens.delegate',
          'url',
        ],
      })
    )
  )

  const cleanedProfiles = profiles.map((profile, index) => {
    return {
      name: profile?.name,
      address: addresses[index],
      textRecords: formatTextRecords(profile),
    }
  })

  return cleanedProfiles
}

function formatTextRecords(profile: ProfileFromENS | undefined) {
  const textRecords: { [key: string]: string } = {}

  profile?.records?.texts?.forEach((item) => {
    if (item.type !== 'text') return

    if (item.key === 'avatar') {
      textRecords[
        'avatar'
      ] = `https://metadata.ens.domains/mainnet/avatar/${profile.name}`
      return
    }

    textRecords[item.key] = item.value
  })

  return textRecords
}
