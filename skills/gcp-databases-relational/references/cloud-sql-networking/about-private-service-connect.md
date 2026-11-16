---
source: https://docs.cloud.google.com/sql/docs/postgres/about-private-service-connect
---

# Overview of Private Service Connect in Cloud SQL

Concepts for connecting to Cloud SQL from multiple VPC networks (different teams, projects or organizations) through Private Service Connect (PSC): endpoints, service connection policies, service attachments, DNS, allowed projects, propagation, backends and outbound connections. PSC is the default private connectivity method for instances in new projects.

## Signature / Usage

The source page has no code. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/configure-private-service-connect (create a PSC-enabled instance with automatic endpoint creation):

```sh
gcloud sql instances create INSTANCE_NAME \
  --project=PROJECT_ID \
  --region=REGION_NAME \
  --tier=MACHINE_TYPE \
  --availability-type=AVAILABILITY_TYPE \
  --database-version=DATABASE_VERSION \
  --no-assign-ip \
  --enable-private-service-connect \
  --allowed-psc-projects=ALLOWED_PROJECTS \
  --psc-auto-connections=network=CONSUMER_NETWORK,project=CONSUMER_PROJECT \
  --enable-psc-auto-dns \
  --enable-psc-write-endpoint-dns
```

Optionally add `--enable-psc-auto-connection-policy` to create or update the service connection policy automatically (needs additional permissions).

### Endpoint creation

- Automatic: create a service connection policy in your VPC networks, then create a PSC-enabled instance with auto-connection parameters (VPC networks and projects). Cloud SQL finds the policy and creates an endpoint pointing at the instance's service attachment.
- Manual: create a PSC-enabled instance, get the service attachment URI, reserve an internal IP in your VPC and create the endpoint.

## Options / Props

| Concept | Details |
|---------|---------|
| Endpoint | Internal IP tied to a forwarding rule that references the instance's service attachment. Create one per VPC network that needs access; configure global access to reach it from any region. Needs `compute.networkAdmin`. |
| Service connection policy | Max one per service class, region and VPC network. After creation only subnets and connection limit can be updated; for other fields remove connections, delete and recreate. |
| Service attachment | Created automatically; one per instance. |
| DNS | Connecting by DNS name is recommended (endpoints in each network may have different IPs); the Auth Proxy requires DNS names. DNS automation can provision records. |
| Allowed projects | At least one project must be on the allowlist. Endpoints from other projects stay `PENDING` until the project is added. |
| Propagation | Connections are not transitive over peering by default; a Network Connectivity Center hub can propagate endpoints to spoke VPCs. |

### Backends (alternative to endpoints)

Need a PSC NEG referencing the service attachment and serving port, plus an Internal Proxy Network Load Balancer, per serving port. Supported PostgreSQL ports:

| Port | Use |
|------|-----|
| TCP 5432 | Direct connections to the PostgreSQL server |
| TCP 6432 | Direct connections to PgBouncer with Managed Connection Pooling |
| TCP 3307 | Connections through the Cloud SQL Auth Proxy |

### Outbound connection limitations

- Enabling/disabling outbound connectivity requires downtime (about 8 minutes, about 3 minutes of downtime).
- Destination must be in an RFC 1918 range; public IPs and non-RFC 1918 ranges such as `100.64.0.0/10` are unsupported. Hostnames must be publicly resolvable to an RFC 1918 address.
- IPv6 unsupported. Can't enable at instance creation (edit afterwards). Not available with both PSA and PSC configured, nor on read pool instances.
- Configure it on a DR replica to keep it working after switchover or failover; otherwise enable it on the new primary.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/postgres/about-private-service-connect (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-private-service-connect (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- `--no-assign-ip` creates the instance without a public IP. `--enable-psc-write-endpoint-dns` applies to Enterprise Plus edition only (gcloud help).
- Removing a project from the allowlist: for instances created, cloned or PSC-enabled in August 2026 and after, existing connections from that project are closed immediately (cannot be disabled); for earlier instances, connections continue until endpoints are removed manually.
- Instances with PSC don't see client IP addresses (see private-ip.md).
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and `mssql` / `drizzle` client code.
- Official pages: Configure Private Service Connect https://docs.cloud.google.com/sql/docs/postgres/configure-private-service-connect and Configure DNS https://docs.cloud.google.com/sql/docs/postgres/configure-dns.

## Related

- [private-ip.md](./private-ip.md)
- [connect-multiple-vpcs.md](./connect-multiple-vpcs.md)
- [configure-private-ip.md](./configure-private-ip.md)
