---
source: https://docs.cloud.google.com/sql/docs/postgres/connect-multiple-vpcs
---

# Connect to a Cloud SQL instance across multiple VPCs

Options for reaching one Cloud SQL instance from several VPC networks. Private Service Connect is the recommended method; if the instance can use only private services access, use custom advertised routes, an intermediate SOCKS5 proxy, or the Cloud SQL Auth Proxy as a service.

## Signature / Usage

### Intermediate proxy (SOCKS5)

Run a SOCKS server (for example Dante) on the intermediate VM, bind it to the VM's `ens4` interface for external and internal connections, and configure the VPC firewall to allow TCP from the appropriate IP address or range only to the SOCKS port (default `1080`). On the external client, start the Cloud SQL Auth Proxy with `--private-ip` (the instance uses an internal IP) and set the `ALL_PROXY` environment variable of the proxy process to the intermediary VM and SOCKS port, for example `ALL_PROXY=socks5://VM_IP_ADDRESS:SOCKS_SERVER_PORT`. Use the VM's internal IP from a peered VPC, otherwise its external IP. Then test with `psql`.

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy (start the proxy over TCP; add `--private-ip` here):

```bash
./cloud-sql-proxy --port 5432 INSTANCE_CONNECTION_NAME
```

## Options / Props

| Option | Description |
|--------|-------------|
| Private Service Connect | Recommended. Connects multiple VPC networks across projects or organizations, to the primary or any read replica. |
| Custom advertised routes | Cloud Router custom advertised routes through an intermediate VPC (VPC A to VPC B to Cloud SQL VPC C), connected via VPN, Cloud Interconnect or another Cloud Router supported network, or two HA VPN gateways bridging the VPCs. Recommended among the private-services-access-only options. |
| Intermediate proxy (SOCKS5) | SOCKS server on an intermediate VPC plus the Auth Proxy near the client; forwards encrypted Auth Proxy traffic to the instance. |
| Auth Proxy as a service | Run the Auth Proxy on the intermediate VPC paired with a protocol-aware pooler (PgBouncer, Pgpool-II); applications connect to the pooler using a configured SSL. |

## Notes

- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-multiple-vpcs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The source has no fenced code on this page; the `ALL_PROXY` value is its inline example. Not from the source (standard shell behaviour): a bare `ALL_PROXY=...` shell assignment is not exported, so set it in the environment of the `cloud-sql-proxy` process (for example with `export`).
- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Not from the source: a SOCKS server reachable on the VM's external IP is a relay into your VPC for anyone the firewall admits; restrict the firewall source range to the client addresses and enable the SOCKS server's own client authentication or allowlist (for Dante, its client/socks rules).
- With the Auth Proxy as a service you must set up your own secure connection; those connections aren't secured by Cloud SQL.
- Private Service Connect connections aren't transitive over peering by default (see about-private-service-connect.md).
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and `mssql` / `drizzle` client code.

## Related

- [about-private-service-connect.md](./about-private-service-connect.md)
- [connect-to-instance-from-outside-vpc.md](./connect-to-instance-from-outside-vpc.md)
- [private-ip.md](./private-ip.md)
