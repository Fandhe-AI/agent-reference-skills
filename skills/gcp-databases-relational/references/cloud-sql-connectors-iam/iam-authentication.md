---
source: https://docs.cloud.google.com/sql/docs/postgres/iam-authentication
---

# IAM authentication

How Cloud SQL integrates with IAM for managing access to Cloud SQL resources and for database authentication. IAM database authentication verifies a database user with an OAuth 2.0 access token instead of a password; it comes in automatic (via a connector) and manual (you pass the token) forms, and also supports IAM group authentication.

## Signature / Usage

Snippets taken from https://docs.cloud.google.com/sql/docs/postgres/iam-logins:

Automatic IAM database authentication (a connector requests and refreshes the token; the client passes only the IAM database username):

```bash
./cloud-sql-proxy --auto-iam-authn INSTANCE_CONNECTION_NAME
```

Manual IAM database authentication (you pass the token as the password; SSL is required). For an instance with a per-instance CA (`GOOGLE_MANAGED_INTERNAL_CA`, the default) only:

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

For a shared CA (`GOOGLE_MANAGED_CAS_CA`) or customer-managed CA (`CUSTOMER_MANAGED_CAS_CA`), `verify-ca` is not enough: use `sslmode=verify-full` with `host=` set to the instance DNS name taken from `dnsNames` in `gcloud sql instances describe` (full steps and example in [iam-logins.md](./iam-logins.md)), or use the Auth Proxy / a connector. Exception: with a shared CA (`GOOGLE_MANAGED_CAS_CA`), the Python Connector does not verify server identity (minimum-version table in [language-connectors.md](./language-connectors.md)), so for a shared CA use the Auth Proxy or the Java (v1.21.0+), Go (v1.12.0+) or Node.js (v1.4.0+) connector instead.

## Options / Props

| Feature | Built-in database authentication | IAM database authentication (individual) | IAM group authentication |
|---------|----------------------------------|------------------------------------------|--------------------------|
| Authentication method | Password | Temporary authentication token | Temporary authentication token |
| Network traffic encryption | SSL not required | SSL required | SSL required |
| User management | Manual | Centralized through IAM | Centralized through IAM and Cloud Identity groups |

Limits and restrictions:

| Item | Value |
|------|-------|
| IAM groups per instance | max 200 |
| Access token lifetime | one hour (OAuth 2.0) |
| Login quota | 12,000 per minute, per instance (successful and unsuccessful logins both count) |
| Database username length | 63 characters; for service accounts, after `.gserviceaccount.com` is truncated to `sa-name@project-id.iam`, the username must not exceed 63 |
| Username case | IAM database login must be all lowercase (`example-user@example.com`; `Example-User@example.com` is not allowed) |
| Transport | IAM database authentication logins work only over SSL; unencrypted connections are rejected |
| Group membership propagation | about 15 minutes, in addition to normal IAM change propagation |

Required permission and roles: `cloudsql.instances.login` (in Cloud SQL Instance User, `roles/cloudsql.instanceUser`) to log in. Instance flag: `cloudsql.iam_authentication` enables IAM database authentication and is required for IAM group authentication; it is enabled by default for instances created in the console. Disabling it removes access for all IAM-authenticated users; it doesn't block existing password users.

Account types: `CLOUD_IAM_USER`, `CLOUD_IAM_SERVICE_ACCOUNT`, `CLOUD_IAM_GROUP_USER`, `CLOUD_IAM_GROUP_SERVICE_ACCOUNT`.

Instance scenarios:

| Scenario | Behavior |
|----------|----------|
| Read replicas | IAM database authentication is not enabled automatically on replicas; add it after creating the replica |
| Restored instances | Same project: current user login authorizations apply. New instance in another project: set up user authorizations again |
| Point-in-time restored instances | Same as restored instances |

## Notes

- Adapted from the official docs: the source's manual login uses `sslmode=require`, which encrypts but does not verify the server, so the token could be sent to an impostor. The example uses `sslmode=verify-ca sslrootcert=server-ca.pem` and applies only to a per-instance CA (the default); the source's SSL page gets that file with `gcloud sql instances describe INSTANCE_NAME --format="value(serverCaCert.cert)" > server-ca.pem`. Per https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl, a shared CA is shared across instances, so hostname verification is required as well (for a customer-managed CA the source says you might want to verify the hostname too); https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance takes the DNS name from `dnsNames` in `gcloud sql instances describe` and uses `sslmode=verify-full` (see [iam-logins.md](./iam-logins.md)). Automatic IAM authentication through the Auth Proxy or a connector avoids handling the token.
- Automatic authentication is strongly recommended over manual, especially for long-lived processes and connection pools; manual tokens expire after one hour and later logins fail. The source lists support for the Cloud SQL Auth Proxy and the Go, Java and Python connectors (the sibling login page also shows a Node.js sample; see [iam-logins.md](./iam-logins.md)).
- Group authentication best practices: also delete a group from the Cloud SQL instance when you revoke its `cloudsql.instances.login` in Cloud Identity or delete the group; give groups least privileges; don't grant group-user roles to built-in users. To move an existing individual IAM account to group authentication, remove the individual account first. With read replicas, log in to the primary first so group user information replicates.
- Context-aware access: connectors (including the Auth Proxy) can't be used with IAM database authentication; connect directly instead.
- Users added with gcloud or the API need login privileges granted manually with PostgreSQL `GRANT`; the console prompts to add the Cloud SQL User role.
- Shared-core instances (`db-f1-micro`, `db-g1-small`): IAM authentication is more CPU-intensive and can cause latency or timeouts when not bursting. Use persistent connection pooling or managed connection pooling, raise client timeouts (for example 10 to 15 seconds), or move to dedicated-core machine types.
- Data Access audit logs are off by default and must be enabled to track logins; this incurs logging costs. IAM Conditions can restrict grants by attributes such as time or resource name.
- The manual form is a public-IP style direct connection when `hostaddr` is a public address. Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Source inconsistency: this page says IAM database authentication is not enabled on a read replica automatically, even when it is enabled on the primary; https://docs.cloud.google.com/sql/docs/postgres/replication/create-replica says that if the `cloudsql.iam_authentication` flag is on for the primary, Cloud SQL enables it on the read replicas automatically.
- Workforce Identity Federation has its own database authentication page (not in this category).
- Cloud SQL is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`) auth. IAM principals, service accounts and ADC basics: `gcp-foundation`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/iam-authentication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source (snippets): https://docs.cloud.google.com/sql/docs/postgres/iam-logins
- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-ssl-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [iam-logins.md](./iam-logins.md)
- [iam-roles.md](./iam-roles.md)
- [roles-and-permissions.md](./roles-and-permissions.md)
- [connect-connectors.md](./connect-connectors.md)
