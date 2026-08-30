---
source: https://orm.drizzle.team/docs/connect-drizzle-proxy
---

# Drizzle HTTP proxy

Drizzle Proxy is used to implement custom driver communication with the database — for example, sending queries over HTTP to a server that owns the database connection, executing the query there, and returning raw data that Drizzle ORM maps to results. It can also be used to add custom logic at the query stage with existing drivers.

## Signature / Usage

```ts
// Client side (e.g. pg-proxy)
import { drizzle } from 'drizzle-orm/pg-proxy';
import axios from 'axios';

const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await axios.post('http://localhost:3000/query', { sql, params, method });
    return { rows: rows.data };
  } catch (e: any) {
    console.error('Error from pg proxy server: ', e.response.data);
    return { rows: [] };
  }
});
```

> Local development / trusted-network use only. Exposing this endpoint publicly
> requires authentication, authorization, a least-privilege DB role, and a
> request body size limit — none of which the original doc example includes.

```ts
// Server side
import { Client } from 'pg';
import express from 'express';

const app = express();
app.use(express.json({ limit: '100kb' }));

// Placeholder auth middleware: verify a bearer token before executing any SQL.
app.use((req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/, '');
  if (!token || !isValidToken(token)) {
    return res.status(401).send('Unauthorized');
  }
  next();
});

// Use a role scoped to only what the proxy needs (e.g. read-only), not a superuser.
const client = new Client(process.env.PROXY_DB_URL);

app.post('/query', async (req, res) => {
  const { sql, params, method } = req.body;
  const sqlBody = sql.replace(/;/g, ''); // prevent multiple queries

  const result = await client.query({
    text: sqlBody,
    values: params,
    rowMode: method === 'all' ? 'array' : undefined,
  });
  res.send(result.rows);
});

app.listen(3000);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `sql` | `string` | Query string with placeholders |
| `params` | `array` | Query parameters |
| `method` | `'all' \| 'execute'` | Determined by the SQL statement; controls the expected return shape |

## Notes

- Transcribed from `pg/connect-drizzle-proxy.mdx`.
- The async callback must return `{ rows: string[][] }` for `method: 'all'`, or `{ rows: string[] }` for `method: 'execute'`.
- Official example connects with a hardcoded `postgres:postgres` superuser and exposes `/query` with no authentication or body size limit; rewritten with an env-var connection string (least-privilege role), a bearer-token auth placeholder, and a JSON body size limit for safety.

## Related

- [Database connection overview](./connect-overview.md)
