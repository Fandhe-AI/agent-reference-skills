---
source: https://docs.cloud.google.com/sql/docs/sqlserver/users
---

# About SQL Server users and roles in Cloud SQL

How Cloud SQL maps SQL Server logins and roles, the default `sqlserver` user, how to grant server permissions, and how to fix database access errors.

## Signature / Usage

### Granting server permissions

When you grant privileges with any `GRANT` command, pass `CustomerDbRootRole` as the grantor principal.

Valid:

```sql
GRANT ALTER ANY LOGIN TO [Account] AS CustomerDbRootRole
```

Invalid:

```sql
GRANT ALTER ANY LOGIN TO [Account]
```

### Fix "server principal is not able to access the database"

Error text:

```text
The server principal USERNAME is not able to access the
database DATABASE_NAME under the current security context.
```

The user is not a member of the database. Connect as `sqlserver`, add the user and give it the `db_owner` role:

```sql
EXEC sp_adduser 'user';
EXEC sp_addrolemember 'db_owner', 'user'
```

## Options / Props

Default `sqlserver` user (member of `CustomerDbRootRole`) permissions: `ALTER ANY CONNECTION`, `ALTER ANY LOGIN`, `ALTER ANY SERVER ROLE`, `ALTER SERVER STATE`, `ALTER TRACE`, `CONNECT SQL`, `CREATE ANY DATABASE`, `CREATE SERVER ROLE`, `VIEW ANY DATABASE`, `VIEW ANY DEFINITION`, `VIEW SERVER STATE`.

| Flag | Effect |
|------|--------|
| `cloudsql enable linked servers` | Grants `ALTER ANY LINKED SERVER` |
| `cloud sql enable sp_help_revlogin` | Installs `sp_help_revlogin` in `msdb` and grants `sqlserver` permission to run it (export logins, password hashes, SIDs) |

| Database import owner | Result |
|-----------------------|--------|
| Existing login that isn't `sa` | Cloud SQL keeps the owner and creates user `sqlserver` mapped to login `sqlserver`, granting `CONTROL` and `ALTER ANY USER` |
| Unknown or system-created login | Ownership moves to the `sqlserver` login |

### Linked servers

Linked servers let SQL Server read data from remote data sources and run commands on remote databases. Add the `cloudsql enable linked servers` flag to get `ALTER ANY LINKED SERVER`; `ALTER ANY LOGIN` is granted automatically to the administrative user. To grant either to other accounts, pass `CustomerDbRootRole` as the grantor (see the `GRANT` example above).

Limitations:

- Only SQL Server data sources; Active Directory Authentication isn't available.
- With Private Service Connect, enable PSC outbound connectivity to use linked servers.
- Between Cloud SQL instances over public IP, linked servers don't work when the source is HA or has both private IP (private services access) and public IP (public IP is inbound-only). Use private services access in the same VPC or Shared VPC, or PSC outbound.
- SSMS can't configure a linked server; use the stored procedure from the "Add a linked server" page (https://docs.cloud.google.com/sql/docs/sqlserver/manage-linked-servers#add_a_linked_server).
- Not supported on instances that already have both private services access and PSC enabled; you can't enable PSC on an instance that already has private services access and a linked server.

| Area | Guidance |
|------|----------|
| Security | Use SSL encryption, strict password policies, authorized users only, encrypted sensitive data, least-privilege logins |
| Performance | Each query opens a new connection and data isn't cached (whole tables may be copied); no optimized plan for the remote server. Transfer only necessary data, use distributed queries, distribute queries across servers |
| Reliability | Link failures can cause downtime or data loss: keep a backup linked server, monitor availability, test configurations regularly |

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server variant of the users page; PostgreSQL counterpart: https://docs.cloud.google.com/sql/docs/postgres/users.
- Managed Cloud SQL users and roles; distinct from the Node.js client `mssql` skill (client code only).
- Restricted server roles include `DbRootRole`, `serveradmin`, `securityadmin`, `setupadmin`, `diskadmin`, `dbcreator`. `sysadmin` is unsupported, so procedures that require it (for example `sp_OADestroy`) can't run, and DACPAC automated schema deployment isn't supported.
- All SQL Server users must have a password; users created through Cloud SQL get the same database permissions as `sqlserver`, users created with `CREATE LOGIN` do not (compare with `sys.fn_my_permissions`).
- Use `ALTER ROLE` to change user permissions.
- Not from the source: members of `db_owner` "can perform all configuration and maintenance activities on the database, and can also DROP the database" (Microsoft); if the user only needs to read or write data, add it to a narrower role such as `db_datareader` / `db_datawriter` instead (https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/database-level-roles, retrieved 2026-11-16).
- Linked servers: enabling, adding and configuring them is on https://docs.cloud.google.com/sql/docs/sqlserver/manage-linked-servers. The linked-servers page has no code block.
- Source: https://docs.cloud.google.com/sql/docs/sqlserver/linked-servers (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: the `db_owner` fix above is labelled `bash` in the source but contains T-SQL; it is shown here as `sql`.

## Related

- [features.md](./features.md)
