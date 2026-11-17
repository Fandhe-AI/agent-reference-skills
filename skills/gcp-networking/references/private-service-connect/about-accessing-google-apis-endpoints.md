---
source: https://docs.cloud.google.com/vpc/docs/about-accessing-google-apis-endpoints
---

# About accessing global Google APIs through endpoints

Private Service Connect endpoints for global Google APIs are private endpoints with global internal IP addresses in your VPC network. You can give them DNS names such as `storage-vialink1.p.googleapis.com` and `bigtable-adsteam.p.googleapis.com`. These names and addresses are internal to your VPC network and to on-premises networks connected by Cloud VPN tunnels or VLAN attachments.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services (list private DNS zones; the Service Directory zone for `p.googleapis.com` is a private zone).

```bash
gcloud dns managed-zones list \
    --filter="visibility=private"
```

## Options / Props

### Features and compatibility (global Google APIs endpoints)

| Configuration | Details |
|---|---|
| Global reachability | Yes, uses an internal global IP address |
| Cloud Interconnect traffic | Yes |
| Cloud VPN traffic | Yes |
| Access through VPC Network Peering | No |
| Connection propagation through NCC | Yes (Preview) |
| Automatic DNS configuration | Yes |
| IP version | IPv4 |

### API bundles

| Bundle | Equivalent Private Google Access VIP | Access |
|---|---|---|
| `all-apis` | `private.googleapis.com` | Most Google APIs and services regardless of VPC Service Controls support, including all `*.googleapis.com` endpoints (excludes `*.rep.googleapis.com` regional and multi-regional endpoints), Google Maps, Google Ads and Google Cloud. No Google Workspace web applications (Gmail, Docs) and no interactive websites. |
| `vpc-sc` | `restricted.googleapis.com` | Only APIs and services supported by VPC Service Controls; blocks others. No Google Workspace APIs or web applications. |

Bundles support only HTTP-based protocols over TCP (HTTP, HTTPS, HTTP/2); MQTT, ICMP and others are not supported. Choose `all-apis` if you do not use VPC Service Controls, or if you do but also need APIs it does not support. Use `vpc-sc` to restrict users to VPC Service Controls-supported APIs for extra data exfiltration protection.

### Service Directory DNS configuration

| Setting | Behavior |
|---|---|
| Service Directory region | Chosen when creating the first endpoint in a network and reused for all later endpoints; defaults to `us-central1` if unset; all endpoints in a network must use the same region |
| Service Directory namespace | Set by the first endpoint (system-generated if unspecified); all endpoints in a network must use the same namespace; use it only for Google APIs endpoints; can be shared across networks |
| Private DNS zone | One Service Directory zone for `p.googleapis.com` per VPC network that contains an endpoint |
| DNS records | For endpoint name `xyz`: `storage-xyz.p.googleapis.com`, `compute-xyz.p.googleapis.com`, and others in the bundle; available names depend on `all-apis` or `vpc-sc` |

### IP address requirements

- A single IPv4 address (RFC 1918 or non-RFC 1918); IPv6 is not supported. Counts toward the project's global internal IP address quota.
- Cannot be in any subnet range (primary or secondary) of the VPC network or of a peered network.
- Cannot overlap a `/32` custom static route in the local network, or a `/32` peering custom static route when custom routes are exported by the peer and imported locally.
- Cannot be in auto-mode ranges (`10.128.0.0/9`) if the network is auto mode or peered with one.
- Cannot be in an allocated IP range of the local network (can be in one of a peered network).
- Cannot be in an internal range, unless the address is reserved from an internal range for Private Service Connect endpoints in the same network.
- An endpoint takes priority over a custom dynamic route with the same `/32` destination, and over local static, local dynamic or peering custom routes whose mask is shorter than `/32`.

### Roles and quotas

| Item | Value |
|---|---|
| Shared VPC (not recommended) | Service Project Admin needs a role such as Compute Network User (`roles/compute.networkUser`) on the host project (`compute.networks.use`, `compute.addresses.use`); only via gcloud CLI or API |
| Quota | `PSC Google APIs Forwarding Rules per VPC Network` |
| Organization policy | `constraints/compute.disablePrivateServiceConnectCreationForConsumers` defines endpoint types for which forwarding rules cannot be created |

## Notes

- If you configure global Google APIs endpoints in VPC Service Controls service perimeters, endpoints created before September 1, 2026 are not supported and must be recreated.
- DNS resolution: if the private zone for `p.googleapis.com` is missing, `storage-xyz.p.googleapis.com` resolves through public DNS (wildcard entry) to public Cloud Front End addresses, not to your endpoint. Hybrid clients need extra configuration (Cloud DNS inbound forwarding policy).
- Shared VPC: an address resource in a service project cannot reserve an internal global IPv4 address from the host project; create forwarding rules and address resources in the same project where possible.
- Multiple endpoints allow different network paths with Cloud Router custom route advertisements and firewall rules (for example, advertise two endpoints on different VLAN attachments, or the same endpoint on both for ECMP active/active). There is no limit on total bandwidth sent to an endpoint.
- Deleting endpoints or DNS zones can break API access from clients that use those names; try it on a disposable resource first.
- The source has no code; the gcloud block is borrowed from the endpoint page in the same category. Pricing is on the VPC pricing page and is not copied. The `compute forwarding-rules create` flag list (including `--target-google-apis-bundle`) is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/vpc/docs/about-accessing-google-apis-endpoints (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-service-connect.md](./private-service-connect.md)
- Configure endpoints for Google APIs: https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-apis
- Regional Google APIs endpoints: https://docs.cloud.google.com/vpc/docs/about-accessing-regional-google-apis-endpoints
