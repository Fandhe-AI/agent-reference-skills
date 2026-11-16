---
source: https://docs.cloud.google.com/compute/docs/instance-groups/working-with-managed-instances
---

# Working with managed instances

A managed instance is a data entity in a MIG holding the current status and intended state of an actual VM. Use the MIG's own methods (instance group manager API, `instance-groups managed` commands) to add, delete, update or recreate VMs; changes made through the plain instances API can be reverted by the MIG at any time.

## Signature / Usage

### Recreate selected instances (gcloud)

Adapted (not in the official docs): the optional `[--region REGION | --zone ZONE]` template bracket (a shell glob in zsh, and not runnable as written) was replaced by `--zone ZONE`; use `--region REGION` instead for a regional MIG.

```bash
gcloud compute instance-groups managed recreate-instances INSTANCE_GROUP_NAME \
    --instances INSTANCE_NAME_1,INSTANCE_NAME_2 \
    --zone ZONE
```

### Recreate selected instances (REST)

Use `regionInstanceGroupManagers.recreateInstances`, or `instanceGroupManagers.recreateInstances` for a zonal MIG.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/instanceGroupManagers/INSTANCE_GROUP_NAME/recreateInstances

{
 "instances": [
  "zones/ZONE/instances/INSTANCE_NAME_1",
  "zones/ZONE/instances/INSTANCE_NAME_2"
 ]
}
```

## Options / Props

### Managed instance fields

| Group | Fields |
|-------|--------|
| Current status | Instance lifecycle status (for example `RUNNING`, `STOPPING`); current action (for example `RESTARTING`, `VERIFYING`, `NONE`); health state (for example `HEALTHY`, `UNHEALTHY`) |
| Intended state | Intended version (version name and instance template); preserved state (disks, metadata, and so on) |

### Ways to add instances

- Manually set the MIG size (when not autoscaled).
- Resize requests: create GPU VMs all at once; avoids charges for partial capacity; uses the flex-start or reservation-bound provisioning models.
- Autoscaling (stateless apps).
- Add instances with specific names (names persist across recreation): create a resize request for all-at-once GPU instances, or create instances with specific names as resources become available.

### Instance deletion priority on scale-in

The MIG prioritizes instances using these factors together, then selects among the priority instances nondeterministically:

| Factor | Meaning |
|--------|---------|
| Instance status | Not running (for example terminated or suspended) |
| Disruptive changes | Undergoing or scheduled for create, delete, refresh, recreate or replace |
| Instance configuration version | Not yet on the latest intended template |
| Target distribution shape | Regional MIGs: instances that help keep the intended distribution across zones |
| Autoscaling signal | Autoscaled MIGs: instances with the lowest signal (for example lowest CPU utilization) |

### Required permission (recreate)

| Permission | Resource |
|------------|----------|
| `compute.instanceGroupManagers.update` | The managed instance group |

## Notes

- Operations on MIG instances return `DONE` once the group has scheduled the actions, not when the VMs are actually created, deleted or updated; verify the status of the group or of the managed instances.
- Deleting managed instances reduces `targetSize` and deletes the VMs. In a stateful MIG the instances' preserved state configurations are deleted too, and instances are removed from any target pools. With connection draining enabled on the backend service, removal can take up to an additional 60 seconds after the draining period. Destructive; try on a disposable MIG first.
- Recreating VMs is destructive for non-stateful disks (boot disk recreated from the template); it preserves the instance name, but the creation timestamp might not change. Check the boot disk creation timestamp to confirm recreation. To recreate every VM, start a rolling update instead. Try on a disposable MIG first.
- Recreating can take significant time depending on how many instances; the new VMs start as soon as the system can provision them.
- The source shows only gcloud and REST for recreate; viewing instance info and stateful configuration are separate pages.
- Backend services, target pools and connection draining belong to load balancing, covered by the planned `gcp-networking`.
- Adapted from the official docs: `[--region REGION | --zone ZONE]` in the recreate-instances command was changed to `--zone ZONE` (`--region REGION` for a regional MIG).
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/working-with-managed-instances (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [updating-migs.md](./updating-migs.md)
- [stateful-migs.md](./stateful-migs.md)
- [about-repair.md](./about-repair.md)
- [regional-migs.md](./regional-migs.md)
- Add and remove VMs in a MIG: https://docs.cloud.google.com/compute/docs/instance-groups/add-remove-vms-in-mig
- Info about MIGs: https://docs.cloud.google.com/compute/docs/instance-groups/getting-info-about-migs
