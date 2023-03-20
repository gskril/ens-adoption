import { Spinner, Typography } from '@ensdomains/thorin'
import styled from 'styled-components'

import { APIResponse } from './types'
import { Container, Header, Link, Title } from './components/atoms'
import { Table, TableHeader, TableRow } from './components/table'
import { useFetch } from './hooks/useFetch'

const emptyTableRowStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
} as React.CSSProperties

const ProfileStack = styled.div`
  display: flex;

  img {
    object-fit: cover;
    border-radius: 50%;
    margin-left: -0.5rem;
    transition: margin-left 0.15s ease-in-out;
    box-shadow: 1px 1px 6px -1px rgba(0, 0, 0, 0.1);

    &:first-child {
      margin-left: 0 !important;
    }
  }

  @media (hover: hover) {
    &:hover,
    &:focus-visible {
      img {
        margin-left: -0.375rem;
      }
    }
  }
`

export default function App() {
  const { data, error } = useFetch<APIResponse[]>(
    'https://ens-adoption-daos.up.railway.app/all'
  )

  return (
    <Container
      as="main"
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
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
                    <ProfileStack tabIndex={0}>
                      {dao.profiles
                        .filter((profile) => profile.textRecords.avatar)
                        .slice(0, 5)
                        .map((profile, index) => (
                          <img
                            src={profile.textRecords?.avatar}
                            width={22}
                            height={22}
                            style={{
                              zIndex: 5 - index,
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
