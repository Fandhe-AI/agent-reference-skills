---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-compute

## Signature / Usage

Owner skill: `gcp-compute` (status: 未収録（予定）). gcloud groups: `batch`, `bms`, `cluster-director`, `compute`, `oracle-database`, `vmware`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| Bare Metal Solution | `baremetalsolution.googleapis.com` (v2) | Provides ways to manage Bare Metal Solution hardware installed in a regional extension located near a Google Cloud data center. | — | `baremetalsolution.` | 26 | — | https://cloud.google.com/bare-metal | 未収録（予定） |
| Batch | `batch.googleapis.com` (v1) | An API to manage the running of Batch resources on Google Cloud Platform. | `batch` | `batch.` | 8 | — | https://cloud.google.com/batch/ | 未収録（予定） |
| Cloud Autoscaling | — | — | — | `autoscaling.` | 7 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/autoscaling | 未収録（予定） |
| Cloud OS Config | `osconfig.googleapis.com` (v1, v1alpha, v1beta, v2, v2beta) | OS management tools that can be used for patch management, patch compliance, and configuration management on VM instances. | — | `osconfig.` | 23 | — | https://cloud.google.com/compute/docs/osconfig/rest | 未収録（予定） |
| Cloud TPU | `tpu.googleapis.com` (v1, v1alpha1, v2, v2alpha1) | TPU API provides customers with access to Google TPU technology. | — | `cloudtpu.`, `tpu.` | 6 | — | https://cloud.google.com/tpu/ | 未収録（予定） |
| Cluster Director | `hypercomputecluster.googleapis.com` (v1) | The Cluster Director API lets you deploy, manage, and monitor clusters that run artificial intelligence (AI), machine learning (ML), or high performance computing (HPC) workloads. | — | `hypercomputecluster.` | 3 | — | https://docs.cloud.google.com/cluster-director/docs | 未収録（予定） |
| Compute Engine | `compute.googleapis.com` (alpha, beta, preview, v1) | Creates and runs virtual machines on Google Cloud Platform. | `compute` | `compute.` | 40 | — | https://cloud.google.com/compute/ | 未収録（予定） |
| Confidential Computing | — | — | — | `confidentialcomputing.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/confidentialcomputing | 未収録（予定） |
| Oracle Database@Google Cloud | `oracledatabase.googleapis.com` (v1) | The Oracle Database@Google Cloud API provides a set of APIs to manage Oracle database services, such as Exadata and Autonomous Databases. | — | `oracledatabase.` | 32 | — | https://cloud.google.com/oracle/database/docs | 未収録（予定） |
| Oracle Database@Google Cloud service agent | — | — | — | `oci.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/oci | 未収録（予定） |
| VM Migration | `vmmigration.googleapis.com` (v1, v1alpha1) | Use the Migrate to Virtual Machines API to programmatically migrate workloads. | — | `vmmigration.` | 3 | — | https://cloud.google.com/migrate/virtual-machines | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
