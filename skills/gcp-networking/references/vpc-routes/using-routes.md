---
source: https://docs.cloud.google.com/vpc/docs/using-routes
---

# Use routes

How to list, create, delete and propagate routes for VPC networks, and how to enable IP forwarding on VMs used as next hops. Every new network has a default route (removable or replaceable) and one subnet route per subnet; a subnet route cannot be removed unless the subnet is deleted.

## Signature / Usage

### List and describe routes

`gcloud compute routes` and the API show only subnet routes and static routes. They do not show policy-based routes, dynamic routes or peering static and dynamic routes; use the console (Routes > Effective routes) for the complete view.

```bash
gcloud compute routes list \
    --filter="network=NETWORK_NAME" \
    --project=PROJECT_ID
```

```bash
gcloud compute routes describe ROUTE_NAME \
    --format="flattened()" \
    --project=PROJECT_ID
```

Replace `NETWORK_NAME` with the VPC network name, `PROJECT_ID` with the project ID and `ROUTE_NAME` with the route name.

```text
GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/routes/ROUTE_NAME
```

### Create a static route

```bash
gcloud compute routes create ROUTE_NAME \
    --network=NETWORK \
    --destination-range=DESTINATION_RANGE \
    --priority=PRIORITY \
    NEXT_HOP_SPECIFICATION
```

Use `--tags` to apply the route only to VMs with the given network tags. Replace the placeholders as listed under Options / Props.

### Re-create the IPv4 default route

```bash
gcloud compute routes create ROUTE_NAME \
    --destination-range=0.0.0.0/0 \
    --network=NETWORK \
    --next-hop-gateway=default-internet-gateway
```

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/routes
{
  "destRange": "0.0.0.0/0",
  "name": "ROUTE_NAME",
  "network": "NETWORK_NAME",
  "nextHopGateway": "projects/PROJECT_ID/global/gateways/default-internet-gateway"
}
```

### Re-create the IPv6 default route

```bash
gcloud compute routes create ROUTE_NAME \
    --destination-range=::/0 \
    --network=NETWORK \
    --next-hop-gateway=default-internet-gateway
```

The IPv6 default route is configured automatically when you create a subnet with external IPv6 access. Deleting it blocks all IPv6 traffic from VMs to the internet.

### Delete a static route

```bash
gcloud compute routes delete ROUTE_NAME
```

```text
DELETE https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/routes/ROUTE_NAME
```

### Enable IP forwarding for a VM

```text
gcloud compute instances create ... --can-ip-forward
```

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances
{
  "canIpForward": true,
  ...other fields
}
```

## Options / Props

### Create static route parameters

| Placeholder | Description |
|---|---|
| `ROUTE_NAME` | Name of the route. |
| `NETWORK` | VPC network that contains the route. |
| `DESTINATION_RANGE` | IPv4 or IPv6 destination; broadest `0.0.0.0/0` or `::/0`. |
| `PRIORITY` | `0` (highest) to `65535` (lowest). |
| `NEXT_HOP_SPECIFICATION` | One of the next hop options below. |

| gcloud next hop | REST field | Effect |
|---|---|---|
| `--next-hop-gateway=default-internet-gateway` | `nextHopGateway: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/gateways/default-internet-gateway` | Internet and Google APIs and services. |
| `--next-hop-instance=INSTANCE_NAME` and `--next-hop-instance-zone=ZONE` | `nextHopInstance: .../zones/ZONE/instances/INSTANCE_NAME` | VM NIC by name and zone. IPv6 destination requires a dual-stack or IPv6-only VM. |
| `--next-hop-address=ADDRESS` | `nextHopIp: ADDRESS` | IP of an existing VM in the network. IPv6 requires dual-stack or IPv6-only VM. |
| `--next-hop-vpn-tunnel=VPN_TUNNEL_NAME` and `--next-hop-vpn-tunnel-region=REGION` | `nextHopVpnTunnel: .../regions/REGION/vpnTunnels/VPN_TUNNEL_NAME` | Classic VPN tunnel using static routing. |
| `--next-hop-ilb=FORWARDING_RULE` and `--next-hop-ilb-region=REGION` | `nextHopIlb: .../regions/REGION/forwardingRules/FORWARDING_RULE` | Internal passthrough Network Load Balancer by forwarding rule name (or IPv4 or IPv6 address) and region. IP version must match the route's. |

### Before adding a static route

| Before adding a static route |
|---|
| Unless hybrid subnets are used, a destination cannot match or be more specific than a subnet or peering subnet route. |
| In auto mode networks, avoid destinations within `10.128.0.0/9`. |
| Destinations cannot overlap any internal allocated range (private access options). |
| Google Cloud validates a VM's existence at creation time only for a next-hop instance. |
| A tagged route reaches only VMs with that tag, but tagged VMs still receive all untagged routes. |
| Routes in VPC networks connected by VPC Network Peering must be changed in the network that exports them. |
| Static routes cannot be modified after creation; delete and create a replacement. |
| Preview feature: for Cloud Router next hops, custom learned routes can be an alternative to static routes. They are suppressed automatically when the BGP session is disrupted and can be used over Cloud Interconnect VLAN attachments and HA VPN tunnels. |

### Propagation of route changes

| Propagation of route changes |
|---|
| Status `PENDING` or `RUNNING` means the change is queued; after `DONE`, up to an additional 30 seconds can pass before all VMs in the network and peered networks use the new route. |
| Simultaneous changes can apply in any order. For dependent changes, wait until the previous change is `DONE` plus 30 seconds. |

### IP forwarding

| IP forwarding |
|---|
| Disabled by default, with strict source address checking. A VM can emit packets with its primary internal IPv4 address, alias IP ranges, assigned IPv6 addresses (dual-stack or IPv6-only VM), and IP addresses of forwarding rules it backs (internal passthrough Network Load Balancer, regional external passthrough Network Load Balancer, or target instance). |
| To forward packets with other sources, enable IP forwarding at VM creation (applies to all NICs). On an existing VM, update the `canIpForward` instance property. |
| Also enable it in the guest OS. On Linux set `net.ipv4.ip_forward` (IPv4) or `net.ipv6.conf.all.forwarding` (IPv6) to `1`. |

## Notes

- Source: https://docs.cloud.google.com/vpc/docs/using-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- The source also shows Console steps, Terraform, and Go, Java and Python client library samples, all omitted here.
- The source's list-routes REST example ends with `?filter=network="NETWORK_URL` (unbalanced quote) and is omitted; use the `routes.get` request shown above or see https://docs.cloud.google.com/compute/docs/reference/rest/v1/routes/list.
- In `gcloud compute instances create ... --can-ip-forward`, `...` stands for the other flags of the instance creation command (the source writes it this way).
- Deleting a route (for example the default route) can break connectivity. Try it on a disposable network first.
- Re-creating the default route restores internet access for VMs; consider firewall rules before doing so.
- The full `gcloud compute routes` and `gcloud compute instances` flag list is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/routes/create).

## Related

- [routes.md](./routes.md)
- [static-routes.md](./static-routes.md)
- [policy-based-routes.md](./policy-based-routes.md)
