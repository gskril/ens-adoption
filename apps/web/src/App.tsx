import { Heading, Spinner, Typography } from '@ensdomains/thorin'

import { Container, Header, Link } from './components/atoms'
import { Table, TableHeader, TableRow } from './components/table'
import { useFetch } from './hooks/useFetch'
import { APIResponse } from './types'

export default function App() {
  const { data, error } = useFetch<APIResponse>('http://localhost:8080/all')

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

      {error ? (
        <Typography>Error fetching data</Typography>
      ) : data ? (
        <Table>
          <HeaderRow />
          {Object.entries(data).map(([dao, space]) => (
            <TableRow key={dao}>
              <span>
                <Link to={`https://snapshot.org/#/${dao}`}>{dao}</Link>
              </span>
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
