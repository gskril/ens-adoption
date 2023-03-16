import { ENS } from '@ensdomains/ensjs'
import { ethers } from 'ethers'

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

  const cleanedProfiles = profiles.map((profile) => {
    return {
      name: profile?.name,
      textRecords: profile?.records?.texts?.reduce(
        (acc: { [key: string]: string }[], record) => {
          acc.push({ [record.key]: record.value })
          return acc
        },
        []
      ),
    }
  })

  return cleanedProfiles
}
