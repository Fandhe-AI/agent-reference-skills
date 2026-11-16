---
source: https://docs.cloud.google.com/alloydb/docs/connect-iam
---

# Connect using IAM authentication

Authenticate to AlloyDB with IAM credentials instead of a built-in database password: sign in with an OAuth 2.0 access token (for example with `psql`), or authenticate automatically through the Auth Proxy or the Language Connectors. Enable IAM authentication and add IAM database users first: see [manage-iam-auth.md](./manage-iam-auth.md).

## Signature / Usage

### Get an OAuth 2.0 token

```bash
gcloud auth print-access-token
```

Restrict the token to AlloyDB authentication only:

```bash
gcloud auth application-default login --scopes=https://www.googleapis.com/auth/alloydb.login,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/userinfo.email,openid
```

```bash
gcloud auth application-default print-access-token --scopes=https://www.googleapis.com/auth/alloydb.login
```

### Sign in with psql

The token is requested, used as the password and discarded in a single command:

Adapted (not in the official docs): `-h` points at a locally running Auth Proxy (`127.0.0.1`) instead of the instance IP, so the token is not sent over an unverified TLS connection.

```bash
PGPASSWORD=$(gcloud auth print-access-token) psql \
  -h 127.0.0.1 \
  -U USERNAME \
  -d DATABASE
```

Replace `USERNAME` and `DATABASE`. Start the Auth Proxy first (startup commands are in [auth-proxy-connect.md](./auth-proxy-connect.md)); without `--auto-iam-authn` it passes the token through as the password.

### Automatic authentication

Auth Proxy: start the client with `--auto-iam-authn` (startup commands are in [auth-proxy-connect.md](./auth-proxy-connect.md)).

Language Connectors: enable IAM authentication in code, for example the Python connector with `enable_iam_auth=True`. Excerpt: in the full sample, pass `enable_iam_auth=True` to `connector.connect(...)` inside the `creator` lambda; requires `import pg8000`.

```python
  def getconn() -> pg8000.dbapi.Connection:
      conn: pg8000.dbapi.Connection = connector.connect(
          inst_uri,
          "pg8000",
          user=user,
          password=password,
          db=db,
          # use enable_iam_auth to enable IAM authentication
          enable_iam_auth=True,
      )
      return conn
```

## Options / Props

| Database user | `USERNAME` value |
|---------------|------------------|
| IAM user account | The account's full email address, for example `kai@example.com` |
| IAM service account | The service account email without the `.gserviceaccount.com` suffix; for `my-service@my-project.iam.gserviceaccount.com` use `my-service@my-project.iam` |

| Item | Value |
|------|-------|
| OAuth scope for AlloyDB-only tokens | `https://www.googleapis.com/auth/alloydb.login` |
| Password | The access token |
| `psql` password limit | `psql` truncates interactively entered passwords longer than 100 characters; set `PGPASSWORD` instead of pasting at the prompt |
| Auto-auth constraint | The IAM account running the proxy or connector must be the same account added as the database user; no other database user works |
| Language Connector option | Python: `enable_iam_auth=True` (`pg8000` and `asyncpg`); other languages have a corresponding option in https://docs.cloud.google.com/alloydb/docs/connect-language-connectors#configure-connectors |

## Notes

- Caution from the source: there is a per-minute sign-in quota for each instance, covering both successful and unsuccessful sign-ins. When exceeded, sign-ins are temporarily unavailable. Avoid frequent sign-ins and restrict sign-ins by using authorized networks.
- Caution from the source: treat the OAuth 2.0 token as sensitive (same level as a password); store it securely or do not store it. The `PGPASSWORD=$(...)` form keeps it out of a stored file but a value exported in the environment or visible to other local processes is still exposed.
- Adapted from the official docs: the source's `psql` example uses `-h INSTANCE_ADDRESS` (the instance IP). Connecting directly sends the access token over libpq's default `sslmode=prefer`, which does not verify the server, so the example above connects through the Auth Proxy on `127.0.0.1` (mTLS to the instance). Automatic IAM authentication through the Auth Proxy or Language Connectors (above) avoids handling the token at all.
- Preparation of the project, cluster, instances and IAM users (`alloydb.iam_authentication` flag, `roles/alloydb.databaseUser`, `gcloud alloydb users create --type=IAM_BASED`, `GRANT`) is in [manage-iam-auth.md](./manage-iam-auth.md); troubleshooting in https://docs.cloud.google.com/alloydb/docs/troubleshoot/troubleshoot-iam-auth.
- Auth Proxy: the instance URI is `projects/PROJECT_ID/locations/REGION_ID/clusters/CLUSTER_ID/instances/INSTANCE_ID`.
- The ADC login command above authenticates your user for local development; IAM concepts, service accounts and ADC are in `gcp-foundation`, and `gcloud auth` setup in `gcp-cli`.
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`.
- Source: https://docs.cloud.google.com/alloydb/docs/connect-iam (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/connect-language-connectors (Python snippet)

## Related

- [manage-iam-auth.md](./manage-iam-auth.md)
- [auth-proxy-connect.md](./auth-proxy-connect.md)
- [connect-language-connectors.md](./connect-language-connectors.md)
- [connection-overview.md](./connection-overview.md)
