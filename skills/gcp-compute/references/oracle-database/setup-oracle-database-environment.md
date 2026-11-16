---
source: https://docs.cloud.google.com/oracle/database/docs/setup-oracle-database-environment
---

# Set up Oracle Database@Google Cloud environment

Describes the deployment options (standalone VPC network or Shared VPC) built on ODB Networks, and the high-level steps and IAM roles needed to deploy Oracle Database@Google Cloud resources.

## Signature / Usage

### Check the gcloud CLI version

The gcloud CLI must be version `532.0.0` or later.

```bash
gcloud version
```

### High-level deployment steps

1. Standalone VPC: create or select a standalone VPC network and a Google Cloud project. Shared VPC: create or select a Shared VPC, a host project and service projects.
2. Make sure billing is enabled for the project.
3. Set up the Google Cloud CLI and enable the Oracle Database@Google Cloud API.
4. Grant the IAM roles below to the user accounts that create resources.
5. Create an ODB Network and ODB Subnets.
6. Provision Exadata Infrastructure, Exadata VM Cluster, Exascale VM Cluster, Autonomous AI Database, DB system or Goldengate deployment.

## Options / Props

### Deployment options

| Type | Description |
|------|-------------|
| Standalone VPC network | One VPC network associated with an ODB Network (example: client subnet CIDR `10.10.0.0/24`) in a single project |
| Shared VPC network | Host project holds the Shared VPC, the ODB Network and ODB Subnets; each service project (App1, App2) maps to a separate OCI compartment |

### ODB Network compared with a VPC network

| Property | ODB Network |
|----------|-------------|
| Scope | Provisioned within a region rather than globally |
| Routing table | None |
| ODB Subnets | Up to five |

### IAM roles: standalone VPC, least privilege (recommended)

| User role | Required IAM roles |
|-----------|--------------------|
| Network administrator | `roles/oracledatabase.odbNetworkAdmin`, `roles/oracledatabase.odbSubnetAdmin` |
| Autonomous AI Database administrator | `roles/oracledatabase.odbSubnetUser`, `roles/oracledatabase.autonomousDatabaseAdmin` |
| Exadata Infrastructure administrator | `roles/oracledatabase.odbSubnetUser`, `roles/oracledatabase.cloudExadataInfrastructureAdmin`, `roles/oracledatabase.cloudVmClusterAdmin` |
| Exascale Infrastructure administrator | `roles/oracledatabase.odbSubnetUser`, `roles/oracledatabase.exadbVmClusterAdmin`, `roles/oracledatabase.exascaleDbStorageVaultAdmin` |
| DB system administrator | `roles/oracledatabase.odbSubnetUser`, `roles/oracledatabase.dbSystemAdmin` |
| Goldengate administrator | `roles/oracledatabase.odbSubnetUser`, `roles/oracledatabase.goldenGateDeploymentAdmin`, `roles/oracledatabase.goldenGateConnectionAdmin`, `roles/oracledatabase.goldenGateConnectionAssignmentAdmin` |

### IAM roles: standalone VPC, all administrative roles to database administrators

| User role | Required IAM roles |
|-----------|--------------------|
| Network Administrator | None |
| Autonomous AI Database administrator | `roles/oracledatabase.odbNetworkAdmin`, `roles/oracledatabase.odbSubnetAdmin`, `roles/oracledatabase.autonomousDatabaseAdmin` |
| Exadata Infrastructure administrator | `roles/oracledatabase.odbNetworkAdmin`, `roles/oracledatabase.odbSubnetAdmin`, `roles/oracledatabase.cloudExadataInfrastructureAdmin`, `roles/oracledatabase.cloudVmClusterAdmin` |
| Exascale Infrastructure administrator | `roles/oracledatabase.odbNetworkAdmin`, `roles/oracledatabase.odbSubnetAdmin`, `roles/oracledatabase.exadbVmClusterAdmin`, `roles/oracledatabase.exascaleDbStorageVaultAdmin` |
| DB system administrator | `roles/oracledatabase.odbNetworkAdmin`, `roles/oracledatabase.odbSubnetAdmin`, `roles/oracledatabase.dbSystemAdmin` |
| Goldengate administrator | `roles/oracledatabase.odbNetworkAdmin`, `roles/oracledatabase.odbSubnetUser`, `roles/oracledatabase.goldenGateDeploymentAdmin`, `roles/oracledatabase.goldenGateConnectionAdmin`, `roles/oracledatabase.goldenGateConnectionAssignmentAdmin` |

### IAM roles: Shared VPC (assign in each project)

| User role | Host project | Service project |
|-----------|--------------|-----------------|
| Network administrator | `roles/oracledatabase.odbNetworkAdmin`, `roles/oracledatabase.odbSubnetAdmin` | None |
| Autonomous AI Database administrator | `roles/oracledatabase.odbSubnetUser` | `roles/oracledatabase.autonomousDatabaseAdmin` |
| Exadata Infrastructure administrator | `roles/oracledatabase.odbSubnetUser` | `roles/oracledatabase.cloudExadataInfrastructureAdmin`, `roles/oracledatabase.cloudVmClusterAdmin` |
| Exascale Infrastructure administrator | `roles/oracledatabase.odbSubnetUser` | `roles/oracledatabase.exadbVmClusterAdmin`, `roles/oracledatabase.exascaleDbStorageVaultAdmin` |
| DB system administrator | `roles/oracledatabase.odbSubnetUser` | `roles/oracledatabase.dbSystemAdmin` |
| Goldengate administrator | `roles/oracledatabase.odbSubnetUser` | `roles/oracledatabase.goldenGateDeploymentAdmin`, `roles/oracledatabase.goldenGateConnectionAdmin`, `roles/oracledatabase.goldenGateConnectionAssignmentAdmin` |

## Notes

- Purchasing and onboarding must be completed first (see https://docs.cloud.google.com/oracle/database/docs/purchase-and-billing#purchase-and-onboard).
- With Shared VPC you can apply the principle of least privilege: you can configure IAM policies that allow only the administrators of `App1` to access their service project and its mapped OCI compartment; network administrators keep ownership of the host project and its mapped compartment. Service projects that do not use Oracle Database@Google Cloud have no mapped compartment and cannot create resources in the ODB Network.
- ODB Networks let network administrators and database administrators work separately, enable Shared VPC, and let administrators select ODB Networks and ODB Subnets while provisioning.
- In the source, the all-administrative-roles table gives the Goldengate administrator `roles/oracledatabase.odbSubnetUser` where the other database rows give `roles/oracledatabase.odbSubnetAdmin`; recorded as written.
- VPC networks, firewall policies and Shared VPC themselves are in the planned `gcp-networking`; this page covers only the ODB Network side. In the source's Shared VPC example, "Access to each Autonomous AI Database is controlled through its Network Security Group" in the Oracle VCN ("The Network Security Group of `App1` prevents the `App2` application server from connecting to the `adbapp1` database").
- Source: https://docs.cloud.google.com/oracle/database/docs/setup-oracle-database-environment (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [create-odb-network.md](./create-odb-network.md)
- [iam-overview.md](./iam-overview.md)
- [regions-and-zones.md](./regions-and-zones.md)
