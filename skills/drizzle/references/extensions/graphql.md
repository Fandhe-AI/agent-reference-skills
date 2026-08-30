---
source: https://orm.drizzle.team/docs/graphql
---

# drizzle-graphql

Builds a GraphQL server schema (queries, mutations, types) directly from a Drizzle schema in one line, compatible with Apollo Server, GraphQL Yoga, or any standard `graphql` SDK consumer.

## Signature / Usage

```ts
import { buildSchema } from 'drizzle-graphql';
import { drizzle } from 'drizzle-orm/...';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';

import * as dbSchema from './schema';

const db = drizzle({ schema: dbSchema });
const { schema } = buildSchema(db);

const yoga = createYoga({ schema });
const server = createServer(yoga);
server.listen(4000);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `buildSchema(db)` | function | Returns `{ schema, entities }`; `schema` is a ready `GraphQLSchema`, `entities` exposes generated `queries` / `mutations` / `types` / `inputs` for custom composition |

## Notes

- Requires `drizzle-orm` >= `0.30.9`.
- `entities.types`, `entities.inputs`, `entities.queries`, and `entities.mutations` can be reused to compose a custom `GraphQLSchema` (e.g. picking specific queries or adding custom resolvers).
- Transcribed from root `graphql.mdx`.

## Related

- [eslint-plugin](./eslint-plugin.md)
