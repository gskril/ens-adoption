import { Spinner, Typography } from '@ensdomains/thorin'

import { APIResponse } from './types'
import { Container, Header, Link, Title } from './components/atoms'
import { Table, TableHeader, TableRow } from './components/table'
import { useFetch } from './hooks/useFetch'

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
          This is a dashboard to explore the adoption of ENS within popular
          DAOs, inspired by{' '}
          <Link to="https://dune.com/makoto/ens-dao-marketshare">
            this Dune Analytics dashboard
          </Link>
          .
        </Typography>
      </Header>

      {error || (data && data.length === 0) ? (
        <Typography>Error fetching data, try again later</Typography>
      ) : data ? (
        <Table>
          <HeaderRow />
          {data.map((dao) => (
            <TableRow key={dao.space}>
              <span>
                <Link to={dao.space}>{dao.space}</Link>
              </span>
              <span>{dao.stats.topVoters}</span>
              <span>{dao.stats.profilesWithNames}</span>
              <span>{dao.stats.records.avatar || 0}</span>
              <span>{dao.stats.records['com.twitter'] || 0}</span>
              <span>{dao.stats.records['com.github'] || 0}</span>
              <span>{dao.stats.records.url || 0}</span>
            </TableRow>
          ))}
        </Table>
      ) : (
        <Table>
          <HeaderRow />
          <TableRow>
            <span>
              <Spinner color="accent" size="small" />
            </span>
          </TableRow>
        </Table>
      )}
    </Container>
  )
}

function HeaderRow() {
  return (
    <TableHeader>
      <span>DAO</span>
      <span>Voters</span>
      <span>Name</span>
      <span>Avatar</span>
      <span>Twitter</span>
      <span>Github</span>
      <span>Url</span>
    </TableHeader>
  )
}
