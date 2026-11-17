---
source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/how-cloud-router-works
---

# How Cloud Router works

Cloud Router is an API abstraction implemented by multiple redundant BGP tasks, a dynamic route control plane, and VPC network control and data planes. Understanding how the three components interact explains Cloud Router operations and learned-route best-path selection.

## Signature / Usage

The BGP task count is influenced by how interfaces are connected. The `--keepalive-interval` flag of `create` and the redundant interface setting are the user-visible knobs (the page itself has no code; the command below is the router creation command from the linked how-to page).

Adapted (not in the official docs): the official template marks optional flags with square brackets (`[--flag=VALUE]`), which makes the command unrunnable and is a glob pattern in zsh; the brackets and the optional flags are removed, and the missing space before the continuation backslash after `--region=REGION` is added. Only `--keepalive-interval` is kept as the other flag this page mentions; the remaining optional flags are described in the page text.

```bash
gcloud compute routers create ROUTER_NAME \
    --project=PROJECT_ID \
    --network=NETWORK \
    --region=REGION \
    --asn=ASN_NUMBER \
    --keepalive-interval=KEEPALIVE_TIMER
```

## Options / Props

### Software components

| Component | Role |
|---|---|
| Cloud Router BGP task | Grouped within a region; talks to the region's dynamic route control plane; manages BGP sessions to send and receive prefixes; does no packet data processing. |
| Dynamic route control plane | One per region; communicates with BGP tasks of its region and group. In global dynamic routing mode it also communicates with dynamic route control planes in other regions. Sends messages to the VPC network control plane. |
| VPC network control plane | One per region; receives information from the region's dynamic route control planes, programs dynamic routes in receiving VPC networks and enforces dynamic route quotas. |
| VPC network data plane | One per region; evaluates and implements dynamic routes from the VPC network control plane and performs packet forwarding. |

### Number of BGP tasks per scenario

| Example scenario | BGP tasks |
|---|---|
| One or more interfaces, each connected to a Classic VPN tunnel. | One |
| One or more interfaces, each connected to a VLAN attachment, where the attachments are in the same edge availability domain. | One |
| Any number of interfaces, each connected to an HA VPN tunnel, where all tunnels connect to the same interface number on one or more HA VPN gateways. | One |
| At least two interfaces: one connected to a VLAN attachment in a single edge availability domain, another to a single HA VPN tunnel, where the edge availability domain and VPN gateway interface numbers are the same. | One |
| At least two interfaces, each connected to a Router appliance instance, where one interface is configured as a redundant interface (`redundant-interface` flag in the Google Cloud CLI or `redundantInterface` field in the Compute Engine API). | Two |
| At least two interfaces, each connected to a VLAN attachment, where the attachments are in different edge availability domains. | Two |
| At least two interfaces, each connected to an HA VPN tunnel, where the tunnels connect to different HA VPN gateway interface numbers. | Two |
| At least one interface on VLAN attachment in `edge availability domain 0` and/or HA VPN tunnel on `interface 0`; one interface on VLAN attachment in `edge availability domain 1` and/or HA VPN tunnel on `interface 1`; and one interface connected to a Classic VPN tunnel. | Three |

### Timers and notifications

| Item | Value |
|---|---|
| Graceful restart timer used by Cloud Router | 120 seconds |
| Maintenance event design target | complete in less than 120 seconds |
| Notification when peer supports graceful restart | graceful restart notification (TCP `FIN` packet) |
| Notification when peer doesn't support graceful restart | BGP `CEASE` notification (RFC 4271 section 4.5); the session stays down until Cloud Router replaces the BGP task |

## Notes

- Maintenance events are automatic, not announced in advance and not disruptive as long as the peer router supports graceful restart. Per RFC 4724 section 4.2 the peer must honor the 120 second timer, preserving learned routes and continuing to advertise routes if Cloud Router stops sending BGP keepalive packets (and, when BFD is configured, BFD packets; the peer must honor a BFD control plane independent bit value of `0` because Cloud Router uses a control plane dependent BFD implementation).
- Adjusting the Cloud Router hold timer or the peer router hold timer doesn't prevent the BGP session from terminating after a `CEASE`.
- During planned Cloud Interconnect maintenance the BGP session is held open for the negotiated hold timer and then terminated by Cloud Router.
- If a BGP task fails unexpectedly, no maintenance notification is sent; learned and advertised routes remain for the negotiated hold timer. Multiple BGP tasks keep HA VPN tunnel pairs, Router appliances and VLAN attachments that meet a Cloud Interconnect SLA from depending on one task.
- Classic VPN: Cloud Router supports Classic VPN only for dynamic routing of tunnels to third-party VPN gateway software on Google Cloud VM instances; all other dynamic routing functionality for Classic VPN is deprecated (https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation).
- Snippet taken from https://docs.cloud.google.com/network-connectivity/docs/router/how-to/create-router-vpc-network (this page has no code). Timers are in https://docs.cloud.google.com/network-connectivity/docs/router/how-to/managing-bgp-timers; maintenance events in https://docs.cloud.google.com/network-connectivity/docs/router/how-to/identifying-router-events.
- Adapted from the official docs: the source command template wrote optional flags in square brackets (for example `[--keepalive-interval=KEEPALIVE_TIMER]`); they are removed from the fence so the command parses.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/how-cloud-router-works (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [learned-routes.md](./learned-routes.md)
- [create-router-vpc-network.md](./create-router-vpc-network.md)
