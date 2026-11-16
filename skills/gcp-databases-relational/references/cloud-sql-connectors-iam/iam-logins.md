---
source: https://docs.cloud.google.com/sql/docs/postgres/iam-logins
---

# Log in with IAM database authentication

How users and service accounts log in to Cloud SQL for PostgreSQL databases with IAM database authentication: automatically through a connector (Auth Proxy, Go, Java, Python; the page also has a Node.js sample), or manually with an access token from `gcloud sql generate-login-token`. The Python connector sample is in [connectors-iam-python.md](./connectors-iam-python.md).

## Signature / Usage

### Automatic: Cloud SQL Auth Proxy

If you use the `cloud_sql_proxy` binary or the `--enable_iam_login` flag, you are on v1 of the Auth Proxy (legacy). Migrate to v2 `cloud-sql-proxy` and use `--auto-iam-authn`.

1. Authenticate with Application Default Credentials. For a user, run `gcloud auth application-default login`. For a service account, use impersonation (replace `SERVICE_ACCOUNT_EMAIL_ADDRESS`):

```bash
gcloud auth application-default login --impersonate-service-account SERVICE_ACCOUNT_EMAIL_ADDRESS
```

2. Start the proxy with `--auto-iam-authn`. `INSTANCE_CONNECTION_NAME` identifies the instance (add the port if you use a non-default PostgreSQL port).

```bash
./cloud-sql-proxy --auto-iam-authn INSTANCE_CONNECTION_NAME
```

3. Log in with `psql`. Replace `HOSTNAME` (default proxy address `127.0.0.1`), `USERNAME`, `PORT_NUMBER` (optional, if you set a different port) and `DATABASE_NAME`.

```bash
psql -h HOSTNAME \
 -U USERNAME \
 --port PORT_NUMBER \
 --dbname=DATABASE_NAME
```

### Automatic: Node.js connector

```javascript
const Knex = require('knex');
const {Connector} = require('@google-cloud/cloud-sql-connector');

// In case the PRIVATE_IP environment variable is defined then we set
// the ipType=PRIVATE for the new connector instance, otherwise defaults
// to public ip type.
const getIpType = () =>
  process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true'
    ? 'PRIVATE'
    : 'PUBLIC';

// connectWithConnectorAutoIAMAuthn initializes connection pool for a Cloud SQL instance
// of Postgres using the Cloud SQL Node.js Connector.
const connectWithConnectorAutoIAMAuthn = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: getIpType(),
    authType: 'IAM',
  });
  const dbConfig = {
    client: 'pg',
    connection: {
      ...clientOpts,
      user: process.env.IAM_DB_USER, // e.g. 'sa-name@project-id.iam'
      database: process.env.DB_NAME, // e.g. 'my-database'
    },
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  return Knex(dbConfig);
};
```

### Manual: gcloud token

Authenticate first: a user with `gcloud auth login`, a service account with `gcloud auth activate-service-account`. Then request a token and log in. The OAuth 2.0 token is too long to paste into a password field, so pass it through an environment variable (the command is for Unix/Linux; on Windows substitute environment variable settings). Replace `HOSTNAME` (public or private IP of the instance), `USERNAME` and `DATABASE_NAME`.

Per-instance CA (`GOOGLE_MANAGED_INTERNAL_CA`, the default) only:

Adapted (not in the official docs): `sslmode=verify-ca` with `sslrootcert=server-ca.pem` replaces `sslmode=require`, so the token is only sent after the server certificate is verified; this is enough only for a per-instance CA, where the CA is unique to the instance.

```bash
PGPASSWORD=`gcloud sql generate-login-token` \
psql "sslmode=verify-ca \
sslrootcert=server-ca.pem \
hostaddr=HOSTNAME \
user=USERNAME \
dbname=DATABASE_NAME" \
--no-password
```

Shared CA (`GOOGLE_MANAGED_CAS_CA`) or customer-managed CA (`CUSTOMER_MANAGED_CAS_CA`): get the instance's DNS name from the `dnsNames:` field of the instance description (not from the certificate the server presents), create a DNS record for it, and connect to that name with hostname verification. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance:

```bash
gcloud sql instances describe INSTANCE_NAME \
  --project=PROJECT_ID
```

Adapted (not in the official docs): `sslmode=verify-full` with `sslrootcert=server-ca.pem` (the CA bundle) and `host=DNS_NAME` (a name from `dnsNames`) replace `sslmode=require` and `hostaddr=HOSTNAME`, so the token is only sent to a server whose certificate is issued by the CA and names this instance.

```bash
PGPASSWORD=`gcloud sql generate-login-token` \
psql "sslmode=verify-full \
sslrootcert=server-ca.pem \
host=DNS_NAME \
user=USERNAME \
dbname=DATABASE_NAME" \
--no-password
```

The Auth Proxy or a connector with automatic IAM authentication (above) verifies the server without these steps.

## Options / Props

| Item | Description |
|------|-------------|
| `roles/cloudsql.instanceUser` | Contains `cloudsql.instances.login`; required to log in with IAM database authentication |
| `roles/cloudsql.client` | Contains `cloudsql.instances.connect`; required additionally when using the Auth Proxy |
| `USERNAME` (user) | Full email address of the IAM user |
| `USERNAME` (service account) | Service account email without the `.gserviceaccount.com` suffix, e.g. `sa-name@project-id.iam` |
| Python connector (automatic) | `enable_iam_auth=True` in `connector.connect(...)`, `user=` set to the IAM user (`DB_IAM_USER`, e.g. `sa-name@project-id.iam`), no `password=`; full verbatim sample and `pip install` in [connectors-iam-python.md](./connectors-iam-python.md) |
| Egress ports | Allow outgoing TCP to `443` (APIs via `sqladmin.googleapis.com`, no fixed IP) and `3307` (connector connections to the instance IP) |

Prerequisites: instance configured for IAM database authentication; IAM user, service account or group added to the database; a new IAM database user has no database privileges by default (assign database roles when adding or updating the account, or use `GRANT`); with group authentication the account must belong to a group granted login permission, and Cloud SQL creates the account on first login. When a connector uses automatic authentication, the IAM account that starts the connector must be the same account that authenticates to the database.

## Notes

- Adapted from the official docs: the source's manual login uses `sslmode=require`, which encrypts but does not verify the server, so the token could be sent to an impostor. The per-instance CA example uses `sslmode=verify-ca sslrootcert=server-ca.pem`; the source's SSL page gets that file with `gcloud sql instances describe INSTANCE_NAME --format="value(serverCaCert.cert)" > server-ca.pem`. Per https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl, verifying the CA verifies the server identity only for a per-instance CA. Automatic IAM authentication through the Auth Proxy or a connector avoids handling the token.
- Adapted from the official docs: for a shared CA the CA is shared by all instances in the region, so `verify-ca` would also accept another instance's certificate; the source requires hostname verification as well (https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl), and for a customer-managed CA it says you might want to verify the hostname too. That example therefore uses `sslmode=verify-full` with `host=DNS_NAME`, following the steps in https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance (take `DNS_NAME` from `dnsNames` in `gcloud sql instances describe`, create the DNS record, use `sslmode=verify-full`). Download the CA bundle for `sslrootcert` as described in https://docs.cloud.google.com/sql/docs/postgres/manage-ssl-instance. Not from the source (libpq): `verify-full` checks the certificate against `host`, not `hostaddr`, so `host` must be the DNS name. The listed names end with a trailing dot; the source's Node.js `servername` example (see `cloud-sql-operations/troubleshooting.md`) omits it. With a per-instance CA the certificate carries the DNS name only for Private Service Connect instances.
- Warning (source): if you run the Auth Proxy as a service, it requests access tokens on behalf of your applications; ensure only trusted users can reach its address and port or Unix socket. Keep the proxy on its default `127.0.0.1`.
- Warning (source): the OAuth 2.0 token can make authenticated requests on your behalf; keep it secure and be careful where you store it. Tokens live one hour.
- Manual login: for a public IP instance you must authorize your machine's IP address; for private IP run the command inside the VPC network. Exposes the instance on a public IP when authorized networks are used; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them. SSL is mandatory (IAM logins are SSL-only; the source uses `sslmode=require`, the examples above `sslmode=verify-ca` for a per-instance CA and `sslmode=verify-full` for a shared or customer-managed CA). If the instance `ssl_mode` is `TRUSTED_CLIENT_CERTIFICATE_REQUIRED`, the source recommends automatic IAM database authentication to enforce client identity validation.
- Source inconsistency: the page text lists Auth Proxy, Go, Java and Python as supporting automatic IAM database authentication, yet it also provides a Node.js sample using `authType: 'IAM'`.
- The Node.js and Python samples default to public IP when `PRIVATE_IP` is unset. The source's full Python automatic-IAM sample (`connect_with_connector_auto_iam_authn`) is in [connectors-iam-python.md](./connectors-iam-python.md).
- Leading indentation and trailing blank lines from the rendered twin were normalized in code blocks. The source also shows Go, Java JDBC and Java R2DBC samples; omitted. The Java sample's placeholder password `"password"` exists only to bypass driver validation.
- Cloud SQL is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`. ADC setup: `gcp-foundation`; client-library patterns: `gcp-client-libraries`; gcloud: `gcp-cli`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/iam-logins (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the `gcloud sql instances describe` snippet)
- Source: https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connectors-iam-python.md](./connectors-iam-python.md)
- [iam-authentication.md](./iam-authentication.md)
- [connect-connectors.md](./connect-connectors.md)
- [iam-roles.md](./iam-roles.md)
