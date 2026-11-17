---
source: https://docs.cloud.google.com/vpc/docs/private-google-access
---

# Private Google Access

VM instances that have only internal IP addresses (no external IP addresses) can use Private Google Access to reach the external IP addresses of Google APIs and services. The source IP of the packet can be the primary internal IP address of the network interface or an address in an alias IP range assigned to the interface. If you disable Private Google Access, those VMs can no longer reach Google APIs and services and can only send traffic within the VPC network.

## Signature / Usage

### Enable on a subnet

Private Google Access is a per-subnet setting.

```bash
gcloud compute networks subnets update SUBNET_NAME \
--region=REGION \
--enable-private-ip-google-access
```

## Options / Props

### Example (from the source diagram)

| VM | Result | Why |
|----|--------|-----|
| VM A1 | Can access Google APIs and services, including Cloud Storage | Internal IP only, in `subnet-a` where Private Google Access is enabled |
| VM B1 | Cannot access Google APIs and services | Internal IP only, `subnet-b` has Private Google Access disabled |
| VM A2, VM B2 | Can access Google APIs and services | They have external IP addresses; Private Google Access has no effect on them |

## Notes

- Private Google Access has no effect on instances that have external IP addresses; they can access the internet according to the internet access requirements and need no special configuration.
- It supports Google APIs and services hosted in Google's production infrastructure. It doesn't support regional and multi-regional endpoints (endpoints that end in `rep.googleapis.com`); use "Access regional Google APIs through endpoints" instead.
- Services hosted in VPC networks: for services published with the Service Networking API use private services access; for services published with Private Service Connect see "Access managed services".
- The source page has no code block. Snippet taken from https://docs.cloud.google.com/vpc/docs/configure-private-google-access (same category).
- Clarified from the official docs: when a Public NAT gateway serves a subnet range, Private Google Access is enabled automatically for that range and "cannot be disabled manually" as long as the gateway provides NAT for the range (Cloud NAT product interactions, https://docs.cloud.google.com/nat/docs/nat-product-interactions, retrieved 2026-11-17).
- Source: https://docs.cloud.google.com/vpc/docs/private-google-access (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-private-google-access.md](./configure-private-google-access.md)
- [private-access-options.md](./private-access-options.md)
- [private-services-access.md](./private-services-access.md)
