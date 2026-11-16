---
source: https://docs.cloud.google.com/compute/docs/instance-groups/about-repair
---

# About repairing VMs in a MIG

A managed instance group (MIG) keeps an application available by repairing (recreating) failed VMs automatically, and optionally by repairing unhealthy VMs through an application-based health check (autohealing).

## Signature / Usage

### Recreate selected VMs manually

Snippet taken from https://docs.cloud.google.com/compute/docs/instance-groups/working-with-managed-instances (the source has no code):

Adapted (not in the official docs): the optional `[--region REGION | --zone ZONE]` template bracket (a shell glob in zsh, and not runnable as written) was replaced by `--zone ZONE`; use `--region REGION` instead for a regional MIG.

```bash
gcloud compute instance-groups managed recreate-instances INSTANCE_GROUP_NAME \
    --instances INSTANCE_NAME_1,INSTANCE_NAME_2 \
    --zone ZONE
```

## Options / Props

### What triggers a repair

| Trigger | Repaired? |
|---------|-----------|
| Unexpected failure such as hardware failure | Yes |
| Spot VM preemption | Yes |
| Infrastructure maintenance event when the VM is not set to live migrate | Yes |
| Action performed directly on a VM (console VM instances page, `gcloud compute instances ...`, `instances` API), for example `instances.stop` / `gcloud compute instances stop` | Yes |
| MIG intentionally stops a VM (for example an autoscaler deleting a VM) | No |
| Application fails the application-based health check | Yes (autohealing) |

### Disk handling during repair

| Disk type | `autodelete` | Behavior during a repair |
|-----------|--------------|--------------------------|
| New persistent disk | `true` | Recreated as specified in the template; data written to the disk is lost |
| New persistent disk | `false` | Preserved and reattached when the MIG recreates the VM |
| Existing persistent disk | `true` | Old disk is deleted; the VM recreate operation fails because a deleted disk cannot be reattached. For existing read/write disks a MIG can have only up to one VM (a single persistent disk can't attach read/write to multiple VMs) |
| Existing persistent disk | `false` | Old disk is reattached; data preserved. Same one-VM limit for read/write disks |
| New local SSD | N/A | Recreated as specified in the template; local SSD data is lost on recreate or delete |

Disks not specified in the instance template or per-instance configurations (for example attached manually later) are not reattached.

### Autohealing policy

- Each MIG has an autohealing policy: a health check plus an initial delay.
- The initial delay is the time a new VM needs to initialize and run its startup script. The timer starts when the MIG sets the VM's `currentAction` to `VERIFYING`; unsuccessful health checks are ignored during it.
- The MIG never autoheals all VMs concurrently. Exception: a zonal MIG with one VM, or a regional MIG with one VM per zone, is autohealed when unhealthy.

## Notes

- Manage the MIG only through the instance groups console page, `instance-groups managed` gcloud commands and the zonal / regional instance group manager API resources so that configuration changes are not reverted.
- Update on repair: by default a repair recreates the VM from its original instance template (even if the MIG now uses another template in `OPPORTUNISTIC` mode). Enable update on repair to use the latest template and per-instance configurations. With instance flexibility, if the original machine type is unavailable during repair Compute Engine logs a `ZONE_RESOURCE_POOL_EXHAUSTED` stockout error in Cloud Logging.
- Repair in an alternate zone: a regional MIG can be configured to repair in any selected zone based on capacity and quota; the VM URL then changes because it contains the zone (for example `projects/example-project/zones/us-central1-b/instances/example-mig-0289gx`). Helps resilience and obtainability for GPUs, large VMs and Spot VMs.
- Turning off repairs: turns off failed-VM repair and health-check repair (health-check repair can also be turned off separately). The MIG keeps failed / unhealthy VMs and `targetSize` unchanged, except VMs that reach a configured run-time limit are deleted and `targetSize` decreases. With update type `proactive` and a new template, failed and unhealthy VMs are recreated from the new template; set `opportunistic` to avoid that. The health check keeps probing so you can monitor states. If the MIG backs a load balancer, unrepaired VMs fail the load balancer health check and traffic may shift.
- Pricing: with an application health check, a Cloud Logging entry is written on each health state change by default; disable the health state change logs to avoid costs.
- To preserve data: take persistent disk snapshots, export data (for example to Cloud Storage), configure stateful persistent disks, or use a custom image in the template.
- Recreating VMs deletes and recreates them and data on non-stateful disks is lost; try it on a disposable MIG first.
- Health check firewall rules and load balancing are in the planned `gcp-networking`; the VM-side settings are here.
- Adapted from the official docs: `[--region REGION | --zone ZONE]` in the recreate-instances command was changed to `--zone ZONE` (`--region REGION` for a regional MIG).
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/working-with-managed-instances (snippet; retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/about-repair (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-groups.md](./instance-groups.md)
- [regional-migs.md](./regional-migs.md)
- [working-with-managed-instances.md](./working-with-managed-instances.md)
- [stateful-migs.md](./stateful-migs.md)
- Autohealing setup: https://docs.cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs
- Update on repair: https://docs.cloud.google.com/compute/docs/instance-groups/update-on-repair
