---
source: https://docs.cloud.google.com/compute/docs/instances/deleting-instance
---

# Delete a compute instance

Permanently delete a Compute Engine instance. Deleted instances cannot be recovered. Compute Engine stops the instance before deleting it, and you decide whether attached disks are deleted or preserved.

## Signature / Usage

### Delete instances and attached resources

```bash
gcloud compute instances delete INSTANCE_NAMES \
    --zone=ZONE
```

Force deletion of attached disks:

```bash
gcloud compute instances delete INSTANCE_NAMES \
    --delete-disks=DELETE_DISK_TYPE \
    --zone=ZONE
```

Skip or end an ongoing graceful shutdown:

```bash
gcloud compute instances delete INSTANCE_NAMES \
    --no-graceful-shutdown \
    --zone=ZONE
```

REST:

```http
DELETE https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME
```

```http
DELETE https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/VM_NAME?noGracefulShutdown=true
```

### Delete instances and preserve disks

```bash
gcloud compute instances delete INSTANCE_NAMES \
    --keep-disks=KEEP_DISK_TYPE \
    --zone=ZONE
```

```bash
gcloud compute instances delete VM_NAMES \
    --keep-disks=KEEP_DISK_TYPE \
    --no-graceful-shutdown \
    --zone=ZONE
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `INSTANCE_NAMES` | string list | Space-separated names of instances in the same zone. |
| `ZONE` | string | Zone where the instances exist. |
| `--delete-disks` | enum | `all` (boot and non-boot persistent storage), `boot`, `data` (non-boot only). Overrides disks configured to be preserved. |
| `--keep-disks` | enum | `all`, `boot`, `data`. Preserves disks regardless of their auto-delete settings. |
| `--no-graceful-shutdown` / `noGracefulShutdown=true` | flag / query | Skip or end an ongoing graceful shutdown. |

### Required roles and permissions

Role: Compute Instance Admin (v1), `roles/compute.instanceAdmin.v1`, on the project.

| Action | Permission |
|--------|------------|
| Delete | `compute.instances.delete` |
| Force deletion of an attached disk | `compute.disks.delete` |

### Billing after deletion

Charges stop for the instance and attached resources except:

- Sole-tenant node: you still pay for the node.
- Instance created from a reservation: you pay for reserved resources until the reservation is deleted (by you or an automatic operation) or the number of reserved instances is reduced.
- Committed use discount: you pay for committed resources whether used or not.
- Preserved disks or external IP addresses: you pay until you delete them.

### Preserving attached resources before deleting

- N1 GPU: remove the GPU from the VM.
- Boot disk: detach it, or set auto-delete to `false`. Non-boot disk: set auto-delete to `false`.
- Local SSD: copy the data to persistent storage first.
- Static external IP: unassign the IP address.

## Notes

- Source: https://docs.cloud.google.com/compute/docs/instances/deleting-instance (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Destructive: deleting instances (and `--delete-disks`) cannot be undone. Try it on a disposable instance first.
- Caution from the source: forcefully deleting a disk attached to an instance also deletes all its instant snapshots, which cannot be recovered. Create a standard snapshot from an instant snapshot before deleting.
- Caution from the source: if an instance in a managed instance group with an autoscaler is deleted, the MIG might create a replacement; resize the MIG or reconfigure its autoscaler to prevent that.
- Deleting multiple instances at once: Console, or gcloud for instances in the same zone.
- Pricing: see https://cloud.google.com/compute/vm-instance-pricing.
- The source also shows Console steps and C#, Go, Java, Node.js, PHP, Python and Ruby client-library samples; they are omitted here.

## Related

- [stop-start-instance.md](./stop-start-instance.md)
- Instance lifecycle: https://docs.cloud.google.com/compute/docs/instances/instance-lifecycle
- Limit VM runtime: https://docs.cloud.google.com/compute/docs/instances/limit-vm-runtime
