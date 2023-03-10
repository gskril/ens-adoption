# Explore ENS adoption within DAOs (wip)

This is a data analytics project to explore the adoption of ENS within popular DAOs inspired by [this Dune Analytics query](https://dune.com/queries/2100006/3456746).

It uses the [Snapshot GraphQL API](https://docs.snapshot.org/guides/graphql-api) to get the top delegates of each DAO, then [@ensdomains/ensjs](https://www.npmjs.com/package/@ensdomains/ensjs) to get the configuration of each delegate's ENS name (if any).
