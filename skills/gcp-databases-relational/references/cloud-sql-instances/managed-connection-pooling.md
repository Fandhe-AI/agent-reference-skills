---
source: https://docs.cloud.google.com/sql/docs/postgres/managed-connection-pooling
---

# Managed Connection Pooling overview

Managed Connection Pooling places a connection pool cluster in front of the PostgreSQL server so clients reuse server connections instead of opening one backend process per connection. It helps most with many short-lived connections (microservices, Cloud Run) and connection spikes.

## Signature / Usage

### Connect through the pooler port

Connect with the psql client directly to the pooler on TCP port 6432: the source says to specify `psql -p 6432` when directly connecting.

### Enable at creation

Use `--enable-connection-pooling` on `gcloud sql instances create` (Enterprise Plus only, requirements below), or the Console checkbox "Enable Managed Connection Pooling". Enabling it on an existing instance restarts the database. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance:

```bash
    gcloud sql instances create INSTANCE_NAME \
    --database-version=DATABASE_VERSION \
    --region=REGION \
    --tier=TIER \
    --edition=ENTERPRISE_PLUS
```

Add `--enable-connection-pooling` to the command above.

### How pooling works

Clients connect to a connection pool cluster of one or more connection poolers. A pooler keeps one pool per unique database and user pair. Request handling: use an idle server connection if available; otherwise create one while below `max_pool_size`; otherwise the client waits; on completion the server connection returns to the pool.

Number of poolers = vCPUs / 4, minimum 1 (2 or 4 vCPUs: 1; 8: 2; 16: 4; 32: 8; 64: 16). Options apply per pooler; for example `max_pool_size` 50 with 2 poolers allows up to 100 server connections for one database and user pair.

## Options / Props

### Pooling modes (`pool_mode`)

| Mode | Behavior |
|---|---|
| `transaction` (default) | Connection returns to the pool after each transaction; recommended for short-lived connections |
| `session` | Dedicated server connection per session keeps session state; less efficient; returns to the pool on disconnect |

### Advanced configuration (per connection pooler)

| Name | Default | Range / meaning |
|---|---|---|
| `max_pool_size` | 50 | Max server connections per database and user pair per pooler |
| `min_pool_size` | 0 | Minimum server connections kept ready in each pool |
| `max_client_connections` | 5,000 | Max client connections per pooler |
| `max_prepared_statements` | 0 | Protocol-level named prepared statements per pooler in `transaction` mode; 0 disables support; higher values increase memory use |
| `client_connection_idle_timeout` | 0 seconds | 0 to 2,147,483 seconds |
| `server_connection_idle_timeout` | 600 seconds | 0 to 2,147,483 seconds |
| `query_wait_timeout` | 120 seconds | 0 to 2,147,483 seconds; 0 disables and allows indefinite client queuing |
| `ignore_startup_parameters` | none | Parameters ignored that are not tracked in startup packets by default |
| `server_lifetime` | 3600 seconds | Max time a server connection is unused before closing; 0 closes immediately after use |

### Ports

| Port | Use | IAM options |
|---|---|---|
| TCP 5432 | Direct connections to the Postgres server | Per the IAM authentication docs |
| TCP 6432 | Direct connections to the pooler (`psql -p 6432`) | Any IAM authentication option |
| TCP 3307 | Cloud SQL Auth Proxy connections to the pooler; fixed by the proxy client | Any IAM option or automatic IAM database authentication |

### Requirements

| Requirement | Value |
|---|---|
| Edition | Cloud SQL Enterprise Plus |
| Connection method | Direct connection or the Cloud SQL Auth Proxy only |
| Network | Private services access, public IP, or Private Service Connect enabled |
| Architecture | New Cloud SQL network architecture |
| Maintenance version | At least `POSTGRES_$version.R20250727.00_14` |
| Auth Proxy | Version 2.15.2 or later |

### Limitations

- Enabling on an existing instance restarts the database.
- Cloud SQL Go Language Connector: Go `1.24` recommended; Go 1.23 or earlier may limit performance.
- In `transaction` mode these are unsupported: `SET/RESET`, `LISTEN`, `WITH HOLD CURSOR`, `PREPARE/DEALLOCATE`, `PRESERVE/DELETE ROW` temp tables, `LOAD`, session-level advisory locks.
- asyncpg on ports 3307 and 6432: set `max_prepared_statements` above 0.
- PostgreSQL 17: `sslnegotiation=direct` is not supported.
- Client IP tracking is unsupported; query insights shows client IPs as `local`.

## Notes

- With the default `max_pool_size` of 50, reserve at least 15 server connections per CPU when setting the `max_connections` flag; `max_connections` limits the server connections a pooler can use.
- For long-lived connections, pooled performance can be slightly lower than direct connections; avoid pooling for applications that mainly hold long-lived connections.
- Cloud SQL managed pooling is a server-side feature of the Google Cloud managed service; distinct from Supabase's pooler (`supabase`), Cloudflare Hyperdrive pooling (`cloudflare-storage`), and application-side pools such as the `mssql` Node.js client's pool. Auth Proxy setup: https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy (`cloud-sql-connect` in this skill); client-library patterns are in `gcp-client-libraries`.
- Not from the source (standard psql behaviour): without `-h` or `PGHOST`, `psql -p 6432` connects through a local Unix socket, so also pass the instance's IP address to reach the pooler.
- Not from the source: libpq's default `sslmode=prefer` does not verify the server, so a password or manual IAM token sent directly to port 6432 could reach an impostor. Prefer the Auth Proxy (port 3307), which encrypts and verifies the connection; the source does not say which server certificate the pooler presents, so confirm it validates before relying on it. As in `cloud-sql-connectors-iam/iam-logins.md`: `sslmode=verify-ca` with `server-ca.pem` is enough only for a per-instance CA (`GOOGLE_MANAGED_INTERNAL_CA`); with a shared CA (`GOOGLE_MANAGED_CAS_CA`) or customer-managed CA (`CUSTOMER_MANAGED_CAS_CA`) use `sslmode=verify-full` with `host=` set to the instance DNS name from `dnsNames` in `gcloud sql instances describe` (https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance), because a shared CA also signs other instances' certificates.
- Source inconsistency: the requirements say to connect only with a direct connection or the Cloud SQL Auth Proxy, while the limitations give a minimum Go version for the Cloud SQL Go Language Connector with Managed Connection Pooling. The port table lists only direct (5432 / 6432) and Auth Proxy (3307) paths; treat Language Connector use with pooling as unconfirmed.
- The source also shows no Console, Terraform or REST samples.
- Source: https://docs.cloud.google.com/sql/docs/postgres/managed-connection-pooling (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instance.md](./create-instance.md)
- [instance-settings.md](./instance-settings.md)
- Configure Managed Connection Pooling: https://docs.cloud.google.com/sql/docs/postgres/configure-mcp
- IAM authentication: https://docs.cloud.google.com/sql/docs/postgres/iam-authentication
