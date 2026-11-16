---
source: https://docs.cloud.google.com/memorystore/docs/redis/networking
---

# Memorystore for Redis networking

Memorystore uses VPC peering to connect your VPC network with the Google services network. Two connection modes exist, `DIRECT_PEERING` and `PRIVATE_SERVICE_ACCESS`; instances always use internal IP addresses.

## Signature / Usage

View an instance's connection mode (the `connectMode` value is `DIRECT_PEERING` or `PRIVATE_SERVICE_ACCESS`):

Adapted (not in the official docs): the lower-case placeholders `instance-id` and `region` were upper-cased to `INSTANCE_ID` and `REGION`.

```bash
gcloud redis instances describe INSTANCE_ID --region=REGION
```

## Options / Props

### Choosing a connection mode

| Scenario | Supported connection mode |
|---|---|
| Provision a Redis instance with a Shared VPC network | Private services access only |
| Access a Redis instance from on-premise networks using VPN | Private services access only |
| Use centralized IP range management for multiple Google services | Private services access only |
| Provision a Redis instance using a dedicated VPC network | Private services access (recommended) or direct peering |

### Permissions to manage a private services access connection

| Task (UI and gcloud) | Permissions |
|---|---|
| List local and host project networks (UI); check the connection (UI and gcloud) | `compute.networks.list` (both local and host projects) |
| Create the connection | `serviceusage.services.enable` (enable Service Networking API), `compute.addresses.create`, `compute.addresses.list`, `servicenetworking.services.addPeering` |

## Notes

- Direct peering: peering is created automatically and not shared with other Google services; it is the default when no mode is specified. Minimum `--reserved-ip-range` block is `/29` without read replicas and `/28` with read replicas.
- Private services access: a connection must be established on the VPC network before creating an instance in this mode; it enables Shared VPC service projects, centralized IP management and VPN / Cloud Interconnect access. With multiple allocated ranges, `--reserved-ip-range` chooses which ones to use.
- You cannot switch the connection mode of an existing instance; recreate it (the IP address changes). Both modes can coexist in the same project and network.
- On-premises access (private services access): connect via Cloud VPN or Dedicated / Partner Interconnect VLAN attachments; Cloud Routers must receive specific prefixes (default route `0.0.0.0/0` cannot be imported); update the `servicenetworking-googleapis-com` peering to set both `--import-custom-routes` and `--export-custom-routes`; create a Cloud Router custom advertised route for the allocated range. Older installations use a peering named `redis-peer-[peer project number]`; once it exchanges custom routes the Google managed project does not accept them, so contact Google Cloud Support.
- Read replica instances need a CIDR range of `/28` or larger (`/27`, `/26` valid; `/29` is not supported).
- Supported: RFC 1918 and some non-RFC 1918 private ranges; privately used public IP (PUPI) addresses are not supported, and PUPI clients cannot connect in private services access mode. Restricted ranges cannot be used. Legacy networks are not supported.
- Creation can fail with "Google private services access is not enabled. Enable privates service access and try again."; ask the network team to establish the connection.
- Adapted from the official docs: the source writes `gcloud redis instances describe instance-id --region=region`.
- Source: https://docs.cloud.google.com/memorystore/docs/redis/networking (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [about-read-replicas.md](./about-read-replicas.md)
- [connect-redis-instance.md](./connect-redis-instance.md)
