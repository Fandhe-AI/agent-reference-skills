---
source: https://docs.cloud.google.com/sql/docs/postgres/connection-options
---

# About connection options

Overview of the choices when connecting to a Cloud SQL for PostgreSQL instance: private or public IP, Cloud SQL connector or direct connection, and IAM or built-in database authentication. The page contains no code of its own; the snippet below is borrowed from the Auth Proxy connection page.

## Signature / Usage

### Find the instance connection name, then connect through a local Auth Proxy listener

```bash
gcloud sql instances describe INSTANCE_NAME --format='value(connectionName)'
```

```bash
psql "host=127.0.0.1 sslmode=disable dbname=DB_NAME user=USERNAME"
```

`sslmode=disable` applies only to the local hop to the Auth Proxy, which encrypts the connection to the instance. psql prompts for the password; do not put it on the command line.

## Options / Props

### IP address type

| | Private IP address | Public IP address |
|---|---|---|
| Description | Internal, VPC-network-only IP address | External, internet-accessible IP address |
| Choose when | Clients run on VPC networks inside Google Cloud or can reach those VPC networks | Clients outside the Google Cloud VPC network connect over the public internet |
| Configuration | Private Service Connect (default private IP option for new projects; multiple VPC networks, projects, organizations) or private services access (single VPC network, VPC Network Peering) | Configure authorized networks, or use a Cloud SQL connector (Auth Proxy or Language Connectors) as the more secure alternative |

Recommendation: use a private IP address unless you need an internet-accessible instance or connect from a client that does not meet VPC requirements.

### Connection type

| | Cloud SQL connector | Direct connection |
|---|---|---|
| What | Cloud SQL Auth Proxy (client-side proxy) or Cloud SQL Language Connectors (Java, Python, Go, Node.js) | Client connects straight to the instance over public or private IP |
| Benefits | No authorized networks needed for public IP; automatic TLS with server and client identity verification without managing SSL certificates; automatic refresh of OAuth 2.0 tokens for IAM database authentication; works with dynamic or ephemeral client IPs (common on PaaS) | Lower latency; no extra package or library; you configure SSL/TLS yourself |
| Direct-connection TLS setup | Not needed | Choose a server CA mode; enforce SSL/TLS on the instance; create client certificates; download server and client certificates |

Recommendation: private IP means a direct connection (and enforce SSL with certificates); public IP means a Cloud SQL connector. Cloud Run, App Engine standard and App Engine flexible use an embedded Auth Proxy over public IP.

### Database authentication type

| | IAM database authentication | Built-in authentication |
|---|---|---|
| Mechanism | Short-lived access tokens for IAM users, service accounts and groups instead of passwords | Database-local usernames and passwords, with password policies at instance and user level |
| Recommendation | Use whenever possible unless applications depend on built-in authentication | Use when applications or workflows depend on it |

A Cloud SQL connector refreshes IAM access tokens automatically.

### Networking changes on an existing instance

| Operation | Supported cases |
|---|---|
| Remove | Public IP from an instance with private services access and public IP (with or without PSC); PSC from an instance with PSC and private services access (with or without public IP) |
| Enable | Private services access on a public-IP-only instance; PSC on an instance with private services access only, or with private services access and public IP; public IP on an instance with private services access only, or with private services access and PSC |

### Limitations

- You can't create or update an instance with only public IP and Private Service Connect; to use both you must also configure private services access.
- You can't remove private services access from an instance with private services access and PSC, or with private services access and public IP.
- On a public-IP-only instance you can't enable private services access and PSC at the same time; enable private services access first, then PSC.
- Authorized networks can't do IP allowlisting for Private Service Connect instances.

## Notes

- Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Other tools listed in the source: `gcloud sql connect`, Cloud Shell, Cloud Code in JetBrains, Google Cloud Data Agent Kit, pgAdmin, Toad Edge, Blendo.
- Troubleshooting pages named in the source: Debugging connection issues, Known connectivity errors, Troubleshooting Cloud SQL Auth Proxy connection, Common connection issues (all under https://docs.cloud.google.com/sql/docs/postgres/).
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy
- Source: https://docs.cloud.google.com/sql/docs/postgres/connection-options (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [sql-proxy.md](./sql-proxy.md)
- [connect-auth-proxy.md](./connect-auth-proxy.md)
