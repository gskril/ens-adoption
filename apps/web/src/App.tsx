import { Heading, Spinner, Typography } from '@ensdomains/thorin'

import { Container, Header, Link } from './components/atoms'
import { Table, TableHeader, TableRow } from './components/table'
import { useFetch } from './hooks/useFetch'
import { APIResponse } from './types'

export default function App() {
  const { data, error } = useFetch<APIResponse[]>('http://localhost:8080/all')

  return (
    <Container
      as="main"
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Header>
        <Heading as="h1" level="1">
          ENS DAO Alliance
        </Heading>
        <Typography>
          This is a dashboard to explore the adoption of ENS within popular
          DAOs, inspired by{' '}
          <Link to="https://dune.com/queries/2100006/3456746">
            this Dune Analytics query
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
