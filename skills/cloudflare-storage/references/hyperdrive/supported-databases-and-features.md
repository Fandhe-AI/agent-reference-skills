---
source: https://developers.cloudflare.com/hyperdrive/reference/supported-databases-and-features/
---

# Supported databases and features

Database engines, compatible providers, TLS modes, authentication modes, and unsupported Postgres/MySQL features.

## Signature / Usage

Check Hyperdrive connections on a Postgres server:

```sql
SELECT DISTINCT usename, application_name FROM pg_stat_activity WHERE application_name = 'Cloudflare Hyperdrive'
```

## Options / Props

| Database Engine | Supported | Known supported versions | Details |
| --- | --- | --- | --- |
| PostgreSQL | ✅ | `9.0` to `18.x` | Both self-hosted and managed (AWS, Azure, Google Cloud, Oracle) instances are supported. |
| MySQL | ✅ | `5.7` to `8.x` | Both self-hosted and managed (AWS, Azure, Google Cloud, Oracle) instances are supported. MariaDB is also supported. |
| SQL Server | Not currently supported. |  | |
| MongoDB | Not currently supported. |  | |

Compatible providers (non-exhaustive):

| Database Engine | Supported | Known supported versions | Details |
| --- | --- | --- | --- |
| AWS Aurora | ✅ | All | Postgres-compatible and MySQL-compatible. |
| ClickHouse Managed Postgres | ✅ | All | See the ClickHouse Managed Postgres guide. |
| Neon | ✅ | All | Neon currently runs Postgres 15.x |
| Supabase | ✅ | All | Supabase currently runs Postgres 15.x |
| Timescale | ✅ | All | See the Timescale guide. |
| Materialize | ✅ | All | Postgres-compatible. |
| CockroachDB | ✅ | All | Postgres-compatible. |
| PlanetScale | ✅ | All | PlanetScale provides MySQL-compatible and PostgreSQL databases |
| MariaDB | ✅ | All | MySQL-compatible. |

PostgreSQL TLS (SSL) modes:

| Mode | Supported | Details |
| --- | --- | --- |
| `none` | No | Hyperdrive does not support insecure plain text connections. |
| `prefer` | No (use `require`) | Hyperdrive will always use TLS. |
| `require` | Yes (default) | TLS is required, and server certificates are validated (based on WebPKI). |
| `verify-ca` | Yes | Verifies the server's TLS certificate is signed by a root CA on the client. This ensures the server has a certificate the client trusts. |
| `verify-full` | Yes | Identical to `verify-ca`, but also requires the database hostname must match a Subject Alternative Name (SAN) present on the certificate. |

MySQL TLS (SSL) modes:

| Mode | Supported | Details |
| --- | --- | --- |
| `DISABLED` | No | Hyperdrive does not support insecure plain text connections. |
| `PREFERRED` | No (use `REQUIRED`) | Hyperdrive will always use TLS. |
| `REQUIRED` | Yes (default) | TLS is required, and server certificates are validated (based on WebPKI). |
| `VERIFY_CA` | Yes | Verifies the server's TLS certificate is signed by a root CA on the client. This ensures the server has a certificate the client trusts. |
| `VERIFY_IDENTITY` | Yes | In addition to `VERIFY_CA` checks, Hyperdrive requires the database hostname to match a Subject Alternative Name (SAN) or Common Name (CN) on the certificate. |

## Notes

- Supported PostgreSQL authentication modes: password (`md5`), password (`password`, clear-text), SASL (`SCRAM-SHA-256`).
- Unsupported PostgreSQL features: SQL-level prepared statement management (`PREPARE`, `DISCARD`, `DEALLOCATE`, `EXECUTE`); advisory locks; `LISTEN` and `NOTIFY`; `PREPARE` and `DEALLOCATE`; any per-session state modification not explicitly documented as supported.
- Unsupported MySQL features: non-UTF8 characters in queries; `USE` statements; multi-statement queries; prepared statements via SQL (`PREPARE`/`EXECUTE`) and protocol-level prepared statements; `COM_INIT_DB` messages; authentication plugins other than `caching_sha2_password` or `mysql_native_password`.
- For unsupported statements, use a second, direct client without Hyperdrive.
- Certificate configuration: see [tls-ssl-certificates](./tls-ssl-certificates.md).

## Related

- [TLS/SSL certificates](./tls-ssl-certificates.md)
- [Connect PostgreSQL drivers](./connect-postgres-drivers.md)
- [Connect MySQL drivers](./connect-mysql-drivers.md)
