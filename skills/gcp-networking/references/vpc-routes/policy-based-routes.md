---
source: https://docs.cloud.google.com/vpc/docs/policy-based-routes
---

# Policy-based routes

Policy-based routes select a next hop using protocol and source IP address in addition to destination IP address. Matching traffic is redirected to an internal passthrough Network Load Balancer, which helps insert appliances such as firewalls into the traffic path.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/policy-based-routes/create (gcloud 593.0.0 help). The page itself has no code.

```bash
gcloud network-connectivity policy-based-routes create my-pbr \
    --network="projects/my-project/global/networks/default" \
    --next-hop-ilb-ip=10.0.0.1
```

To skip other policy-based routes use `--next-hop-other-routes=DEFAULT_ROUTING` in gcloud, or include `"nextHopOtherRoutes": "DEFAULT_ROUTING"` in the API request body.

## Options / Props

### Specifications

| Specifications |
|---|
| Applies to all VMs, Cloud Interconnect VLAN attachments and Cloud VPN tunnels in the route's VPC network; or only VMs in the route's network identified by network tags; or only VLAN attachments in a specific region. A route cannot apply to a single VLAN attachment or Cloud VPN tunnel. |
| The next hop must be a valid internal passthrough Network Load Balancer in the same VPC network, or in a network connected through VPC Network Peering. Its backend VMs must have IP forwarding enabled. |
| Evaluated before subnet, static and dynamic routes, after special routing paths. |
| Routes with equal priority that both match are resolved by an internal algorithm (no longest-prefix matching, so the result might not be the most specific match). Use unique priorities per VPC network. |
| Applies to IPv4 or IPv6 traffic. One rule can cover one-way traffic; use multiple rules for bidirectional traffic. |

### Limitations

| Limitation | Detail |
|---|---|
| Exchange | Not exchanged over VPC Network Peering or between Network Connectivity Center spokes and hubs. |
| Port matching | Matching on port is not supported. |
| Updates | Cannot be updated after creation; delete and recreate. |
| Forwarding rule IP | Needs a dedicated IP not used by another internal passthrough Network Load Balancer; `SHARED_LOADBALANCER_VIP` is not supported. |
| GKE | Can interfere with communication between the GKE control plane and nodes. |
| Private Service Connect | Cannot route packets to Private Service Connect endpoints or backends. |
| Interconnect | Only VLAN attachments that use Dataplane v2 can use policy-based routes. |

## Notes

- Skipping other policy-based routes: A route with the skip option, when it matches and has a higher priority than other matching policy-based routes, makes Google Cloud ignore the other policy-based routes and continue to the most specific destination step of the VPC routing order. Example: a route to an internal passthrough Network Load Balancer with source `0.0.0.0/0` and network tag `compute-vm` can be bypassed for specific source ranges by creating a higher-priority skip route with those source ranges.
- Quota: A per-project limit on the number of policy-based routes applies; see the VPC quotas page (policy-based routes quota).
- Source: https://docs.cloud.google.com/vpc/docs/policy-based-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/policy-based-routes/create (gcloud 593.0.0 help).
- Policy-based routes are managed with `gcloud network-connectivity policy-based-routes`; they do not appear in `gcloud compute routes list`.
- Deleting or recreating a policy-based route can redirect or break traffic; try it on a disposable network first.
- GKE and Private Service Connect interactions are described in the "Use policy-based routes" page (https://docs.cloud.google.com/vpc/docs/use-policy-based-routes).

## Related

- [routes.md](./routes.md)
- [static-routes.md](./static-routes.md)
- [using-routes.md](./using-routes.md)
