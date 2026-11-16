---
source: https://docs.cloud.google.com/compute/docs/gpus/gpu-host-maintenance
---

# Handle GPU host maintenance events

Compute instances with attached GPUs cannot be live migrated, so Compute Engine must stop them for host maintenance. Set them to stop for host maintenance events, and optionally to automatically restart afterwards. Host maintenance events typically occur once every two weeks but might occasionally be more frequent; instances with GPUs can take up to one hour to terminate after failures or host errors.

## Signature / Usage

### Receive advance notice

Monitor the `/computeMetadata/v1/instance/maintenance-event` metadata value from within the instance. `NONE` means the instance is not scheduled to stop.

```bash
curl http://metadata.google.internal/computeMetadata/v1/instance/maintenance-event -H "Metadata-Flavor: Google"
```

Output:

```text
NONE
```

## Options / Props

| Item | Detail |
|---|---|
| `maintenance-event` = `NONE` | Instance is not scheduled to stop |
| `maintenance-event` = `TERMINATE_ON_HOST_MAINTENANCE` | Instance is scheduled for stopping; for instances with GPUs the notice comes 1 hour before the stop |
| `upcoming-maintenance` attribute | For some GPU machine series such as A3, notice more than an hour in advance |
| Scheduling | Instances with GPUs must be set to stop for host maintenance; they can be set to auto-restart |

### Migrate temporary data off Local SSD

Local SSD data is unrecoverable whenever Compute Engine stops the instance for host maintenance. Options:

- Move work in progress to a Cloud Storage bucket and retrieve it after the restart.
- Write data to a secondary Persistent Disk; it can be reattached after the automatic restart.

## Notes

- Warning kept from the source: data on any Local SSD disks attached to an instance with GPUs is unrecoverable whenever Compute Engine stops it for host maintenance.
- The metadata server is reached over plain HTTP at `metadata.google.internal` from inside the VM; the `Metadata-Flavor: Google` header is required.
- For A4X, A4 and A3 Ultra scheduled maintenance, see "Manage host events across compute instances" in the AI Hypercomputer docs: https://docs.cloud.google.com/ai-hypercomputer/docs/manage/host-events
- Monitor and plan: https://docs.cloud.google.com/compute/docs/instances/monitor-plan-host-maintenance-event
- GPU / TPU pages in this category cover Compute Engine VMs; GPUs on GKE nodes are in `gcp-gke`.
- Source inconsistency: this page says "For compute instances that have attached GPUs, Compute Engine provides this notice 1 hour before the compute instance stops" and "Host maintenance events typically occur once every two weeks", while live-migration-process.md says "For most GPUs, Compute Engine provides a 60-minute notice" and "For A4X, A4, or A3 Ultra instances, Compute Engine provides a 10-minute notice", and the N1 with attached GPU maintenance table in gpus.md gives "7 days" advance notification and a typical frequency of "Minimum of 15 days" or "Minimum of 30 days".
- Source (Live migration process during maintenance events, cited above as `live-migration-process.md`): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source (GPU platforms, cited above as `gpus.md`): https://docs.cloud.google.com/compute/docs/gpus (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/gpus/gpu-host-maintenance (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-gpus.md](./about-gpus.md)
- [gpus.md](./gpus.md)
- [install-drivers-gpu.md](./install-drivers-gpu.md)
