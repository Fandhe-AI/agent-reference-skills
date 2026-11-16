---
source: https://docs.cloud.google.com/sql/docs/postgres/configure-private-ip
---

# Configure private IP

How to configure a Cloud SQL for PostgreSQL instance to use private IP (private services access) at creation or on an existing instance, and how to connect to it from internal sources, external networks, Cloud Shell and non-RFC 1918 ranges.

## Signature / Usage

### Prepare the project (new or empty project)

Enable the Service Networking API and establish VPC Network Peering with Google services first; otherwise creation fails with `SERVICE_NETWORKING_NOT_ENABLED` or `NETWORK_NOT_PEERED`.

With Shared VPC, the address range and the peering belong to the host project that owns the VPC network (`NETWORK_PROJECT_ID`); only the Cloud SQL instance commands run in the service project (`PROJECT_ID`). Run the API enablement below for the service project and again with `--project=NETWORK_PROJECT_ID`: the source says to enable the same APIs, and grant the same user the same permissions, in the host project.

```bash
gcloud services enable \
    sqladmin.googleapis.com \
    compute.googleapis.com \
    servicenetworking.googleapis.com \
    --project=PROJECT_ID
```

Adapted (not in the official docs): `--project=NETWORK_PROJECT_ID` replaces `--project=PROJECT_ID`, so with Shared VPC the range is reserved in the host project that owns the network.

```bash
gcloud compute addresses create google-managed-services-VPC_NETWORK_NAME \
    --global \
    --purpose=VPC_PEERING \
    --prefix-length=16 \
    --network=projects/NETWORK_PROJECT_ID/global/networks/VPC_NETWORK_NAME \
    --project=NETWORK_PROJECT_ID
```

Adapted (not in the official docs): `--project=NETWORK_PROJECT_ID` replaces `--project=PROJECT_ID`, because `--network` names a network in the `--project` project.

```bash
gcloud services vpc-peerings connect \
    --service=servicenetworking.googleapis.com \
    --ranges=google-managed-services-VPC_NETWORK_NAME \
    --network=VPC_NETWORK_NAME \
    --project=NETWORK_PROJECT_ID
```

### New instance with private IP

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

### Existing instance (restarts the instance, causing downtime)

```bash
gcloud beta sql instances patch INSTANCE_ID \
--project=PROJECT_ID \
--network=projects/NETWORK_PROJECT_ID/global/networks/VPC_NETWORK_NAME \
--no-assign-ip \
--enable-google-private-path \
--enforce-new-sql-network-architecture
```

### Connect from a non-RFC 1918 address

```bash
gcloud sql instances patch INSTANCE_NAME \
--authorized-networks=192.88.99.0/24,11.0.0.0/24
```

Adapted (not in the official docs): `--project=NETWORK_PROJECT_ID` replaces `--project=PROJECT_ID`; the peering lives in the VPC network's project (the host project with Shared VPC).

```bash
gcloud compute networks peerings update cloudsql-postgres-googleapis-com \
--network=VPC_NETWORK_NAME \
--export-subnet-routes-with-public-ip \
--project=NETWORK_PROJECT_ID
```

For an instance placed in a privately used public IP range, enable `--import-subnet-routes-with-public-ip` on the same peering update command instead.

## Options / Props

| Placeholder / flag | Description |
|--------------------|-------------|
| `INSTANCE_ID`, `PROJECT_ID` | Instance ID and project ID. |
| `NETWORK_PROJECT_ID` | Project of the VPC network. With Shared VPC, `PROJECT_ID` is the service project and `NETWORK_PROJECT_ID` the host project; the address range, peering and peering route commands use `NETWORK_PROJECT_ID`. Without Shared VPC both are the same project. |
| `VPC_NETWORK_NAME` | VPC network name. |
| `RANGE_NAME` | Optional. Allocated range name; RFC-1035, 1-63 characters. |
| `DATABASE_VERSION` | e.g. `POSTGRES_14`. |
| `--no-assign-ip` | Disables public IP. |
| `--enable-google-private-path` | Lets other Google Cloud services such as BigQuery query data over private IP. Valid only with `--no-assign-ip` and `--network`. |
| `--enforce-new-sql-network-architecture` | Enforce the new network architecture; make sure enough IP addresses are allocated or creation may fail. |
| `compute.networkAdmin` | Role (`roles/compute.networkAdmin`) for creating private services access connections, on the project hosting the instance (and the host project for Shared VPC). |

Permissions: `compute.addresses.create`, `compute.addresses.list`, `compute.globalAddresses.create`, `compute.globalAddresses.createInternal`, `compute.globalAddresses.list`, `compute.networks.list`, `compute.networks.use`, `servicenetworking.services.addPeering`, `serviceusage.services.list`.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-private-ip (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-private-services-access (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: `gcloud compute addresses create` used `--project=PROJECT_ID`, which this page defines as the Shared VPC service project; the allocated range must be in the VPC network's project, so it uses `--project=NETWORK_PROJECT_ID`. Evidence: this page's own `--network=projects/NETWORK_PROJECT_ID/...` value and its note that the host project needs the same APIs and permissions, plus https://docs.cloud.google.com/sql/docs/postgres/configure-private-services-access (enable the APIs in the Shared VPC host project; grant `roles/compute.networkAdmin` in the host project). Not from the source: that the `--project` of this command must be the host project is inferred from those statements.
- Adapted from the official docs: `gcloud services vpc-peerings connect` used `--project=PROJECT_ID`; its gcloud help defines `--network` as "the network in the current project", so with Shared VPC the service project has no such network and it uses `--project=NETWORK_PROJECT_ID`.
- Adapted from the official docs: `gcloud compute networks peerings update` used `--project=PROJECT_ID`; https://docs.cloud.google.com/sql/docs/postgres/configure-private-services-access says `PROJECT_ID` there is the project of the VPC network (the host project with Shared VPC), so it uses `--project=NETWORK_PROJECT_ID`. The `--import-subnet-routes-with-public-ip` variant takes the same project.
- Source inconsistency: this page says that with Shared VPC `PROJECT_ID` must be the service project for all its gcloud commands, including the range and peering commands; configure-private-services-access uses the host project (the VPC network's project) for the peering and route commands.
- The source also shows Console, Terraform and REST (v1, v1beta4) forms, omitted here. The REST bodies in the source omit a comma after `"allocatedIpRange": "RANGE_NAME"`, so they are not valid JSON as printed.
- After configuring private IP you cannot disable private IP connectivity. After creation you can't assign or change an allocated range name. Address ranges can be specified only for a primary, not for a read replica or clone.
- `--cpu`/`--memory` work only for Enterprise edition. For PostgreSQL 16 and later (default edition Enterprise Plus) add `--edition=ENTERPRISE`, or use `--tier` with an Enterprise Plus machine type (gcloud help: --cpu/--memory not compatible with Enterprise Plus).
- Configuring an existing instance restarts it (downtime). You can't assign a private IP to an existing instance in a Shared VPC network.
- There is an internal per-project limit on network-region combinations for private services access; reuse existing networks. Separate VPC networks isolate better than the `default` VPC.
- Cloud Shell can't connect to a private-IP-only instance (no path into your VPC). From external networks use Cloud VPN / Cloud Interconnect: export custom routes on all peerings (`cloudsql-mysql-googleapis-com`, `cloudsql-postgres-googleapis-com`, `servicenetworking-googleapis-com`, as present), advertise the allocated range from Cloud Router; default route 0.0.0.0/0 can't be imported into the Cloud SQL VPC.
- RFC 1918 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are authorized automatically; non-RFC 1918 ranges need authorized networks or the Auth Proxy. The `--authorized-networks` command overwrites all existing authorized networks. Authorizing non-RFC 1918 clients adds a source-address allowance; keep the list minimal.
- A write endpoint (global DNS name that follows the primary) exists only for Enterprise Plus instances with private IP; Cloud SQL generates it when the Cloud DNS API is enabled.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and `mssql` / `drizzle` client code.

## Related

- [private-ip.md](./private-ip.md)
- [authorize-networks.md](./authorize-networks.md)
- [about-private-service-connect.md](./about-private-service-connect.md)
- [connect-to-instance-from-outside-vpc.md](./connect-to-instance-from-outside-vpc.md)
