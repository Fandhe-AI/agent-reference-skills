---
source: https://docs.cloud.google.com/alloydb/docs/auth-proxy/overview
---

# About the AlloyDB Auth Proxy

The AlloyDB Auth Proxy (`alloydb-auth-proxy`) is a local connector that creates authorized, encrypted mTLS 1.3 connections to AlloyDB instances without managing SSL certificates or firewall rules. It authorizes with IAM and can authenticate database users automatically.

## Signature / Usage

The page has no commands. Snippets taken from https://docs.cloud.google.com/alloydb/docs/auth-proxy/connect (alternative credential overrides; run one or the other).

Service account key file:

```bash
alloydb-auth-proxy --credentials-file /path/to/service-account-key.json INSTANCE_URI
```

OAuth 2.0 access token:

```bash
alloydb-auth-proxy --token "ACCESS_TOKEN" INSTANCE_URI
```

## Options / Props

| Item | Value |
|------|-------|
| Local listener | `localhost`, TCP port `5432` by default, or a local Unix domain socket |
| Tunnel | mTLS 1.3, 256-bit AES cipher, to the Auth Proxy server on the instance |
| Outbound ports | TCP `5433` to the instance IP; TCP `443` to `alloydb.googleapis.com` (HTTPS) from the client |
| Ephemeral certificate | Expires in 24 hours; refreshed automatically before expiry |
| Connections | Each connection through the proxy creates one connection to the instance |
| Required roles | AlloyDB Client (`roles/alloydb.client`) and Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) |

Connectivity paths:

| Path | How |
|------|-----|
| Private services access (default) | Internal IP in a peered VPC |
| Private Service Connect | Pass `--psc`; needs a PSC endpoint and private DNS record |
| Public IP | Pass `--public-ip`; no need to add the client IP to Authorized external networks |

Credential sources:

| Source | Notes |
|--------|-------|
| ADC (default) | Local dev: your user account (recommended, no key file). Google-managed environments (Compute Engine, GKE, Cloud Run, Cloud Run functions, App Engine): attached service account via metadata server. Same project: default service account typically has permissions. Different project: add the compute service account to the AlloyDB project and grant the roles. |
| Service account key | `GOOGLE_APPLICATION_CREDENTIALS` or `--credentials-file`. A security risk if mismanaged. |
| OAuth 2.0 access token | `--token` flag |
| gcloud CLI credentials | `--gcloud-auth` flag; not recommended, run `gcloud auth application-default login` instead |

## Notes

- If a connection to the instance does not exist, the proxy calls the AlloyDB API to obtain an ephemeral SSL certificate and builds the mTLS tunnel. The proxy can listen on any local port, but outbound connections to the instance always use TCP `5433`.
- An outbound firewall on the client host must allow port `5433` to the AlloyDB instance IP and port `443` to all IP addresses.
- Prefer a dedicated user-managed service account granted only `roles/alloydb.client` and `roles/serviceusage.serviceUsageConsumer` over the default compute service account (`gcp-foundation` covers service accounts).
- The Auth Proxy is the AlloyDB proxy (`alloydb-auth-proxy`); the Cloud SQL Auth Proxy is a separate binary for Cloud SQL (see the Cloud SQL category).
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`. ADC, service accounts and workload identity federation concepts are in `gcp-foundation`; `gcloud auth` setup is in `gcp-cli`.
- Source: https://docs.cloud.google.com/alloydb/docs/auth-proxy/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/auth-proxy/connect (snippets)

## Related

- [auth-proxy-connect.md](./auth-proxy-connect.md)
- [connect-iam.md](./connect-iam.md)
- [language-connectors-overview.md](./language-connectors-overview.md)
- [connection-overview.md](./connection-overview.md)
