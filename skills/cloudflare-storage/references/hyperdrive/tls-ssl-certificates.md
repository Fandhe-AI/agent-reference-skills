---
source: https://developers.cloudflare.com/hyperdrive/configuration/tls-ssl-certificates-for-hyperdrive/
---

# SSL/TLS certificates

Configure server certificate verification (`verify-ca` / `verify-full`) and client certificates (mTLS) for Hyperdrive origin connections.

## Signature / Usage

Upload a CA certificate and create a configuration:

```bash
# requires Wrangler 4.9.0 or greater
npx wrangler cert upload certificate-authority --ca-cert \<ROUTE_TO_CA_PEM_FILE\>.pem --name \<CUSTOM_NAME_FOR_CA_CERT\>
```

```bash
# PostgreSQL with verify-full
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --ca-certificate-id <YOUR_CA_CERT_ID> --sslmode verify-full

# MySQL with VERIFY_IDENTITY
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --ca-certificate-id <YOUR_CA_CERT_ID> --sslmode VERIFY_IDENTITY
```

Client certificates:

```bash
# requires Wrangler 4.9.0 or greater
npx wrangler cert upload mtls-certificate --cert client-cert.pem --key client-key.pem --name <CUSTOM_NAME_FOR_CLIENT_CERTIFICATE>
```

```bash
# PostgreSQL
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --mtls-certificate-id <YOUR_CLIENT_CERT_PAIR_ID>

# MySQL
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --mtls-certificate-id <YOUR_CLIENT_CERT_PAIR_ID>
```

## Options / Props

| PostgreSQL | MySQL | Description |
| --- | --- | --- |
| `require` (default) | `REQUIRED` (default) | TLS is required for encrypted connectivity and server certificates are validated (based on WebPKI). |
| `verify-ca` | `VERIFY_CA` | Hyperdrive will verify that the database server is trustworthy by verifying that the certificates of the server have been signed by the expected root certificate authority or intermediate certificate authority. |
| `verify-full` | `VERIFY_IDENTITY` | In addition to `verify-ca`/`VERIFY_CA` checks, Hyperdrive requires the database hostname to match a Subject Alternative Name (SAN) or Common Name (CN) on the certificate. |

## Notes

- By default all configurations are encrypted (`require`/`REQUIRED`); the database must accept TLS.
- Provide the root or intermediate CA certificate that signed the database certificate. Use the CA bundle for your specific region; a bundle containing more than one CA certificate (for example a global bundle) cannot be used.
- Client certificates add an authentication factor beyond username/password; the database must be configured to verify client certificates. Files: `client-cert.pem` and its private key.
- Server and client certificates can be used separately or together. Dashboard: Hyperdrive > Create configuration > **Server certificates** (SSL mode Verify CA / Verify full) or **Client certificates**.
- Hyperdrive tests the connection when creating a configuration; errors are listed in [troubleshooting](./troubleshooting.md).
- Wrangler `cert` commands in general: see the cloudflare-wrangler skill.

## Related

- [Supported databases and features](./supported-databases-and-features.md)
- [Troubleshoot and debug](./troubleshooting.md)
- [Wrangler commands](./wrangler-commands.md)
