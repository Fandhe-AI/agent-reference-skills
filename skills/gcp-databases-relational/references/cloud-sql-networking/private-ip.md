---
source: https://docs.cloud.google.com/sql/docs/postgres/private-ip
---

# Private IP

Overview of the two ways to give a Cloud SQL for PostgreSQL instance a private IP address: Private Service Connect (PSC) and private services access (PSA). Private IP connections offer better security and lower latency than public IP connections and work across regions and with a Shared VPC between projects.

## Signature / Usage

### Private IP instance (private services access path)

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/configure-private-ip (the source page itself has no code):

```bash
gcloud beta sql instances create INSTANCE_ID \
--project=PROJECT_ID \
--network=projects/NETWORK_PROJECT_ID/global/networks/VPC_NETWORK_NAME \
--no-assign-ip \
--allocated-ip-range-name=RANGE_NAME \
--enable-google-private-path \
--database-version=DATABASE_VERSION \
--cpu=NUMBER_OF_CPU \
--memory=MEMORY_IN_GB \
--region=REGION_NAME \
--enforce-new-sql-network-architecture
```

Replace each upper-case placeholder with your own values; see [configure-private-ip.md](./configure-private-ip.md).

## Options / Props

| Method | Description |
|--------|-------------|
| Private Service Connect | Connect from multiple VPC networks, including cross-cloud and on-premises VPC networks. Recommended over private services access: better IP address space management, scalability and security controls. Default private IP option in the Google Cloud console for new projects. |
| Private services access | Earlier type of private IP connectivity, based on VPC Network Peering. Allows connections from only one VPC network; additional configuration is needed to connect from multiple VPC networks. |

You can use one or both methods. In the console, under **Connections** > **Private IP**, choose **Private Service Connect (PSC)** (default), **Private Service Access (PSA)**, or both.

### Restrictions

- Instances configured with Private Service Connect don't have visibility into the IP addresses of clients.
- Instances configured with both Private Service Connect and private services access can't change the associated VPC network for private services access.

### Requirements

Creating and managing either kind of private IP connection requires that your network and application environment meet requirements and that you hold the right IAM permissions. See the Configure private services access and Configure Private Service Connect pages.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/postgres/private-ip (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/sql/docs/postgres/configure-private-ip (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Managed PostgreSQL / MySQL / SQL Server on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- `--cpu`/`--memory` work only for Enterprise edition. For PostgreSQL 16 and later (default edition Enterprise Plus) add `--edition=ENTERPRISE`, or use `--tier` with an Enterprise Plus machine type (gcloud help: --cpu/--memory not compatible with Enterprise Plus).
- For Shared VPC, private services access is configured through the host project; see the linked pages.
- Official pages: Configure private services access https://docs.cloud.google.com/sql/docs/postgres/configure-private-services-access and Configure Private Service Connect https://docs.cloud.google.com/sql/docs/postgres/configure-private-service-connect.

## Related

- [configure-private-ip.md](./configure-private-ip.md)
- [about-private-service-connect.md](./about-private-service-connect.md)
- [connect-multiple-vpcs.md](./connect-multiple-vpcs.md)
- [connect-to-instance-from-outside-vpc.md](./connect-to-instance-from-outside-vpc.md)
