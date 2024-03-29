export const SNAPSHOT_HUB_API = 'https://hub.snapshot.org/graphql'

export const TOP_SPACES =
  process.env.NODE_ENV === 'development'
    ? ['ens.eth']
    : [
        'ens.eth',
        'pooltogether.eth',
        'sushigov.eth',
        'uniswap',
        'gitcoindao.eth',
        'aave.eth',
        'olympusdao.eth',
        'banklessvault.eth',
        'balancer.eth',
        'curve.eth',
        'graphprotocol.eth',
        'doodles.eth',
        'pooltogether.eth',
        'hop.eth',
        'devdao.eth',
        'joegovernance.eth',
        'wagdie.eth',
        'friendswithbenefits.eth',
        'lido-snapshot.eth',
        'loot-dao.eth',
        'zora.eth',
        'sismo.eth',
      ]
