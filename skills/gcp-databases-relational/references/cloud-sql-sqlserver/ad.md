---
source: https://docs.cloud.google.com/sql/docs/sqlserver/ad
---

# Overview of Managed Microsoft AD in Cloud SQL for SQL Server

Managed Service for Microsoft Active Directory (Managed Microsoft AD) lets Cloud SQL for SQL Server instances use AD-based identities and Windows Authentication, and connects cloud databases with on-premises AD domains. This page covers prerequisites, the integration service account, topologies and limitations.

## Signature / Usage

### Create and configure the per-product, per-project service account

You need one Per-Product, Per-Project service account for each project you integrate, and the Cloud SQL Admin API enabled. The source says that creating the service account "with the required permissions" needs `resourcemanager.projects.setIamPolicy` (in Project Owner, Project IAM Admin and Organization Administrator). Not from the source: that permission is what the role grant (`gcloud projects add-iam-policy-binding` on the AD project) needs; `gcloud beta services identity create` only generates the service agent through the Service Usage API (`services.generateServiceIdentity`). In the console, Cloud SQL creates the account and prompts for the role.

```bash
gcloud beta services identity create --service=sqladmin.googleapis.com \
    --project=PROJECT_NUMBER
```

The command returns a name such as `service-PROJECT_NUMBER@gcp-sa-cloud-sql.iam.gserviceaccount.com`. Grant it `managedidentities.sqlintegrator`. If the Managed Microsoft AD is in another project, `AD_PROJECT_ID` is the project containing the AD instance and `SQL_PROJECT_NUMBER` is the project containing the SQL Server instance:

```bash
gcloud projects add-iam-policy-binding AD_PROJECT_ID \
--member=serviceAccount:service-SQL_PROJECT_NUMBER@gcp-sa-cloud-sql.iam.gserviceaccount.com \
--role=roles/managedidentities.sqlintegrator
```

## Options / Props

### Prerequisites

- A Managed Microsoft AD domain; on-premises AD domains require a managed AD trust.
- The per-product, per-project service account above.
- Only instances created after March 12, 2021 are supported.

### Topologies

Domain local groups aren't supported.

| Option | When | Approach |
|--------|------|----------|
| 1 | Multiple domains in multiple forests | Add individual user accounts and global/universal groups directly as SQL Server logins |
| 2 | Domains in the same forest | Define a universal group in one domain, add accounts and groups as its children, add that universal group as the SQL Server login |

### Limitations

- Users created through SQL Server directly (such as AD users) can't be granted `SQLAgentUserRole` or use SQL Server Agent (the `msdb` database is protected).
- "Could not obtain information about Windows NT group/user" can occur for logins or grants by users from trusted domains; retry, or close and reopen the connection.
- Use short domain names for logins (`ad\user`, not `ad.mydomain.com\user`); use FQDNs to reach the instance (for example `private.myinstance.us-central1.myproject.cloudsql.mydomain.com`). NetBIOS and short names aren't supported.
- AD-based logins can't be managed from the console.
- Windows Authentication doesn't work with an external trust (`The target principal name is incorrect. Cannot generate SSPI context.`); use a forest trust.
- Managed domains with fewer than eight characters (for example `xyz.com`) are unsupported.
- If you need a TLS connection without trusting the server certificate, rotate certificates after enabling Windows Authentication; if a certificate was created before March 15, 2025 and the connection fails, rotate the server certificate again.

### Unsupported for integration

Domain local groups; dropping logins by users from trusted domains (do it as a managed-domain user or `sqlserver`); NTLM authentication; login with an IP address from trusted domains; instance names longer than 63 characters.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/ad (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: this page uses `--project=PROJECT_NUMBER` for `gcloud beta services identity create`, while the configure page uses `--project=[PROJECT_ID]` for the same command.
- SQL Server-specific page (Windows Authentication / Managed Microsoft AD); no PostgreSQL counterpart was checked.
- Managed Cloud SQL identity integration; distinct from the Node.js client `mssql` skill (client code only). IAM roles and service accounts in general are covered by `gcp-foundation`.
- Put the SQL Server instance and the AD instance in the same region for lowest latency, and set up a primary and a backup region.
- The `gcloud` commands here create the Cloud SQL service agent and add an IAM binding on the AD project; they do not delete anything.

## Related

- [configure-ad.md](./configure-ad.md)
- [users.md](./users.md)
