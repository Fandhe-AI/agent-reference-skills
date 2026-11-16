---
source: https://docs.cloud.google.com/compute/docs/tpus/create-tpu-mig-multi-host-slice
---

# Create a MIG with multi-host TPU slices

Create a managed instance group (MIG) that forms a multi-host TPU slice: create an instance template, create a workload policy with an `accelerator-topology`, then create the MIG.

## Signature / Usage

### Prerequisites

Review the limitations for creating MIGs with TPU instances ("TPUs and MIGs"), install and initialize the gcloud CLI (`gcloud init`) and set a default region and zone. Then: choose the TPU version, validate availability in your region, ensure TPU quota (not needed when consuming a reservation), choose a consumption option, and choose a topology supported for the version (see [tpu-machines.md](./tpu-machines.md)).

### 1. Instance template (on-demand)

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
  --machine-type=MACHINE_TYPE \
  --maintenance-policy=TERMINATE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT
```

### 1. Instance template (Spot)

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
  --machine-type=MACHINE_TYPE \
  --maintenance-policy=TERMINATE \
  --instance-termination-action=STOP \
  --provisioning-model=SPOT \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT
```

### 1. Instance template (reservation-bound)

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
  --machine-type=MACHINE_TYPE \
  --maintenance-policy=TERMINATE \
  --instance-termination-action=DELETE \
  --reservation-affinity=specific \
  --provisioning-model=reservation-bound \
  --reservation=RESERVATION_NAME \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT
```

### 2. Workload policy

You must create a workload policy with the `accelerator-topology` parameter (for example `4x4`, `8x8` or `4x4x4`); it configures the MIG to treat the instances as a single interconnected slice.

```bash
gcloud compute resource-policies create workload-policy WORKLOAD_POLICY_NAME \
  --type=high-throughput \
  --accelerator-topology=TOPOLOGY \
  --region=REGION
```

### 3. Zonal MIG

```bash
gcloud compute instance-groups managed create MIG_NAME \
   --size=MIG_SIZE \
   --target-size-policy-mode=bulk \
   --template=INSTANCE_TEMPLATE_URL \
   --zone=ZONE \
   --default-action-on-vm-failure=do-nothing \
   --workload-policy=WORKLOAD_POLICY_URL
```

### VMs with custom names (REST only)

MIGs with a multi-host TPU slice use the bulk target size policy mode. First verify the MIG has no VMs; if it has, resize it to target size `0` or create another MIG with target size `0`. Use `instanceGroupManagers.createInstances` (zonal) or `regionInstanceGroupManagers.createInstances` (regional):

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instanceGroupManagers/MIG_NAME/createInstances
{
  "instances": [
    {
      "name": "INSTANCE_NAME_1"
    },
    {
      "name": "INSTANCE_NAME_2"
    },
    ...
  ]
}
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `PROJECT_ID` | The ID of your Google Cloud project. |
| `INSTANCE_TEMPLATE_NAME` | Name of the instance template. |
| `MACHINE_TYPE` | TPU machine type, for example `ct6e-standard-8t` (the source's example; `ct6e-standard-8t` is listed as a single-host configuration, so for a multi-host slice use a machine type and topology that the topology tables list as multi-host, for example `ct6e-standard-4t` with `4x4` (4 VMs) or `tpu7x-standard-4t` with `2x2x4` (4 VMs), see Notes). |
| `IMAGE_FAMILY` / `IMAGE_PROJECT` | OS image family; for TPU images the project is `ubuntu-os-accelerator-images`. |
| `RESERVATION_NAME` | The specific reservation; for All Capacity mode a block is `RESERVATION_NAME/reservationBlocks/RESERVATION_BLOCK_NAME` and a sub-block is `RESERVATION_NAME/reservationBlocks/RESERVATION_BLOCK_NAME/reservationSubBlocks/RESERVATION_SUBBLOCK_NAME`. |
| `DURATION` | Maximum run duration of the TPU VM; for REST a number of seconds (for example `3600` for 1 hour, `604800` for 7 days). |
| `WORKLOAD_POLICY_NAME` | Name of the workload policy. |
| `TOPOLOGY` | Topology of the TPU VMs, for example `4x4x8`. |
| `REGION` / `ZONE` | Region of the workload policy or regional MIG / zone of the MIG. |
| `MIG_NAME`, `MIG_SIZE` | MIG name and the number of VMs in it (for a multi-host slice, the number of VMs that the topology tables in [v6e.md](./v6e.md) and [tpu-machines.md](./tpu-machines.md) give for the chosen machine type and topology). |
| `INSTANCE_TEMPLATE_URL` | URL with the ID or name of the template: regional `projects/PROJECT_ID/regions/REGION/instanceTemplates/INSTANCE_TEMPLATE_ID`; global `INSTANCE_TEMPLATE_ID`. |
| `WORKLOAD_POLICY_URL` | For example `projects/PROJECT_ID/regions/WORKLOAD_POLICY_REGION/resourcePolicies/WORKLOAD_POLICY_NAME`. |
| `INSTANCE_NAME_1,2,..` | Names of the VMs to add to the MIG. |

## Notes

- The twin has no H1; the title is derived from the URL slug. The source also shows REST requests for all steps (instance templates, MIGs) and for custom-named regional MIGs; only the gcloud forms and the zonal createInstances REST are kept. Also omitted for size: the Flex-start instance template (`gcloud compute instance-templates create` with `--instance-termination-action=DELETE`, `--provisioning-model=FLEX_START` and `--max-run-duration=DURATION`, which is what `DURATION` in the table refers to), the workload policy REST request (`workloadPolicy.type` `HIGH_THROUGHPUT` and `acceleratorTopology`) and the regional MIG command (the zonal command with `--region=REGION` instead of `--zone=ZONE`, plus `--target-distribution-shape=any-single-zone` and `--instance-redistribution-type=none`). REST regional MIG adds `distributionPolicy.targetShape` `ANY_SINGLE_ZONE` and `updatePolicy.instanceRedistributionType` `NONE`; REST zonal MIG uses `targetSizePolicy.mode` `BULK`, `instanceLifecyclePolicy.defaultActionOnFailure` `DO_NOTHING` and `resourcePolicies.workloadPolicy`.
- The regional `createInstances` call uses `POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/instanceGroupManagers/MIG_NAME/createInstances` with the same body.
- Condition: the Spot template uses `--instance-termination-action=STOP`, while [create-tpu-vm-instance.md](./create-tpu-vm-instance.md) says TPU instances can't be stopped and uses `DELETE`; both are recorded as written. The reservation-bound template (and the omitted Flex-start template) uses `DELETE`, which is destructive; try them on disposable resources first.
- You can instead create a managed compute cluster in Cluster Director to provision a multi-host TPU slice with an automated high-throughput workload policy, Cloud TPU runtime library installation and shared storage mounts.
- Distance line: Compute Engine TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; the MIG itself is a Compute Engine instance group.
- The `createInstances` fence ends at the closing brace of the source block; its `...` is from the source.
- Source inconsistency: this page gives `ct6e-standard-8t` as the `MACHINE_TYPE` example and `4x4x8` as the `TOPOLOGY` example for a multi-host slice, while v6e.md lists `ct6e-standard-8t` only as "Single-host" (`2x4`, 1 VM) and every v6e multi-host topology (`2x4` on 2 VMs up to `16x16` on 64 VMs) with `ct6e-standard-4t`, and tpu-machines.md lists the TPU7x multi-host topologies (`2x2x2` to `4x4x4`) with `tpu7x-standard-4t`. Pick the machine type, topology and MIG size from one row of those tables.
- Source (compared pages): https://docs.cloud.google.com/tpu/docs/v6e (v6e.md), https://docs.cloud.google.com/compute/docs/tpus/tpu-machines (tpu-machines.md) (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/tpus/create-tpu-mig-multi-host-slice (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
- [tpu-machines.md](./tpu-machines.md)
- [tpus-in-compute-engine.md](./tpus-in-compute-engine.md)
- TPUs and MIGs: https://docs.cloud.google.com/tpu/docs/tpus-and-migs
