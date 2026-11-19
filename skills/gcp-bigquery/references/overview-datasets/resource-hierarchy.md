---
source: https://docs.cloud.google.com/bigquery/docs/resource-hierarchy
---

# Resource hierarchy

BigQuery inherits the Google Cloud resource hierarchy (organization, folders, projects) and adds datasets as a BigQuery-specific grouping. The hierarchy determines workload management, permissions, quotas, slot reservations, and billing.

## Signature / Usage

### Create a dataset (the container below a project)

Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (the dataset is created in the default project).

```bash
bq --location=US mk -d \
    --default_table_expiration 3600 \
    --description "This is my dataset." \
    mydataset
```

## Options / Props

### Hierarchy elements

| Element | Description |
|---|---|
| Organization | Root node of the Google Cloud hierarchy. Not required to start, but recommended so administrators control resources centrally. |
| Folder | Grouping above projects. Projects and folders inherit the access policies of the parent folder. Not the same as BigQuery folders for code assets. |
| Project | Every dataset belongs to a project. A project can hold datasets in different locations. A Cloud Billing account is attached to each project. |
| Dataset | Logical container (similar to a schema). Tables, views, functions, and procedures live in a dataset. Connections and jobs are associated with projects, not datasets. |

### Considerations

| Topic | Rule |
|---|---|
| Quotas | Many quotas apply at the project level, a few at the dataset level. Project-level compute quotas (queries, load jobs) count against the project that creates the job, not the storage project. |
| Billing | On-demand pricing bills queries to the project that runs the query. Capacity-based pricing bills slot reservations to the administration project. Storage is charged to the project where the dataset resides. |
| Slot reservations | Reserved slots are scoped to the Organization resource; assign them to any project or folder in the organization, or to the whole organization. Projects inherit reservations from their parent folder or organization. |
| Permissions | Tables inherit from the parent dataset; datasets inherit from projects, folders, and organizations. An operation needs the permission on the resource and permission to create a BigQuery job (granted on the project used for the job). |
| Jobs | A job belongs to a project but need not run in the project that holds the data; it can reference tables in several projects. Query, load, and extract jobs run in the same location as the tables they reference. |
| Location | A dataset has a location; table data is stored there. A dataset location cannot be changed after creation. |

### Patterns

| Pattern | Structure | Typical permissions |
|---|---|---|
| Central data lake, department data marts | One storage project for raw data (ingestion pipeline can run there); each department has its own data mart project tied to its billing account. | Data engineering team: BigQuery Data Editor and BigQuery Job User on the storage project. Analysts: BigQuery Data Viewer on specific datasets in the lake project; BigQuery Data Editor and Job User on their department's data mart project. |
| Department data lakes, central data warehouse | Each department owns a storage project; a central data warehouse project holds aggregations and serves BI tools. | Data engineers: Data Editor and Job User in their department's data mart. Analysts: Data Editor and Job User in the warehouse project. BI service accounts: BigQuery Data Viewer on specific datasets. |

## Notes

- Authorized views and authorized user-defined functions can expose aggregated data without granting access to the raw data in data mart projects.
- The data warehouse pattern can produce many concurrent queries in one project and may hit the concurrent query limit; the source recommends raising that quota and considering capacity-based billing.
- Source: https://docs.cloud.google.com/bigquery/docs/resource-hierarchy (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Resource hierarchy, organization policy, and IAM in general are in the `gcp-foundation` skill.

## Related

- [datasets-intro.md](./datasets-intro.md)
- [datasets.md](./datasets.md)
- [introduction.md](./introduction.md)
