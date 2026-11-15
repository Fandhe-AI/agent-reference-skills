---
source: https://docs.cloud.google.com/alloydb/docs/instance-read-pool-create
---

# Create a read pool instance

Read pool instances scale read capacity and offload read-only queries from the primary. A read pool can use a different machine series and type than the primary; all nodes in one read pool share the same series and type.

## Signature / Usage

Prerequisites: the project is enabled for AlloyDB, and you hold `roles/alloydb.admin`, `roles/owner` or `roles/editor`.

### Create a read pool instance (gcloud)

```bash
gcloud alloydb instances create INSTANCE_ID \
 --instance-type=READ_POOL \
 --read-pool-node-count=NODE_COUNT \
 --region=REGION_ID \
 --cluster=CLUSTER_ID \
 --cpu-count=CPU_COUNT \
 --machine-type=MACHINE_TYPE \
 --project=PROJECT_ID
```

### Private Service Connect-enabled cluster

```bash
gcloud alloydb instances create INSTANCE_ID \
   --instance-type=READ_POOL \
   --region=REGION_ID \
   --cluster=CLUSTER_ID \
   --cpu-count=CPU_COUNT \
   --machine-type=MACHINE_TYPE \
   --project=PROJECT_ID \
   --allowed-psc-projects=ALLOWED_PROJECT_LIST
```

### Managed connection pooling

```bash
gcloud alloydb instances create INSTANCE_ID \
 --instance-type=READ_POOL \
 --region=REGION_ID \
 --cluster=CLUSTER_ID \
 --cpu-count=CPU_COUNT \
 --machine-type=MACHINE_TYPE \
 --project=PROJECT_ID \
 --enable-connection-pooling
```

### Public IP-enabled cluster

```bash
gcloud alloydb instances create INSTANCE_ID \
   --instance-type=READ_POOL \
   --region=REGION_ID \
   --cluster=CLUSTER_ID \
   --cpu-count=CPU_COUNT \
   --machine-type=MACHINE_TYPE \
   --project=PROJECT_ID \
   --assign-inbound-public-ip=ASSIGN_IPV4
```

## Options / Props

| Placeholder / flag | Description |
|---|---|
| `INSTANCE_ID` | Begins with a lowercase letter; lowercase letters, numbers and hyphens. |
| `NODE_COUNT` | `1` through `20` inclusive; no more than 20 nodes across all read pool instances in a cluster. |
| `REGION_ID`, `CLUSTER_ID`, `PROJECT_ID` | Region, cluster and project of the existing cluster. |
| `CPU_COUNT` | Specify either `cpu_count` or `machine_type`. Only `cpu_count` creates N2: 2 = 2 vCPUs 16 GB, 4 = 32 GB, 8 = 64 GB, 16 = 128 GB, 32 = 256 GB, 64 = 512 GB, 96 = 768 GB, 128 = 864 GB. If both are given they must match. |
| `MACHINE_TYPE` | For example `n2-highmem-4`, `c4-highmem-4-lssd`, `c4a-highmem-4-lssd`, `z3-highmem-14-standardlssd`. Applies to all nodes. |
| `ALLOWED_PROJECT_LIST` | Comma-separated project IDs or project numbers (for example `my-project-1`, `12345`, `my-project-n`); required if the cluster uses Private Service Connect. |
| `--assign-inbound-public-ip=ASSIGN_IPV4` | Public IP for a public IP-enabled cluster. |
| `--authorized-external-networks` | Optional comma-separated CIDR blocks, for example `64.233.160.0/16`. |
| `--enable-connection-pooling` | Managed connection pooling. |

Console vCPUs per series: C4A 1, 2, 4, 8, 16, 32, 48, 64, 72; N2 (default) 2, 4, 8, 16, 32, 64, 96, 128; C4 4, 8, 16, 24, 32, 48, 96, 144, 192, 288; Z3 8, 14, 16, 22, 32, 44, 88.

## Notes

- Source inconsistency: the machine type page spells Z3 types `z3-highmem-14-standard-lssd` / `-high-lssd`; gcloud 593.0.0 `--machine-type` accepts only the `z3-highmem-14-standardlssd` / `z3-highmem-8-highlssd` form (`gcloud alloydb instances create --help`), which this page uses.
- Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them. If you use `--authorized-external-networks`, list only the narrowest CIDR ranges you need.
- Changing network security settings (mTLS with AlloyDB connectors, or SSL) keeps the instance available but drops existing noncompliant connections. Use mTLS or SSL to keep data secure.
- Optional transparent query forwarding can route read-only traffic automatically to optimize resource use.
- For Private Service Connect-enabled instances additional settings are required: https://docs.cloud.google.com/alloydb/docs/configure-private-service-connect.
- The source also shows Console steps.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` skills.
- Source: https://docs.cloud.google.com/alloydb/docs/instance-read-pool-create (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-primary-create.md](./instance-primary-create.md)
- [choose-machine-type.md](./choose-machine-type.md)
- [quotas.md](./quotas.md)
- [cluster-create.md](./cluster-create.md)
