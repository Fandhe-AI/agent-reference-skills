---
source: https://docs.cloud.google.com/compute/docs/instances/reservations-overview
---

# About Compute Engine reservations

A reservation gives a high level of assurance of capacity for one or more VMs with the configuration you specify. Compute Engine verifies the capacity is available in the zone and within the zone's reservation capacity limit for the machine family; once created, the resources stay available until you delete the reservation and you are billed at the on-demand rate.

## Signature / Usage

### Create a reservation

Create a reservation by specifying VM properties through an instance template (`fake-zone` is a placeholder from the help text; use a real zone):

```bash
gcloud compute reservations create my-reservation --vm-count=1 \
  --source-instance-template=example-instance-template \
  --zone=fake-zone
```

Create a reservation by directly specifying VM properties (`fake-zone` is a placeholder; use a real zone):

```bash
gcloud compute reservations create my-reservation --vm-count=1 \
  --machine-type=custom-8-10240 \
  --min-cpu-platform="Intel Haswell" \
  --accelerator=count=2,type=nvidia-tesla-v100 \
  --local-ssd=size=375,interface=scsi --zone=fake-zone
```

### Resize a reservation and change sharing

Update the number of reserved VMs:

```bash
gcloud compute reservations update my-reservation \
  --zone=us-central1-a --vm-count=500
```

Add projects to the list of projects the reservation is shared with:

```bash
gcloud compute reservations update my-reservation \
  --add-share-with=project-1,project-2,project-3 \
  --zone=us-central1-a
```

## Options / Props

### Reservation properties

| Property | Detail |
|----------|--------|
| Auto-delete | Deletes the reservation (consumed or not) within two hours of the specified date and time by default, or at a custom date and time |
| Consumption type | Automatic (default): VMs with a reservation affinity that allows it consume it, new and existing VMs. If several apply, single-project reservations are consumed before shared ones; otherwise random. Specifically targeted: only new VMs that target the reservation by name |
| Share type | Single-project (default) or shared |
| Sharing policy | Whether GPU VM reservations can be consumed by Vertex AI custom training or prediction jobs (not allowed by default) |
| VM count | Number of VMs to reserve; can be modified later |
| VM properties | Specified directly, from an existing VM, or from an instance template |
| Resource placement policy (optional) | Compact placement policy |

### Requirements

A VM consumes a reservation only if these match exactly: project (depends on share type), zone, machine type, minimum CPU platform, GPU type and count, Local SSD type and count, reservation affinity (depends on consumption type), compact placement policy (if any), location hint (if any; REST only, not recommended).

You need unused quota for the reserved resources; quota is consumed immediately on creation.

| Case | Additional requirements |
|------|-------------------------|
| Attached to resource-based commitments | Same project and region as the commitment; same machine family series (any machine type in it); auto-delete disabled; if the commitment specifies GPUs or applicable Local SSDs, the attached reservation(s) must specify exactly the same numbers and types |
| Created from an instance template | Same region, zone and project as the template's resources; with a compact placement policy in the template, create a specific reservation and target it by name |
| Shared reservations (quota) | Owner project consumes quota for the total reserved resources on creation, plus quota for what it consumes; consumer projects consume quota only for what they consume |
| Compact placement policy | Policy max distance cannot be `1`; policy cannot be used by more than one reservation; only on-demand, single-project, specifically targeted reservations not attached to a commitment; reservation zone within the policy's region; VM count not above policy maximum; supported machine type |

### Restrictions

| Item | Detail |
|------|--------|
| Products | Batch, Compute Engine, Dataflow, Managed Service for Apache Spark, Google Kubernetes Engine, Vertex AI |
| Size | Up to 1,000 VMs per reservation |
| Not reservable | A4X Max bare metal instances; A4X, A4, A3 Ultra, A3 High (with less than 8 GPUs), TPU7x, TPU v6e and TPU v5p VMs |
| Affinity updates | VM reservation affinity can only be updated to `ANY_RESERVATION` or `NO_RESERVATION` |
| Attached to commitments | Resource-based commitments only; attach only while purchasing the commitment; a reservation attaches to one commitment; for commitments with resource types that require attached reservations, you cannot delete, resize or modify them or enable auto-delete (you can replace them) |
| Shared reservations | Same organization only; 1 to 100 consumer projects; up to 100 shared reservations per organization per unique VM-property combination; listed only in the creating project; no compact placement policy |
| Compact placement policy | Not shareable across reservations; no other resource policy type (instance or snapshot schedules) |

### Shared reservation admin and billing

- By default projects cannot create or modify shared reservations; add the project to the allowlist of the `compute.sharedReservationsOwnerProjects` organization policy constraint (Shared Reservations Owner Projects).
- Billed at the on-demand rate with the 1-minute minimum, plus applicable SUDs, CUDs and custom pricing, while the reservation exists whether used or not. A VM consuming a reservation incurs no duplicate charge. Default billing project is the owner project, switching to the consumer project while it consumes.
- Billing example: 3-vCPU commitment in `us-central1`, 5 vCPUs running in `us-central1-a`, 10-vCPU reservation there. Billed as 3 vCPUs at the CUD price and 7 vCPUs at the on-demand price (2 used + 5 unused reservation vCPUs).
- Managed Service for Apache Spark: no resource-based CUDs for reserved resources. Dataflow: CUDs only for specifically targeted reservations that specify accelerators.

## Notes

- Deleting an automatically consumed reservation leaves consuming VMs running and billed. A specifically targeted reservation can be deleted only when no VM consumes it; stopped or suspended VMs can then be restarted only after you create a new specifically targeted reservation with the same name, zone and properties. Deleting a reservation is destructive; try it on a disposable reservation first.
- Moving a project that created or consumed shared reservations to another organization deletes the shared reservations it created (running VMs unaffected) and stops its consumption of reservations shared with it.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/update (gcloud 593.0.0 help); each fence is one separate help example. The twin itself contains no code.
- Compute Engine reservations; VPC and firewall concerns are out of scope here.
- Source inconsistency: this page says "You can't reserve A4X Max bare metal instances, or A4X, A4, A3 Ultra, or A3 High (with less than 8 GPUs), TPU7x, TPU v6e, and TPU v5p VMs", while choose-reservation-type.md also excludes A5X from on-demand reservations ("All machine families (except A5X, A4X Max, A4X, A4, A3 Ultra, A3 High with less than 8 GPUs, TPU7x, TPU v6e, and TPU v5p)") and lists A5X only for future reservations for capacity blocks; accelerator-optimized-a5x-a4-series.md lists "Future reservations for capacity blocks" as the A5X reservation option.
- Source (Choose a reservation type, cited above as `choose-reservation-type.md`): https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type (retrieved 2026-11-17)
- Source (Accelerator-optimized machine family: A5X, A4X Max, A4X and A4 series, cited above as `accelerator-optimized-a5x-a4-series.md`): https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/reservations-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-reservation-type.md](./choose-reservation-type.md)
- [future-reservations-overview.md](./future-reservations-overview.md)
- [committed-use-discounts-overview.md](./committed-use-discounts-overview.md)
- [spot.md](./spot.md)
