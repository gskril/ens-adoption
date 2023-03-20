import { Spinner, Typography } from '@ensdomains/thorin'
import { useState } from 'react'

import { APIResponse, Profile } from './types'
import { Container, Header, Link, Title } from './components/atoms'
import {
  emptyTableRowStyle,
  ProfileStack,
  Table,
  TableHeader,
  TableRow,
} from './components/table'
import { Modal } from './components/organisms/Modal'
import { useFetch } from './hooks/useFetch'

export default function App() {
  const { data, error } = useFetch<APIResponse[]>(
    'https://ens-adoption-daos.up.railway.app/all'
  )

  const [modal, setModal] = useState<{
    isOpen: boolean
    space: APIResponse | null
  }>({ isOpen: false, space: null })

  return (
    <Container
      as="main"
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Modal
        open={modal.isOpen}
        onDismiss={() => setModal({ isOpen: false, space: null })}
        space={modal.space}
      />

      <Header>
        <Title>ENS DAO Alliance</Title>
        <Typography as="p">
          This is a dashboard to explore the adoption of ENS records within DAOs
          on Snapshot, inspired by{' '}
          <Link to="https://dune.com/makoto/ens-dao-marketshare">
            this Dune Analytics dashboard
          </Link>
          .
        </Typography>
      </Header>

      <Table>
        <TableHeader>
          <span>Snapshot</span>
          <span>Voters</span>
          <span>Name</span>
          <span>Avatar</span>
          <span>Twitter</span>
          <span>Github</span>
          <span>Url</span>
        </TableHeader>

        {error || (data && data.length === 0) ? (
          <TableRow style={emptyTableRowStyle}>
            <Typography>Error fetching data, try again later</Typography>
          </TableRow>
        ) : data ? (
          <>
            {data
              .filter((dao) => dao.stats.topVoters > 0)
              .map((dao) => (
                <TableRow key={dao.space}>
                  <span>
                    <Link to={`https://snapshot.org/#/${dao.space}`}>
                      {dao.space}
                    </Link>
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>{dao.stats.topVoters}</span>
                    <ProfileStack
                      tabIndex={0}
                      onClick={() =>
                        setModal({
                          isOpen: true,
                          space: dao,
                        })
                      }
                    >
                      {dao.profiles
                        .filter((profile) => profile.textRecords.avatar)
                        .slice(0, 5)
                        .map((profile, index) => (
                          <img
                            key={profile.address}
                            src={profile.textRecords.avatar}
                            width={22}
                            height={22}
                            style={{
                              zIndex: 5 - index,
                            }}
                            onError={(e) => {
                              // Sometimes avatars are set to 404s
                              e.currentTarget.src = '/av-default.png'
                            }}
                          />
                        ))}
                    </ProfileStack>
                  </div>
                  <span>{dao.stats.profilesWithNames}</span>
                  <span>{dao.stats.records.avatar || 0}</span>
                  <span>{dao.stats.records['com.twitter'] || 0}</span>
                  <span>{dao.stats.records['com.github'] || 0}</span>
                  <span>{dao.stats.records.url || 0}</span>
                </TableRow>
              ))}
          </>
        ) : (
          <TableRow style={emptyTableRowStyle}>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Spinner color="accent" size="small" />
            </span>
          </TableRow>
        )}
      </Table>

      <Typography>
        Note: This data only includes the top 100 active voters by voting power
        in each space from the last 6 months.
      </Typography>
    </Container>
  )
}
