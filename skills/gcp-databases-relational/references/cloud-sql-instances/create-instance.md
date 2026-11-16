---
source: https://docs.cloud.google.com/sql/docs/postgres/create-instance
---

# Create instances

Create a Cloud SQL for PostgreSQL instance with the Console, gcloud, Terraform or the Admin API (REST v1 / v1beta4), then set the `postgres` user password and read the assigned IP address. A new instance has a `postgres` database.

## Signature / Usage

### Before you begin

Your user account needs the roles Cloud SQL Admin and Compute Viewer.

### Create with gcloud (Enterprise Plus edition)

```bash
    gcloud sql instances create INSTANCE_NAME \
    --database-version=DATABASE_VERSION \
    --region=REGION \
    --tier=TIER \
    --edition=ENTERPRISE_PLUS
```

### Create with gcloud (Enterprise edition)

```bash
    gcloud sql instances create INSTANCE_NAME \
    --database-version=DATABASE_VERSION \
    --region=REGION \
    --cpu=NUMBER_CPUS \
    --memory=MEMORY_SIZE \
    --edition=ENTERPRISE
```

Alternatively use `--tier` for the shared-core machine types `db-f1-micro` or `db-g1-small`:

Adapted (not in the official docs): added --database-version (gcloud defaults to MYSQL_8_0) and --edition=ENTERPRISE (shared-core tiers are Enterprise-only; PostgreSQL 16+ defaults to Enterprise Plus).

```bash
    gcloud sql instances create INSTANCE_NAME \
      --database-version=DATABASE_VERSION \
      --edition=ENTERPRISE \
      --tier=API_TIER_STRING \
      --region=REGION
```

### Set the postgres password

The `postgres` user has no password until you set one; gcloud prompts for the password (character echo disabled) so it is not stored in shell history. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-manage-users:

```bash
gcloud sql users set-password postgres \
--instance=INSTANCE_NAME \
--prompt-for-password
```

### Private IP prerequisites on new projects

Required before creating a private-services-access instance in a new or empty project; otherwise creation fails with `SERVICE_NETWORKING_NOT_ENABLED` or `NETWORK_NOT_PEERED`. Enable `servicenetworking.googleapis.com`, allocate an IP range and configure VPC Network Peering first; the commands are on https://docs.cloud.google.com/sql/docs/postgres/configure-private-ip (`cloud-sql-networking` in this skill).

### Create and inspect with REST v1

Save the request body (fields listed below) in `request.json`, then:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://sqladmin.googleapis.com/v1/projects/PROJECT_ID/instances"
```

The response is a long-running operation (`"kind": "sql#operation"`, `"status": "PENDING"`). Retrieve the assigned IPv4 address from the `ipAddress` field with a `GET` on `https://sqladmin.googleapis.com/v1/projects/project-id/instances/instance-id`.

For v1beta4 the URLs are `https://sqladmin.googleapis.com/sql/v1beta4/projects/PROJECT_ID/instances` (POST) and `.../instances/instance-id` (GET).

### Write endpoint

For Enterprise Plus instances, Cloud SQL generates a write endpoint (global DNS name resolving to the current primary, redirected after failover or switchover) when the Cloud DNS API is enabled, a private IP is added, an associated network is specified, and optionally an allocated IP range is given.

## Options / Props

### gcloud parameters

| Setting | Parameter | Notes |
|---|---|---|
| Database version (required) | `--database-version` | Based on your edition. |
| Region (required) | `--region` | Default `us-central1`; cannot be changed later. Org policy may restrict regions. |
| Password policy | `--enable-password-policy`, `--clear-password-policy` (`gcloud sql instances patch` only), `--password-policy-min-length`, `--password-policy-complexity` (`COMPLEXITY_DEFAULT`), `--password-policy-reuse-interval`, `--password-policy-disallow-username-substring` (`--no-...` to disable), `--password-policy-password-change-interval` (e.g. `2m`) | Disabled by default; clearing resets the other options. |
| Managed Connection Pooling | `--enable-connection-pooling` | Enterprise Plus only, with pooling requirements met. |
| Private IP (private services access) | `--network`, `--no-assign-ip`, `--allocated-ip-range-name` (beta/alpha only: `gcloud beta sql instances create`), `--enable-google-private-path` | `--network` requires private services access configured; `--enable-google-private-path` valid only with `--no-assign-ip` and `--network`. |
| Private IP (Private Service Connect) | `--no-assign-ip`, `--enable-private-service-connect`, `--allowed-psc-projects`, `--psc-auto-connections`, `--enable-psc-auto-connection-policy` | `--allowed-psc-projects` is a comma-separated list of project IDs or numbers. |
| Data API | `--data-api-access` | `ALLOW_DATA_API` / `DISALLOW_DATA_API` (default disallowed). For private-IP-only instances, allowing it lets authorized users call the Data API from the public internet. |
| Public IP | `--authorized-networks` | Only authorized networks can connect. |
| SSL | `--ssl-mode`, `--require-ssl` | `--require-ssl` is legacy; use `--ssl-mode`. |
| Server CA mode | `--server-ca-mode` | `GOOGLE_MANAGED_INTERNAL_CA` (default), `GOOGLE_MANAGED_CAS_CA`, `CUSTOMER_MANAGED_CAS_CA`. |
| Certificate rotation | `--server-certificate-rotation-mode` | `NO_AUTOMATIC_ROTATION` (default), `AUTOMATIC_ROTATION_DURING_MAINTENANCE` (needs a CAS CA mode). |
| Network architecture | `--enforce-new-sql-network-architecture` | Can cause IP over-consumption or creation failure if the project is not fully upgraded. |
| Machine type | `--tier`, `--cpu`, `--memory` | `--tier` for shared core (`db-f1-micro`, `db-g1-small`). |
| Storage | `--storage-type`, `--storage-size` (GB), `--storage-auto-increase`, `--storage-auto-increase-limit` (GB, default `unlimited`) | |
| Data cache | `--enable-data-cache` | |
| High availability | `--availability-type=REGIONAL`, `--zone`, `--secondary-zone` | See zone rules below. |
| Backups | `--backup-start-time`, `--retained-backups-count`, `--retained-transaction-log-days`, `--enable-point-in-time-recovery` | |
| Flags | `--database-flags` | |
| Maintenance | `--maintenance-window-day`, `--maintenance-window-hour`, `--maintenance-release-channel` (`preview` earlier, `production` later) | |
| Vertex AI | `--enable-google-ml-integration`, `--database-flags cloudsql.enable_google_ml_integration=on` | |
| Query insights | `--insights-config-query-insights-enabled` | |
| Custom SAN | `--custom-subject-alternative-names=DNS_NAMES` | Up to three DNS names; `CUSTOMER_MANAGED_CAS_CA` instances only; gcloud create only. |

### Limits and rules

| Item | Value |
|---|---|
| Instances per project (new network architecture) | up to 1,000 |
| Instances per project (old network architecture) | up to 100 (mixed: between 100 and 1,000); read replicas count; request increases via support case |
| vCPUs (Enterprise) | 1 or an even number between 2 and 96 (up to 80 in select regions) |
| Memory (Enterprise) | 0.9 to 6.5 GB per vCPU; multiple of 256 MB; at least 3.75 GB (3840 MB) |
| Default edition | Enterprise Plus for PostgreSQL 16+ (unless region lacks Enterprise Plus support); Enterprise otherwise |
| Enterprise Plus versions | PostgreSQL 12 and later |
| Secondary zone | Valid zones; primary must also be set; must differ from primary; same region |
| PITR default | Enterprise Plus: on always. Enterprise: on in Console, off with gcloud / Terraform / Admin API |
| Write-ahead log retention (Console) | 1 to 7 days, default 7 (Enterprise; Enterprise Plus up to 35 days per editions-intro) |
| Automated backup retention | 1 to 365 |
| Custom SAN | max 3 names, each up to 253 characters, no wildcards, no trailing dots, RFC 1034 |
| Enterprise Plus machine series | N2, C4A, C4, C4D |
| Enterprise machine series | general purpose shared core, dedicated core, N4 |

### REST request body fields

`name`, `region`, `databaseVersion`, `rootPassword`, `settings.tier`, `settings.edition`, `settings.enableGoogleMlIntegration`, `settings.databaseFlags`, `settings.dataCacheConfig.dataCacheEnabled`, `settings.backupConfiguration.enabled`, `settings.passwordValidationPolicy` (`enablePasswordPolicy`, `minLength`, `complexity`, `reuseInterval`, `disallowUsernameSubstring`, `passwordChangeInterval` as seconds ending in `s`, e.g. `3.5s`), `settings.ipConfiguration` (`privateNetwork`, `authorizedNetworks`, `ipv4Enabled`, `enablePrivatePathForGoogleCloudServices`, `serverCaMode`, `serverCertificateRotationMode`, `customSubjectAlternativeNames`), `settings.dataApiAccess`, `sqlNetworkArchitecture`. Set `ipv4Enabled` to `true` for a public IP, `false` for private only.

## Notes

- Managed PostgreSQL / MySQL / SQL Server on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service). Authentication and IAM basics are in `gcp-foundation`; gcloud setup in `gcp-cli`.
- Corrected from the official docs: the shared-core example ran `gcloud sql instances create INSTANCE_NAME --tier=API_TIER_STRING --region=REGION` without `--database-version` (gcloud help: default `MYSQL_8_0`) or `--edition` (PostgreSQL 16+ defaults to Enterprise Plus; shared core is Enterprise-only).
- The page's own source shows `gcloud sql users set-password postgres --instance=INSTANCE_NAME --password=PASSWORD`; the `--prompt-for-password` form (character echo disabled) shown above is the official block from https://docs.cloud.google.com/sql/docs/postgres/create-manage-users.
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-manage-users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The source's Enterprise example (`--database-version=POSTGRES_16 --cpu=2 --memory=7680MB --region=us-central1`) is omitted: it has no `--edition`, so it resolves to Enterprise Plus, which gcloud help says does not accept `--cpu`/`--memory`. Use the Enterprise block above with `--edition=ENTERPRISE`.
- Source inconsistency: the source gives the default region as `us-central1`; gcloud 593 help shows `default="us-central"`.
- The source also shows a private-IP REST callout with `gcloud services enable` / `gcloud compute addresses create` / `gcloud services vpc-peerings connect` prerequisite commands, a REST `GET` example and two concrete `myinstance` examples; they are omitted here (the prerequisite commands are on the configure-private-ip page).
- Source inconsistency: the Console steps refer to the "Create a SQL Server instance" page, and some links point at `mysql` documentation paths. Values above follow the PostgreSQL text.
- Source inconsistency: the response example shows `"databaseVersion": "MYSQL_8_0_18"` although the page is for PostgreSQL.
- A password passed as `--password=PASSWORD` or `rootPassword` lands in shell history or request files; use `--prompt-for-password`, avoid echoing it, and prefer IAM database authentication where possible (source: IAM authentication is more secure).
- Setting `authorizedNetworks` / `ipv4Enabled: true` exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them. Allowing the Data API on a private-IP-only instance opens it to the public internet for authorized users.
- The source's REST request body is pseudo-JSON (`"true" | "false"` unions, missing commas, unquoted placeholders) and is not reproduced; use the field list above. The source also shows Console steps, Terraform (including `terraform destroy` and a sample `root_password` literal), PowerShell and the REST v1beta4 body.
- Troubleshooting from the source: `The zone or region does not have sufficient resources...` (retry another zone or time); `Failed to create subnetwork. Couldn't find free blocks in allocated IP ranges` (allocated range smaller than /24 or too small; expand or add a range, never shrink, e.g. 10.0.10.0/24 to at least 10.0.10.0/23, then run `gcloud services vpc-peerings update --service=servicenetworking.googleapis.com --ranges=RESERVED_RANGE_NAME --network=VPC_NETWORK --project=PROJECT_ID`; with a new range pass `--ranges=OLD_RESERVED_RANGE_NAME,NEW_RESERVED_RANGE_NAME` and the source adds `--force`, which changes the live peering so try it on a disposable project first); `Router status is temporarily unavailable` (retry); `SERVICE_NETWORKING_NOT_ENABLED` (`gcloud services enable servicenetworking.googleapis.com --project=PROJECT_ID`); `Required 'compute.projects.get' permission` (service account not yet propagated); custom SAN errors (more than 3 names, over 253 characters, invalid name); `sql.restrictNoncompliantResourceCreation` org policy (set by Assured Workloads; disable it if you do not use Assured Workloads, and use `constraints/gcp.resourceLocations`, `constraints/gcp.restrictNonCmekServices` or `constraints/sql.restrictPublicIp` instead).
- Do not include sensitive or personally identifiable information in the instance name; it is externally visible. The project ID is added automatically where needed. Instance deletion protection and Terraform `deletion_protection` guard against accidental deletion.
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-settings.md](./instance-settings.md)
- [users.md](./users.md)
- [built-in-authentication.md](./built-in-authentication.md)
- [managed-connection-pooling.md](./managed-connection-pooling.md)
- gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/create
