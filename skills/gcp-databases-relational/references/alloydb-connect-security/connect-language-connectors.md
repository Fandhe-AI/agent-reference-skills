---
source: https://docs.cloud.google.com/alloydb/docs/connect-language-connectors
---

# Connect using the AlloyDB Language Connectors

Install and configure the AlloyDB Java, Python and Go connectors for automated mTLS, IAM-based authorization and optional automatic IAM database authentication.

## Signature / Usage

### Before you begin

1. Enable the AlloyDB API (`alloydb.googleapis.com`).
2. Create an AlloyDB instance and configure the default user (https://docs.cloud.google.com/alloydb/docs/instance-primary-create).
3. Grant the IAM roles AlloyDB Client (`roles/alloydb.client`) and Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`).

### Install

Python with `pg8000` (synchronous):

```bash
pip install "google-cloud-alloydb-connector[pg8000]" sqlalchemy
```

Python with `asyncpg` (asynchronous):

```bash
pip install "google-cloud-alloydb-connector[asyncpg]" "sqlalchemy[asyncio]"
```

### Python (pg8000)

```python
import sqlalchemy

from google.cloud.alloydbconnector import Connector


def create_sqlalchemy_engine(
    inst_uri: str,
    user: str,
    password: str,
    db: str,
    refresh_strategy: str = "background",
    ip_type: str = "PRIVATE",
) -> tuple[sqlalchemy.engine.Engine, Connector]:
    """Creates a connection pool for an AlloyDB instance and returns the pool
    and the connector. Callers are responsible for closing the pool and the
    connector.

    A sample invocation looks like:

        engine, connector = create_sqlalchemy_engine(
            inst_uri,
            user,
            password,
            db,
        )
        with engine.connect() as conn:
            time = conn.execute(sqlalchemy.text("SELECT NOW()")).fetchone()
            conn.commit()
            curr_time = time[0]
            # do something with query result
            connector.close()

    Args:
        instance_uri (str):
            The instance URI specifies the instance relative to the project,
            region, and cluster. For example:
            "projects/my-project/locations/us-central1/clusters/my-cluster/instances/my-instance"
        user (str):
            The database user name, e.g., postgres
        password (str):
            The database user's password, e.g., secret-password
        db (str):
            The name of the database, e.g., mydb
        refresh_strategy (Optional[str]):
            Refresh strategy for the AlloyDB Connector. Can be one of "lazy"
            or "background". For serverless environments use "lazy" to avoid
            errors resulting from CPU being throttled.
        ip_type (str):
            IP type used to connect. One of "PUBLIC", "PRIVATE" or "PSC".
    """
    connector = Connector(refresh_strategy=refresh_strategy)

    # create SQLAlchemy connection pool
    engine = sqlalchemy.create_engine(
        "postgresql+pg8000://",
        creator=lambda: connector.connect(
            inst_uri,
            "pg8000",
            user=user,
            password=password,
            db=db,
            ip_type=ip_type,
        ),
    )
    engine.dialect.description_encoding = None
    return engine, connector
```

Automatic IAM authentication. Excerpt: in the full sample, pass `enable_iam_auth=True` to `connector.connect(...)` inside the `creator` lambda; requires `import pg8000`.

```python
  def getconn() -> pg8000.dbapi.Connection:
      conn: pg8000.dbapi.Connection = connector.connect(
          inst_uri,
          "pg8000",
          user=user,
          password=password,
          db=db,
          # use enable_iam_auth to enable IAM authentication
          enable_iam_auth=True,
      )
      return conn
```

For public IP or PSC, pass `ip_type="PUBLIC"` or `ip_type="PSC"` to the full function above (the source's `getconn` variants use `IPTypes.PUBLIC` / `IPTypes.PSC`). For `asyncpg`, use `AsyncConnector`, `create_async_engine("postgresql+asyncpg://", async_creator=...)` and `await connector.connect(inst_uri, "asyncpg", ...)`.

## Options / Props

| Setting | Java | Python | Go |
|---------|------|--------|----|
| Instance URI | `alloydbInstanceName` | first argument of `connector.connect` (`inst_uri`) | `d.Dial(ctx, instURI)` / `host=` in the `database/sql` DSN |
| Public IP | `alloydbIpType=PUBLIC` | `ip_type="PUBLIC"` / `IPTypes.PUBLIC` | `alloydbconn.WithPublicIP()` (`database/sql`: `WithDefaultDialOptions(WithPublicIP())`) |
| Private Service Connect | `alloydbIpType=PSC` | `ip_type="PSC"` / `IPTypes.PSC` | `alloydbconn.WithPSC()` (`WithDefaultDialOptions(WithPSC())`) |
| Automatic IAM authentication | `alloydbEnableIAMAuth=true` | `enable_iam_auth=True` (`pg8000`, `asyncpg`) | `alloydbconn.WithIAMAuthN()` |
| Disable built-in telemetry | not stated | not stated | `alloydbconn.WithOptOutOfBuiltInTelemetry()` (an option when creating the Dialer / `RegisterDriver`) |
| Refresh strategy | not stated | `"background"` (default) or `"lazy"` | not stated |

## Notes

- Python `refresh_strategy`: use `"lazy"` in serverless environments to avoid errors from CPU throttling. Callers close the pool and the connector (`connector.close()`).
- Go: the source sets `sslmode=disable` in the DSN because the Dialer handles TLS (mTLS to the instance); this is the connector's behavior, not a weakened direct connection. Call the cleanup function to stop background refresh goroutines.
- Built-in database authentication is the default; automatic IAM authentication is opt-in per connector.
- Source inconsistency: the source's Python `getconn` variants (public IP, PSC, IAM) use `IPTypes` and `pg8000` without showing their imports and "replace your connection function", while the full sample builds the pool with a `creator` lambda and has no `getconn`; the `ip_type` argument in the full function takes a string (`"PUBLIC"`, `"PRIVATE"`, `"PSC"`).
- Source inconsistency: for Go telemetry opt-out the prose says to pass `WithOptOutOfBuiltInTelemetry()` when initializing a Dialer, while the snippet passes it to `d.Dial`; the `database/sql` snippet passes it to `RegisterDriver`.
- Passwords are parameters (`password`, `ALLOYDB_PASS`); source examples such as `"secret-password"` are placeholders. Do not hard-code real credentials; use Secret Manager or IAM database authentication. Spring Boot users: see the Spring Boot AlloyDB starter linked in the source.
- The source also shows Java (Maven / Gradle dependencies, HikariCP `DataSource`) and Go samples (`go get cloud.google.com/go/alloydbconn`, plus `github.com/jackc/pgx/v5` for `pgx`; `NewDialer`, `d.Dial` options, `RegisterDriver`); they are omitted here.
- The Node.js connector has no sample on this page (https://github.com/GoogleCloudPlatform/alloydb-nodejs-connector). The source also shows the full `asyncpg` function, summarized above.
- Connectors cannot create a network path if none exists.
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`.
- Source: https://docs.cloud.google.com/alloydb/docs/connect-language-connectors (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [language-connectors-overview.md](./language-connectors-overview.md)
- [connect-iam.md](./connect-iam.md)
- [auth-proxy-connect.md](./auth-proxy-connect.md)
