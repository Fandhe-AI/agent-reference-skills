---
source: https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview
---

# About host events

During the life of a VM or bare metal instance its host machine can experience host events: regular maintenance of Compute Engine infrastructure or, rarely, a host error. The host maintenance policy controls how an instance responds. By default most instances live migrate during host events; for all machine series except Z3 you can override this and set instances to terminate and optionally restart.

## Signature / Usage

### Operation types reported for host events

Each host-event response is published to the zone operations list and System Events logs (view with the Compute Engine operations page for a zone).

Live migration:

```text
compute.instances.migrateOnHostMaintenance
```

Terminate (soft power-off signal, 60 seconds to shut down cleanly, then status `TERMINATED`; forced termination if not clean):

```text
compute.instances.terminateOnHostMaintenance
```

Automatic restart:

```text
compute.instances.automaticRestart
```

## Options / Props

### Types of host events

| Event | Description |
|---|---|
| Maintenance event | Compute Engine must move VMs off the host. With live migration enabled on a supported type, minimal disruption. Lightweight hypervisor and network upgrades are applied in the background without moving the instance. Sole-tenant VMs: planned host maintenance roughly every 4 to 6 weeks; live migration support depends on the node group's host maintenance policy. |
| Emergent maintenance | Impending host failure or urgent hardware issue. Typically 7 to 14 days advance notice, shorter if severe. Compute Engine starts the maintenance automatically when the notification window ends if no action is taken. It replaces a pending planned maintenance event. The reason is in the `maintenanceReasons` field of the instance metadata. |
| Host error (`compute.instances.hostError`) | Hardware/software issue on the physical machine or data center infrastructure crashed the instance. With automatic restart (default) the instance restarts typically within 3 minutes of detection, up to 5.5 minutes depending on the issue. Unplanned maintenance on that host is scheduled with typically a few hours of advance notice. |

### Host maintenance policy settings

| Setting | Meaning |
|---|---|
| Maintenance behavior | Live migrate or stop on a maintenance event. |
| Restart behavior | Restart or terminate if the instance crashes, has a host error, or becomes unresponsive. |
| Host error detection time | Maximum time to wait before restarting/terminating an unresponsive instance. |
| Local SSD recovery time | Maximum time in the `REPAIRING` state recovering Local SSD data; data is lost if it elapses without recovery. |

### Instances that terminate during host events

| Instance | Behavior |
|---|---|
| Z3 with more than 18,000 GiB Titanium SSD; Z4D or Z4M with more than 42,000 GiB Titanium SSD; Z4M with a Cloud RDMA network interface; X5; X4; H4D | Terminate and restart in place. |
| Bare metal instances | Terminate and restart; might restart on a different host. See "Maintenance experience" on the machine series page (for example, C3 bare metal: https://docs.cloud.google.com/compute/docs/general-purpose-machines#c3_maintenance). |
| Confidential VM instances | Except N2D machine types with AMD EPYC Milan CPU platforms running AMD SEV. |
| Instances with GPUs; instances with TPUs | Terminate (see GPU host maintenance, https://docs.cloud.google.com/compute/docs/gpus/gpu-host-maintenance, and Cloud TPU maintenance, https://docs.cloud.google.com/tpu/docs/prepare-for-maintenance). |

### Local SSD persistence after termination

Persistent Disk and Hyperdisk are network-attached and are reattached on restart; their data persists. Local SSD data is preserved when possible but not guaranteed.

| Preserved | Not preserved |
|---|---|
| Guest OS reboot; live migration host maintenance; host error and reconnect within the timeout; you opt to preserve Local SSD data on stop/suspend ([Preview](https://cloud.google.com/products/#product-launch-stages)); termination-only instance with Local SSD that restarts in place. | Guest OS shutdown that forces the instance to stop; Spot VM / preemptible VM preemption; instance configured to stop (not live migrate) on host maintenance; misconfigured Local SSD; project billing disabled; `automaticRestart` not configured; host error with no reconnect before the timeout (blank Local SSD is attached and must be formatted and mounted). |

### Local SSD recovery timeout (`localSsdRecoveryTimeout`)

| Item | Value |
|---|---|
| Default | 1 hour |
| Z4D, Z4M and Z3 VM machine types | 6 hours |
| Z4M bare metal and Z3 bare metal | 168 hours (7 days) |
| Valid range | 0 to 168, in increments of 1 hour |
| `0` | No recovery attempt; instance restarts as soon as possible, data unrecoverable |
| Entered `REPAIRING` when | A host error occurs; or scheduled maintenance on an instance that supports Local SSD persistence after termination with `onHostMaintenance=TERMINATE` and `automaticRestart=true` |

### Stop Local SSD disk recovery

Interrupt the recovery with `gcloud compute instances stop` and `--discard-local-ssd=True`. This stops the recovery, stops the instance and discards the Local SSD data; you can then restart the instance. For Titanium instances this is the only supported option (Local SSD data cannot be preserved on suspend with Titanium SSD).

```bash
gcloud compute instances stop test-instance \
    --discard-local-ssd=True
```

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/stop (gcloud 593.0.0 help, EXAMPLES: "To stop an instance named test-instance that has a Local SSD"); the twin names the flag but shows no command block. `--discard-local-ssd` without a value defaults to True.
- Destructive: `--discard-local-ssd=True` discards Local SSD data. Try it on a disposable instance first.
- Instances that do not support live migration must be configured to terminate, otherwise errors occur (see setting-vm-host-options.md).
- Hardware-related emergent maintenance: the instance cannot restart on the same host; back up Local SSD data and the instance configuration before starting the maintenance.
- Setting the Local SSD recovery timeout to less than four hours risks data loss during scheduled maintenance.
- Time spent recovering Local SSD data does not count toward SLA downtime; the Compute Engine SLA does not cover the instance while it is in recovery. You are not charged for the instance while it is in `REPAIRING`.
- Automatic restart does not apply when the instance goes offline due to a zonal outage or a manual operation such as `sudo shutdown` in the guest OS. By default Local SSD recovery is tried for one hour, after which Compute Engine tries a different host in the same zone; Z4D, Z4M, Z3, X4 and H4D restart on the same host.
- Maintenance scheduling: on certain machine families you can get notifications of upcoming maintenance (Cloud Logging, metadata server, `compute instances describe`, REST `instances.describe`) and start scheduled maintenance at a time of your choosing; otherwise it happens at the end of the notification period.
- Maintenance behavior per machine type is on each machine family page (C2/C2D and H: compute-optimized; C4N: network-optimized; other C, E, N, T: general-purpose; M and X: memory-optimized; Z: storage-optimized). GPUs: handle GPU host maintenance events; TPUs: Cloud TPU "Prepare for maintenance events".
- The source also notes managed services (App Engine) and design guidance (robust systems, MIGs) for tolerating host errors; App Engine is in `gcp-run`.
- Source inconsistency: this page says "For all machine series except Z3, you can override this behavior and explicitly set the instances to terminate and optionally restart", while setting-vm-host-options.md says Terminate is "the only supported setting for H4D instances, Z3 instances with more than 18,000 GiB of attached Titanium SSD, Z4D and Z4M instances with more than 42,000 GiB of attached Titanium SSD, instances that have a Cloud RDMA network interface, bare metal instances, and instances with GPUs or TPUs attached".
- Source inconsistency: live-migration-process.md says "Live migration for Confidential VM instances is supported on N2D and C3D machine types running AMD SEV", supported-configurations.md says "Live migration is supported on N2D and C3D machine types running AMD SEV" and confidential-vm-overview.md says "AMD SEV machines that use the N2D and C3D machine types support live migration", while host-maintenance-overview.md lists "Confidential VM instances except for N2D machine types with AMD EPYC Milan CPU platforms running AMD SEV" among instances that terminate, the C3D maintenance table in general-purpose-c3-series.md gives "C3D with Confidential VM" the behavior "Terminate", and deploy-workloads.md (Confidential Space) and the REST text of create-a-confidential-vm-instance.md say "For N2D machine types that use SEV, set this to `MIGRATE`". Only N2D with AMD SEV is documented as live migrating on every page.
- Source (Live migration process during maintenance events, cited above as `live-migration-process.md`): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source (Confidential VM supported configurations, cited above as `supported-configurations.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations (retrieved 2026-11-17)
- Source (Confidential VM overview, cited above as `confidential-vm-overview.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/confidential-vm-overview (retrieved 2026-11-17)
- Source (General-purpose machine family: C3D and C3 series, cited above as `general-purpose-c3-series.md`): https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17)
- Source (Deploy Confidential Space workloads, cited above as `deploy-workloads.md`): https://docs.cloud.google.com/confidential-computing/confidential-space/docs/deploy-workloads (retrieved 2026-11-17)
- Source (Create a Confidential VM instance, cited above as `create-a-confidential-vm-instance.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance (retrieved 2026-11-17)
- Source (Set VM host maintenance policy, cited above as `setting-vm-host-options.md`): https://docs.cloud.google.com/compute/docs/instances/setting-vm-host-options (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [live-migration-process.md](./live-migration-process.md)
- [setting-vm-host-options.md](./setting-vm-host-options.md)
- [about-vm-tenancy.md](./about-vm-tenancy.md)
- [sole-tenant-nodes.md](./sole-tenant-nodes.md)
