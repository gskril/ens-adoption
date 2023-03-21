# Explore ENS adoption within DAOs

This is a data analytics project to explore the adoption of ENS within popular DAOs inspired by [this Dune Analytics query](https://dune.com/queries/2100006/3456746).

It uses the [Snapshot GraphQL API](https://docs.snapshot.org/guides/graphql-api) to get the top voters from each DAO, then [@ensdomains/ensjs](https://www.npmjs.com/package/@ensdomains/ensjs) to get the configuration of their primary ENS name (if any).

## Run locally

Clone the repo:

```bash
git clone https://github.com/gskril/ens-adoption-daos.git
```

Install dependencies and run the web server:

```bash
cd ens-adoption-daos
yarn install
yarn dev:web
```

By default, the website will read from the production API. There are a few more steps to run the backend locally. First, copy the `.env.example` file to `.env` and add your [Alchemy API key](https://www.alchemy.com/):

```bash
yarn workspace backend run config
```

Run the backend server:

```bash
yarn dev:backend
```

Update the `useFetch` URL in [`/apps/web/src/App.tsx`](/apps/web/src/App.tsx#L17) to `http://localhost:8080/all`.
