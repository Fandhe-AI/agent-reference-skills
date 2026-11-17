---
source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/clusters
---

# Create and manage clusters

Create, monitor, list, describe, upgrade, modify, delete and obtain credentials for Distributed Cloud connected clusters, including maintenance windows and exclusion windows. The gcloud instructions assume Cloud Shell or another environment with `bash`.

## Signature / Usage

### Create a cluster

Requires Edge Container Admin (`roles/edgecontainer.admin`). Optional flags can be left out.

Adapted (not in the official docs): flags renamed or reshaped to match the gcloud 593.0.0 `clusters create` SYNOPSIS: `--external-lb-ipv4-address-pools`, `--container-default-runtime-class`, and `--enable-google-group-authentication` as a boolean flag without a value.

```bash
gcloud edge-cloud container clusters create CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --fleet-project=FLEET_PROJECT_ID \
    --cluster-ipv4-cidr=CLUSTER_IPV4_CIDR_BLOCK \
    --services-ipv4-cidr=SERVICE_IPV4_CIDR_BLOCK \
    --default-max-pods-per-node=MAX_PODS_PER_NODE \
    --release-channel RELEASE_CHANNEL \
    --control-plane-node-storage-schema CONTROL_PLANE_STORAGE_SCHEMA \
    --control-plane-kms-key=CONTROL_PLANE_KMS_KEY \
    --control-plane-node-location=CONTROL_PLANE_LOCATION \
    --control-plane-node-count=CONTROL_PLANE_NODE_COUNT \
    --control-plane-machine-filter=CONTROL_PLANE_NODE_FILTER \
    --control-plane-shared-deployment-policy=CONTROL_PLANE_NODE_SHARING \
    --external-lb-ipv4-address-pools=IPV4_DATA_PLANE_ADDRESSES \
    --version SOFTWARE_VERSION \
    --offline-reboot-ttl REBOOT_TIMEOUT \
    --container-default-runtime-class=RUNTIME_CLASS \
    --enable-google-group-authentication
```

Example Cloud KMS key path for `CONTROL_PLANE_KMS_KEY`:

Adapted (not in the official docs): removed the leading `/` of the key path, because a Cloud KMS CryptoKey resource name has the form `projects/PROJECT/locations/LOCATION/keyRings/KEYRING/cryptoKeys/KEY` (Cloud KMS API discovery document, `pattern` of `name`).

```text
projects/myProject/locations/us-west1-a/keyRings/myKeyRing/cryptoKeys/myGDC-Key
```

### Monitor provisioning

Provisioning is asynchronous and can take an hour or more (status `PROVISIONING`, then `RUNNING`, or `ERROR`). `create` blocks by default; with `--async` it returns an operation name.

```bash
gcloud edge-cloud container operations describe OPERATION_ID \
    --location=REGION \
    --project=PROJECT_ID
```

```bash
gcloud edge-cloud container operations wait OPERATION_ID \
    --location=REGION \
    --project=PROJECT_ID
```

### List, describe, and get software versions

Viewing requires Edge Container Viewer (`roles/edgecontainer.viewer`).

```bash
gcloud edge-cloud container clusters list \
    --project=PROJECT_ID \
    --location=REGION
```

```bash
gcloud edge-cloud container clusters describe CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION
```

```bash
gcloud edge-cloud container get-server-config --location=REGION
```

### Upgrade the software version

Requires Edge Container Admin. Preview: set the number of worker nodes that can be down at once.

Adapted (not in the official docs): `--max-unavailable-worker-nodes` and `--clear-max-unavailable-worker-nodes` exist only in the `gcloud alpha` track in gcloud 593.0.0, so the commands use `gcloud alpha`.

```bash
gcloud alpha edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --max-unavailable-worker-nodes=MAX_UNAVAILABLE_NODES
```

```bash
gcloud alpha edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --clear-max-unavailable-worker-nodes
```

```bash
gcloud edge-cloud container clusters upgrade CLUSTER_ID \
   --location=REGION \
   --project=PROJECT_ID \
   --schedule=UPGRADE_SCHEDULE \
   --version=SOFTWARE_VERSION
```

### Modify a cluster

Adapted (not in the official docs): the gcloud 593.0.0 `clusters update` SYNOPSIS has no `--cluster-ipv4-cidr`, `--services-ipv4-cidr`, `--default-max-pods-per-node` or Google group flag, uses `--container-default-runtime-class`, and the source says no other parameter can be updated together with a storage encryption change, so the KMS key is updated in a separate command.

```bash
gcloud edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --release-channel=RELEASE_CHANNEL \
    --offline-reboot-ttl=REBOOT_TIMEOUT \
    --container-default-runtime-class=RUNTIME_CLASS
```

```bash
gcloud edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --control-plane-kms-key=CONTROL_PLANE_KMS_KEY
```

### Obtain credentials

```bash
gcloud edge-cloud container clusters get-credentials CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --offline-credential
```

Through Connect gateway (install the auth plugin first, then fetch credentials):

```bash
gcloud components install gke-gcloud-auth-plugin
```

```bash
gcloud container hub memberships get-credentials CLUSTER_ID --project=PROJECT_ID
```

### Maintenance windows

```bash
gcloud edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --maintenance-window-start=MAINTENANCE_START \
    --maintenance-window-end=MAINTENANCE_END \
    --maintenance-window-recurrence=MAINTENANCE_FREQUENCY
```

```bash
gcloud edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --clear-maintenance-window
```

```bash
gcloud edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --add-maintenance-exclusion-name=EXCLUSION_NAME \
    --add-maintenance-exclusion-start=EXCLUSION_START \
    --add-maintenance-exclusion-end=EXCLUSION_END
```

```bash
gcloud edge-cloud container clusters update CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --remove-maintenance-exclusion-window=MAINTENANCE_EXCLUSION_WINDOW
```

### Delete a cluster

Delete all node pools assigned to the cluster first.

```bash
gcloud edge-cloud container clusters delete CLUSTER_ID \
    --project=PROJECT_ID \
    --location=REGION
```

## Options / Props

### Prerequisites

Enabling APIs requires Owner (`roles/owner`), Editor (`roles/editor`) or Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`). Enable: `anthos.googleapis.com`, `anthosaudit.googleapis.com`, `anthosgke.googleapis.com`, `cloudresourcemanager.googleapis.com`, `connectgateway.googleapis.com`, `container.googleapis.com`, `edgecontainer.googleapis.com`, `gkeconnect.googleapis.com`, `gkehub.googleapis.com`, `gkeonprem.googleapis.com`, `iam.googleapis.com`, `kubernetesmetadata.googleapis.com`, `logging.googleapis.com`, `monitoring.googleapis.com`, `opsconfigmonitoring.googleapis.com`, `serviceusage.googleapis.com`, `stackdriver.googleapis.com`, `storage.googleapis.com`, `sts.googleapis.com`.

### Create / update flags

| Placeholder | Description |
|---|---|
| `CLUSTER_ID` | Unique name; RFC 1213-compliant, lowercase alphanumeric characters and hyphens, beginning and ending with an alphanumeric character. |
| `FLEET_PROJECT_ID` | Fleet host project; if omitted, the cluster project is used. Fleet registration is mandatory. |
| `CLUSTER_IPV4_CIDR_BLOCK` / `SERVICE_IPV4_CIDR_BLOCK` | IPv4 CIDR blocks for Pods and Services. |
| `MAX_PODS_PER_NODE` | Optional; default `110`, can be limited by the Pod CIDR block size. |
| `RELEASE_CHANNEL` | `REGULAR` (automatic cluster upgrades, default) or `NONE`. |
| `CONTROL_PLANE_STORAGE_SCHEMA` | Optional local storage schema for control plane nodes. |
| `CONTROL_PLANE_KMS_KEY` | Optional full Cloud KMS key path; only with CMEK integration for local storage. |
| `CONTROL_PLANE_LOCATION` | Name of the target Distributed Cloud connected zone; deploys the control plane locally. |
| `CONTROL_PLANE_NODE_COUNT` | `3` (high availability, default) or `1`. |
| `CONTROL_PLANE_NODE_FILTER` | Optional regex list of control plane nodes; default is random selection. |
| `CONTROL_PLANE_NODE_SHARING` | `DISALLOWED` (default) or `ALLOWED` for application workloads on control plane nodes. |
| `IPV4_DATA_PLANE_ADDRESSES` | IPv4 addresses, ranges or subnetworks for ingress to Services behind the Distributed Cloud load balancer in survivability mode; comma-delimited list. The source also allows a YAML / JSON file, which needs the alpha-track `--external-lb-address-pools` flag (see networking.md). |
| `SOFTWARE_VERSION` | `1.X.Y` (for example `1.5.1`); default is the server-default version. `RELEASE_CHANNEL` must be `NONE` to set it on create. |
| `REBOOT_TIMEOUT` | Seconds a rebooted node can rejoin in survivability mode; default `0`; minimum `1800`; ISO 8601 accepted (the source's example `1dT1h2m3s` is not valid ISO 8601 notation; see Notes). |
| `RUNTIME_CLASS` | `runc` (default) or `gvisor` (preview). Restart affected Pods after changing it. |
| `--enable-google-group-authentication` | Boolean flag (no value): access the cluster with a Google group; the source default is `false`, so omit the flag to leave it off. |
| `MAX_UNAVAILABLE_NODES` | Preview: worker nodes that may be down simultaneously for an upgrade. |
| `UPGRADE_SCHEDULE` | The only valid value is `IMMEDIATELY`. |
| `MAINTENANCE_START` / `MAINTENANCE_END` | `YYYY-MM-DDTHH:MM:SSZ`; window uses RFC 5545, exclusion windows use RFC 3339. |
| `MAINTENANCE_FREQUENCY` | `FREQ=WEEKLY\|DAILY;BYDAY=MO,TU,WE,TH,FR,SA,SU`; if `BYDAY` is omitted Google picks the day; daily means every day in the hours. |

### Rules when creating clusters

- Create Distributed Cloud connected clusters in their own Google Cloud project; mixing with any other type of cluster in the same project can result in data loss.
- Reassigning a node between clusters wipes it and resets it to the default configuration.
- The local control plane runs in high availability mode by default (three replicas on three nodes chosen automatically) unless the cluster has fewer than three nodes or is set to one node; choose the three nodes only with `--control-plane-machine-filter`.
- Control plane nodes also run application workloads. Control plane endpoint IPs are reachable on your local network; prevent external access in your network configuration.

## Notes

- Preview: software upgrade stage size (`--max-unavailable-worker-nodes`), the `gvisor` runtime class and a reboot timeout via the REST `v1alpha1` surface are preview-level features and are subject to the Pre-GA Offerings Terms.
- A software upgrade typically takes about 2 hours per node in the node pool; the cluster status is `Reconciling` and returns to `Running`; `Error` means the upgrade failed and should be re-run. A cluster has no default maintenance window, so an update can bring down a critical workload; configure staggered maintenance windows and exclusion windows. Clearing a maintenance window also clears its exclusion windows; an exclusion window needs a maintenance window first and takes precedence.
- Caution from the source: with a reboot timeout, nodes that went offline can reboot and rejoin even if you disable or delete the storage key for that time; the risk grows with the timeout. When modifying storage encryption, no other parameter can be updated in the same operation.
- Deleting a cluster is destructive and can break connectivity; try it on a disposable resource first.
- Corrected from the official docs: the source commands used `--external-lb-address-pools`, `--default-container-runtime RUNTIME_CLASS`, `--enable-google-group-authentication GROUP_AUTHENTICATION` and, for `clusters update`, also `--cluster-ipv4-cidr`, `--services-ipv4-cidr`, `--default-max-pods-per-node` and the Google group flag; none of these match the gcloud 593.0.0 SYNOPSIS of the GA commands (`--external-lb-address-pools`, `--max-unavailable-worker-nodes` and `--clear-max-unavailable-worker-nodes` exist only in `gcloud alpha`).
- Optional flags in the create command can be omitted; do not leave unfilled placeholders in a real command.
- REST forms (create, list, get, upgrade, patch with `updateMask`, delete) and Console steps are omitted; the REST create body is not valid JSON in the source.
- Corrected from the official docs: the source example key path starts with `/projects/...`; the Cloud KMS API defines a CryptoKey name without a leading slash (`^projects/[^/]+/locations/[^/]+/keyRings/[^/]+/cryptoKeys/[^/]+$`), so the leading slash is removed. The example's location segment `us-west1-a` is kept as written in the source.
- Source inconsistency: the `REBOOT_TIMEOUT` description says "You can also use the ISO 8601 format for this value (for example, `1dT1h2m3s`)", but `1dT1h2m3s` is not an ISO 8601 duration (the ISO 8601 form would start with `P`, for example `P1DT1H2M3S`). Safe reading: give the value in seconds, as the default and minimum in the same row are given.
- Source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/clusters (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [networking.md](./networking.md)
- [quotas.md](./quotas.md)
- [how-it-works.md](./how-it-works.md)
