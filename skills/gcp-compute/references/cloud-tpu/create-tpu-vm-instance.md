---
source: https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance
---

# Create a TPU VM instance

Create a TPU virtual machine (VM) instance, also called a single-host TPU slice, with `gcloud compute instances create` or the Compute Engine REST API. Parameters depend on the consumption option: on-demand, Spot, reservation-bound or Flex-start.

## Signature / Usage

### Prerequisites

1. Choose the TPU version (see [tpu-machines.md](./tpu-machines.md)).
2. Validate TPU availability in your preferred region (see [regions-zones.md](./regions-zones.md)).
3. Ensure sufficient TPU quota for on-demand, Flex-start VMs or Spot VMs in the region. An instance that consumes a TPU reservation needs no TPU quota (quota is used when the reservation was created).
4. Choose a consumption option (see [plan-tpus.md](./plan-tpus.md)).

For the gcloud CLI, install and initialize it (`gcloud init`), run `gcloud components update` if it was installed previously, and set a default region and zone. For REST, the credentials you give the gcloud CLI are used.

### On-demand TPU VM instance

With the `ct6e-standard-8t` machine type you must set the threads per core to `1` by adding `--threads-per-core=1` to the following command (the same applies to the Spot, reservation-bound and Flex-start commands below). The REST requests on this page do not show it; in a REST request, set the same value with `"advancedMachineFeatures": {"threadsPerCore": 1}` in the instance body (the `AdvancedMachineFeatures.threadsPerCore` field of the Compute Engine API).

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --maintenance-policy=TERMINATE
```

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TPU_NAME",
    "machineType": "zones/ZONE/machineTypes/MACHINE_TYPE",
    "disks": [
      {
        "boot": true,
        "initializeParams": {
          "sourceImage": "projects/IMAGE_PROJECT/global/images/family/IMAGE_FAMILY"
        }
      }
    ],
    "scheduling": {
      "onHostMaintenance": "TERMINATE"
    },
    "networkInterfaces": [
      {
        "network": "global/networks/default"
      }
    ]
  }' \
  "https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances"
```

### TPU Spot VM instance

Add `--provisioning-model=SPOT` (REST: `scheduling.provisioningModel` = `SPOT`, `instanceTerminationAction` = `DELETE`):

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --provisioning-model=SPOT \
  --instance-termination-action=DELETE \
  --maintenance-policy=TERMINATE
```

### TPU VM instance using a reservation

Use `--reservation-affinity=specific` and `--reservation`. You can't use `--request-valid-for-duration` with All Capacity mode reservations.

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --provisioning-model=reservation-bound \
  --reservation-affinity=specific \
  --reservation=RESERVATION_NAME \
  --instance-termination-action=DELETE \
  --maintenance-policy=TERMINATE
```

### TPU Flex-start VM

Use `--provisioning-model=FLEX_START`:

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --provisioning-model=FLEX_START \
  --max-run-duration=MAX_RUN_DURATION \
  --request-valid-for-duration=VALID_DURATION \
  --instance-termination-action=DELETE \
  --maintenance-policy=TERMINATE
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `PROJECT_ID` | The ID of your Google Cloud project. |
| `TPU_NAME` | A name for your TPU VM. |
| `MACHINE_TYPE` | The TPU machine type (for example `ct6e-standard-8t`). |
| `IMAGE_FAMILY` | The OS image family; to install a specific OS version use the `--image` flag. |
| `IMAGE_PROJECT` | The project that contains the OS image. For TPU images, `ubuntu-os-accelerator-images`. |
| `ZONE` | The zone for the TPU VM (for example `us-central1-b`). |
| `RESERVATION_NAME` | The specific reservation to consume. For All Capacity mode reservations a block is `RESERVATION_NAME/reservationBlocks/RESERVATION_BLOCK_NAME` and a sub-block is `RESERVATION_NAME/reservationBlocks/RESERVATION_BLOCK_NAME/reservationSubBlocks/RESERVATION_SUBBLOCK_NAME`. |
| `MAX_RUN_DURATION` | Maximum run duration (for example `6h`). For REST, a number of seconds (for example `21600` for 6 hours). |
| `VALID_DURATION` | Maximum duration for which the request is valid. For REST, a number of seconds (for example `3600` for 1 hour). |

### Limitations

| Limitation | Detail |
|------------|--------|
| Lifecycle operations | You can't stop, start, resume or suspend TPU instances. To change configurations that require a restart, or to stop incurring charges, delete the instances. |
| Update VM details | You can update only properties that need a `REFRESH` action; if a configuration requires `RESTART`, recreate the instance. |
| Automatic restart | In All Capacity mode, don't disable automatic restart by setting `scheduling.automaticRestart` to `false`. |

## Notes

- The twin has no H1; the title is derived from the URL slug. The source also shows REST requests for Spot and Flex-start (same fields as shown above plus `provisioningModel`, `maxRunDuration` and `params.requestValidForDuration`); they are omitted here, as is the reservation-bound REST request (`scheduling.provisioningModel` `RESERVATION_BOUND`, `instanceTerminationAction` `DELETE` and a `reservationAffinity` object with `consumeReservationType` `SPECIFIC_RESERVATION`, `key` `compute.googleapis.com/reservation-name` and `values`). Spot REST: `scheduling.provisioningModel` `SPOT` and `instanceTerminationAction` `DELETE`; Flex-start REST: `scheduling.provisioningModel` `FLEX_START`, `scheduling.maxRunDuration.seconds`, `params.requestValidForDuration.seconds`.
- Destructive: `--instance-termination-action=DELETE` deletes the instance when it is terminated, and TPU instances can only be deleted (not stopped). Try these commands on a disposable project or resource first.
- TPU instances can't be stopped, yet the multi-host MIG template for Spot uses `--instance-termination-action=STOP` (see [create-tpu-mig-multi-host-slice.md](./create-tpu-mig-multi-host-slice.md)); both are recorded as written.
- The source has no Console or Terraform tab for these steps.
- Distance line: Compute Engine TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Source: https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-tpu-mig-multi-host-slice.md](./create-tpu-mig-multi-host-slice.md)
- [tpu-machines.md](./tpu-machines.md)
- [plan-tpus.md](./plan-tpus.md)
- [regions-zones.md](./regions-zones.md)
- Create a MIG with single-host TPU slices: https://docs.cloud.google.com/compute/docs/tpus/create-tpu-mig-single-host-slice
- Create and start a Compute Engine instance: https://docs.cloud.google.com/compute/docs/instances/create-start-instance
