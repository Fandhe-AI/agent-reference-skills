---
source: https://docs.cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances
---

# Create managed instance groups

A managed instance group (MIG) treats a group of VMs as one entity; each VM is based on an instance template. This page is the entry point: the basic scenarios for creating a MIG, MIG limitations (general, regional, stateful, IPv6) and follow-up tasks. To create several VMs without grouping them, use the bulk instance API.

## Signature / Usage

### Create a zonal MIG

Snippet taken from https://docs.cloud.google.com/compute/docs/instance-groups/create-zonal-mig (the source page has no code):

```bash
gcloud compute instance-groups managed create INSTANCE_GROUP_NAME \
    --size SIZE \
    --template INSTANCE_TEMPLATE_URL \
    --zone ZONE
```

## Options / Props

### Basic scenarios

| Scenario | When to use |
|----------|-------------|
| Zonal MIG | VMs can be deployed to a single zone |
| Regional MIG | Distribute VMs across zones in a region to protect against zonal failure or to find zones with limited resources such as Spot VMs |
| Multiple machine types (instance flexibility) | App is compatible with several machine types; MIG picks one by real-time availability |
| From an existing VM | Scale out a VM into a group (single zone or multiple zones) |
| With autoscaling | Create / delete VMs as demand changes |
| Flex-start VMs | Workload runs no longer than seven days; obtain GPUs or TPUs at a discounted price |
| Spot VMs | Workload tolerates disruption; cost savings |
| GPU VMs all at once | Batch ML training or HPC needing a group of GPU VMs at once |
| Cluster Director custom cluster | MIGs with GPU, TPU or N2 VMs for AI / ML / HPC with automated VPC and RDMA networking, topology-aware placement, shared storage mounts |
| Stateful configuration | Disks that must retain data across autohealing, update or recreation |

### Limitations

| Scope | Limitation |
|-------|-----------|
| Zonal MIG | Default up to 1,000 VMs. More: increase the size limit, create a regional MIG (twice as many), create several MIGs, or contact support |
| Updates | Up to 1,000 VMs in a single update request |
| Networking | After creation you cannot change the MIG's networks or subnetworks; all VMs use the same subnetworks |
| Shared VPC | Interfaces other than `nic0` supported in gcloud CLI and API, not in the Google Cloud console |
| Regional MIG | Default up to 2,000 VMs; zones must be chosen at creation and can't be changed (use the target distribution shape); review the shape limitations for `BALANCED`, `ANY`, `ANY_SINGLE_ZONE` |
| Regional MIG + load balancing | `max-rate` target capacity not supported in `RATE` and `UTILIZATION` balancing modes |
| Stateful MIG | No autoscaling or scaling schedules (use external automation such as Cloud Scheduler triggering Cloud Run functions that call `stopInstances` / `startInstances`); automated rolling updates need replacement method `RECREATE`; stateful regional MIGs must disable proactive redistribution (redistribution type `NONE`); a property overridden in an all-instances configuration can't also be set in a per-instance configuration |

### IPv6

Use the dual-stack or IPv6-only setting when creating the instance template. Dual-stack: autohealing works but the health checking endpoint supports only IPv4. IPv6-only: health checking and autohealing, stateful IP addresses and target pools are not supported.

## Notes

- By default Compute Engine deletes or recreates persistent disks together with the corresponding VM, so don't rely on attached disks as persistent data; back up elsewhere (for example Cloud Storage) or configure stateful disks.
- Follow-up tasks (view info, resize, delete the group, change template, apply updates, recreate, canary test, add health check and load balancer) are linked from the source page; resize and delete operations are destructive, so try them on a disposable MIG first.
- VPC, subnet, Shared VPC and load balancing are VM-side settings here; the networks themselves are in `gcp-networking` and the load balancers in `gcp-load-balancing`.
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/create-zonal-mig (snippet; retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-zonal-mig.md](./create-zonal-mig.md)
- [regional-migs.md](./regional-migs.md)
- [instance-groups.md](./instance-groups.md)
- [instance-templates.md](./instance-templates.md)
- [stateful-migs.md](./stateful-migs.md)
- [updating-migs.md](./updating-migs.md)
- [working-with-managed-instances.md](./working-with-managed-instances.md)
