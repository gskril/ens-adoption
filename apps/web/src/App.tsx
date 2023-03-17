import { Container, Header, Link } from './components/atoms'
import { Heading, Typography } from '@ensdomains/thorin'
import { Table, TableHeader, TableRow } from './components/table'

export default function App() {
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

      <Table>
        <TableHeader>
          <span>DAO</span>
          <span>Voters</span>
          <span>Name</span>
          <span>Avatar</span>
          <span>Twitter</span>
          <span>Github</span>
          <span>Url</span>
        </TableHeader>
        <TableRow>
          <span>
            <Link to="https://snapshot.org/#/ens.eth">ens.eth</Link>
          </span>
          <span>100</span>
          <span>97</span>
          <span>76</span>
          <span>64</span>
          <span>32</span>
          <span>30</span>
        </TableRow>
      </Table>
    </Container>
  )
}
