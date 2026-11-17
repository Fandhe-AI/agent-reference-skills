---
source: https://docs.cloud.google.com/network-connectivity/docs/router/how-to/create-router-vpc-network
---

# Create a Cloud Router to connect a VPC network to a peer network

Cloud Router configuration to exchange routes between a VPC network (or NCC Gateway) and a peer network (on-premises, another cloud such as AWS or Azure, or another VPC network). Three tasks: create a Cloud Router, set up a network connectivity product in Google Cloud, establish BGP sessions with a router on the peer network.

## Signature / Usage

The optional flags are `--advertisement-mode`, `--set-advertisement-groups`, `--set-advertisement-ranges`, `--bgp-identifier-range`, `--keepalive-interval` and `--encrypted-interconnect-router`. Once created, you can't change the region, the associated VPC network or the associated NCC Gateway spoke. `--set-advertisement-groups=ALL_SUBNETS` is valid only with `--advertisement-mode=CUSTOM`; `--encrypted-interconnect-router` marks a router dedicated to encrypted VLAN attachments (the special router for the attachments of HA VPN over Cloud Interconnect, not the regular router for the HA VPN tunnels).

### Create a Cloud Router for a VPC network region (gcloud)

Adapted (not in the official docs): the official template marks optional flags with square brackets (`[--flag=VALUE]`), which makes the command unrunnable and is a glob pattern in zsh; the brackets and the optional flags are removed, and the missing space before the continuation backslash after `--region=REGION` is added. Optional flags are described in the table below and in the paragraph above.

```bash
gcloud compute routers create ROUTER_NAME \
    --project=PROJECT_ID \
    --network=NETWORK \
    --region=REGION \
    --asn=ASN_NUMBER
```

### Create a Cloud Router for an NCC Gateway spoke (gcloud)

Use the Google Cloud CLI or the API for NCC Gateway spokes (the Console can't).

Adapted (not in the official docs): removed the square brackets and the optional flags `--bgp-identifier-range` and `--keepalive-interval` (brackets make the command unrunnable and are glob patterns in zsh), added the missing space before the continuation backslash after `--region=REGION`, and removed the dangling trailing `\` after the last flag, which would continue the command onto the next shell line.

```bash
gcloud compute routers create ROUTER_NAME \
    --project=PROJECT_ID \
    --ncc-gateway=NCC_GATEWAY_URI \
    --region=REGION \
    --asn=ASN_NUMBER \
    --advertisement-mode=CUSTOM \
    --set-advertisement-ranges=CUSTOM_ADVERTISED_RANGES
```

### Create a Cloud Router (REST)

The request template below is not valid JSON (placeholders such as `True|False` and `[ALL_SUBNETS]`, and the `...` element); replace the placeholders with valid JSON values before sending.

```text
     POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/routers
     {
       "name": "ROUTER_NAME",
       "network": "NETWORK",
       "encryptedInterconnectRouter": True|False,
       "bgp": {
         "asn": "ASN_NUMBER",
         "advertiseMode": "ADVERTISEMENT_MODE",
         "advertisedGroups": [ALL_SUBNETS],
         "advertisedIpRanges": [
            {
               "range": CUSTOM_ADVERTISED_RANGE,
               "description": CUSTOM_ADVERTISED_RANGE_DESCRIPTION
            }, ...
         ],
         "identifierRange": ROUTER_IDENTIFIER_RANGE,
         "keepaliveInterval": KEEPALIVE_TIMER
       }
     }
```

## Options / Props

| Name | Description |
|---|---|
| `ROUTER_NAME` | Name of the Cloud Router. |
| `PROJECT_ID` | Project ID of the project that contains the Cloud Router. |
| `NETWORK` | VPC network that contains the Cloud Router. |
| `REGION` | Region that contains the Cloud Router. |
| `ASN_NUMBER` / `--asn` | Any private ASN (`64512`-`65534`, `4200000000`-`4294967294`) not already used in the on-premises network. Required to be private for Cloud Router; the on-premises ASN can be public or private. With Partner Interconnect you must use the Google-owned public ASN `16550`. |
| `ADVERTISEMENT_MODE` / `--advertisement-mode` | `CUSTOM` or `DEFAULT`; omitted means `DEFAULT` at the router level. |
| `CUSTOM_ADVERTISED_RANGES` | Valid only with `CUSTOM`; CIDR ranges or single IPs (IPv4 `/32`, IPv6 `/128`). Maximum is in [quotas.md](./quotas.md). |
| `ROUTER_IDENTIFIER_RANGE` / `--bgp-identifier-range` | Optional IPv4 range used as the unique identifier (BGP identifier / router ID). If omitted, routers with IPv4 BGP sessions use one of the IPv4 BGP addresses; adding the first IPv6 interface populates it automatically. |
| `KEEPALIVE_TIMER` / `--keepalive-interval` | Seconds between BGP keepalives, `20` to `60` inclusive; default 20. |
| `NCC_GATEWAY_URI` / `--ncc-gateway` | `https://networkconnectivity.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/spokes/GATEWAY_SPOKE_NAME` |
| `encryptedInterconnectRouter` | Boolean: the router is dedicated for use with encrypted VLAN attachments (`interconnectAttachments`). |
| `bgp.advertisedIpRanges` | List of `range` / `description`; requires `bgp.advertiseMode: CUSTOM`. |

### Connectivity products managed by a Cloud Router

| Router associated with | Can manage BGP sessions for |
|---|---|
| VPC network region | Cloud Interconnect VLAN attachments (Dedicated / Partner), HA VPN tunnels, Router appliances (always via an NCC hybrid spoke) |
| NCC Gateway spoke | VLAN attachments associated with the NCC Gateway spoke |

## Notes

- Cloud NAT doesn't use ASN information; Cloud NAT gateways can connect to Cloud Routers with any ASN or none.
- Partner Interconnect VLAN attachments need ASN 16550 and a Cloud Router uses one ASN for all its sessions, so such a router can manage only Partner Interconnect sessions (and Dedicated Interconnect VLAN attachments where 16550 is acceptable).
- Each BGP session is unique to its connectivity product (VLAN attachment, VPN tunnel, Router appliance instance); the same Cloud Router can serve different products. Multiple sessions may be needed for redundancy (for example HA VPN).
- HA VPN over Cloud Interconnect needs two Cloud Routers: a special one for the VLAN attachments (only HA VPN-encrypted traffic can be sent to the attachment) and a regular one for the HA VPN tunnels.
- Classic VPN: Cloud Router is usable only for dynamic routing of tunnels to third-party VPN gateway software on Google Cloud VM instances; all other dynamic routing functionality for Classic VPN is deprecated (https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation).
- Corrected from the official docs: the gcloud templates wrote optional flags in square brackets (for example `[--keepalive-interval=KEEPALIVE_TIMER]`), which are removed from the fences, and the NCC Gateway gcloud example ended with `--keepalive-interval=KEEPALIVE_TIMER] \`; the trailing backslash was removed. The NCC Gateway REST request body (`ncc_gateway`, `advertiseMode: CUSTOM`) is omitted for size; see the source page. Console and Terraform forms (module `terraform-google-modules/terraform-google-cloud-router`) are omitted too.
- Deleting or re-creating a Cloud Router drops its BGP sessions and can break connectivity; try changes on a disposable router first. Related how-to pages (BGP sessions, timers, BGP identifier, listing and deleting routers) are official pages: https://docs.cloud.google.com/network-connectivity/docs/router/how-to/configuring-bgp, https://docs.cloud.google.com/network-connectivity/docs/router/how-to/managing-bgp-timers, https://docs.cloud.google.com/network-connectivity/docs/router/how-to/configure-bgp-identifier, https://docs.cloud.google.com/network-connectivity/docs/router/how-to/managing-routers. The full `gcloud compute routers` flag list is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/create).
- Source inconsistency: this page says Classic VPN dynamic routing remains available for tunnels to VPN gateway software on Compute Engine VMs, but the Classic VPN deprecation page (https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation, retrieved 2026-11-17) says that as of August 1, 2025 "the creation of Classic VPN tunnels using dynamic routing (BGP) is no longer supported, regardless of the gateway the tunnel connects to", including VPN gateway software in a Compute Engine VM, and that existing unmodified BGP tunnels keep passing traffic without an availability SLA. Create new dynamic-routing connections with HA VPN.
- Clarified from the official docs: this page says to include the flag "only if the Cloud Router manages BGP sessions for HA VPN over Cloud Interconnect". The gcloud 593.0.0 help for `gcloud compute routers create` says `--encrypted-interconnect-router` "Indicates if a router is dedicated for use with encrypted interconnect attachments (VLAN attachments)", and the Compute Engine API (`Router.encryptedInterconnectRouter`) says "dedicated for use with encrypted VLAN attachments (interconnectAttachments)". Set it on the router for the VLAN attachments only, not on the router for the HA VPN tunnels.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/how-to/create-router-vpc-network (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [advertised-routes.md](./advertised-routes.md)
- [learned-routes.md](./learned-routes.md)
- [quotas.md](./quotas.md)
