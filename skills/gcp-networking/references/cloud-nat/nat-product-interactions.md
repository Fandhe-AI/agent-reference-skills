---
source: https://docs.cloud.google.com/nat/docs/nat-product-interactions
---

# Cloud NAT product interactions

How Cloud NAT interacts with routes, Private Google Access, Shared VPC, VPC Network Peering, GKE, Cloud Run Direct VPC egress, Connectivity Tests, Cloud Load Balancing, Private Service Connect propagated connections, and Hybrid Subnets.

## Signature / Usage

### Restrict a gateway to named subnet ranges (gcloud help example)

Snippet taken from the `gcloud compute routers nats create` help EXAMPLES (see Notes). `--nat-custom-subnet-ip-ranges` is the flag the Cloud Run Direct VPC egress and Private Service Connect rows below refer to; for Cloud Run, list the Cloud Run subnet names and add `--endpoint-types=ENDPOINT_TYPE_VM` as described in the table.

```bash
gcloud compute routers nats create nat1 --router=my-router \
    --auto-allocate-nat-external-ips \
    --nat-custom-subnet-ip-ranges=subnet-1,\
subnet-3:secondary-range-1
```

## Options / Props

| Product | Interaction |
|---|---|
| Routes | Public NAT uses only routes whose next hop is the default internet gateway. A static route with another next hop (VM, Cloud VPN tunnel; including `0.0.0.0/1` and `128.0.0.0/1`) or a dynamic route from an on-premises router (e.g. `0.0.0.0/0`) makes Public NAT inoperable for matching traffic. Private NAT uses NCC subnet and dynamic routes, local dynamic routes (Hybrid NAT), and local subnet or static routes (NAT64 only) |
| Private Google Access | Public NAT never translates traffic to Google API external IPs; Private Google Access is automatically enabled on ranges a Public NAT gateway serves and cannot be disabled manually. Private NAT gateways do not apply to Private Google Access |
| Shared VPC | Create gateways in the host project to serve service-project VMs |
| VPC Network Peering | A gateway serves one region and one VPC network only (no NAT44 or NAT64 for peered networks); Private NAT does not support peered destinations |
| GKE | Public NAT for private clusters must cover subnet primary range (nodes), Pod secondary range, and Service secondary range. Static allocation reserves at least 1,024 ports per node (or the larger specified minimum); dynamic starts at the specified minimum. Private NAT applies to all ranges of the private subnet and works for private and non-private clusters |
| Cloud Run Direct VPC egress | Deploy with `--vpc-egress` (`all-traffic` for Public NAT); gateway with `--nat-custom-subnet-ip-ranges` set to the Cloud Run subnet names, `--endpoint-types=ENDPOINT_TYPE_VM`, and `--min-ports-per-vm` at 2x (Public NAT) or 4x (Private NAT) the ports one Cloud Run instance needs; with manual IPs cover VM plus Cloud Run instances |
| Connectivity Tests | Works with Public and Private NAT; NAT details appear in the Configuration analysis trace |
| Cloud Load Balancing | Regional internal and regional external Application Load Balancers with regional internet NEG backends can use Cloud NAT so health checks and data-plane traffic come from your NAT IPs. Other external load balancers and health checks use special routing paths and need no external IPs or Cloud NAT |
| PSC propagated connections | With Private NAT for NCC in the same VPC spoke, traffic from a NAT-configured subnet to propagated connections is dropped; use `--nat-custom-subnet-ip-ranges` for overlapping subnets only and avoid `--nat-all-subnet-ip-ranges` |
| Hybrid Subnets | Hybrid NAT is not supported with Hybrid Subnets; SNAT is skipped for destinations matching a hybrid subnet route, causing unpredictable routing |

## Notes

- GKE performs its own SNAT on nodes for Pod internet traffic unless IP masquerade is changed; in a non-private cluster Public NAT can process Pod traffic only if it serves the Pod secondary range and the cluster does not SNAT. NAT cannot be enabled for individual Pods.
- Cloud NAT logs for Direct VPC egress do not show Cloud Run resource names.
- Creating or changing a gateway can change which traffic is translated and can break existing connections; try it on a disposable gateway first.
- Do not use Hybrid Subnets in networks where Hybrid NAT is configured.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/create (gcloud 593.0.0 help); the page has no code. The example only creates a default (public) gateway restricted to the listed subnet ranges. The full flag list is in the `gcp-compute` skill. GKE-side networking is in the `gcp-gke` skill; Cloud Run service-side networking is in `gcp-run`. Load balancer setup is in the `gcp-load-balancing` skill.
- Source: https://docs.cloud.google.com/nat/docs/nat-product-interactions (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [public-nat.md](./public-nat.md)
- [private-nat.md](./private-nat.md)
- [ports-and-addresses.md](./ports-and-addresses.md)
