---
source: https://docs.cloud.google.com/alloydb/docs/instance-primary-create
---

# Create an AlloyDB primary instance

Create a primary instance in an existing cluster to provide compute for reads and writes. Choose an availability type, machine series and size, and optionally connection pooling or connector enforcement.

## Signature / Usage

Prerequisites: the project is enabled for AlloyDB, and you hold `roles/alloydb.admin`, `roles/owner` or `roles/editor`.

### Create a primary instance (gcloud)

```bash
gcloud alloydb instances create INSTANCE_ID \
    --instance-type=PRIMARY \
    --availability-type=AVAILABILITY \
    --region=REGION_ID \
    --cluster=CLUSTER_ID \
    --cpu-count=CPU_COUNT \
    --machine-type=MACHINE_TYPE \
    --project=PROJECT_ID
```

### Require the Auth Proxy or Google connector libraries

```bash
gcloud alloydb instances create INSTANCE_ID \
 --instance-type=PRIMARY \
 --region=REGION_ID \
 --cluster=CLUSTER_ID \
 --cpu-count=CPU_COUNT \
 --machine-type=MACHINE_TYPE \
 --project=PROJECT_ID \
 --require-connectors
```

### Enable managed connection pooling

```bash
gcloud alloydb instances create INSTANCE_ID \
  --instance-type=PRIMARY \
  --region=REGION_ID \
  --cluster=CLUSTER_ID \
  --cpu-count=CPU_COUNT \
  --machine-type=MACHINE_TYPE \
  --project=PROJECT_ID \
  --enable-connection-pooling
```

### REST v1

Save the request body as `instance_request.json`:

```json
{
  "instance_type": "PRIMARY",
  "machine_config": {
    "cpu_count": CPU_COUNT
  }
}
```

To use a machine type instead of a vCPU count, replace `machine_config` in `instance_request.json` with:

```text
"machine_config": {
  "machine_type": "MACHINE_TYPE"
}
```

Then send the request.

Adapted (not in the official docs): quoted the request URL so the shell does not glob the "?".

```bash
curl -X POST   -H "Authorization: Bearer $(gcloud auth print-access-token)"   -H "Content-Type: application/json"   "https://alloydb.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/clusters/CLUSTER_ID/instances?instance_id=INSTANCE_ID"   -d @instance_request.json
```

## Options / Props

| Placeholder / flag | Description |
|---|---|
| `INSTANCE_ID` | Begins with a lowercase letter; lowercase letters, numbers and hyphens. |
| `AVAILABILITY` | `REGIONAL` (default): HA with separate active and standby nodes and automated failover. `ZONAL`: basic instance, one node, no automated failover. |
| `REGION_ID`, `CLUSTER_ID`, `PROJECT_ID` | Region, cluster and project of the instance (for REST `LOCATION_ID` is the cluster's region). |
| `CPU_COUNT` | Specify either `cpu_count` or `machine_type`. Only `cpu_count` creates an N2 instance: 2 = 2 vCPUs 16 GB, 4 = 32 GB, 8 = 64 GB, 16 = 128 GB, 32 = 256 GB, 64 = 512 GB, 96 = 768 GB, 128 = 864 GB. If both are given they must match (`n2-highmem-4` needs `4`). |
| `MACHINE_TYPE` | For example `n2-highmem-4`, `c4-highmem-4-lssd`, `c4a-highmem-4-lssd`. |
| `--require-connectors` | Enforce mTLS via the Auth Proxy or Google-provided connector libraries. |
| `--enable-connection-pooling` | Enable managed connection pooling. |
| `--ssl-mode=ALLOW_UNENCRYPTED_AND_ENCRYPTED` | Allow non-SSL connections. See Notes. |

Console vCPUs per series: C4A 1, 2, 4, 8, 16, 32, 48, 64, 72; N2 (default) 2, 4, 8, 16, 32, 64, 96, 128; C4 4, 8, 16, 24, 32, 48, 96, 144, 192, 288; Z3 8, 14, 16, 22, 32, 44, 88.

## Notes

- By default new instances require all connections to use SSL. The `--ssl-mode=ALLOW_UNENCRYPTED_AND_ENCRYPTED` flag weakens this and is listed only in Options; the source shows it as an optional flag on the create command. Keep SSL enforced and prefer `--require-connectors`.
- The console option "Enable Public IP" exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them. Private IP is always enabled by default.
- For Private Service Connect clusters, see https://docs.cloud.google.com/alloydb/docs/configure-private-service-connect#create-cluster.
- In the REST body `CPU_COUNT` is an unquoted placeholder; substitute a number.
- Adapted from the official docs: the curl request URL was unquoted (`https://alloydb.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID/clusters/CLUSTER_ID/instances?instance_id=INSTANCE_ID`); zsh aborts with `no matches found` on the `?`.
- The source also shows Console steps, Terraform and a Cloud Shell workflow for applying it.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` skills.
- Source: https://docs.cloud.google.com/alloydb/docs/instance-primary-create (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-create.md](./cluster-create.md)
- [instance-read-pool-create.md](./instance-read-pool-create.md)
- [choose-machine-type.md](./choose-machine-type.md)
- [cluster-settings.md](./cluster-settings.md)
