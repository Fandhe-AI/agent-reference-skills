---
source: https://docs.cloud.google.com/memorystore/docs/valkey/networking
---

# Networking for Memorystore for Valkey

Memorystore for Valkey connects through Private Service Connect: service connectivity automation, enabled by a service connection policy (service class `gcp-memorystore`), or user-registered PSC connections (see Notes). This page covers prerequisites, Shared VPC, reserved addresses, supported architectures and FAQs.

## Signature / Usage

### Create the service connection policy (Network Admin)

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/instance-provisioning-vpc

```bash
gcloud network-connectivity service-connection-policies create POLICY_NAME \
  --network=default \
  --project=PROJECT_ID \
  --region=REGION \
  --service-class=gcp-memorystore \
  --subnets=https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/subnetworks/default
```

### Prerequisites before creating an instance

- A service connection policy must exist for your project, network, region and the `gcp-memorystore` service class.
- Enable the required APIs (listed in the "Before you begin" section of the create-instances page). The Network Connectivity and Service Consumer Management APIs are mandatory; without them instance creation operations fail.
- The Valkey Admin needs the full network name in the format `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID` from the Network Admin.

## Options / Props

| Item | Value |
|------|-------|
| Service class | `gcp-memorystore` |
| Policies per network + region + service class | only one |
| Connection limit estimate | instances planned in the region x 2 (for example 5 instances -> 10); omit if unknown; can be raised by updating the policy |
| Service instance scope | do not configure; custom scopes unsupported (leave defaults) |
| Valkey Admin role | `memorystore.admin` |
| Network Admin role | `compute.networkAdmin` |
| Client port | 6379 (requests topology) |
| Data node ports | 11000-13047; allow 6379 and all ports in this range in the firewall |
| Reserved addresses | discovery endpoint (client entry point) and internal backend (management/operations) |

### Supported architectures

- Same network, project and region client access.
- Same network and project, multi-region client access.
- Shared VPC client access (host project holds the policy, service projects create instances; PSC endpoints are forwarding rules in the service project).
- On-premises access via Cloud Interconnect and Cloud Router, connecting directly to the instance endpoint IP addresses.
- Multi-VPC: a separate pair of PSC endpoints per consumer VPC; use automatically registered connections or user-registered connections.

## Notes

- A service connection policy is optional when using user-registered PSC connections; the source recommends the policy because the process is more straightforward.
- Memorystore for Valkey supports only PSC endpoints deployed through a policy in the same project as the instance (automatic path); other projects need the multiple-VPC procedures.
- Managed Valkey / Redis / Memcached on Google Cloud; distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`). IAM basics are in `gcp-foundation`.
- Source inconsistency: the source's overview says Memorystore for Valkey "only" uses Private Service Connect service connectivity automation, while its FAQ says a service connection policy is optional when using user-registered PSC connections. Both paths are described here.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/networking (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-multiple-vpc-networking.md](./about-multiple-vpc-networking.md)
- [instance-provisioning-vpc.md](./instance-provisioning-vpc.md)
- [access-control.md](./access-control.md)
