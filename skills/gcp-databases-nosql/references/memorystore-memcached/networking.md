---
source: https://docs.cloud.google.com/memorystore/docs/memcached/networking
---

# Networking

Memorystore for Memcached uses private services access to create a network peering between your project and an internal Google network. A private services access connection must be established for a network before a Memcached instance can be created on it.

## Signature / Usage

### Message to send your networking team when creation fails

```text
The Memorystore for Memcached instance cannot be created due to the following
error:

"Google private services access is not enabled. Enable privates service access
and try again."

Before an instance can be created, a private service access connection needs to
be established for network <project name: network>. Please refer to the
following Memorystore documentation links for more information on how to create
this connection:

* Networking.
* Establishing a private services access connection.
* Verifying a private services access connection.
```

## Options / Props

### On-premises access

1. Connect the Shared VPC network to the on-premises network with a Cloud VPN tunnel, or a Dedicated / Partner Interconnect attachment (VLAN).
2. Identify the peering produced by the private services connection; for Memorystore for Memcached it is named `servicenetworking-googleapis-com`.
3. Update the peering to exchange custom routes by setting both `--import-custom-routes` and `--export-custom-routes`.
4. Identify the allocated range used by the private services connection.
5. Create a Cloud Router custom advertised route for that range on the Cloud Routers managing the BGP sessions of the VPN tunnels or Interconnect attachments.

### Supported networks and client IP ranges (RFC 1918)

| Item | Support |
|---|---|
| VPC networks | Supported, except legacy networks |
| Shared VPC networks | Supported |
| On-premises systems | Supported |
| Compute Engine VMs | Supported, except 172.17.0.0/16 (reserved for internal components) |
| Private services access range | Recommended block size at least `/24`; minimum needed for Memcached is `/26` |

## Notes

- Once a private services connection is established for any service on a network, it is established for all other services on that network that use private services access (for example Cloud SQL and Memorystore for Redis).
- IP addresses of nodes and of the discovery endpoint do not change. Each instance has a discovery endpoint and each node its own IP; view them in the console or with `gcloud memcache instances describe`.
- Network creation is usually handled by the networking/security team so IP ranges do not overlap.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/networking (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [about-auto-discovery.md](./about-auto-discovery.md)
- [connect-memcached-instance.md](./connect-memcached-instance.md)
