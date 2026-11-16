---
source: https://docs.cloud.google.com/sql/docs/postgres/connect-to-instance-from-outside-vpc
---

# Connect to a Cloud SQL instance from outside its VPC

How to reach a private-IP Cloud SQL instance when the client runs outside the VPC connected through private services access or Private Service Connect: an intermediary VM (bastion) for development and low-cost use, or Cloud VPN / Cloud Interconnect for highly available production.

## Signature / Usage

### Through IAP (development / prototyping)

IAP is the gateway between the external client and the intermediary VM in the VPC; the Cloud SQL Auth Proxy encrypts traffic between the VM and the instance.

1. On the external client, install the gcloud CLI.
2. On the intermediary VM, download, install and start the Cloud SQL Auth Proxy. The instance uses an internal IP, so start it with the `--private-ip` option.
3. Enable IAP TCP forwarding in the project; the firewall rule must allow ingress TCP on port `22` (not needed if the default network's `default-allow-ssh` rule is enabled).
4. Forward the port from the external client:

```bash
gcloud compute ssh VM_NAME \
--tunnel-through-iap \
--zone=ZONE_NAME \
--ssh-flag="-L 5432:localhost:5432"
```

Replace `VM_NAME` with the name of the VM and `ZONE_NAME` with its zone. Then test with `psql` against `localhost:5432`.

## Options / Props

| Option | Fit | Trade-offs |
|--------|-----|------------|
| Intermediary VM + IAP | Development, prototyping | Access limited by firewall rules and IAM; no need to expose the VM's internal IP. |
| Intermediary VM + SOCKS proxy | Flexible, scalable | End-to-end encryption by the Auth Proxy; see connect-multiple-vpcs.md. |
| Intermediary VM + pooler (Pgpool-II, PgBouncer) | Run the Auth Proxy on the VM, clients connect to the pooler over SSL | One proxy talks to one instance (primary, standby or read pool), so run a separate pooler with a suitable SSL certificate per instance. |
| Cloud VPN / Cloud Interconnect + Cloud Router | Production needing high availability | Configure Cloud Router to advertise the appropriate routes. |

Intermediary VM: generally cheaper and faster to set up, but availability, security and throughput depend on a VM you maintain.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-to-instance-from-outside-vpc (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Prerequisites: a Cloud SQL instance configured with an internal (private) IP rather than an external IP.
- Use `--private-ip` with Auth Proxy v2 (`cloud-sql-proxy`); for TCP connections the proxy listens on `127.0.0.1` by default (per the Connect using the Cloud SQL Auth Proxy page).
- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-auth-proxy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and `mssql` / `drizzle` client code.

## Related

- [connect-multiple-vpcs.md](./connect-multiple-vpcs.md)
- [configure-private-ip.md](./configure-private-ip.md)
- [about-private-service-connect.md](./about-private-service-connect.md)
