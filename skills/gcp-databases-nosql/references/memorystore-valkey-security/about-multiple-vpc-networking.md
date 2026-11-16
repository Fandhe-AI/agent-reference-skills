---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-multiple-vpc-networking
---

# About multiple VPC networking

Overview of connecting several VPC networks to one Memorystore for Valkey instance using Private Service Connect (PSC) connections. For a single VPC network, a service connection policy is recommended but not required.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/instance-provisioning-vpc

```bash
gcloud memorystore instances describe INSTANCE \
--project=PROJECT_ID \
--location=REGION
```

## Options / Props

| Connection type | Description |
|-----------------|-------------|
| User-registered PSC connections | Self-created and self-registered; required for multiple VPC setups. You control subnets, IP addresses and forwarding rules, and own the lifecycle (create, register, delete). |
| Automatically registered PSC connections | Created and registered by PSC service connectivity automation through the service connection policy; the policy creates, registers and deletes them with the instance. |

| Requirement / limit | Value |
|---------------------|-------|
| Minimum maintenance version | `MEMORYSTORE_20251210_02_00` (older: do a self-service update first) |
| PSC connections per connected VPC | two (one discovery connection for clients, one reserved for the internal Memorystore backend) |
| VPC networks per instance | 1 to 20 |
| Total PSC connections per instance | no more than 40 |

## Notes

- A PSC connection consists of an IP address and an established connection between a PSC endpoint and the instance's service attachment.
- If you already use an instance, you probably have automatically registered connections; you can keep them and add only user-registered connections for new VPCs.
- To delete an instance connected with user-registered PSC connections, first delete the connections and deregister the PSC endpoints. This is destructive; try it on a disposable resource first.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-multiple-vpc-networking (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [networking.md](./networking.md)
- [instance-provisioning-vpc.md](./instance-provisioning-vpc.md)
