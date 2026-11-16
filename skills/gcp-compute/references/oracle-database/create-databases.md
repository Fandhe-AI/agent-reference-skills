---
source: https://docs.cloud.google.com/oracle/database/docs/create-databases
---

# Create an Autonomous AI Database

Creates an Autonomous AI Database in Google Cloud (Console, gcloud, API or client libraries). Autonomous AI Database is a regional resource and requires at least a client ODB Subnet.

## Signature / Usage

Replace the placeholders (see Options / Props). `ADMIN_PASSWORD` is the password of the default administrator user; supply it without printing it or committing it.

```bash
gcloud oracle-database autonomous-databases create DATABASE_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --display-name=DISPLAY_NAME \
    --database=DATABASE_NAME \
    --admin-password=ADMIN_PASSWORD \
    --odb-subnet=projects/ODB_NETWORK_PROJECT_ID/locations/REGION/odbNetworks/ODB_NETWORK_ID/odbSubnets/ODB_SUBNET_ID \
    --properties-compute-count=COMPUTE_COUNT \
    --properties-db-version=DATABASE_VERSION \
    --properties-license-type=LICENSE_TYPE \
    --properties-db-workload=WORKLOAD_TYPE \
    --properties-data-storage-size-gb=STORAGE_SIZE
```

## Options / Props

| Placeholder / setting | Description |
|-----------------------|-------------|
| `DATABASE_ID` | Permanent identifier; cannot be changed once set |
| `PROJECT_ID` | Project that contains the Autonomous AI Database |
| `REGION` | Permanent region of the database (and of the ODB Network in `odb-subnet`) |
| `DISPLAY_NAME` | Shown in the Google Cloud console; unique within the project |
| `DATABASE_NAME` | Begins with a letter; up to 30 alphanumeric characters; no special characters; unique in your OCI tenancy; not required for a cross-region disaster recovery standby or cross-region Autonomous Data Guard standby |
| `ODB_NETWORK_PROJECT_ID` | Project that contains the ODB Network (host project for Shared VPC) |
| `COMPUTE_COUNT` | Compute capacity (Console: ECPU count 2 to 512; optional compute autoscaling up to three times) |
| `DATABASE_VERSION` | Oracle database version |
| `LICENSE_TYPE` | Only `bring-your-own-license` or `license-included` |
| `WORKLOAD_TYPE` | `ajd` (Autonomous JSON Database), `apex` (Oracle APEX Application Development), `dw` (Autonomous Data Warehouse), `oltp` (Autonomous Transaction Processing); gcloud 593.0.0 also accepts `lh` (Lakehouse, see Notes) |
| `STORAGE_SIZE` | 0.02 TiB to 384 TiB in gigabyte (GiB) increments; Data Warehouse workloads: 1 TiB to 384 TiB in terabyte increments (Console: optional storage autoscaling up to three times) |

### Other settings from the Console steps

| Setting | Detail |
|---------|--------|
| Required role | `autonomousDatabaseAdmin` |
| Console workload types | Lakehouse, Transaction Processing, JSON, APEX |
| Database name (Console) | Letters and numbers only, starts with a letter, at most 30 characters |
| Backup retention | 1 to 60 days; backups beyond the period are automatically deleted; automatic backups are Oracle-managed and billed separately from storage |
| Network access types | Secure access from everywhere (public access, mTLS automatically enabled); Secure access from allowed IPs only (at least one IP or CIDR endpoint, optional mTLS); Private endpoint access only (ODB Network and client subnet, optional private IP and hostname prefix, optional public access with endpoints and mTLS) |
| Maintenance | Regular (default) or Early (one week before the regular patch) |
| Character sets | `AL32UTF8` (recommended default) and `AL16UTF16` as national character set |
| Contacts | Email addresses for operational notifications and announcements |

## Notes

- To create an Autonomous AI Database with an ODB Network, use the gcloud CLI or the API (the Console cannot).
- Credential warning: a value passed with `--admin-password` is stored in shell history and visible in the process list (`ps`) while the command runs. Do not hard-code the administrator password: the placeholder above must be replaced at run time and never echoed or logged. The gcloud 593.0.0 help for this command also offers `--admin-password-secret-version` (with `--secret`) as an alternative and states that only one of `admin_password_secret_version` or `admin_password` can be populated. Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/autonomous-databases/create
- Unit inconsistency in the source, recorded as written: the flag is `--properties-data-storage-size-gb` while the `STORAGE_SIZE` description is stated in TiB (the gcloud 593.0.0 help lists both `--properties-data-storage-size-gb` and `--properties-data-storage-size-tb`).
- The Console workload names (Lakehouse, Transaction Processing, JSON, APEX) differ from the gcloud values (`dw`, `oltp`, `ajd`, `apex`); the source's gcloud text describes `dw` as Autonomous Data Warehouse.
- Provisioning automatically creates an Oracle-managed service account that you can use to enable Google Cloud CMEK on the database (see https://docs.cloud.google.com/oracle/database/docs/use-cmek and https://docs.cloud.google.com/oracle/database/docs/cmek).
- The source also shows Console steps, the REST `curl` form and client-library samples (C#, Go, Java, Node.js, PHP, Python, Ruby). The REST block is omitted because its URL line lacks a trailing `\`, so the `-d` body is never passed. Its body uses `"admin_password": "PASSWORD"` and `"dataStorageSizeTb": STORAGE_SIZE`.
- Autonomous AI Database managed through Google Cloud is distinct from Cloud SQL / AlloyDB (`gcp-databases-relational`). Deleting a database is destructive; try lifecycle operations on a disposable resource first.
- gcloud 593.0.0 `--properties-db-workload` accepts `ajd`, `apex`, `dw`, `lh` ("Autonomous Database with the Lakehouse workload type") and `oltp`; the source's gcloud placeholder list omits `lh`, while its Console steps list a Lakehouse workload type.
- Source inconsistency: the source's gcloud section says "For Data Warehouse workloads only, storage is measured in terabyte (TiB) increments and must range from 1 TiB to 384 TiB", while its Console section says "For AI Lakehouse workloads only, storage is measured in terabyte (TiB) increments and must range from 1 TiB to 384 TiB".
- Source (`--properties-db-workload` values): `gcloud oracle-database autonomous-databases create --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/oracle/database/docs/create-databases (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-odb-network.md](./create-odb-network.md)
- [create-instances.md](./create-instances.md)
- [iam-overview.md](./iam-overview.md)
- [regions-and-zones.md](./regions-and-zones.md)
- [quotas.md](./quotas.md)
