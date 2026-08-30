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

```ts
// Server side
import { Client } from 'pg';
import express from 'express';

const app = express();
app.use(express.json());

const client = new Client('postgres://postgres:postgres@localhost:5432/postgres');

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

## Related

- [Database connection overview](./connect-overview.md)
