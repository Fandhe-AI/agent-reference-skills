---
source: https://docs.cloud.google.com/oracle/database/docs/create-odb-network
---

# Create an ODB Network and ODB Subnets

An ODB Network provides connectivity between Oracle Database@Google Cloud resources in the OCI child site and your Google Cloud VPC network, mapping OCI VCNs and subnets back to Google Cloud. Creating one automatically provisions the VCN, subnets, DNS zones and other underlying objects; up to five ODB Subnets can be created in it.

## Signature / Usage

### Create an ODB Network

Replace the following: `ODB_NETWORK_ID` (unique identifier), `PROJECT_ID` (project in which to create the ODB Network; the host project for Shared VPC), `REGION`, `VPC_NETWORK` (VPC network to associate), `GCP_ORACLE_ZONE`. For `psc-interface-config-network-attachment`, `PROJECT_ID` / `REGION` / `NETWORK_ATTACHMENT_ID` identify the network attachment. Configure `psc-interface-config-network-attachment` only if you intend to associate the ODB Network with a Database Connection to execute SQL on the database; otherwise skip it.

```bash
gcloud oracle-database odb-networks create ODB_NETWORK_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --network=projects/PROJECT_ID/global/networks/VPC_NETWORK \
    --gcp-oracle-zone=GCP_ORACLE_ZONE \
    --psc-interface-config-network-attachment=projects/PROJECT_ID/regions/REGION/networkAttachments/NETWORK_ATTACHMENT_ID
```

### Create an ODB Subnet

Replace `ODB_SUBNET_ID`, `PROJECT_ID`, `REGION`, `ODB_NETWORK_ID`, `CIDR_RANGE` (client subnet: IPv4 address or range that can access your cluster; backup subnet: range that serves as backup to access your cluster; valid CIDR notation, for example 10.10.10.0/24) and `PURPOSE` (`client-subnet` or `backup-subnet`).

```bash
gcloud oracle-database odb-networks odb-subnets create ODB_SUBNET_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --odb-network=ODB_NETWORK_ID \
    --cidr-range=CIDR_RANGE \
    --purpose=PURPOSE
```

### Enable service connectivity on an existing ODB Network

Create the network attachment first (see Options / Props). Wait for the enable operation to complete before creating or using a Database Connection.

```bash
gcloud oracle-database odb-networks update ODB_NETWORK_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --psc-interface-config-network-attachment=projects/PROJECT_ID/regions/REGION/networkAttachments/NETWORK_ATTACHMENT_ID
```

### Disable service connectivity

If a Database Connection uses the ODB Network, delete the Database Connection first.

```bash
gcloud oracle-database odb-networks update ODB_NETWORK_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --clear-service-connectivity-config
```

## Options / Props

### ODB Subnets

| Item | Detail |
|------|--------|
| Maximum per ODB Network | 5 |
| Client ODB Subnet | Connects applications; one client subnet can serve both Autonomous AI Databases and Exadata VM Clusters |
| Backup ODB Subnet | Backs up database services |
| Exadata VM Cluster needs | 1 client subnet and 1 backup subnet |
| Autonomous AI Database needs | 1 client subnet |

### Network attachment prerequisites (for Database Connections that execute SQL)

| Requirement | Detail |
|-------------|--------|
| Same region | The attachment must be in the same region as the ODB Network |
| Subnet | Must reference a subnet in your VPC network |
| Accept list | Must accept the Oracle Database service; set `connection_preference = ACCEPT_AUTOMATIC` |
| Immutable | Cannot be changed once set; remove it and set a new one, or create a new ODB Network |
| Connectivity | Oracle Database@Google Cloud uses Private Service Connect to connect to the databases |
| Permissions on the ODB Network | `oracledatabase.odbNetworks.use`, `oracledatabase.odbNetworks.get` (contained in `roles/oracledatabase.odbNetworkAdmin` and `roles/oracledatabase.networkAdmin`) |

## Notes

- Create the ODB Network in the project associated with the billing account used for the marketplace order (the host project for Shared VPC), and in the same region and zone as the Exadata Infrastructure, Exadata VM Cluster or DB system. The region and zone choice is permanent; in the console you can select `Any` and Google Cloud picks a zone.
- Service connectivity cannot be disabled while any Database Connection uses the ODB Network; enabling can take several minutes.
- The source also shows Console steps and REST `curl` forms (POST create network, POST create subnet, PATCH enable, PATCH disable with `?updateMask=serviceConnectivityConfig` and body `{}`); they are omitted here because the source's `curl` blocks are broken (the URL line lacks a trailing `\` so `-d` is not passed, and the create-network body lacks a comma after `"gcpOracleZone"`).
- Corrected from the official docs: the source lists `client_subnet` / `backup_subnet` as the accepted `PURPOSE` values; gcloud 593.0.0 accepts `client-subnet` / `backup-subnet` (REST `CLIENT_SUBNET` / `BACKUP_SUBNET`).
- Required IAM roles are listed at https://docs.cloud.google.com/oracle/database/docs/setup-oracle-database-environment#deploy-odb-environment; VPC networks and network attachments themselves are in the planned `gcp-networking`.
- Next steps in the source: custom DNS domains, Exadata Infrastructure, Exadata VM Cluster, Autonomous AI Database, Database Connections.
- Source (`--purpose` values): `gcloud oracle-database odb-networks odb-subnets create --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/oracle/database/docs/create-odb-network (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup-oracle-database-environment.md](./setup-oracle-database-environment.md)
- [create-instances.md](./create-instances.md)
- [create-databases.md](./create-databases.md)
- [regions-and-zones.md](./regions-and-zones.md)
