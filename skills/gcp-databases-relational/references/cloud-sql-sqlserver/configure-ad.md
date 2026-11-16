---
source: https://docs.cloud.google.com/sql/docs/sqlserver/configure-ad
---

# Using Cloud SQL with Managed Microsoft AD

Integrate a Cloud SQL for SQL Server instance with Managed Service for Microsoft Active Directory so it supports Windows Authentication in addition to SQL Authentication, and connect with AD users.

## Signature / Usage

Prerequisites: billing enabled, gcloud CLI installed, the `Cloud SQL Admin` role on your account, and the integration prerequisites from the overview page. Instances created on or before March 12, 2021 can't be integrated. Private IP must be enabled (public IP is allowed in addition).

### Create an instance with Windows Authentication

If joining the domain fails, instance creation fails; creation can take up to 30 minutes. Cloud SQL also creates an undeletable login `[domain]\sql_[letters-and-digits]` (removed when Windows Authentication is disabled). Replace `PASSWORD` with the `sqlserver` user's password; the source shows it inline, so avoid leaving it in shell history.

Adapted (not in the official docs): the source writes `--active-directory-domain=DOMAIN\` with no space before the line continuation, which makes bash join it to the next line (`DOMAIN--cpu=CPU`); a space is added.

```bash
gcloud beta sql instances create INSTANCE_NAME \
--database-version=EDITION \
--root-password=PASSWORD \
--active-directory-domain=DOMAIN \
--cpu=CPU \
--memory=MEMORY  \
--network=NETWORK
```

### Update or remove the domain

Removing Windows Authentication restarts the instance. An update first unjoins the current domain; if it fails the instance may be left unjoined.

```bash
gcloud beta sql instances patch INSTANCE_NAME \
--active-directory-domain=DOMAIN
```

Remove (blank value):

```bash
gcloud beta sql instances patch INSTANCE_NAME \
--active-directory-domain=
```

### Domain in a different project

Needs gcloud or REST (not the console). Enable domain peering first (`gcloud active-directory peerings list` needs `managedidentities.peerings.list`, granted by `roles/managedidentities.peeringViewer` or `roles/managedidentities.viewer`). In each project with SQL Server instances, create the service account (use the project ID of the SQL Server project), then grant the role in the AD project (see the overview page for the commands). Specify the full domain resource name:

```bash
gcloud beta sql instances patch INSTANCE_NAME \
--active-directory-domain=projects/PROJECT_ID/locations/global/domains/DOMAIN_NAME
```

### Connect with a Windows login

```sql
CREATE LOGIN [domain\user_or_group] FROM WINDOWS
```

Log in with Windows Authentication using the instance DNS name: `private.myinstance.us-central1.myproject.cloudsql.mydomain.com` (private IP), `public.myinstance.us-central1.myproject.cloudsql.mydomain.com` (public IP), or `proxy.myinstance.us-central1.myproject.cloudsql.mydomain.com` (Auth Proxy). Using the instance IP requires configuring Kerberos clients for IP hostnames.

### Auth Proxy with Windows Authentication

Run the Auth Proxy on port 1433 and map the SPN name to `127.0.0.1` in the hosts file (for example `c:\windows\system32\drivers\etc\hosts`):

```text
127.0.0.1 proxy.[instance].[location].[project].cloudsql.[domain]
```

Adapted (not in the official docs): replaced project:name with the full instance connection name PROJECT_ID:REGION:INSTANCE_NAME required by the v2 proxy.

```bash
cloud-sql-proxy.exe --credentials-file credential.json PROJECT_ID:REGION:INSTANCE_NAME
```

### On-premises AD users

Not recommended; prefer a Managed AD user or `sqlserver`. Only Kerberos is supported and the client must resolve DNS for both domains. Use a two-way trust (one-way trust can drop long-running connections and can't run privileged operations such as create/drop login).

```sql
CREATE LOGIN [DOMAIN_NAME\USER_NAME] FROM WINDOWS
```

## Options / Props

| Error | Cause | Fix |
|-------|-------|-----|
| `Per-product, per-project service account not found.` | Wrong service account | Create it for the correct project |
| `Insufficient permission to integrate with Managed Service for Microsoft Active Directory domain.` | Missing `managedidentities.sqlintegrator` | Add the role to the service account |
| `Domain not found` | Domain missing or mistyped | Name is case sensitive |
| `The domain is busy with another operation. Please retry.` | Another instance is operating on the same domain | Retry; limit parallel updates |
| `The operation completed but an update to Active Directory failed...` | AD update failed | Unjoin and rejoin (restarts the instance; logins are kept) |
| `This instance would need a more recent creation date...` | Instance created on or before March 12, 2021 | Use a newer instance |

Cross-project constraints: up to 10 networks with Cloud SQL for SQL Server instances can share one Managed Microsoft AD in another project; with VPC Service Controls, instances and AD must be in the same perimeter; the console may show an inaccurate FQDN for such instances.

NTLM fallback (Error 18452 `Login failed. The login is from an untrusted domain...`): Cloud SQL doesn't support NTLM. Check with `klist purge`, connect from SSMS, then `klist` for a ticket `MSSQLSvc/<address>:1433`; no ticket means NTLM fallback. Causes: IP hostnames, external trusts, missing name suffix routing, no SPN registered. Use the AD diagnosis tool and the `active_directory.log` in Cloud Logging for on-premises connectivity.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/configure-ad (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy (retrieved 2026-11-16; instance connection name format)
- Adapted from the official docs: original fragment `--active-directory-domain=DOMAIN\`; corrected to `--active-directory-domain=DOMAIN \`.
- Corrected from the official docs: the original was "cloud-sql-proxy.exe --credentials-file credential.json project:name"; the v2 proxy takes the full instance connection name (`myproject:myregion:myinstance`, see https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy).
- `EDITION` is a SQL Server database version such as `SQLSERVER_2022_STANDARD` (gcloud sql instances create `--database-version`), not the `--edition` flag (`enterprise` / `enterprise-plus`).
- `--root-password=PASSWORD` puts the `sqlserver` password in shell history (gcloud 593.0.0 `sql instances create` has no prompt flag). After creation, rotate the sqlserver password without echoing it: `gcloud sql users set-password sqlserver --instance=INSTANCE_NAME --prompt-for-password`.
- gcloud 593.0.0 also has `--clear-active-directory` on `gcloud sql instances patch` ("Clears the Active Directory configuration.") for removing the domain; the source uses a blank `--active-directory-domain=` value.
- Source inconsistency: this page uses `--project=[PROJECT_ID]` for `gcloud beta services identity create`, while the overview page uses `--project=PROJECT_NUMBER` for the same command.
- SQL Server-specific page (Windows Authentication / Managed Microsoft AD); no PostgreSQL counterpart was checked.
- Managed Cloud SQL integration; distinct from the Node.js client `mssql` skill (client code only).
- Removing Windows Authentication or unjoin/rejoin restarts the instance; try on a disposable instance first.
- Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Omitted: Console steps, Terraform, REST request bodies and the Ubuntu Kerberos / `apt-key` verification steps (the source's `curl ... | sudo apt-key add -` step uses deprecated tooling and is not reproduced).
- The Auth Proxy command uses the v2 `cloud-sql-proxy` binary and the Windows hosts file maps the name to the loopback address only.

## Related

- [ad.md](./ad.md)
- [users.md](./users.md)
