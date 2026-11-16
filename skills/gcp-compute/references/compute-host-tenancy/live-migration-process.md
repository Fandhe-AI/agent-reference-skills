---
source: https://docs.cloud.google.com/compute/docs/instances/live-migration-process
---

# Live migration process during maintenance events

During planned maintenance of the underlying hardware of a VM or bare metal instance, Compute Engine performs a live migration of the instance to another host server in the same zone. Live migration lets Google Cloud perform maintenance without interrupting the workload, rebooting the instance, or modifying properties such as IP addresses, metadata, block storage data, application state, or network settings. Only VMs whose host maintenance policy is set to migrate are live migrated.

## Signature / Usage

### Operation type reported for a live migration

When Compute Engine live migrates an instance it reports a system event in the zone operations list and the System Events logs, with this operation type (taken from the host maintenance overview page, see Notes):

```text
compute.instances.migrateOnHostMaintenance
```

## Options / Props

### When live migration keeps instances running

| Situation | Detail |
|---|---|
| Infrastructure maintenance | Host hardware, network and power grids in data centers, host OS and BIOS. |
| Security-related updates and system configuration changes | For example installing security patches and changing the size of the host root partition. |
| Hardware failures | Memory, CPU, NIC and disk failures. If detected before a complete server failure, a preventative live migration is performed. If the hardware fails completely or prevents live migration, the instance terminates and restarts automatically. |

### Limitations (live migration is not supported for)

| VM type | Behavior |
|---|---|
| H4D instances with Local SSD | Not supported. |
| Instances with a Cloud RDMA network interface | Not supported. |
| Bare metal instances (bare metal machine types) | Maintenance behavior is `TERMINATE` and `RESTART`. |
| Most Confidential VM instances | Supported only on N2D and C3D machine types running AMD SEV. All others must stop (and optionally restart) during a host maintenance event. |
| VMs with GPUs attached | Must be set to stop and optionally restart. Notice: 60 minutes for most GPUs; 10 minutes for A4X, A4, or A3 Ultra instances. |
| Cloud TPUs | Not supported. |
| Z4D or Z4M VMs with more than 42,000 GiB of attached Titanium SSD | Maintenance behavior `TERMINATE` and `RESTART`; Titanium SSD data is preserved. |
| Z4M VMs with a Cloud RDMA network interface | Same as above. |
| Z3 VMs with more than 18,000 GiB of attached Titanium SSD | Same as above. |
| H4D VMs (compute-optimized) | Not supported because live migration is not supported for RDMA-enabled VMs; maintenance behavior `TERMINATE` and `RESTART`; Titanium SSD data is preserved. |

### Migration stages

| Stage | What happens |
|---|---|
| Source brownout | VM still runs on the source host while most state (all guest memory, tracking changed pages) is copied to the target. Duration depends on guest memory size and page change rate. |
| Blackout | Very brief moment when the VM runs nowhere; the source VM is paused and remaining state is sent. The system clock appears to jump forward up to 5 seconds; if blackout exceeds 5 seconds, the clock is stopped and synchronized by a daemon in the VM guest packages. |
| Target brownout | VM runs on the target host; the source VM may forward packets until the network fabric catches up. Then the source VM is deleted. |

## Notes

- Compute Engine can live migrate instances with Local SSD disks attached (excluding Z3 instances with more than 18,000 GiB of attached Titanium SSD), moving the Local SSD data to the new host in advance of planned maintenance. Instances with a large amount of Local SSD data can experience a longer period of performance degradation.
- The Local SSD sentence above names only the Z3 exception; the limitations table on this page narrows it further: live migration is also not supported for "H4D instances with Local SSD", VMs with GPUs attached, Cloud TPUs, and "Z4D or Z4M VMs with more than 42,000 GiB of attached Titanium SSD".
- Minimum disruption during live migration is typically much less than 1 second; VMs might see a short decrease in disk, CPU, memory and network performance. Compute Engine provides a notification before migration so workloads can prepare.
- Live migration can be confirmed in the Cloud Logging logs for the VM.
- Sole-tenant VMs can also be moved manually between nodes or node groups (including from a multi-tenant host into a sole-tenant node) by manually initiating a live migration: https://docs.cloud.google.com/compute/docs/nodes/about-manual-live-migration
- Snippet taken from https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17); the source page for this entry contains no code block.
- GPU pages: Compute Engine VMs only; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- Confidential VM pages: Confidential VM on Google Cloud, not Apple Private Cloud Compute (`apple-intelligence`).
- Source inconsistency: live-migration-process.md says "Live migration for Confidential VM instances is supported on N2D and C3D machine types running AMD SEV", supported-configurations.md says "Live migration is supported on N2D and C3D machine types running AMD SEV" and confidential-vm-overview.md says "AMD SEV machines that use the N2D and C3D machine types support live migration", while host-maintenance-overview.md lists "Confidential VM instances except for N2D machine types with AMD EPYC Milan CPU platforms running AMD SEV" among instances that terminate, the C3D maintenance table in general-purpose-c3-series.md gives "C3D with Confidential VM" the behavior "Terminate", and deploy-workloads.md (Confidential Space) and the REST text of create-a-confidential-vm-instance.md say "For N2D machine types that use SEV, set this to `MIGRATE`". Only N2D with AMD SEV is documented as live migrating on every page.
- Source (Confidential VM supported configurations, cited above as `supported-configurations.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations (retrieved 2026-11-17)
- Source (Confidential VM overview, cited above as `confidential-vm-overview.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/confidential-vm-overview (retrieved 2026-11-17)
- Source (General-purpose machine family: C3D and C3 series, cited above as `general-purpose-c3-series.md`): https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17)
- Source (Deploy Confidential Space workloads, cited above as `deploy-workloads.md`): https://docs.cloud.google.com/confidential-computing/confidential-space/docs/deploy-workloads (retrieved 2026-11-17)
- Source (Create a Confidential VM instance, cited above as `create-a-confidential-vm-instance.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance (retrieved 2026-11-17)
- Source inconsistency: about-vm-tenancy.md says "For maintenance events on multi-tenant servers, Compute Engine live migrates VMs to another server in the same zone", with no condition, while this page says "Compute Engine only performs a live migration of VMs that have the host maintenance policy set to migrate" and lists VM types for which "Live migration is not supported". host-maintenance-overview.md likewise says "Instances created using certain machine types or configurations don't support live migration", so follow the conditions on this page; the policy is set as in setting-vm-host-options.md.
- Source (About VM tenancy, cited above as `about-vm-tenancy.md`): https://docs.cloud.google.com/compute/docs/instances/about-vm-tenancy (retrieved 2026-11-17)
- Source (Host events overview, cited above as `host-maintenance-overview.md`): https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17)
- Source (Set VM host maintenance policy, cited above as `setting-vm-host-options.md`): https://docs.cloud.google.com/compute/docs/instances/setting-vm-host-options (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [host-maintenance-overview.md](./host-maintenance-overview.md)
- [setting-vm-host-options.md](./setting-vm-host-options.md)
- [sole-tenant-nodes.md](./sole-tenant-nodes.md)
