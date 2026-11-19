---
source: https://docs.cloud.google.com/bigquery/docs/authorized-views
---

# Authorized views

Authorized views and authorized materialized views share a subset of a dataset's data with specific principals. They can query the view but cannot access the source dataset directly; the view itself is granted read access to the source dataset.

## Signature / Usage

### Steps

1. Create a dataset for the source data and load data into a table in it.
2. Create a dataset for the view (a different dataset from the source dataset).
3. Create the view from a SQL query that restricts the visible columns.
4. Grant analysts permission to run query jobs and access to the dataset containing the view.
5. Grant the view access to the source dataset (Console: source dataset, **Sharing** > **Authorize views**, enter `PROJECT_ID.DATASET_ID.VIEW_NAME`).

The source also shows Console and Terraform; see the tutorial "Create an authorized view" for the complete flow.

### Remove authorization by deleting the view

Adapted (not in the official docs): the source writes `project_id:dataset:table_id`, which is not a valid table identifier; the identifier is changed to `project_id:dataset.table_id`.

```bash
bq rm \
project_id:dataset.table_id
```

The API equivalent is `tables.delete` with `projectID`, `datasetID`, `tableID`.

### VPC Service Controls rules (caller in project R, view in project A, source in project B)

Adapted (not in the official docs): `method: *` is not valid YAML (`*` starts an alias); it is quoted as `"*"`. `identityType: caller_r` is written as an `identities` list with the placeholder `CALLER_R`, and `sources[].resource` is a single string, not a list. `project_r` is the source's placeholder.

```yaml
- ingressFrom:
    identities:
    - CALLER_R
    sources:
    - resource: projects/project_r
  ingressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      - method: "*"
    resources:
    - projects/project_b
  title: Ingress rules for the source project
```

Egress rules for the source project (a set is also needed for `PROJECT_A`, the view project):

Adapted (not in the official docs): `method: *` is not valid YAML (`*` starts an alias); it is quoted as `"*"`. `identityType: caller_r` is written as an `identities` list with the placeholder `CALLER_R`, and `sources[].resource` is a single string, not a list. `sourceRestriction: SOURCE_RESTRICTION_ENABLED` is added, which `egressFrom` requires when `sources` is set.

```yaml
- egressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      - method: "*"
    resources:
    - projects/project_b
  egressFrom:
    identities:
    - CALLER_R
    sources:
    - resource: projects/project_r
    sourceRestriction: SOURCE_RESTRICTION_ENABLED
  title: Egress rules for the source project
```

## Options / Props

### Permissions

| Where | Requirement |
|-------|-------------|
| Project (create a dataset) | `bigquery.datasets.create` |
| Dataset containing the view | `bigquery.tables.create` (`roles/bigquery.dataEditor` includes it); views are table resources |
| Table queried by the view, if you lack access | `bigquery.tables.getData` |
| Source dataset (to authorize a view) | `bigquery.datasets.update`, `datasets.getIamPolicy`, `datasets.setIamPolicy` |
| Project where the query job runs, for users | `roles/bigquery.jobUser` (or `roles/bigquery.user`), grants `bigquery.jobs.create` |
| Dataset containing the view, for users | `roles/bigquery.dataViewer`, grants `bigquery.tables.getData` |

### Limits

| Limit | Value |
|-------|-------|
| Authorized resources in a dataset's ACL (authorized views, authorized datasets, authorized functions) | Up to 2,500 total |
| Removal of a deleted authorized view from the list | Up to 24 hours (counts against the authorized view limit meanwhile) |

## Notes

- Alternatives: row-level policies, column-level policies (policy tags), a separate table, or sharing all views in a dataset (authorized datasets). A separate table is the most secure but least flexible; row-level policies are flexible and secure; authorized views are flexible with the best performance. Group related views into authorized datasets for new architectures, especially multi-tenant ones.
- Source dataset and the dataset containing the authorized view must be in the same regional location. You can't create an authorized view in a secondary replica.
- You can't change an authorized view's SQL unless you are a data owner. Creating or updating an authorized view in an authorized dataset does not need `bigquery.datasets.update`.
- The user does not need IAM permissions on the source data project, but under VPC Service Controls the ingress rule must permit the BigQuery service in the source project as well as the view project.
- If authorization is revoked across a VPC Service Controls perimeter, queries fall back to standard checks on base tables and can fail with ingress / egress violations until authorization is restored.
- After removing a view, wait 24 hours before reusing its name or use a unique name. Try deletes on a disposable view first.
- Row-level security of the source table filters data shown in the view. Column-level security applies independently of whether the view is authorized. Materialized views over tables in a BigQuery sharing (formerly Analytics Hub) linked dataset are not supported.
- Omitted: Console steps and the Terraform sample (`google_bigquery_dataset_access` with a `view` block).
- Corrected from the official docs: the `bq rm` example wrote the identifier as `project_id:dataset:table_id`; a table is `project_id:dataset.table_id`.
- Corrected from the official docs: the VPC Service Controls rules wrote `method: *`, which is not valid YAML (`*` starts an alias); it is quoted as `"*"`.
- Corrected from the official docs: the rules write `identityType: caller_r` and `sources: - resource: [projects/project_r]`; `identityType` takes only `ANY_IDENTITY`, `ANY_USER_ACCOUNT` or `ANY_SERVICE_ACCOUNT`, specific callers go in `identities` (for example `user:alice@example.com` or `serviceAccount:SA_EMAIL`), and `IngressSource.resource` / `EgressSource.resource` are strings (`projects/PROJECT_NUMBER`).
- Corrected from the official docs: the egress rule sets `egressFrom.sources` without `sourceRestriction`; when `sources` is not empty, `sourceRestriction` must be `SOURCE_RESTRICTION_ENABLED` (Access Context Manager `EgressFrom`).
- Source: https://docs.cloud.google.com/bigquery/docs/authorized-views (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [authorized-datasets.md](./authorized-datasets.md)
- [access-control.md](./access-control.md)
- [conditions.md](./conditions.md)
