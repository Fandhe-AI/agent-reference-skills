---
source: https://docs.cloud.google.com/vpc/docs/private-services-access
---

# Private services access

Private services access lets you reach VPC-hosted services (services running on Compute Engine instances in a VPC network, run by Google or a third party) without exposing traffic to the public internet. It creates a private connection between your VPC network and the service producer's VPC network, established with VPC Network Peering. Instances reach the service by internal IPv4 addresses; external IP addresses are not required or used.

## Signature / Usage

### List allocated ranges used for private services access

```bash
gcloud compute addresses list --global --filter="purpose=VPC_PEERING"
```

## Options / Props

### Workflow

| Step | Who | Action |
|------|-----|--------|
| 1 | Consumer (or automated by the producer) | Allocate an IP range in your VPC network (reserved exclusively for the producer); create a private connection specifying the range; provision a service instance referencing the connection |
| 2 | Producer | Creates an isolated project and a dedicated VPC network for you; creates a subnet from your allocated range (typically a `/29` to `/24` CIDR block, which you can't select or modify); assigns the instance an IP from the subnet |
| 3 | Connection becomes active | VPC Network Peering is established; your network imports routes from the producer's network; VMs reach the instance by internal IP |

### Reachability of service instances

| Item | Details |
|---|---|
| Other VPC networks | Network Connectivity Center producer VPC spokes (for some services), or Shared VPC (create the allocated range and private connection in the host project). |
| On-premises (Cloud VPN / Cloud Interconnect) | by default on-premises hosts can't reach the producer network. Only subnet routes are exchanged. The producer network's default route (`0.0.0.0/0`) takes precedence, so an exported default route is ignored; define and export a custom route with a more specific destination. |

### Organization policy

| Mechanism | Effect |
|-----------|--------|
| `constraints/compute.restrictVpcPeering` | Restricts peering connections. Creating a private connection to a Google service fails unless `under:organizations/433637338589` is in `allowedValues` |
| Custom constraints on resource type `servicenetworking.googleapis.com/Connection` | Specify which VPC networks can connect and restrictions on allocated range names |

### Limitations

| Limitations |
|---|
| Behaves as VPC Network Peering: not transitive, so a private connection isn't available to peered VPC networks; peering limitations and quotas apply. |
| Only one consumer VPC network per managed service instance. |
| You can't change the IP range of an allocated range, but you can modify which allocated ranges are associated with a connection. |
| IPv6 address ranges are not supported. |

## Notes

- Supported Google services: AI Platform Training, AlloyDB for PostgreSQL, Apigee, Backup and DR Service, Cloud Build (private pools), Cloud Intrusion Detection System, Cloud SQL (doesn't support DNS peering), Cloud TPU, Converge Enterprise Cloud with IBM Power for Google Cloud, Filestore, Google Cloud Managed Lustre, Google Cloud NetApp Volumes, Google Cloud VMware Engine, Looker (Google Cloud core), Memorystore for Memcached, Memorystore for Redis, Vertex AI.
- Workflow: Later: additional resources go into existing subnets if space allows, otherwise a new subnet is created in that region from the allocated range. A producer subnet is deleted only when all service resources in it are deleted.
- Reachability of service instances: Only one consumer VPC network can create a private connection to a given managed service instance. To reach it from elsewhere:
- As a consumer you are solely responsible for securing your VPC networks and resources and data on them; Google isn't responsible for how a third party accesses or uses them.
- In the source example the allocated range is `10.240.0.0/16`, the producer subnet `10.240.0.0/24`, the Cloud SQL instance `10.240.0.2`; a second service in `europe-west1` gets a new subnet `10.240.10.0/24` and IP `10.240.10.2`.
- Producer-side documentation (Service Infrastructure) is informational only. Pricing is on the VPC pricing page (not copied).
- The source page has no code block. Snippet taken from https://docs.cloud.google.com/vpc/docs/configure-private-services-access (same category).
- The producer services' own docs (Cloud SQL, AlloyDB, Memorystore, ...) are in the `gcp-databases-relational` / `gcp-databases-nosql` skills.
- Source: https://docs.cloud.google.com/vpc/docs/private-services-access (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-private-services-access.md](./configure-private-services-access.md)
- [private-access-options.md](./private-access-options.md)
- [private-google-access.md](./private-google-access.md)
