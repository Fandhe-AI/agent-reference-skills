---
source: https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl
---

# About SSL/TLS certificates

How Cloud SQL encrypts client connections with SSL/TLS: server and client certificates, the three server CA hierarchies (`serverCaMode`), server certificate rotation, expiration and limitations. Google strongly recommends enforcing SSL/TLS for direct connections.

## Signature / Usage

The source page has no code block. The CA hierarchy is set with the `serverCaMode` Admin API setting or the `--server-ca-mode` gcloud flag when creating or editing an instance (values in the table below). Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/edit-instance (update an instance from a per-instance CA to a shared CA):

```bash
gcloud sql instances patch INSTANCE_NAME \
--server-ca-mode=GOOGLE_MANAGED_CAS_CA
```

For `CUSTOMER_MANAGED_CAS_CA`, also set the `serverCaPool` field to a CA pool in the same region as the instance. Check the configured hierarchy with `gcloud sql instances describe` or in the console.

## Options / Props

| Feature | Per-instance CA (`GOOGLE_MANAGED_INTERNAL_CA`) | Shared CA (`GOOGLE_MANAGED_CAS_CA`) | Customer-managed CA (`CUSTOMER_MANAGED_CAS_CA`) |
|---------|-----|-----|-----|
| CA structure | Separate CA per instance | Root + subordinate CAs shared per region | CA hierarchy you create and manage |
| Cryptography | RSA 2048-bit, SHA256 | ECDSA 384-bit, SHA384 | ECDSA 384-bit, SHA384 |
| CA validity | 10 years | 25 years root, 10 years subordinate | Configurable (default 10 years) |
| Server certificate validity | 10 years | 1 year | 1 year (shorter if the CA validity is shorter) |
| User-initiated CA rotation | Yes | No (managed by Cloud SQL) | Yes |
| User-initiated server cert rotation | Yes | Yes | Yes |
| Automatic server cert rotation | No | Yes | Yes |
| Auth Proxy version | v1 and later | 2.13.0 or later | 2.14.3 or later |
| SAN contains hostname | Only for Private Service Connect instances | All instance types | All instance types |
| Unsupported connection sources | None | App Engine standard, App Engine flexible, Cloud Run first generation | Same as shared CA |

- Per-instance CA is the default when `serverCaMode` is unspecified. You can't update an instance from shared or customer-managed back to per-instance. Shared and customer-managed can be switched to from other modes by create or edit.
- With shared CAs, verify the hostname as well as the CA, since CAs are shared across instances.

### Certificate rotation

- Shared / customer-managed: automatic server certificate rotation can run during maintenance up to 180 days before expiry.
- About three months before expiry, project owners get an email; the instance then holds two server certificates. Download the new `server-ca.pem` (current and new), update all clients, then send the rotate command.
- Client certificates are not affected by server certificate rotation. Clients that verify the CA or hostname fail against expired server certificates.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/edit-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/instance-settings (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Switching to `GOOGLE_MANAGED_CAS_CA` cannot be reverted to the per-instance CA, and Auth Proxy clients need version 2.13.0 or later; try it on a disposable instance first.
- Auth Proxy and language connectors encrypt with SSL/TLS and verify client and server identity without a downloaded CA or client certificate.
- Source inconsistency: the per-instance console option is called "Google managed internal certificate authority" in one place and "Google internal Certificate Authority" in another.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and `mssql` / `drizzle` client code.
- Enforcing SSL/TLS: set `--ssl-mode` on `gcloud sql instances create` or `gcloud sql instances patch` to `ALLOW_UNENCRYPTED_AND_ENCRYPTED` (default; client certificate not verified), `ENCRYPTED_ONLY` (SSL/TLS only) or `TRUSTED_CLIENT_CERTIFICATE_REQUIRED` (SSL/TLS with valid client certificates); `--require-ssl` is legacy, and `requireSsl` must be compatible or unset. These values come from https://docs.cloud.google.com/sql/docs/postgres/instance-settings and https://docs.cloud.google.com/sql/docs/postgres/create-instance (flag table) and the gcloud help; this page shows no command. In this skill see `cloud-sql-instances` (`create-instance.md`, `instance-settings.md`).
- Official pages: Configure SSL/TLS https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance and Manage SSL/TLS https://docs.cloud.google.com/sql/docs/postgres/manage-ssl-instance.

## Related

- [authorize-networks.md](./authorize-networks.md)
- [private-ip.md](./private-ip.md)
