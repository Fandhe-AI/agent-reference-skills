---
source: https://docs.cloud.google.com/sql/docs/postgres/sql-proxy
---

# About the Cloud SQL Auth Proxy

The Cloud SQL Auth Proxy is a Cloud SQL connector that gives secure, IAM-authorized, TLS-encrypted access to instances without authorized networks or SSL configuration. It runs as a local client and tunnels to a companion process on the instance. All commands in the source use the v2 binary (`cloud-sql-proxy`, instance connection names as positional arguments).

## Signature / Usage

### Check machine architecture before downloading

```bash
  uname -a
  
```

### Pull the Docker image

```sh
docker pull gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.28.0
```

Step-by-step download, start and connect commands are on [connect-auth-proxy.md](./connect-auth-proxy.md).

## Options / Props

### Requirements

| Requirement | Detail |
|---|---|
| Cloud SQL Admin API | Must be enabled |
| Google Cloud credentials | Provide to the proxy (see authentication options) |
| Database account | Valid database user and password |
| Instance IP | Public IPv4 (need not be an authorized network) or private IP |
| Shared CA (`serverCaMode`) | Proxy version 2.13.0 or later |
| Customer-managed CA (`serverCaMode`) | Proxy version 2.14.3 or later |

### Ports and egress

| Hop | Port |
|---|---|
| Application to local proxy | Unix domain socket or local TCP port; defaults 3306 MySQL, 5432 PostgreSQL, 1433 SQL Server |
| Proxy to instance | Destination TCP 3307 (allow egress to the instance IP) |
| Cloud SQL Admin API (`sqladmin.googleapis.com`, no fixed IP) | Allow all egress TCP on 443 |

### Service account permissions

The credential needs `cloudsql.instances.connect`, included in the predefined roles Cloud SQL Client, Cloud SQL Editor, Cloud SQL Admin. With legacy project roles the account needs at least Editor. Creating the service account requires `resourcemanager.projects.setIamPolicy`.

### Behavior and limits

| Item | Value |
|---|---|
| TLS | TLS 1.3, cipher selection per Go's rules |
| Ephemeral SSL certificate lifetime | About one hour, refreshed before expiry |
| Admin API calls while running | 2 per hour per connected instance (highest usage at startup) |
| Connections | Each client connection creates one connection to the instance; no connection pooling; no limit on new-connection rate or persistent connection count |
| Unix socket path length | Max 108 characters on Linux; Unix sockets not supported on Windows |
| TCP listener | `localhost` by default |
| Private IP | Proxy must be on a resource with access to the instance's VPC network; source says version 1.12 or later is needed for private IP |
| Windows binaries | Version 2.17.1 and later are digitally signed by Google |

### Limitation

The proxy can't be used with context-aware access and IAM database authentication; IAM login fails.

## Notes

- The client-to-proxy connection is not encrypted; run the proxy on the same machine as the workload and keep the listener on `127.0.0.1` (the default). Binding to an external interface authorizes anyone who can reach it.
- Run the proxy as a persistent service (`systemd`, `upstart` or `supervisor`; Windows needs a wrapper because the binary is not a Windows Service). One proxy per workstation or VM; include it in autoscaled VM images.
- `--quiet` reduces log size but also reduces diagnostic value.
- After an HA failover all existing connections are lost; the application reconnects with the same connection strings. With a write endpoint, connect through the write endpoint DNS name so the proxy follows a switchover or replica failover.
- Connector enforcement: the `ConnectorEnforcement` field in the instances API rejects direct database connections. On a Private Service Connect instance, enforcement and read replicas are mutually exclusive. See [connect-auth-proxy.md](./connect-auth-proxy.md) for the gcloud command.
- Cloud SQL Proxy Operator is an open-source Kubernetes operator (custom resource `AuthProxyWorkload`) that injects a proxy container into GKE workloads.
- For Java, Python or Go the source recommends the corresponding Language Connector instead. App Engine standard and flexible do not need the proxy or SSL configuration.
- The image repository supports the `gcr.io` domain but serves images from Artifact Registry; Container Registry itself was shut down, so treat `gcr.io/cloud-sql-connectors/...` as the source's legacy-domain alias.
- The source also shows Linux, macOS and Windows download commands (see [connect-auth-proxy.md](./connect-auth-proxy.md)); the v1 binary (`cloud_sql_proxy`, `-instances=`) is not shown in this page.
- Managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service). Service accounts and IAM basics are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/sql-proxy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-auth-proxy.md](./connect-auth-proxy.md)
- [connection-options.md](./connection-options.md)
