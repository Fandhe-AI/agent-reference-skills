---
source: https://docs.cloud.google.com/compute/docs/instances/suspend-stop-reset-instances-overview
---

# Suspend, stop, or reset instances overview

Overview of the suspend, stop, and reset operations on a Compute Engine instance, used to save costs, perform maintenance, troubleshoot, or free up resources. You can repeat them throughout the instance lifecycle until the instance is deleted.

## Signature / Usage

The source page contains no code. The commands below are the matching gcloud operations.

Suspend an instance:

```bash
gcloud compute instances suspend test-instance
```

Stop an instance:

```bash
gcloud compute instances stop test-instance
```

Reset an instance:

```bash
gcloud compute instances reset test-instance
```

### When to use which

- Suspend: like closing a laptop lid. Save CPU and memory-running costs while still paying storage to keep state; bring the instance back quickly with OS and application state intact.
- Stop: like shutting down a laptop. Remove and reuse attached resources (internal IPs, Hyperdisk volumes), no need to preserve guest OS memory or application state, or change properties that need a stopped instance.
- Reset: like pressing a reset button. Not a graceful reboot; unsaved data can be lost. Use to re-initialize to boot state or recover a crashed, unresponsive guest OS.

## Options / Props

### Operation behavior

| Item | Detail |
|------|--------|
| Suspend signal | Compute Engine sends an ACPI G1 Sleeping signal to the guest OS and changes the instance state to `SUSPENDING`, then uses persistent storage to store the guest OS memory, the device state and the application state of the instance. |
| Stop signal | Compute Engine sends the ACPI G2 Soft Off signal to the guest OS and sets the state to `STOPPING`; after the guest OS has shut down it sends the ACPI G3 Mechanical Off signal. |
| Suspend duration limit | An instance stays `SUSPENDED` for up to 60 days, then becomes `TERMINATED` and loses preserved guest OS memory, device state and application state. |
| Suspend and IPs | Attached disks and static IPs remain; ephemeral IPs are released unless promoted to static. |
| Stop with graceful shutdown | Instance enters `PENDING_STOP` until graceful shutdown times out or you end it manually. |
| Guest OS shutdown time (Spot VMs / preemptible) | Maximum 30 seconds (same as the preemption process). |
| Guest OS shutdown time (other instance types) | Maximum 120 seconds. |
| Stop result | `TERMINATED` within a few seconds; retains attached disks, configuration, IP addresses, MAC addresses and metadata. |
| Delete result | Instance and all attached resources are deleted within a few seconds. |
| Reset | Compute Engine immediately restarts the instance without sending an ACPI shutdown signal to the guest OS, bypassing any shutdown procedure. Re-initializes to initial boot state; metadata and attached disks unchanged; state stays `RUNNING`; keeps ephemeral IPs, static external IPs, attached disks, machine type and Local SSD. |

### Comparison table

| Aspect | Suspend | Stop | Reset |
|--------|---------|------|-------|
| Billing | No CPU charges in `SUSPENDING`/`SUSPENDED`; attached resources still charged. | No CPU charges in `STOPPING`/`TERMINATED`; attached resources still charged. | Charged as a running instance. |
| Instance state | `SUSPENDED` | `TERMINATED` | `RUNNING` |
| Attached disks | Maintained, charged. | Maintained, charged. | Maintained, charged. |
| Memory and state | Preserved and restored on resume; storage of preserved data is charged. | Resets to power-on state; nothing saved. | Resets to power-on state; nothing saved. |
| GPUs | Not supported: an instance with a GPU can't be suspended. | GPUs don't stay attached in `TERMINATED`; not charged. | Standard GPU prices. |
| TPUs | Not supported: can't suspend. | Not supported: can't stop. | Standard TPU prices. |
| Local SSD | Choose to discard or preserve data; preserving is a Preview feature that migrates data to durable storage (charged until resume or delete). | Same choice and Preview condition; charged until restart or delete. | Maintained; reset can cause data loss or corrupt file systems. |
| Ephemeral external IP | Released; a new one is assigned on resume. | Released; a new one is assigned on restart. | Maintained. |
| Static external IP | Maintained. Reserved but unassigned addresses are charged at a higher rate. | Maintained; same higher rate if unassigned or assigned to a `TERMINATED` instance. | Maintained. |
| Internal IP / MAC | Maintained. | Maintained. | Maintained. |
| VM metadata | Maintained. | Maintained. | Maintained. |

### Pricing

- Suspended: no CPU charges after `SUSPENDING`; memory, attached disks and assigned static IPs keep being charged. Windows Server license fees stop, but other licenses might still be charged.
- Stopped: no CPU charges after `STOPPING`; disks and external IPs keep being charged until deleted.
- Reset: same rate as a running instance.

## Notes

- Warning kept from the source: reset only as a last resort when the guest OS has crashed and is unresponsive; it forces an abrupt shutdown that can cause data loss or file system corruption. To restart cleanly, reboot the instance instead.
- Caution kept from the source: a shutdown script still running at the end of the allowed guest OS shutdown period is forcefully stopped. To make sure the guest OS shuts down only after all shutdown scripts finish, stop the instance from the guest OS.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/suspend, https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/stop and https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/reset (gcloud 593.0.0 help); the overview page itself has no code. Reset is abrupt and can corrupt data; try it on a disposable instance first.
- Stop and delete share the same shutdown sequence; delete is destructive, so try operations on a disposable instance first.
- GPU and TPU constraints here are for Compute Engine instances; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- "Instance and all attached resources are deleted" is the default: deleting-instance.md (compute-instance-lifecycle) qualifies this: "By default, deleting a compute instance deletes the compute instance and its attached resources. However, when you delete a compute instance by using the gcloud CLI, you can specify to preserve the attached disks, regardless of their auto-delete settings." It also says "To preserve a boot or non-boot disk, set the auto-delete setting of the disk to `false`" and "If you preserve any resources that are attached to the compute instance, such as disks or external IP addresses, then you continue to pay for those resources until you delete them."
- Source inconsistency: the comparison table's TPUs row for stop says "Not supported. If a TPU is attached to an instance, then you can't stop the instance.", while stop-start-instance.md (compute-instance-lifecycle) says "You can't restart TPU compute instances. After you stop TPU compute instances, you can only delete them."
- Source (deleting instances): https://docs.cloud.google.com/compute/docs/instances/deleting-instance (retrieved 2026-11-17)
- Source (stop and start an instance): https://docs.cloud.google.com/compute/docs/instances/stop-start-instance (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/suspend-stop-reset-instances-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-lifecycle.md](./instance-lifecycle.md)
- [instances.md](./instances.md)
- [provisioning-models.md](./provisioning-models.md)
