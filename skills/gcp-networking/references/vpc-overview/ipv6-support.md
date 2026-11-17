---
source: https://docs.cloud.google.com/vpc/docs/ipv6-support
---

# IPv6 support in Google Cloud

Summary of which Google Cloud compute, networking, load balancing, private access and application services support IPv6 (dual-stack or IPv6-only). IPv6 configurations can be restricted with the organization policy constraints described in [vpc.md](./vpc.md).

## Signature / Usage

Borrowed gcloud command for inspecting a subnet (the `ipv6AccessType` and `ipCollection` properties of an external IPv6 subnet appear in the described resource):

```bash
gcloud compute networks subnets describe subnet-1
```

## Options / Props

### Core compute and networking services

| Service | IPv6 | Stack types |
|---|---|---|
| Compute Engine instances (note 1) | Yes | Dual-stack, IPv6-only |
| Compute Engine instance templates | Yes | Dual-stack, IPv6-only |
| Managed instance groups (note 2) | Yes | Dual-stack, IPv6-only |
| Dynamic Network Interfaces (NICs) | Yes | Dual-stack, IPv6-only |
| GKE nodes and Pods | Yes | Dual-stack, IPv6-only |
| Cloud Run services and jobs (internal IPv6) | Yes | Dual-stack |
| Subnets | Yes | Dual-stack, IPv6-only |
| VPC Network Peering (note 3) | Yes | Dual-stack |
| Static IP address reservation | Yes | N/A |
| Static routes | Yes | N/A |
| Policy-based routes | Yes | N/A |
| Cloud Next Generation Firewall | Yes | N/A |
| Packet Mirroring | Yes | N/A |
| Cloud Router | Yes | N/A |
| Network Connectivity Center | Yes (VPC spokes can exchange only IPv4, IPv4 and IPv6, or only IPv6 subnet ranges) | N/A |
| Dedicated Interconnect VLAN attachments (note 3) | Yes | Dual-stack |
| Partner Interconnect VLAN attachments (note 3) | Yes | Dual-stack |
| HA VPN | Yes | Dual-stack, IPv6-only |
| Classic VPN | No | N/A |
| Cloud DNS (note 4) | Yes (IPv6 records; DNS64 synthesizes IPv6 addresses for IPv4 destinations; configure both DNS64 and NAT64 to reach IPv4 destinations) | N/A |
| Cloud NAT (note 5) | Yes (DNS64 + NAT64 let IPv6-only instances reach IPv4 destinations on the internet and in VPC or on-premises networks; Public NAT and Private NAT) | N/A |
| Global external Application Load Balancer | Yes | Dual-stack |
| Global external proxy Network Load Balancer | Yes | Dual-stack |
| Regional external Application Load Balancer | Yes | Dual-stack |
| Regional internal Application Load Balancer | Yes | Dual-stack |
| Cross-region internal Application Load Balancer | Yes | Dual-stack |
| Regional external proxy Network Load Balancer | Yes | Dual-stack |
| Regional internal proxy Network Load Balancer | Yes | Dual-stack |
| Cross-region internal proxy Network Load Balancer | Yes | Dual-stack |
| Classic Application Load Balancer | Yes (terminates IPv6 client connections; IPv6 backends not supported) | N/A |
| Classic proxy Network Load Balancer | Yes (terminates IPv6 client connections; IPv6 backends not supported) | N/A |
| Regional external passthrough Network Load Balancer | Yes (end-to-end) | Dual-stack, IPv6-only |
| Global external passthrough Network Load Balancer | Yes (end-to-end) | Dual-stack, IPv6-only |
| Internal passthrough Network Load Balancer | Yes (end-to-end) | Dual-stack, IPv6-only |
| Private Service Connect published services | Yes | N/A |
| Private Service Connect endpoints for published services | Yes | N/A |
| Private Service Connect interfaces | Yes | Dual-stack, IPv6-only |
| Private Service Connect backends | No | N/A |

### Access paths for IPv6 clients

| Service kind | Public IPv6 | Private IPv6 |
|---|---|---|
| Services on Google production infrastructure (`*.googleapis.com`) | Supported | Private Google Access; Private Service Connect endpoints for regional Google APIs configured with an IPv6 address. Private Service Connect endpoints for global Google APIs are IPv4-only and cannot serve IPv6 clients. |
| VPC-hosted services (for example Cloud SQL, Filestore) | Depends on option | IPv6 Private Service Connect endpoints for published services; private services access does not support IPv6 clients. |

## Notes

- Core compute and networking services: Footnotes from the source:
- Core compute and networking services: 1. IPv6-only instances support only Debian, Red Hat and Ubuntu operating systems and don't support Compute Engine Internal DNS. 2. See the limitations for MIGs with IPv6 instances in "Basic scenarios for creating MIGs". 3. VPC Network Peering and Cloud Interconnect VLAN attachments can only be dual-stack, not IPv6-only, but dual-stack ones are compatible with IPv6-only subnets and instances. 4. Cloud DNS doesn't support IPv6 for inbound forwarding. 5. For NAT64, Cloud NAT supports second generation or earlier VM instances and M3 VM instances.
- Application services (public IPv6 access / private IPv6 access): Yes / Yes: AlloyDB for PostgreSQL API, Bigtable, BigQuery, Dataflow, Managed Service for Apache Spark, Cloud Deploy, Firestore, Cloud Identity, Cloud Logging, Memorystore for Memcached API, Memorystore for Redis API, Cloud Monitoring, Pub/Sub, Spanner, Cloud SQL Admin API (MySQL, PostgreSQL, SQL Server), Cloud Storage, Cloud Tasks, Cloud Trace, Workflows, Container Registry / Artifact Registry, Secret Manager.
- Application services (public IPv6 access / private IPv6 access): No / No (VPC-hosted instances; the administrative API is reachable over IPv6 but the created instances are not): AlloyDB for PostgreSQL instances, Memorystore for Memcached instances, Memorystore for Redis instances, Cloud SQL for MySQL / PostgreSQL / SQL Server instances. Use private services access to reach them.
- The source has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/describe (gcloud 593.0.0 help); the Compute Engine `Subnetwork` resource has the `ipv6AccessType` and `ipCollection` fields.
- Per-service links (how-to pages) are omitted here; see the official page for them. Load balancer IPv6 details are in the `gcp-load-balancing` skill; Private Service Connect / private services access producer docs of Cloud SQL, AlloyDB and Memorystore are in `gcp-databases-relational` / `gcp-databases-nosql`.
- Source: https://docs.cloud.google.com/vpc/docs/ipv6-support (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [subnets.md](./subnets.md)
- [vpc.md](./vpc.md)
