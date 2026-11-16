---
source: https://docs.cloud.google.com/oracle/database/docs/overview
---

# Oracle Database@Google Cloud overview and project setup

Oracle Database@Google Cloud runs Oracle Cloud Infrastructure (OCI) database services on OCI Exadata hardware inside Google Cloud data centers. Google Cloud provides the core infrastructure, the network, the physical and network security, and hardware monitoring for the OCI resources. This page also merges the project setup steps (marketplace order, gcloud CLI, API enablement).

## Signature / Usage

### Set the default project for gcloud

Replace `MY_PROJECT_ID` with the ID of your project (not the project name).

```bash
gcloud config set project 'MY_PROJECT_ID'
```

### Project setup steps

1. Confirm an active marketplace order is linked to your OCI account, and install the Google Cloud CLI.
2. Select or create a Google Cloud project and set it as the gcloud default (command above).
3. Verify that billing is enabled. The project must match the project the Oracle Database@Google Cloud order is linked to.
4. Enable the Oracle Database@Google Cloud API (`oracledatabase.googleapis.com`) for the project.

## Options / Props

### Supported OCI products

| Product | Created through Google Cloud |
|---------|------------------------------|
| Exadata Database Service | Exadata Infrastructure instances and Exadata VM Clusters (Exadata Databases can only be created in OCI) |
| Exadata Database Service on Exascale Infrastructure | Exascale VM Clusters and Exascale Storage Vaults |
| Autonomous AI Database Service | Autonomous AI Database |
| Base Database Service | DB system |
| Goldengate | Goldengate resources |

Resources can be managed with the Google Cloud console, the Google Cloud CLI, or the Oracle Database@Google Cloud API. Resources are observed with Cloud Monitoring metrics and logs.

### Project naming rules (from the setup steps)

| Item | Rule |
|------|------|
| Project name | 4 to 30 characters |
| Project ID | 6 to 30 characters; first character a lowercase letter; remaining characters dash, lowercase letter or digit; last character cannot be a dash |

## Notes

- Active marketplace order on the same billing account and the enabled Oracle Database@Google Cloud API are both required before creating any resource.
- Networking must be set up (standalone VPC or Shared VPC with an ODB Network) before creating Exadata Infrastructure or Autonomous AI Database resources.
- Some resource identifiers (such as project IDs) might be retained beyond the life of a project; avoid storing sensitive information in resource identifiers.
- Oracle Database@Google Cloud manages Oracle Exadata / Autonomous AI Database through Google Cloud and is distinct from Cloud SQL / AlloyDB (`gcp-databases-relational`).
- The source also shows Console steps for project setup; purchase, Oracle Database@Google Cloud REST reference, and monitoring pages are not part of this category.
- Source: https://docs.cloud.google.com/oracle/database/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/oracle/database/docs/set-up (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup-oracle-database-environment.md](./setup-oracle-database-environment.md)
- [regions-and-zones.md](./regions-and-zones.md)
- [iam-overview.md](./iam-overview.md)
- [quotas.md](./quotas.md)
