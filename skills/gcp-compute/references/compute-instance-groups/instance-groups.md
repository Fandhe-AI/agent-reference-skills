---
source: https://docs.cloud.google.com/compute/docs/instance-groups
---

# Instance groups

An instance group is a collection of VM instances managed as a single entity. Compute Engine offers managed instance groups (MIGs), which run identical VMs from an instance template with autoscaling, autohealing, regional deployment and automatic updating, and unmanaged instance groups, which load balance across a fleet of VMs that you manage yourself.

## Signature / Usage

### Create a zonal MIG from an instance template

```bash
gcloud compute instance-groups managed create INSTANCE_GROUP_NAME \
    --size SIZE \
    --template INSTANCE_TEMPLATE_URL \
    --zone ZONE
```

## Options / Props

### Managed vs unmanaged instance groups

| Aspect | Managed instance group (MIG) | Unmanaged instance group |
|--------|------------------------------|--------------------------|
| VMs | Identical VMs created from an instance template (plus optional stateful configuration) | Heterogeneous VMs that you add and remove arbitrarily |
| Autoscaling, autohealing, rolling updates, multi-zone, instance templates | Supported | Not supported |
| Typical use | Stateless serving, stateless batch / high-throughput compute, stateful apps (databases, legacy apps, checkpointed batch) | Load balancing across heterogeneous VMs, or VMs you manage yourself |
| Default size limit | 1,000 VMs (zonal MIG), 2,000 VMs (regional MIG) | Up to 2,000 VMs |
| More VMs | Increase the MIG size limit or contact support | Contact support |

### MIG capabilities

| Capability | Summary |
|------------|---------|
| Automatic repair | Recreates a VM that stops, crashes, is preempted (Spot VMs) or is deleted by an action not initiated by the MIG, with the same name and template |
| Autohealing | Application-based health check; MIG recreates VMs that become `UNHEALTHY` |
| Regional MIG | Spreads VMs across multiple zones in a region; protects against zonal failure |
| Autoscaling | Signals: CPU utilization, load balancing capacity, Cloud Monitoring metrics, schedules, or (zonal MIGs only) a queue-based workload such as Pub/Sub |
| Automatic updating | Rolling and canary (partial) updates; control speed, scope and disruption |
| Stateful MIGs | Preserve instance name, attached persistent disks and metadata on restart, recreation, autohealing and update |
| Resize requests | For MIGs with GPU VMs: create the requested VMs all at once when capacity becomes available, for a specified run duration |

### Health checks: load balancing vs autohealing

- Load balancing health checks direct traffic away from non-responsive instances; they do not cause Compute Engine to recreate instances.
- MIG (autohealing) health checks signal Compute Engine to delete and recreate instances that become `UNHEALTHY`.
- For most scenarios use separate health checks: load balancing checks can be aggressive, autohealing checks should be more conservative.

## Notes

- Snippet taken from https://docs.cloud.google.com/compute/docs/instance-groups/create-zonal-mig (the source page has no code).
- Network and subnet: a MIG must reference an existing instance template, which defines the VPC network and subnet. If the template omits a network, Google Cloud attempts to use the `default` network and its auto-created subnet in the template's region. For IPv6 VMs in a MIG, use the dual-stack or IPv6-only setting when you create the instance template.
- Preemptible VMs in a MIG: the source states preemptible instances last up to 24 hours and have 30 seconds to exit after preemption; autohealing brings them back when preemptible capacity returns. The same page's Benefits section refers to preemption of Spot VMs, so treat the preemptible VM model as the older one and prefer Spot VMs.
- Containers: specifying a container image in an instance template creates VMs with a container-optimized OS and Docker. The source links to the "Deploying containers on VMs and MIGs" page; that mechanism uses the container startup agent (konlet): the container startup agent deprecation page lists "July 21, 2025: Compute Engine container startup agent was deprecated." and "July 31, 2026: Compute Engine container startup agent shutdown.", so as of the retrieval date this mechanism is shut down. That page names as alternatives running Docker containers with a startup script or `cloud-init` on one of the "Container-optimized VM images", GKE, Cloud Run, or Batch.
- Load balancing: depending on the load balancer type, an instance group is added to a target pool or a backend service. VPC networks, firewall policies and Cloud Load Balancing themselves are in the planned `gcp-networking`; only the VM-side setting is here.
- There is no additional charge for instance groups; you pay for the resources used. See the Compute Engine pricing page (https://cloud.google.com/compute/all-pricing).
- Source (container startup agent shutdown): https://docs.cloud.google.com/compute/docs/deprecations/container-startup-agent-on-compute (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instance-groups (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-templates.md](./instance-templates.md)
- [creating-groups-of-managed-instances.md](./creating-groups-of-managed-instances.md)
- [create-zonal-mig.md](./create-zonal-mig.md)
- [regional-migs.md](./regional-migs.md)
- [about-repair.md](./about-repair.md)
- [stateful-migs.md](./stateful-migs.md)
- [updating-migs.md](./updating-migs.md)
