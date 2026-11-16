---
source: https://docs.cloud.google.com/compute/docs/instances/about-vm-tenancy
---

# About VM tenancy

The tenancy of a VM indicates whether it shares its Compute Engine server with VMs from other Google Cloud projects. A VM that shares a server with VMs from other projects is multi-tenant; a VM that does not is sole-tenant. VMs are multi-tenant by default. Sole-tenancy gives exclusive access to a sole-tenant node, a Compute Engine server dedicated to hosting VMs from only your Google Cloud projects.

## Signature / Usage

The page has no code. A sole-tenant VM starts from a node template (a node type is required); this gcloud help example creates one:

```bash
gcloud compute sole-tenancy node-templates create \
    my-node-template --node-type=n1-node-96-624
```

## Options / Props

| Aspect | Multi-tenant VM | Sole-tenant VM |
|---|---|---|
| Server sharing | Server shared with other projects' VMs | Server dedicated to your projects' VMs (unless you share the node group) |
| Pricing basis | The VM's machine family | All hardware resources of the server, by the node type chosen in the node template, plus a premium for reserving the whole server |
| Maintenance event | Compute Engine live migrates VMs to another server in the same zone. Caveat (from live-migration-process.md, quoted in Notes): "Compute Engine only performs a live migration of VMs that have the host maintenance policy set to migrate" | Per the maintenance policy configured on the sole-tenant node group |

### Workloads that suggest sole-tenant nodes

- Gaming workloads with specific computing performance requirements.
- Finance or healthcare workloads with security and compliance requirements.
- Windows workloads with licensing requirements.
- Machine learning, data processing, or image rendering workloads (consider reserving GPUs).
- Workloads needing higher IOPS and lower latency, or using temporary storage such as caches and processing space (consider reserving Local SSDs).

## Notes

- For typical workloads create multi-tenant VMs; consider sole-tenant nodes only for the characteristics above.
- Prices are not copied: see the Compute Engine VM pricing (https://cloud.google.com/compute/vm-instance-pricing) and sole-tenant node pricing (https://cloud.google.com/compute/sole-tenant-pricing) pages.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-templates/create (gcloud 593.0.0 help, EXAMPLES); the twin contains no code block.
- Source inconsistency: this page says "For maintenance events on multi-tenant servers, Compute Engine live migrates VMs to another server in the same zone", while live-migration-process.md says "Compute Engine only performs a live migration of VMs that have the host maintenance policy set to migrate" and "Live migration is not supported for the following VM types:" (for example VMs with GPUs attached and most Confidential VM instances); host-maintenance-overview.md says "By default, most instances are set to live migrate during host events" and "Instances created using certain machine types or configurations don't support live migration". A multi-tenant VM live migrates only when its host maintenance policy is `MIGRATE` and its type supports live migration; see setting-vm-host-options.md.
- Source (Live migration process, cited above as `live-migration-process.md`): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source (Host events overview, cited above as `host-maintenance-overview.md`): https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17)
- Source (Set VM host maintenance policy, cited above as `setting-vm-host-options.md`): https://docs.cloud.google.com/compute/docs/instances/setting-vm-host-options (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/about-vm-tenancy (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [sole-tenant-nodes.md](./sole-tenant-nodes.md)
- [live-migration-process.md](./live-migration-process.md)
- [host-maintenance-overview.md](./host-maintenance-overview.md)
