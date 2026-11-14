---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-data-pipelines

## Signature / Usage

Owner skill: `gcp-data-pipelines` (status: 未収録（予定）). gcloud groups: `composer`, `data-fusion`, `dataflow`, `datapipelines`, `dataproc`, `datastream`, `metastore`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| BigQuery Engine for Apache Flink | — | — | — | `managedflink.` | 4 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/managedflink | 未収録（予定） |
| Cloud Data Fusion | `datafusion.googleapis.com` (v1, v1beta1) | Cloud Data Fusion is a fully-managed, cloud native, enterprise data integration service for quickly building and managing data pipelines. It provides a graphical interface to increase time efficiency and reduce complexity, and allows business users, developers, and data scientists to easily and reliably build scalable data integration solutions to cleanse, prepare, blend, transfer and transform data without having to wrestle with infrastructure. | — | `datafusion.` | 7 | — | — | https://cloud.google.com/data-fusion/docs | 未収録（予定） |
| Customer Usage Data Processing | — | — | — | `dataprocessing.` | 4 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/dataprocessing | 未収録（予定） |
| Data Pipelines | `datapipelines.googleapis.com` (v1) | Data Pipelines provides an interface for creating, updating, and managing recurring Data Analytics jobs. | `datapipelines` | `datapipelines.` | 4 | — | — | https://cloud.google.com/dataflow/docs/guides/data-pipelines | 未収録（予定） |
| Dataflow | `dataflow.googleapis.com` (v1b3) | Manages Google Cloud Dataflow projects on Google Cloud Platform. | `dataflow` | `dataflow.` | 5 | — | — | https://cloud.google.com/dataflow | 未収録（予定） |
| Dataproc Metastore | `metastore.googleapis.com` (v1, v1alpha, v1beta) | The Dataproc Metastore API is used to manage the lifecycle and configuration of metastore services. | `metastore` | `metastore.` | 14 | — | — | https://cloud.google.com/dataproc-metastore/docs | 未収録（予定） |
| Datastream | `datastream.googleapis.com` (v1, v1alpha1) | — | `datastream` | `datastream.` | 4 | — | — | https://cloud.google.com/datastream/ | 未収録（予定） |
| Managed Service for Apache Airflow | `composer.googleapis.com` (v1, v1beta1) | Manages Apache Airflow environments on Google Cloud Platform. | `composer` | `composer.` | 11 | Cloud Composer | — | https://cloud.google.com/composer/ | 未収録（予定） |
| Managed Service for Apache Spark | `dataproc.googleapis.com` (v1) | Manages Hadoop-based clusters and jobs on Google Cloud Platform. | `dataproc` | `dataproc.` | 9 | Dataproc | — | https://cloud.google.com/dataproc/ | 未収録（予定） |
| Managed Service for Apache Spark Resource Manager | — | — | — | `dataprocrm.` | 3 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/dataprocrm | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
