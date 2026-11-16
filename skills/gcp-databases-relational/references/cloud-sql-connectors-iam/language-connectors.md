---
source: https://docs.cloud.google.com/sql/docs/postgres/language-connectors
---

# Cloud SQL Language Connectors

Cloud SQL Language Connectors are libraries that provide encryption and IAM authorization when connecting to a Cloud SQL instance. They create authorized connections to the server-side proxy on behalf of the application and pass that connection to the application's database driver. They don't provide a network path to an instance if one is not already present.

## Signature / Usage

Supported connectors: Java, Python, Go, Node.js. Cloud SQL recommends connectors over a plain database client or the Cloud SQL Auth Proxy.

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/connect-connectors (install commands):

```bash
pip install "cloud-sql-python-connector[pg8000]"
```

```bash
npm install @google-cloud/cloud-sql-connector
```

### Enforce connectors only

Connector enforcement makes Cloud SQL reject direct connections to the database; only the Cloud SQL Auth Proxy or the Language Connectors can connect. See [connect-connectors.md](./connect-connectors.md) for the `gcloud sql instances patch` command.

## Options / Props

Minimum connector versions when `serverCaMode` is the shared certificate authority (CA):

| Connector | Minimum version |
|-----------|-----------------|
| Java | v1.21.0 |
| Go | v1.12.0 |
| Node.js | v1.4.0 |
| Python | supported, but does not verify server identity |

Minimum connector versions when `serverCaMode` is customer-managed CA:

| Connector | Minimum version |
|-----------|-----------------|
| Java | v1.22.0 |
| Go | v1.14.0 |
| Node.js | v1.6.0 |

Benefits:

- IAM authorization: IAM permissions control who or what can connect.
- Convenience: no SSL certificate management, firewall rules or authorized networks.

## Notes

- With a customer-managed CA you can configure a custom DNS name (set in the custom subject alternative name (SAN) field of the server certificate) and then connect from the connectors using that DNS name.
- Limitation: connectors can't be used with context-aware access and IAM database authentication; the IAM login fails.
- Limitation: on a Private Service Connect-enabled instance, if connector enforcement is enabled you can't create read replicas, and if the instance has read replicas you can't enable connector enforcement.
- Source inconsistency: other pages scope this restriction differently. https://docs.cloud.google.com/sql/docs/postgres/replication: any instance with connector enforcement, unless private service access is configured. https://docs.cloud.google.com/sql/docs/postgres/replication/create-replica: a primary with private IP that accepts Language Connector connections only.
- This is the PostgreSQL edition of the page. Cloud SQL is managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service). General ADC and client-library patterns: `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/language-connectors (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/sql/docs/postgres/connect-connectors

## Related

- [connect-connectors.md](./connect-connectors.md)
- [iam-logins.md](./iam-logins.md)
- [iam-authentication.md](./iam-authentication.md)
