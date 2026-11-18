---
source: https://docs.cloud.google.com/build/docs/private-pools/create-manage-private-pools
---

# Create and manage private pools

How to create, update, view and delete Cloud Build private pools with gcloud or the Cloud Build API. You can create up to 10 private pools per Google Cloud project per region.

## Signature / Usage

### Create a private pool from a config file

```bash
gcloud builds worker-pools create PRIVATEPOOL_ID --config-from-file PRIVATEPOOL_CONFIG_FILE --region REGION
```

Output:

```text
Created [https://cloudbuild.googleapis.com/v1/projects/gcb-docs-project/locations/us-central1/workerPools/private-pool].
NAME                 CREATE_TIME                STATUS
private-pool  2018-11-19T16:08:24+00:00  RUNNING
```

### Create a private pool with flags

```bash
gcloud builds worker-pools create PRIVATEPOOL_ID \
    --project=PRIVATEPOOL_PROJECT_ID \
    --region=REGION \
    --peered-network=PEERED_NETWORK \
    --worker-machine-type=PRIVATEPOOL_MACHINE_TYPE \
    --worker-disk-size=PRIVATEPOOL_DISK_SIZE_GB \
    --no-public-egress \
    --worker-release=CHANNEL_OR_VERSION
```

### Create a private pool with the API

Adapted (not in the official docs): added the missing `\` continuation after the first line and quoted the URL so the shell does not interpret `?`.

```bash
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://cloudbuild.googleapis.com/v1/projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/?workerPoolId=PRIVATEPOOL_ID" -d @workerpool.json
```

### Update a private pool

```bash
gcloud builds worker-pools update PRIVATEPOOL_ID \
    --region=REGION \
    --config-from-file=PRIVATEPOOL_CONFIG_FILE
```

Adapted (not in the official docs): added the missing `\` continuation after `--worker-machine-type`.

```bash
gcloud builds worker-pools update PRIVATEPOOL_ID \
    --region=REGION \
    --worker-disk-size=PRIVATEPOOL_DISK_SIZE \
    --worker-machine-type=PRIVATEPOOL_MACHINE_TYPE \
    --worker-release=CHANNEL_OR_VERSION
```

```bash
curl -X PATCH -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://cloudbuild.googleapis.com/v1/projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID \
    -d @workerpool.json
```

### View private pools

```bash
gcloud builds worker-pools list --region=REGION --project=PRIVATEPOOL_PROJECT_ID
```

```bash
gcloud builds worker-pools describe PRIVATEPOOL_ID \
    --region=REGION \
    --project=PRIVATEPOOL_PROJECT_ID
```

```bash
curl -X GET -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://cloudbuild.googleapis.com/v1/projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools
```

```bash
curl -X GET -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://cloudbuild.googleapis.com/v1/projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID
```

### Delete a private pool

```bash
gcloud builds worker-pools delete PRIVATEPOOL_ID \
    --region=REGION \
    --project=PRIVATEPOOL_PROJECT_ID
```

```text
Deleted [https://cloudbuild.googleapis.com/v1/projects/gcb-docs-project/locations/us-central1/workerPools/[PRIVATEPOOL_ID].
```

```bash
curl -X DELETE -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://cloudbuild.googleapis.com/v1/projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID
```

## Options / Props

### Roles

| Task | Role |
|---|---|
| Create a private pool | Cloud Build WorkerPool Owner (`roles/cloudbuild.workerPoolOwner`) |
| Update a private pool | Cloud Build WorkerPool Editor (`roles/cloudbuild.workerPoolEditor`) |
| View private pool details | Cloud Build WorkerPool Viewer (`roles/cloudbuild.workerPoolViewer`) |
| Delete a private pool | Cloud Build WorkerPool Owner (`roles/cloudbuild.workerPoolOwner`) |

### Placeholders and constraints

| Name | Constraint / default |
|---|---|
| `PRIVATEPOOL_ID` | Unique identifier, 1-63 characters, valid characters `[a-zA-Z0-9_-]+` (console name: alphanumeric or dashes, 1-63 characters). Cannot be changed on update |
| `PRIVATEPOOL_PROJECT_ID` | Project where the private pool is created |
| `REGION` | One of the supported regions (https://docs.cloud.google.com/build/docs/locations) |
| `PEERED_NETWORK` | `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_NAME`; if not specified Cloud Build uses the service provider network |
| `PRIVATEPOOL_DISK_SIZE_GB` | Greater than or equal to 100 and less than or equal to 4000; default 100. `--worker-disk-size` is overridden by `--disk-size` in `gcloud builds submit` |
| `PRIVATEPOOL_MACHINE_TYPE` | Default `e2-standard-2` when left blank (this page); supported types in private-pool-config-file-schema.md. `--worker-machine-type` is overridden by `--machine-type` in `gcloud builds submit` |
| `--no-public-egress` | Pool is created without an external IP address; set it when creating the pool inside a VPC Service Controls perimeter |
| `CHANNEL_OR_VERSION` | Release channel or version (https://docs.cloud.google.com/build/docs/release-channels); on update the default is `stable` if not specified |
| Console release channels | `regular` (default), `stable`, `rapid`, or a specific release version |
| Console IP range | CIDR `STARTING_IP_ADDRESS/SUBNET_PREFIX_SIZE`; prefix length must not exceed `/29`; default `/24`; IP range can be specified only if a Network is specified |
| Console **Assign external IPs** | Selected by default so the pool can reach the public internet; clear it to restrict access to your private network |
| Nested virtualization | Console option available for C3 series machines |

## Notes

- Source: https://docs.cloud.google.com/build/docs/private-pools/create-manage-private-pools (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Before you begin: choose or create a project, enable the Cloud Build API (needs `serviceusage.services.enable`, for example through Owner or Service Usage Admin), install gcloud (`gcloud components update`). Optional: to reach private resources in your VPC network, set up a peering connection between your VPC network and the VPC network where private pools reside (https://docs.cloud.google.com/build/docs/private-pools/set-up-private-pool-environment#setup-private-connection).
- Create the config file (YAML or JSON) described in private-pool-config-file-schema.md; for the API the file is named `workerpool.json`.
- Machine types and disk: the source says machine types vary by region (see the schema page). The VPC Service Controls page says disk size up to 1000 for the config file placeholder; this page and the schema page say 4000. See using-vpc-service-controls.md.
- Price estimates: the **Monthly estimate** sidebar on the Create / Edit private pool pages estimates monthly cost from number of virtual CPUs, machine type, memory, build minutes, and region (N2D and C3 machines only). It does not include disk beyond the 100 GB included by default and may differ from final pricing; see https://cloud.google.com/build/pricing.
- To create a pool within a VPC Service Controls perimeter, see using-vpc-service-controls.md.
- Deleting a private pool is irreversible for the pool configuration; try the delete commands on a disposable project or pool first.
- Adapted from the official docs: the source `curl -X POST` command had no `\` after its first line and an unquoted URL containing `?`; the update `gcloud` command had no `\` after `--worker-machine-type=PRIVATEPOOL_MACHINE_TYPE`.
- The source also shows Console steps (create, update, view, delete) and the console price-estimate sidebar.

## Related

- [private-pools-overview.md](./private-pools-overview.md)
- [private-pool-config-file-schema.md](./private-pool-config-file-schema.md)
- [run-builds-in-private-pool.md](./run-builds-in-private-pool.md)
- [using-vpc-service-controls.md](./using-vpc-service-controls.md)
