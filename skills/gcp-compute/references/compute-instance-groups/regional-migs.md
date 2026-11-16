---
source: https://docs.cloud.google.com/compute/docs/instance-groups/regional-migs
---

# Regional MIGs

A regional MIG spreads its VMs across multiple zones in a region, increasing resilience to zonal failure. A MIG confined to one zone is a zonal MIG. This page covers why to choose regional, zone selection, target distribution shape, proactive redistribution, autoscaling/update behavior and overprovisioning.

## Signature / Usage

### Recreate selected VMs in a regional MIG (REST)

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

### Target distribution shape

| Shape | Behavior | Recommended for |
|-------|----------|-----------------|
| `EVEN` (default) | Creates and deletes VMs to keep the same number in each selected zone; counts differ by at most 1 between any two zones | Highly available serving workloads |
| `BALANCED` | Prioritizes creating VMs in zones where resources are available, while distributing as evenly as possible | Highly available serving or batch workloads |
| `ANY` | Picks zones to fulfill the requested number within resource constraints and to maximize use of unused zonal reservations | Batch workloads that do not require high availability |
| `ANY_SINGLE_ZONE` | Creates all VMs in a single zone chosen by hardware support, resource and quota availability, and matching reservations | With a compact placement policy, for workloads needing extensive communication between VMs |

With `BALANCED`, `ANY` or `ANY_SINGLE_ZONE` you can select all zones in a region; the MIG checks resource availability and schedules instances only in zones that have the resources.

### Zone selection rules

| Situation | Rule |
|-----------|------|
| Default | Evenly across three zones |
| More than three zones | List every zone explicitly (otherwise three are selected) |
| Two or fewer zones | List the zones explicitly, even if the region has only two |
| Changing zones later | Not possible after creation (set the target distribution shape instead) |

### Size limits

| Limit | Value |
|-------|-------|
| Regional MIG default | 2,000 instances (twice a zonal MIG) |
| Regional MIG with raised size limit | Up to 4,000 instances |

### Recommended overprovisioning (assumes proactive redistribution is enabled)

| Number of zones | Additional VM instances | Recommended total VM instances |
|-----------------|-------------------------|--------------------------------|
| 2 | +100% | 200% |
| 3 | +50% | 150% |
| 4 | +33% | 133% |

Example: 20 needed instances across three zones, 30 total (10 per zone); across two zones, 40 total (20 per zone). A one-zone regional MIG is not recommended.

## Notes

- Snippet taken from https://docs.cloud.google.com/compute/docs/instance-groups/working-with-managed-instances (the source page has no code).
- Proactive redistribution (default) deletes and recreates VMs to re-establish an even spread after you delete or abandon instances; it happens immediately and might temporarily lose capacity, and you cannot choose which instances are deleted. Example: 12 instances in zones a, b, c; deleting 3 in c makes the group delete one in a and one in b and create 2 in c. You can turn it off, which is useful for deleting batch workers after completion, protecting stateful instances, or using `BALANCED` / `ANY_SINGLE_ZONE`. With it off, delete operations are destructive and uneven distribution can leave too little capacity during a zonal failure; try on a disposable group first.
- Autoscaling a regional MIG: the autoscaler distributes VMs according to the target distribution shape, creates VMs only in zones with enough quota and capacity (possibly uneven under `EVEN`), and falls back to a zone with capacity if creation fails.
- Zonal failure: remaining zones keep serving; no new instances are added and none redistributed unless autoscaling is set up.
- Recreating VMs deletes and recreates them (boot disk data is lost unless stateful); treat the snippet as destructive and try it on a disposable group first.
- Load balancing, VPC and firewall concepts are in the planned `gcp-networking`; Cloud Load Balancing itself is not covered here.
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/regional-migs (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-zonal-mig.md](./create-zonal-mig.md)
- [creating-groups-of-managed-instances.md](./creating-groups-of-managed-instances.md)
- [about-repair.md](./about-repair.md)
- [stateful-migs.md](./stateful-migs.md)
- Create a regional MIG: https://docs.cloud.google.com/compute/docs/instance-groups/distributing-instances-with-regional-instance-groups
- Target distribution shape: https://docs.cloud.google.com/compute/docs/instance-groups/regional-mig-distribution-shape
