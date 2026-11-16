---
source: https://docs.cloud.google.com/alloydb/docs/connection-overview
---

# Connection overview

How applications and tools connect securely to AlloyDB for PostgreSQL: networking (private or public IP on a VPC), authorization (Auth Proxy, Language Connectors, firewall rules), authentication (PostgreSQL roles or IAM database authentication) and connection pooling.

## Signature / Usage

### Connect interactively with gcloud

For interactive sessions, `gcloud beta alloydb connect` manages a local AlloyDB Auth Proxy and starts a `psql` session. See https://docs.cloud.google.com/alloydb/docs/connect-gcloud. The command reference is https://docs.cloud.google.com/sdk/gcloud/reference/beta/alloydb/connect.

### Connect through the Auth Proxy with psql

Snippet taken from https://docs.cloud.google.com/alloydb/docs/auth-proxy/connect (the proxy listens on `127.0.0.1:5432` by default; `psql` prompts for the password):

```bash
psql -h 127.0.0.1 -p 5432 -U DB_USER
```

### Client pool size starting point

```text
connections = (vCPU count * 2) + 1
```

## Options / Props

| Area | Options | Description |
|------|---------|-------------|
| Networking | Private IP (private services access or Private Service Connect), public IP | An instance has a single static IP address. Private IP is on the VPC network chosen when the cluster is set up; public IP allows direct connections from outside the VPC. |
| Authorization | AlloyDB Language Connectors, AlloyDB Auth Proxy, VPC firewall rules | Connectors and the Auth Proxy use IAM to control who can connect; firewall rules restrict the source IP ranges or subnetworks. |
| Authentication | PostgreSQL user roles (username and password); IAM users and service accounts (OAuth 2.0 tokens) | Built-in users are managed with PostgreSQL techniques; IAM users are managed through IAM. |
| Pooling | Client connection pool; managed connection pooling (server side) | Use a client pool for long-lived workloads. Managed pooling suits many short-lived connections or connection surges. |

Client pool libraries named by the source: HikariCP (Java), SQLAlchemy (Python), pgxpool (Go), node-postgres (Node.js), Npgsql (.NET). Any pool that supports PostgreSQL works.

## Notes

- Applications outside the VPC need an intermediary (proxy VM in the VPC, VPN / Interconnect and similar); see https://docs.cloud.google.com/alloydb/docs/connect-external.
- Private IP connections typically give lower latency and fewer attack vectors because they do not traverse the internet.
- Public IP: an instance can use *authorized external networks* (CIDR ranges). The source recommends using public IP together with the Language Connectors or the Auth Proxy. Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Outbound public IP: when enabled, AlloyDB provisions a pair of static public IP addresses used only for traffic leaving the instance (for Database Migration Service, `postgres_fdw`, `oracle_fdw`). View them in the console or with the gcloud CLI and add them to the external system's allowlist. See https://docs.cloud.google.com/alloydb/docs/connect-public-ip#add-outbound-connectivity.
- The Auth Proxy is recommended in production: IAM-based access control and end-to-end encryption between the proxy and the cluster.
- Tune VPC firewall rules to the IP ranges or subnetworks your applications connect from; this matters most for external applications.
- First sign-in to a new cluster is as the `postgres` user with the password set at cluster creation. If no password was set for `postgres`, you cannot sign in: set one or create another user. Create non-administrative users for applications.
- A client pool may be unnecessary for manual command-line queries, languages without pool support, or ephemeral workloads. Pool sizing may need extra tuning under real load (HikariCP "About Pool Sizing").
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/connection-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/auth-proxy/connect (psql snippet)

## Related

- [private-ip.md](./private-ip.md)
- [auth-proxy-overview.md](./auth-proxy-overview.md)
- [language-connectors-overview.md](./language-connectors-overview.md)
- [connect-iam.md](./connect-iam.md)
