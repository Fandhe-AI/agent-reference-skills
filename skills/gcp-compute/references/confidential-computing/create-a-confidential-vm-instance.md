---
source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance
---

# Create a Confidential VM instance

Create a Confidential VM instance as part of creating a new Compute Engine VM, with the console, the gcloud CLI (`--confidential-compute-type`) or the REST API (`confidentialInstanceConfig`).

## Signature / Usage

### gcloud

```bash
gcloud compute instances create INSTANCE_NAME \
    --confidential-compute-type=CONFIDENTIAL_COMPUTING_TECHNOLOGY \
    --machine-type=MACHINE_TYPE_NAME \
    --min-cpu-platform="CPU_PLATFORM" \
    --maintenance-policy=MAINTENANCE_POLICY \
    --zone=ZONE_NAME \
    --image-project=IMAGE_PROJECT \
    --image-family=IMAGE_FAMILY_NAME \
    --project=PROJECT_ID
```

Example: an `n2d-standard-2` instance `my-instance` in `us-central1-a` using AMD SEV-SNP.

```bash
gcloud compute instances create my-instance \
    --machine-type=n2d-standard-2 \
    --min-cpu-platform="AMD Milan" \
    --zone=us-central1-a \
    --confidential-compute-type=SEV_SNP \
    --maintenance-policy=TERMINATE \
    --image-project=ubuntu-os-cloud \
    --image-family=ubuntu-2404-lts-amd64
```

### REST

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE_NAME/instances
```

Adapted (not in the official docs): `"nicType": "gVNIC"` changed to `"nicType": "GVNIC"`, the enum value in the Compute Engine API schema.

```json
{
  "name": "INSTANCE_NAME",
  "confidentialInstanceConfig": {
    "confidentialInstanceType": "CONFIDENTIAL_COMPUTING_TECHNOLOGY"
  },
  "machineType": "zones/ZONE_NAME/machineTypes/MACHINE_TYPE_NAME",
  "minCpuPlatform": "CPU_PLATFORM",
  "scheduling": {
    "automaticRestart": true,
    "nodeAffinities": [],
    "onHostMaintenance": "MAINTENANCE_POLICY",
    "preemptible": false
  },
  "disks": [
    {
      "boot": true,
      "initializeParams": {
        "sourceImage": "projects/IMAGE_PROJECT/global/images/family/IMAGE_FAMILY_NAME"
      }
    }
  ],
  "networkInterfaces": [
    {
      "nicType": "GVNIC"
    }
  ]
}
```

Example with curl (Linux, macOS or Cloud Shell; assumes you're logged in to the gcloud CLI):

Adapted (not in the official docs): `"nicType": "gVNIC"` changed to `"nicType": "GVNIC"`, the enum value in the Compute Engine API schema.

```bash
curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      -d '{
            "name": "my-instance",
            "confidentialInstanceConfig": {
              "confidentialInstanceType": "SEV_SNP"
            },
            "machineType": "zones/us-central1-a/machineTypes/n2d-standard-2",
            "minCpuPlatform": "AMD Milan",
            "scheduling": {
              "automaticRestart": true,
              "nodeAffinities": [],
              "onHostMaintenance": "TERMINATE",
              "preemptible": false
            },
            "disks": [
              {
                "boot": true,
                "initializeParams": {
                  "sourceImage": "projects/ubuntu-os-cloud/global/images/family/ubuntu-2404-lts-amd64"
                }
              }
            ],
            "networkInterfaces": [
              {
                "nicType": "GVNIC"
              }
            ]
          }' \
      https://compute.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances
```

Check progress with a `GET` on the operation's `selfLink`:

```text
GET https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE_NAME/operations/OPERATION_ID
```

## Options / Props

| Placeholder | Values |
|-------------|--------|
| `CONFIDENTIAL_COMPUTING_TECHNOLOGY` | `SEV`, `SEV_SNP`, `TDX` |
| `MACHINE_TYPE_NAME` | e.g. `n2d-standard-2`; valid types depend on the technology |
| `CPU_PLATFORM` | AMD SEV: `AMD Milan` (C2D or N2D), `AMD Genoa` (C3D), `AMD Turin` (C4D). AMD SEV-SNP: `AMD Milan` (N2D). Intel TDX: remove the flag (gcloud) or key-value pair (REST). |
| `MAINTENANCE_POLICY` | gcloud: `MIGRATE` for live migration on N2D and C3D with SEV; `TERMINATE` for all other machine types. REST text: `MIGRATE` for N2D with SEV; `TERMINATE` otherwise. |
| `IMAGE_FAMILY_NAME` | A Confidential VM-supported image family; the latest image is used when `--image` isn't given |
| `PROJECT_ID` | Optional for gcloud (project to create the VM in) |

Console path (summary): VM instances, Create instance, pick a supported region / zone / machine family and type, then Security, Confidential VM service, Enable, choose AMD SEV, AMD SEV-SNP or Intel TDX. The dialog lists settings that get updated if incompatible: series and machine type, region and zone, boot disk image, on-host maintenance, and network interface card (gVNIC).

Higher network bandwidth: with a Tier_1 network bandwidth configuration, data transfer out bandwidth rises from the default 32 Gbps to 50 to 200 Gbps depending on machine type; the instance must run the gVNIC driver.

## Notes

- Source (Live migration process during maintenance events, cited above as `live-migration-process.md`): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source (Confidential VM supported configurations, cited above as `supported-configurations.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations (retrieved 2026-11-17)
- Source (Confidential VM overview, cited above as `confidential-vm-overview.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/confidential-vm-overview (retrieved 2026-11-17)
- Source (About host events, cited above as `host-maintenance-overview.md`): https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17)
- Source (General-purpose machine family: C3D and C3 series, cited above as `general-purpose-c3-series.md`): https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17)
- Source (Deploy Confidential Space workloads, cited above as `deploy-workloads.md`): https://docs.cloud.google.com/confidential-computing/confidential-space/docs/deploy-workloads (retrieved 2026-11-17)
- Source (`--network-interface` `nic-type`): `gcloud compute instances create --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source (`NetworkInterface.nicType` values): Compute Engine API v1 Discovery document https://compute.googleapis.com/$discovery/rest?version=v1, schema `NetworkInterface` (retrieved 2026-11-14)
- Corrected from the official docs: the REST bodies set `"nicType": "gVNIC"`; the Compute Engine API `NetworkInterface.nicType` values are `GVNIC`, `IDPF`, `IRDMA`, `MRDMA`, `UNSPECIFIED_NIC_TYPE` and `VIRTIO_NET`, so both bodies use `GVNIC`.
- Source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- The source also shows the Console steps, a PowerShell variant, and sample responses; they are omitted here. The source's PowerShell sample has a missing comma in the JSON body and an incomplete URL, so don't copy it.
- Source inconsistency: the source's gcloud text says "For N2D and C3D machine types that use SEV, set this to `MIGRATE` for live migration support", while its REST text says "For N2D machine types that use SEV, set this to `MIGRATE` for live migration support". live-migration-process.md, supported-configurations.md and confidential-vm-overview.md also name N2D and C3D with AMD SEV, while host-maintenance-overview.md lists "Confidential VM instances except for N2D machine types with AMD EPYC Milan CPU platforms running AMD SEV" among instances that terminate, the C3D maintenance table in general-purpose-c3-series.md gives "C3D with Confidential VM" the behavior "Terminate", and deploy-workloads.md (Confidential Space) names only N2D. Only N2D with AMD SEV is documented as live migrating on every page.
- Source inconsistency: the source's REST bodies set `"nicType": "gVNIC"`, while its gcloud commands set no NIC type; the source doesn't say that gVNIC is required, except that Tier_1 bandwidth needs the gVNIC driver. The gcloud form is `--network-interface=nic-type=GVNIC` ("NIC_TYPE must be one of: GVNIC, VIRTIO_NET"). The Discovery `NetworkInterface.nicType` values are `GVNIC`, `IDPF`, `IRDMA`, `MRDMA`, `UNSPECIFIED_NIC_TYPE` and `VIRTIO_NET`, so the source's `"gVNIC"` differs from the schema's spelling `GVNIC`. VPC networks and firewall rules themselves are in `gcp-networking`.
- Prerequisites: latest gcloud CLI, a default region and zone that supports Confidential VM; REST needs authentication. Cloud Monitoring can validate Confidential VM instances (see https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/monitor-integrity).

## Related

- [supported-configurations.md](./supported-configurations.md)
- [confidential-vm-overview.md](./confidential-vm-overview.md)
- [enforce-confidential-vm-use.md](./enforce-confidential-vm-use.md)
