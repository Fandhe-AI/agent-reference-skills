---
source: https://docs.cloud.google.com/confidential-computing/confidential-space/docs/deploy-workloads
---

# Deploy Confidential Space workloads

A workload operator passes options to a Confidential Space workload VM before it runs: production or debug image, AMD SEV / Intel TDX / Intel TDX with NVIDIA Confidential Computing, VM metadata variables, the attached service account, and the zone.

## Signature / Usage

### CPU-based workloads

```bash
gcloud compute instances create INSTANCE_NAME \
    --confidential-compute-type=CONFIDENTIAL_COMPUTING_TECHNOLOGY \
    --machine-type=MACHINE_TYPE_NAME \
    --maintenance-policy=MAINTENANCE_POLICY \
    --shielded-secure-boot \
    --image-project=confidential-space-images \
    --image-family=IMAGE_FAMILY \
    --metadata="^~^tee-image-reference=us-docker.pkg.dev/WORKLOAD_AUTHOR_PROJECT_ID/REPOSITORY_NAME/WORKLOAD_CONTAINER_NAME:latest" \
    --service-account=WORKLOAD_SERVICE_ACCOUNT_NAME@WORKLOAD_OPERATOR_PROJECT_ID.iam.gserviceaccount.com \
    --scopes=cloud-platform \
    --zone=ZONE_NAME \
    --project=PROJECT_ID
```

### GPU-based workloads: Spot

```bash
gcloud compute instances create INSTANCE_NAME \
    --provisioning-model=SPOT \
    --confidential-compute-type=TDX \
    --machine-type=a3-highgpu-1g \
    --maintenance-policy=TERMINATE \
    --shielded-secure-boot \
    --image-project=confidential-space-images \
    --image-family=IMAGE_FAMILY_NAME \
    --metadata="^~^tee-image-reference=us-docker.pkg.dev/WORKLOAD_AUTHOR_PROJECT_ID/REPOSITORY_NAME/WORKLOAD_CONTAINER_NAME:latest~tee-install-gpu-driver=true" \
    --service-account=WORKLOAD_SERVICE_ACCOUNT_NAME@WORKLOAD_OPERATOR_PROJECT_ID.iam.gserviceaccount.com \
    --scopes=cloud-platform \
    --boot-disk-size=30G \
    --zone=ZONE_NAME \
    --project=PROJECT_ID
```

### GPU-based workloads: Flex-start (instance template, then MIG)

```bash
gcloud beta compute instance-templates create INSTANCE_TEMPLATE_NAME \
    --provisioning-model=FLEX_START \
    --confidential-compute-type=TDX \
    --machine-type=a3-highgpu-1g \
    --maintenance-policy=TERMINATE \
    --shielded-secure-boot \
    --image-project=confidential-space-images \
    --image-family=IMAGE_FAMILY_NAME \
    --metadata="^~^tee-image-reference=us-docker.pkg.dev/WORKLOAD_AUTHOR_PROJECT_ID/REPOSITORY_NAME/WORKLOAD_CONTAINER_NAME:latest~tee-install-gpu-driver=true" \
    --service-account=WORKLOAD_SERVICE_ACCOUNT_NAME@WORKLOAD_OPERATOR_PROJECT_ID.iam.gserviceaccount.com \
    --scopes=cloud-platform \
    --boot-disk-size=30G \
    --max-run-duration=RUN_DURATION \
    --instance-termination-action=DELETE \
    --project=PROJECT_ID
```

```bash
gcloud compute instance-groups managed create INSTANCE_GROUP_NAME \
    --template=INSTANCE_TEMPLATE_NAME \
    --size=0 \
    --zone=ZONE_NAME \
    --default-action-on-vm-failure=do_nothing
```

### Multiple metadata variables

Prefix the `--metadata` value with `^~^` to set `~` as the delimiter, because `,` is used in variable values.

Adapted (not in the official docs): the source line reads `metadata="^~^tee-restart-policy=Always\~tee-image-reference=..."` (no `--`, and a backslash before the delimiter); fixed to the `--metadata` form with a plain `~` delimiter.

```bash
--metadata="^~^tee-restart-policy=Always~tee-image-reference=us-docker.pkg.dev/WORKLOAD_AUTHOR_PROJECT_ID/REPOSITORY_NAME/WORKLOAD_CONTAINER_NAME:latest"
```

### Attribute condition for service account impersonation (data collaborators)

```text
'WORKLOAD_SERVICE_ACCOUNT_NAME@DATA_COLLABORATOR_PROJECT_ID.iam.gserviceaccount.com' in assertion.google_service_accounts
```

Caveat (from create-grant-access-confidential-resources.md, quoted in Notes): that page uses `@WORKLOAD_OPERATOR_PROJECT_ID` in this clause, which "Verifies that the service account attached to the workload matches the expected service account, and then uses it to impersonate the data collaborator service account".

## Options / Props

### Metadata variables

Some variables can be affected by launch policies set by the workload author.

| Key | Type | Description and values |
|-----|------|------------------------|
| `tee-image-reference` | String | Required. Location of the workload container. Maps to the `container.image_reference` assertion. |
| `ita-api-key` | String | Only with Intel Trust Authority: your API key. ITA supports Intel TDX VMs, optionally with an NVIDIA H100 GPU (GPU evidence is also verified). |
| `ita-region` | String | Only with Intel Trust Authority. US: `https://api.trustauthority.intel.com`; Europe: `https://api.eu.trustauthority.intel.com`. |
| `tee-added-capabilities` | JSON string array | Adds Linux capabilities, e.g. `"[\"CAP_SYS_ADMIN\", \"CAP_SYS_CHROOT\"]"`. Needs launch policy `allow_capabilities`. |
| `tee-cgroup-ns` | Boolean | Default `false`. `true` enables a namespaced cgroup mount at `/sys/fs/cgroup`. Needs `allow_cgroups`. |
| `tee-cmd` | JSON string array | Overrides the Dockerfile `CMD`, e.g. `"[\"params1\", \"params2\"]"`. Needs `allow_cmd_override`; maps to `container.cmd_override`. |
| `tee-container-log-redirect` | Enumeration | Sends `STDOUT` / `STDERR` to Cloud Logging or the serial console (`confidential-space-launcher` field). `false` (default) none; `true` serial console and Cloud Logging; `cloud_logging`; `serial`. High serial log volume can hurt performance. Needs `log_redirect`. |
| `tee-dev-shm-size-kb` | Integer | Size in kB of the `/dev/shm` mount, e.g. `65536`. |
| `tee-env-ENVIRONMENT_VARIABLE_NAME` | String | Sets a container environment variable, e.g. `tee-env-example-env-1='value-1'~tee-env-example-env-2='value-2'`. The author must list the names in `allow_env_override` or they are not set. |
| `tee-impersonate-service-accounts` | String | Comma-separated service accounts the workload operator can impersonate (operator needs permission to impersonate them). Maps to `google_service_accounts`. |
| `tee-install-gpu-driver` | Boolean | Install NVIDIA's Confidential Computing GPU driver; needs a machine type supporting NVIDIA Confidential Computing. |
| `tee-monitoring-memory-enable` | Boolean | Default `false`. `true` enables memory usage monitoring (`guest/memory/bytes_used`, in Cloud Logging / Metrics Explorer). Needs `monitoring_memory_allow`. |
| `tee-mount` | String | Semicolon-separated mount definitions with `type`, `source`, `destination` (absolute path); `type` and `source` must be `tmpfs`, e.g. `type=tmpfs,source=tmpfs,destination=/tmp/tmpfs,size=12345;type=tmpfs,source=tmpfs,destination=/run/workload`. Needs `allow_mount_destinations`. |
| `tee-nonroot-container` | Boolean | Default `false`. `true` runs the container as non-root in an isolated user namespace; required when the author sets `nonroot_container` to `nonrootonly`. Image `confidential-space-261001` and later; earlier images ignore it and run as root. |
| `tee-restart-policy` | Enumeration | `Never` (default), `Always`, `OnFailure`. Production Confidential Space image only. |
| `tee-signed-image-repos` | String | Comma-separated repositories holding Sigstore Cosign signatures. Maps to `container.image_signatures`. |

### Image families and values

| Item | Values |
|------|--------|
| `CONFIDENTIAL_COMPUTING_TECHNOLOGY` (CPU) | `SEV`, `TDX` |
| `MAINTENANCE_POLICY` | `MIGRATE` for N2D with SEV (live migration); `TERMINATE` for all other machine types |
| Image family | `confidential-space` (production), `confidential-space-debug` (debug) |
| `RUN_DURATION` | Number followed by `d`, `h`, `m`, `s` (e.g. `30m`, `1d2h3m4s`); between 10 minutes and seven days |
| Zones | Need Confidential VM for the technology plus Certificate Authority Service availability; GPU: zones supporting NVIDIA Confidential Computing |

### Attached service account

- Roles: `roles/confidentialcomputing.workloadUser` (generate an attestation token); `roles/artifactregistry.reader` (pull the image); `roles/logging.logWriter` (if redirecting logs to Cloud Logging).
- Read access to the collaborators' data (e.g. Cloud Storage bucket, BigQuery table); write access to the output location, readable by the collaborators.
- The workload operator needs `roles/iam.serviceAccountUser` to attach it to the VM.

### GPU prerequisites

Confidential Space only supports NVIDIA Confidential Computing on H100 GPUs (Confidential VM itself also supports NVIDIA Confidential Computing on G4 `g4-standard-48` with RTX PRO 6000, see supported-configurations.md); check GPU quota (request preemptible GPU quota plus global `GPUs (all regions)` quota); boot disk of 30 GB or more recommended; `tee-install-gpu-driver=true` required; CUDA-X libraries must be in the container image (or set `LD_LIBRARY_PATH` to `/usr/local/nvidia/lib64`). Provisioning model must be Spot or flex-start. A flex-start resize request stays `ACCEPTED` until all VMs are created, then becomes `SUCCEEDED`.

## Notes

- Source inconsistency: live-migration-process.md says "Live migration for Confidential VM instances is supported on N2D and C3D machine types running AMD SEV", supported-configurations.md says "Live migration is supported on N2D and C3D machine types running AMD SEV" and confidential-vm-overview.md says "AMD SEV machines that use the N2D and C3D machine types support live migration", while host-maintenance-overview.md lists "Confidential VM instances except for N2D machine types with AMD EPYC Milan CPU platforms running AMD SEV" among instances that terminate, the C3D maintenance table in general-purpose-c3-series.md gives "C3D with Confidential VM" the behavior "Terminate", and deploy-workloads.md (Confidential Space) and the REST text of create-a-confidential-vm-instance.md say "For N2D machine types that use SEV, set this to `MIGRATE`". Only N2D with AMD SEV is documented as live migrating on every page.
- Source (Live migration process during maintenance events, cited above as `live-migration-process.md`): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source (Confidential VM supported configurations, cited above as `supported-configurations.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations (retrieved 2026-11-17)
- Source (Confidential VM overview, cited above as `confidential-vm-overview.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/confidential-vm-overview (retrieved 2026-11-17)
- Source (About host events, cited above as `host-maintenance-overview.md`): https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17)
- Source (General-purpose machine family: C3D and C3 series, cited above as `general-purpose-c3-series.md`): https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17)
- Source (Create a Confidential VM instance, cited above as `create-a-confidential-vm-instance.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance (retrieved 2026-11-17)
- Source inconsistency: this page's attribute condition is `'WORKLOAD_SERVICE_ACCOUNT_NAME@DATA_COLLABORATOR_PROJECT_ID.iam.gserviceaccount.com' in assertion.google_service_accounts`, while its own commands attach `--service-account=WORKLOAD_SERVICE_ACCOUNT_NAME@WORKLOAD_OPERATOR_PROJECT_ID.iam.gserviceaccount.com` and create-grant-access-confidential-resources.md uses `'WORKLOAD_SERVICE_ACCOUNT_NAME@WORKLOAD_OPERATOR_PROJECT_ID.iam.gserviceaccount.com' in assertion.google_service_accounts`, which "Verifies that the service account attached to the workload matches the expected service account", joined with `&&` to `assertion.submods.container.image_digest == 'WORKLOAD_CONTAINER_IMAGE_DIGEST'`, `assertion.swname == 'CONFIDENTIAL_SPACE'` and `'STABLE' in assertion.submods.confidential_space.support_attributes`. That page says `assertion.google_service_accounts` interacts with the workload operator's `tee-impersonate-service-accounts` metadata variable and `--service-account` value, so the clause alone doesn't check the workload image; use it together with the `image_digest`, `swname` and `STABLE` checks as that page does.
- Source (Create and grant access to confidential resources, cited above as `create-grant-access-confidential-resources.md`): https://docs.cloud.google.com/confidential-computing/confidential-space/docs/create-grant-access-confidential-resources (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/confidential-computing/confidential-space/docs/deploy-workloads (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the multi-variable example `metadata="^~^tee-restart-policy=Always\~tee-image-reference=..."` was changed to `--metadata="^~^tee-restart-policy=Always~tee-image-reference=..."`, matching the `--metadata="^~^...~tee-install-gpu-driver=true"` form in the Spot block of the same page.
- `ita-api-key` is a secret placed in VM metadata, which anyone who can read the VM's metadata can see; restrict who can read the instance and never print or log the key. The source offers no other way to pass it.
- The source uses `IMAGE_FAMILY`, `WORKLOAD_AUTHOR_PROJECT_ID` in the command and describes them as `IMAGE_FAMILY_NAME`, `WORKLOAD_AUTHOR_PROJECT`. The CPU example omits `--min-cpu-platform`; see `create-a-confidential-vm-instance.md` for the CPU platform per technology.
- The workload service account is a dedicated account with the roles above; the examples use `--scopes=cloud-platform` together with only those roles. Don't substitute the Compute Engine default service account.
- `--instance-termination-action=DELETE` deletes the VMs when the run duration ends. Spot VMs can be preempted. Try on disposable resources first.
- A known issue with H100 GPUs: the error `failed to get launchspec, make sure you're running inside a GCE VM: GPU Driver installation is not supported.` is a Confidential Space image issue; restart the Confidential VM.
- Flex-start: `gcloud beta compute instance-templates create`; MIG resize request limitations apply. For scale and availability use managed instance groups.
- Omitted for size: the flex-start `gcloud compute instance-groups managed resize-requests create` and `list-instances` commands (the source shows them after the MIG create command); the Options section describes the resize-request states.
- The source shows gcloud commands only for deployment (no Console, REST or Terraform forms).
- Confidential Space on Google Cloud; not Apple Private Cloud Compute (`apple-intelligence`). GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.

## Related

- [create-customize-workloads.md](./create-customize-workloads.md)
- [confidential-space-overview.md](./confidential-space-overview.md)
- [supported-configurations.md](./supported-configurations.md)
