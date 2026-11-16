---
source: https://docs.cloud.google.com/compute/docs/instances/instance-lifecycle
---

# Compute Engine instance lifecycle

An instance moves through states from creation to deletion. This page defines each state, the transitions between them, and which states are billed.

## Signature / Usage

The source page contains no code (it has a flowchart image); the states and transitions are described in the tables under Options / Props. To read the current state (`status`) of an instance, use `describe`:

```bash
gcloud compute instances describe test-instance \
    --format="yaml(name,status,disks)"
```

## Options / Props

### States

| State | Meaning |
|-------|---------|
| `PENDING` | Compute Engine tries to acquire resources until the wait time ends. Applies to: Flex-start VMs with a wait time (`requestValidForDuration`) of 90 seconds or longer; standalone TPU instances; Flex-start VMs or TPU instances in a MIG unless the MIG has creation retries disabled. On success (and sufficient quota) the state becomes `PROVISIONING`; otherwise an error occurs and Compute Engine deletes the instance. You can delete it earlier. |
| `PROVISIONING` | After create, restart or resume; resources are being allocated. Then `STAGING`. |
| `STAGING` | Preparing for first boot (still creating/configuring, or restart/resume). Not running yet. |
| `RUNNING` | Booting or running. Can go to `PENDING_STOP`, `STOPPING`, `SUSPENDING` or `REPAIRING`. |
| `PENDING_STOP` | Graceful shutdown in progress (only if graceful shutdown is enabled). Ends when you end it manually or it times out (tasks still running are forcefully stopped); then `STOPPING`. |
| `STOPPING` | Guest OS shutting down, after a stop/delete by you or a scheduled operation, or a host error. Stop ends in `TERMINATED`; delete permanently deletes the instance and all attached resources. Shutdown time after a host error can differ from the expected length. |
| `TERMINATED` | Stop completed. Stays until restarted or deleted. If a restart cannot allocate resources, the request fails and the instance stays `TERMINATED`; otherwise `PROVISIONING`. |
| `REPAIRING` | Repair after an internal error or an unavailable host server. The instance can't be used and the SLA doesn't cover it. On success it returns to its pre-repair state (`STAGING`, `RUNNING`, `SUSPENDING` or `STOPPING`). With `automaticRestart` enabled you can optionally stop the instance during repair to leave it `TERMINATED`. |
| `SUSPENDING` | Suspend in progress; only specific instances can be suspended. Then `SUSPENDED`. |
| `SUSPENDED` | Suspend completed; resume or delete. A failed resume (no resources) leaves it `SUSPENDED`. Up to 60 days, then `TERMINATED`. |

### Billing by state

| Charge | Billed in states |
|--------|------------------|
| CPU usage | `RUNNING`, `PENDING_STOP` |
| Memory usage | `RUNNING`, `PENDING_STOP`, `SUSPENDING`, `SUSPENDED` |
| Attached resources (disks, external IPs) | While the resources exist, whatever the instance state |

## Notes

- You control the lifecycle, but scheduled operations, provisioning models and host events can also trigger state changes.
- Deleting an instance is destructive (attached resources are deleted); try it on a disposable instance first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/describe (gcloud 593.0.0 help); the lifecycle page itself has no code.
- "Delete permanently deletes the instance and all attached resources" is the default: deleting-instance.md (compute-instance-lifecycle) qualifies this: "By default, deleting a compute instance deletes the compute instance and its attached resources. However, when you delete a compute instance by using the gcloud CLI, you can specify to preserve the attached disks, regardless of their auto-delete settings." It also says "To preserve a boot or non-boot disk, set the auto-delete setting of the disk to `false`" and "If you preserve any resources that are attached to the compute instance, such as disks or external IP addresses, then you continue to pay for those resources until you delete them."
- Source (deleting instances): https://docs.cloud.google.com/compute/docs/instances/deleting-instance (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/instance-lifecycle (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [suspend-stop-reset-instances-overview.md](./suspend-stop-reset-instances-overview.md)
- [provisioning-models.md](./provisioning-models.md)
- [instances.md](./instances.md)
