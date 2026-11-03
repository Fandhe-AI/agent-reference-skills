---
source: https://developers.cloudflare.com/hyperdrive/examples/python-workers/
---

# Python Workers

Connect Python Workers to PostgreSQL and MySQL with Hyperdrive (compatibility date `2026-09-08` or later).

## Signature / Usage

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "python-hyperdrive",
  "main": "src/main.py",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": [
    "python_workers"
  ],
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<HYPERDRIVE_CONFIG_ID>"
    }
  ]
}
```

Adapted (not in the official docs): the handler now returns a `Response` and closes the connection in `finally`; the unused `closing` import is dropped; see Notes.

```python
import asyncpg
from workers import Response, WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        hd = self.env.HYPERDRIVE
        connection = await asyncpg.connect(
            host=hd.host,
            port=int(hd.port),
            user=hd.user,
            password=hd.password,
            database=hd.database,
            ssl=False,
        )
        try:
            await connection.execute("SELECT 1")
            return Response.json({"ok": True})
        finally:
            await connection.close()
```

MySQL (`aiomysql`):

```python
import aiomysql
from workers import Response, WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        hd = self.env.HYPERDRIVE
        connection = await aiomysql.connect(
            host=hd.host,
            port=int(hd.port),
            user=hd.user,
            password=hd.password,
            db=hd.database,
            ssl=None,
        )
        try:
            cursor = await connection.cursor()
            await cursor.execute("SELECT 1")
            result = await cursor.fetchone()
            return Response.json({"result": result[0]})
        finally:
            connection.close()
```

```toml
[project]
dependencies = [
    "asyncpg",
]
```

```bash
uv run pywrangler deploy
```

Serialize synchronous DB operations:

```python
import asyncio

lock = asyncio.Lock()

async with lock:
    # Your database operation here
    synchronous_db_operation()
```

## Options / Props

| Database | Driver | Notes |
|----------|--------|-------|
| PostgreSQL | `asyncpg` | Recommended |
| PostgreSQL | `pg8000` | |
| PostgreSQL | `psycopg` | |
| MySQL | `aiomysql` | Recommended |
| MySQL | `pymysql` | |

## Notes

- Any Python driver that works over TCP may work, but only the drivers above are tested with Hyperdrive. TCP sockets use the Workers `connect` API; some low-level socket operations may not work.
- Socket operations do not block the event loop; use an `asyncio.Lock` to serialize synchronous database operations.
- Only synchronous SQLAlchemy ORMs are supported; async SQLAlchemy is not supported (no greenlet support).
- The Worker's `HYPERDRIVE` binding exposes `host`, `port`, `user`, `password`, `database` (no connection string used in the examples). The asyncpg example sets `ssl=False` and the aiomysql example `ssl=None`, as in the source.
- Corrected from the official docs: the official asyncpg handler never returns a `Response` (the request would get no response) and leaves the connection open if `execute` raises; it now returns `Response.json({"ok": True})` and closes in `finally`. The official unused `from contextlib import closing` import was removed.
- Python Workers in general (`pywrangler`): see the cloudflare-workers skill.

## Related

- [Connect to PostgreSQL (drivers)](./connect-postgres-drivers.md)
- [Connect to MySQL (drivers)](./connect-mysql-drivers.md)
- [Getting started](./get-started.md)
