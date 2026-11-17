---
source: https://docs.cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources
---

# Global, regional, and zonal resources

Every Compute Engine resource is global, regional or zonal in scope, and the scope determines which other resources can use it.

## Signature / Usage

### Aggregated list across zones or regions

By default a list request is scoped to one zone or region. To list across all zones or regions, query the aggregated list URI.

To list all compute instances across all zones created in a project, request the following URI:

Adapted (not in the official docs): the source writes the project placeholder as `<var>PROJECT_ID</var>` (HTML markup that would be taken literally); shown here as `PROJECT_ID`.

```text
https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/aggregated/instances
```

To list all IP addresses across all regions, request the following URI:

Adapted (not in the official docs): the source writes `<var>PROJECT_ID</var>>` with a stray `>`; shown here as `PROJECT_ID`.

```text
https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/aggregated/addresses
```

## Options / Props

| Scope | Accessibility | Naming uniqueness | Examples |
|-------|---------------|-------------------|----------|
| Global | Any region or zone in the project | Project-wide | Images, VPC networks, instance templates |
| Regional | Any zone within the same region | Region-wide | Subnets, regional static IPs, regional disks, instance templates |
| Zonal | Same zone only (zonal resources can also use regional and global ones) | Zone-wide | VM instances, zonal disks, Hyperdisk Storage Pools, machine types |

A zonal resource name must be unique within its zone: a VM `my-instance` can exist in both `us-central1-a` and `us-central1-b` in one project.

### Global resources

Global static external IP addresses (used by global load balancers), images, snapshots (Hyperdisk and Persistent Disk standard and archive snapshots; can create disks in other projects), global instance templates, Cloud Interconnect (connection is global, attachments regional), Cloud Interconnect locations (read-only), VPC networks (subnets are regional), firewalls, routes, global operations.

### Regional resources

Regional static external IP addresses, Cloud Interconnect attachments, subnets, placement policies, regional instance templates, regional managed instance groups (span multiple zones), regional disks (replicated between two zones; a regional disk can be force-attached to another instance in the region for failover, a zonal disk cannot), instant snapshots of regional disks, regional operations.

### Zonal resources

Instances, zonal Hyperdisks and Persistent Disks, Hyperdisk pools (disks in a pool must be in the pool's zone), instant snapshots of zonal disks, machine types, zonal managed instance groups, GPUs, Cloud TPUs, per-zone operations.

## Notes

- A global instance template that names zonal or regional resources can only be used in that zone or region. A regional instance template that names zonal resources can only be used in that zone.
- Custom images, disk snapshots and machine images are global but allow choosing a multi-region or region storage location for their data.
- Operations span all three scopes: a list-operations request returns operations across global, regional and zonal resources.
- Exception: instances in different zones can communicate if they belong to the same VPC network. VPC networks and firewall policies themselves are in `gcp-networking`, and load balancing in `gcp-load-balancing`.
- Adapted from the official docs: the source URIs contain the HTML markup `<var>PROJECT_ID</var>`, and the second one reads `PROJECT_ID>/aggregated/addresses` with a stray `>`; both were replaced with the plain placeholder `PROJECT_ID`.
- Source inconsistency: this page says "instances in one zone can communicate with instances in another zone if both instances belong to the same VPC network", while networking-overview.md (batch) says "Every network has implied firewall rules that block all incoming connections and allow all outgoing connections". Same-network membership does not by itself allow a connection; the network's VPC firewall rules still control it.
- Source (implied firewall rules): https://docs.cloud.google.com/batch/docs/networking-overview (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [regions-zones.md](./regions-zones.md)
- [resource-usage.md](./resource-usage.md)
- [instances.md](./instances.md)
