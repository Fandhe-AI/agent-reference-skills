---
source: https://docs.cloud.google.com/sql/docs/mysql/iam-authentication
---

# IAM authentication for Cloud SQL for MySQL

How Cloud SQL integrates with IAM for access control and for database login: principals, roles, IAM database authentication (individual and group), automatic versus manual token login, the `cloudsql_iam_authentication` flag, scenarios, shared-core performance, and restrictions.

## Signature / Usage

### Grant database privileges to an IAM user

After an IAM user is added to the instance, database privileges must be granted manually with the MySQL `GRANT` statement. An IAM user added without roles gets no database roles; `cloudsqlsuperuser` can be assigned when adding the account. The privileges of that role can be inspected with:

```sql
SHOW GRANTS FOR 'cloudsqlsuperuser'
```

## Options / Props

### Authentication options compared

| Feature | Built-in | IAM database authentication (individual) | IAM group authentication |
|---------|----------|-------------------------------------------|--------------------------|
| Authentication method | Password | Temporary authentication token | Temporary authentication token |
| Network traffic encryption | SSL not required | SSL required | SSL required |
| User management | Manual | Centralized through IAM | Centralized through IAM and Cloud Identity groups |

### Automatic vs manual IAM database authentication

| | Automatic | Manual |
|-|-----------|--------|
| How | A Cloud SQL connector requests and refreshes the token; client passes only the IAM database username | Principal logs in to Google Cloud, requests an OAuth 2.0 token (Cloud SQL Admin API scope) with the gcloud CLI, and passes it as the password; username is the email address |
| Supported by | Cloud SQL Auth Proxy, Go connector, Java connector, Python connector | Direct connection or a connector |
| Notes | Strongly recommended; tokens are valid one hour and connectors refresh them | Tokens valid one hour; new connections after that fail; not recommended for long-lived processes or connection pooling |

### IAM group authentication restrictions

| Limit | Value |
|-------|-------|
| IAM groups per instance | 200 maximum |
| Individual account types `CLOUD_IAM_USER` / `CLOUD_IAM_SERVICE_ACCOUNT` | Can't be added if the same account exists as `CLOUD_IAM_GROUP_USER` / `CLOUD_IAM_GROUP_SERVICE_ACCOUNT`; existing individual accounts don't inherit group roles or privileges (remove them first) |
| Group membership change propagation | About 15 minutes, in addition to normal IAM propagation |

### General restrictions

| Restriction | Detail |
|-------------|--------|
| Login name | Must be all lowercase, e.g. `example-user@example.com` |
| SSL | IAM database logins are available only over SSL; unencrypted connections are rejected |
| Login quota | 12,000 logins per minute per instance (successful and unsuccessful); excess logins are temporarily unavailable |
| MySQL 5.6 | IAM database authentication is not supported |
| Context-aware access | Connectors (Auth Proxy, language connectors) can't be used with IAM database authentication; connect directly |

### Instance scenarios

| Scenario | Behavior |
|----------|----------|
| Read replicas | IAM authentication is not enabled automatically; configure it after creating the replica |
| Restored instance (same project) | Current user login authorizations apply; set up authorizations again when restoring into another project |
| Point-in-time restore | Same as above |

## Notes

- MySQL variant; the PostgreSQL counterpart is https://docs.cloud.google.com/sql/docs/postgres/iam-authentication.
- Distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js clients `mssql` / ORM `drizzle` (those cover client code, not the managed service). IAM concepts themselves (roles, principals, service accounts) are in `gcp-foundation`.
- Snippet taken from https://docs.cloud.google.com/sql/docs/mysql/users (the IAM authentication page has no code block).
- Flag: enable with `cloudsql_iam_authentication` (on by default when created in the console). It is required for IAM group authentication and IAM database authentication. Disabling it removes access for previously added IAM users; non-IAM users keep their passwords.
- The `cloudsql.instances.login` permission (in the Cloud SQL Instance User role) is required to log in; the console asks you to add the "Cloud SQL User" role. IAM bindings default to project level, giving access to all instances in the project.
- Best practices for groups: when revoking `cloudsql.instances.login` or deleting a Cloud Identity group, also delete the group from the instance; give groups least privilege; don't grant IAM group roles to built-in users.
- Data Access audit logs (off by default, cost applies) must be enabled to track logins.
- Shared-core machine types (`db-f1-micro`, `db-g1-small`) can see high latency or timeouts with IAM authentication once CPU bursting ends: use persistent connection pools, managed connection pooling or the Auth Proxy, raise connection timeouts (for example 10 to 15 seconds), or move to dedicated-core machines.
- Workforce Identity Federation has its own database authentication: https://docs.cloud.google.com/sql/docs/mysql/workforce-authentication.
- Source: https://docs.cloud.google.com/sql/docs/mysql/iam-authentication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/mysql/users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [users.md](./users.md)
- [replication.md](./replication.md)
- [features.md](./features.md)
