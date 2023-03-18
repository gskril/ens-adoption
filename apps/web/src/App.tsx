import { Spinner, Typography } from '@ensdomains/thorin'

import { APIResponse } from './types'
import { Container, Header, Link, Title } from './components/atoms'
import { Table, TableHeader, TableRow } from './components/table'
import { useFetch } from './hooks/useFetch'

const emptyTableRowStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
} as React.CSSProperties

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
            {data.map((dao) => (
              <TableRow key={dao.space}>
                <span>
                  <Link to={`https://snapshot.org/#/${dao.space}`}>
                    {dao.space}
                  </Link>
                </span>
                <span>{dao.stats.topVoters}</span>
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
            <Spinner color="accent" size="small" />
          </TableRow>
        )}
      </Table>
    </Container>
  )
}
