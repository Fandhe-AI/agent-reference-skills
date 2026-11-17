---
source: https://docs.cloud.google.com/secure-web-proxy/docs/deploy-next-hop
---

# Deploy Secure Web Proxy as next hop

Set the gateway's `routingMode` to `NEXT_HOP_ROUTING_MODE` and use VPC static routes or policy-based routes to send traffic to it, instead of configuring each client. The default `RoutingMode` is `EXPLICIT_ROUTING_MODE`. Create the policy and rules first as in [quickstart.md](./quickstart.md).

## Signature / Usage

### Create the gateway

`gateway.yaml`:

```yaml
name: projects/PROJECT_ID/locations/REGION/gateways/swp1
type: SECURE_WEB_GATEWAY
addresses: ["IP_ADDRESS"]
ports: [443, 80]
gatewaySecurityPolicy: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1
network: projects/PROJECT_ID/global/networks/NETWORK
subnetwork: projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK
routingMode: NEXT_HOP_ROUTING_MODE
```

Optional, listen on all ports 1 to 65535 (Preview):

```yaml
name: projects/PROJECT_ID/locations/REGION/gateways/swp1
type: SECURE_WEB_GATEWAY
addresses: ["IP_ADDRESS"]
all_ports: true
gatewaySecurityPolicy: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1
network: projects/PROJECT_ID/global/networks/NETWORK
subnetwork: projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK
routingMode: NEXT_HOP_ROUTING_MODE
```

Optional global access (only at creation time):

```yaml
name: projects/PROJECT_ID/locations/REGION/gateways/swp1
type: SECURE_WEB_GATEWAY
addresses: ["IP_ADDRESS"]
ports: [443, 80]
gatewaySecurityPolicy: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1
network: projects/PROJECT_ID/global/networks/NETWORK
subnetwork: projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK
routingMode: NEXT_HOP_ROUTING_MODE
allowGlobalAccess: true
```

```bash
gcloud network-services gateways import swp1 \
--source=gateway.yaml \
--location=REGION
```

### Static route

```bash
gcloud compute routes create STATIC_ROUTE_NAME \
    --network=NETWORK_NAME \
    --next-hop-ilb=SWP_IP \
    --destination-range=DESTINATION_RANGE \
    --priority=PRIORITY \
    --tags=TAGS \
    --project=PROJECT
```

Test VM carrying the route's network tags:

```bash
gcloud compute instances create swp-nexthop-test-vm \
    --subnet=SUBNETWORK \
    --zone=ZONE \
    --image-project=debian-cloud \
    --image-family=debian-11 \
    --tags=TAGS
```

### Policy-based routes

Route to the proxy:

```bash
gcloud network-connectivity policy-based-routes create POLICY_BASED_ROUTE_NAME \
    --network="projects/PROJECT/global/networks/NETWORK_NAME" \
    --next-hop-ilb-ip=SWP_IP \
    --protocol-version="IPV4" \
    --destination-range=DESTINATION_RANGE \
    --source-range=SOURCE_RANGE \
    --priority=2 \
    --project=PROJECT
```

Default-routing route: it keeps traffic between VMs in the network on default routing, so it must have a numerically lower (higher-priority) value than the route to the proxy and match only that internal traffic. If it matched the same source and destination ranges as the proxy route, it would always win and the traffic would bypass Secure Web Proxy.

Adapted (not in the official docs): `--destination-range` uses a separate placeholder, `INTERNAL_DESTINATION_RANGE` (the internal range of the VPC network, which must stay on default routing), instead of reusing `DESTINATION_RANGE` from the proxy route.

```bash
gcloud network-connectivity policy-based-routes create DEFAULT_POLICY_BASED_ROUTE_NAME \
    --network="projects/PROJECT/global/networks/NETWORK_NAME" \
    --next-hop-other-routes="DEFAULT_ROUTING" \
    --protocol-version="IPV4" \
    --destination-range=INTERNAL_DESTINATION_RANGE \
    --source-range=SOURCE_RANGE \
    --priority=1 \
    --project=PROJECT
```

## Options / Props

| Placeholder | Meaning |
|-------------|---------|
| `SWP_IP` | IP address of the instance in the subnetwork named in `gateway.yaml` |
| `DESTINATION_RANGE` | Range to redirect; for example `0.0.0.0/0` routes all internet traffic to the instance |
| `PRIORITY` (static) | Higher numbers denote lower priority; must be numerically lower than the default internet route, typically `1000` |
| `TAGS` | Comma-separated network tags; use the same tags on all source resources |
| `SOURCE_RANGE` | Source range for policy-based routes (static routes can't define a source range) |
| `INTERNAL_DESTINATION_RANGE` | Internal range of the VPC network (traffic between VMs) that the default-routing policy-based route keeps on default routing; it must not cover the destinations that should go to the proxy |

### Limitations

| Limitations |
|---|
| `NEXT_HOP_ROUTING_MODE` instances support HTTP(S) and TCP proxy traffic. Other traffic, including cross-region traffic, is dropped without notification. |
| With `next-hop-ilb`, the limitations of internal passthrough Network Load Balancers apply to next hops. |
| All VM traffic matched by the next hop route (including background traffic and updates) is routed to the instance. |
| For a VPC network in a region, only one Secure Web Proxy as next hop (SWPaNH) instance can be deployed. |
| `all_ports`: only for `type: SECURE_WEB_GATEWAY`; only with `routingMode: NEXT_HOP_ROUTING_MODE`; can't be combined with an explicit `ports` list; within a network and region, a next-hop instance with `all_ports: true` can't coexist with an instance in any other mode. |

### Post-deployment checklist (all items required)

| Post-deployment checklist (all items required) |
|---|
| Confirm that a default route to the internet gateway exists. |
| Add the correct network tag to the static route that points to the instance. |
| Define an appropriate priority for the default route to the instance as next hop. |
| The service is regional: client traffic must originate in the same region as the instance. |

## Notes

- Misconfigured policy-based routes can severely disrupt traffic flow. Review the policy-based route limitations first. The proxy route requires a second policy-based route for default routing between VMs in the network; the default-routing route needs the higher priority (numerically lower value), and if the proxy route has the higher priority instead, it takes priority over all other VPC routes. Routes and gateways can break connectivity; try them on a disposable network first.
- Host matching in next hop mode uses the SNI field for encrypted traffic (see [configure-rules.md](./configure-rules.md)).
- The source also shows Console steps. The `gcloud compute routes create` full flag list is in the `gcp-compute` skill: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routes/create
- The source's test VM uses the `debian-11` image family, which is an older image; choose a currently supported image family for new VMs.
- Setting `DESTINATION_RANGE` to `0.0.0.0/0` sends all internet traffic of the tagged VMs to the proxy; an incorrect priority or missing default route can cut their connectivity.
- Corrected from the official docs: the source creates the proxy route (`--priority=2`) and the default-routing route (`--next-hop-other-routes="DEFAULT_ROUTING"`, `--priority=1`) with the same `--destination-range=DESTINATION_RANGE` and `--source-range=SOURCE_RANGE`. The source says the default-routing route "enables default routing for the traffic between virtual machine (VM) instances within your network" and must have the higher priority, so with identical match ranges the default-routing route would always be selected and no traffic would reach the proxy; the example limits it to `INTERNAL_DESTINATION_RANGE`.
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/deploy-next-hop (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart.md](./quickstart.md)
- [configure-rules.md](./configure-rules.md)
- [overview.md](./overview.md)
