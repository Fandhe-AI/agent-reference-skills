---
source: https://docs.cloud.google.com/alloydb/docs/language-connectors-overview
---

# AlloyDB Language Connectors overview

Client libraries that give your application encrypted, IAM-authorized connections to AlloyDB (mTLS with TLS 1.3) without managing SSL certificates or running a separate proxy process. They hand the authorized connection to your database driver.

## Signature / Usage

The page has no code. Snippet taken from https://docs.cloud.google.com/alloydb/docs/connect-language-connectors (Python connector install for the `pg8000` driver):

```bash
pip install "google-cloud-alloydb-connector[pg8000]" sqlalchemy
```

## Options / Props

| Connector | Repository |
|-----------|------------|
| Java | https://github.com/GoogleCloudPlatform/alloydb-java-connector |
| Python | https://github.com/GoogleCloudPlatform/alloydb-python-connector |
| Go | https://github.com/GoogleCloudPlatform/alloydb-go-connector |
| Node.js | https://github.com/GoogleCloudPlatform/alloydb-nodejs-connector |

## Notes

- Benefits: access control via IAM permissions; convenience (automatic mTLS, no SSL certificate management, no firewall rules or authorized external networks).
- How it works: a client-side library connects to a proxy server on the instance using an ephemeral certificate; the server-side proxy requires a valid TLS certificate.
- Works with private IP (private services access or Private Service Connect) or public IP; the default is a private IP connection.
- Built-in database authentication is the default; automatic IAM database authentication can be configured.
- Connectors do not provide a network path to the instance if none exists.
- Alternative: the AlloyDB Auth Proxy (external process), see `auth-proxy-overview.md`.
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`. General Node.js / Python client library patterns (ADC, retries) are in `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/alloydb/docs/language-connectors-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/connect-language-connectors (snippet)

## Related

- [connect-language-connectors.md](./connect-language-connectors.md)
- [auth-proxy-overview.md](./auth-proxy-overview.md)
- [connection-overview.md](./connection-overview.md)
