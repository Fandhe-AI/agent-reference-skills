---
source: https://docs.cloud.google.com/alloydb/docs/cluster-create
---

# Create a cluster and its primary instance

A cluster manages regional storage and configuration, and its primary instance provides the compute for reads and writes. You must create both before using AlloyDB. This page covers prerequisites, gcloud and REST creation, cloning, and machine series considerations.

## Signature / Usage

### Before you begin

- The project must be enabled to access AlloyDB.
- A VPC network in the project must be configured for private services access to AlloyDB.
- For development and sandbox workloads, choose a region that supports the 1 vCPU shape.
- Required IAM: one of `roles/alloydb.admin`, `roles/owner`, `roles/editor`, plus the `compute.networks.list` permission (grant Compute Network User, `roles/compute.networkUser`, for least privilege).

### Create a cluster (gcloud)

Private services access:

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --network=NETWORK
```

Private Service Connect:

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --enable-private-service-connect
```

The command starts a long-running operation and returns an operation ID. Optional arguments to append to the `clusters create` command:

```text
--allocated-ip-range-name=RANGE
```

```text
--kms-key=KEY_ID \
--kms-keyring=KEYRING_ID \
--kms-location=LOCATION_ID \
--kms-project=PROJECT_ID
```

Confirm the operation succeeded:

```bash
gcloud alloydb operations describe OPERATION_ID \
    --region=REGION_ID \
    --project=PROJECT_ID
```

### Create the primary instance (gcloud)

Omit `--allowed-psc-projects` unless the cluster was created with `--enable-private-service-connect` (gcloud rejects it on other clusters).

```bash
gcloud alloydb instances create INSTANCE_ID \
    --instance-type=PRIMARY \
    --region=REGION_ID \
    --cluster=CLUSTER_ID \
    --project=PROJECT_ID \
    --cpu-count=CPU_COUNT \
    --machine-type=MACHINE_TYPE \
    --allowed-psc-projects=ALLOWED_PROJECT_LIST
```

### Create a cluster (REST v1)

Save the request body as `cluster_request.json`:

Adapted (not in the official docs): removed the stray `<var>` tags around the placeholders so the body is valid JSON with plain placeholders.

```json
{
  "databaseVersion": "DATABASE_VERSION",
  "initialUser": {
    "user": "INITIAL_USERNAME",
    "password": "INITIAL_USER_PASSWORD"
  },
  "labels": {
    "test": "alloydb-cluster-full"
  }
}
```

Adapted (not in the official docs): quoted the request URL so the shell does not glob the "?".

```bash
curl -X POST   -H "Authorization: Bearer $(gcloud auth print-access-token)"   -H "Content-Type: application/json"   "https://alloydb.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/clusters?cluster_id=CLUSTER_ID"   -d @cluster_request.json
```

## Options / Props

| Placeholder / flag | Description |
|---|---|
| `CLUSTER_ID` | Must begin with a lowercase letter; lowercase letters, numbers and hyphens. |
| `POSTGRES_VERSION` | `POSTGRES_14` … `POSTGRES_18` (gcloud enum; the source prose lists `14`–`18`, and PostgreSQL 18 is the default). |
| `PASSWORD` | Password for the default `postgres` user. |
| `NETWORK` (optional) | VPC network configured for private services access; `default` network if `--network` is omitted. For Shared VPC use the full path, for example `projects/cymbal-project/global/networks/shared-vpc-network`. |
| `--enable-private-service-connect` | Use Private Service Connect as the connectivity method. |
| `REGION_ID` / `PROJECT_ID` | Region and project of the cluster. |
| `RANGE` | Name of an allocated IP range for private services access. |
| `KEY_ID`, `KEYRING_ID`, `LOCATION_ID`, `PROJECT_ID` | CMEK key, key ring, key ring region (must equal the cluster region) and key ring project. |
| `CPU_COUNT` | Specify either `cpu_count` or `machine_type`. Only `cpu_count` creates an N2 instance: 2 = 2 vCPUs 16 GB, 4 = 32 GB, 8 = 64 GB, 16 = 128 GB, 32 = 256 GB, 64 = 512 GB, 96 = 768 GB, 128 = 864 GB. If both are given they must match. |
| `MACHINE_TYPE` | For example `n2-highmem-4`, `c4-highmem-4-lssd`, `c4a-highmem-4-lssd`. |
| `ALLOWED_PROJECT_LIST` (optional) | Comma-separated project IDs or project numbers allowed to access the instance (Private Service Connect). Only instances in PSC-enabled clusters can set `--allowed-psc-projects`. |
| `DATABASE_VERSION` (REST) | Enum string, for example `POSTGRES_17`. |

Console machine series and vCPUs: C4A 1, 2, 4, 8, 16, 32, 48, 64, 72; N2 (default) 2, 4, 8, 16, 32, 64, 96, 128; C4 4, 8, 16, 24, 32, 48, 96, 144, 192, 288; Z3 8, 14, 16, 22, 32, 44, 88. Console presets: Production (single zone) 4 vCPU / 32 GB; Production (multi-zone) 8 vCPU / 64 GB.

## Notes

- Source inconsistency: the prose lists `14`–`18`, but gcloud 593.0.0 accepts only `POSTGRES_14`–`POSTGRES_18` (`gcloud alloydb clusters create --help`).
- The console option "Create an IAM database user" (selected by default) enables the `alloydb.iam_authentication` flag on the primary and creates an IAM database user.
- C4A (Axion, Arm) is offered at 1, 2, 4, 8, 16, 32, 48, 64 and 72 vCPUs with up to 576 GB DDR5, in `asia-east1`, `asia-southeast1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `us-central1`, `us-east1`, `us-east4`. To move an N2 instance to C4A, modify its `machine_type`; do not delete the N2 instance and create a C4A instance in the same cluster.
- 1 vCPU (C4A, 8 GB, no ultra-fast cache) is for development and testing only. HA can be configured but no uptime SLA is offered. Use 2+ vCPUs for production.
- Cloning an active cluster: perform a point-in-time recovery on it (a very recent point in time works). Only data is copied, not configuration; add instances, flags and backup schedules afterwards. Specify CMEK in the recovery command even if the source is CMEK-encrypted. The clone is independent of its source.
- A cluster needs at least one IP range configured with a private services access connection before creation.
- Do not put sensitive or personally identifiable information in the cluster ID; it is externally visible.
- `gcloud alloydb clusters create` has no prompt option in gcloud 593.0.0 (`--password` is required), so the value lands in shell history and process listings. Use a throwaway initial password and change it afterwards, or prefer IAM database authentication (see the alloydb-connect-security category). `PASSWORD` and `INITIAL_USER_PASSWORD` are placeholders.
- Adapted from the official docs: the cluster curl request URL was unquoted (`https://alloydb.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/clusters?cluster_id=CLUSTER_ID`); zsh aborts with `no matches found` on the `?`.
- Corrected from the official docs: the REST JSON placeholders were wrapped in `<var>...</var>` (for example `"<var>DATABASE_VERSION</var>"`).
- The source also shows Console steps, Terraform (with a Cloud Shell workflow and a warning to keep Terraform state consistent) and REST instance creation.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` skills.
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-create (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-settings.md](./cluster-settings.md)
- [instance-primary-create.md](./instance-primary-create.md)
- [instance-read-pool-create.md](./instance-read-pool-create.md)
- [choose-machine-type.md](./choose-machine-type.md)
- [db-version-policies.md](./db-version-policies.md)
- [locations.md](./locations.md)
