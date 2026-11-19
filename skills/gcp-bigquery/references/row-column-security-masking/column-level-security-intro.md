---
source: https://docs.cloud.google.com/bigquery/docs/column-level-security-intro
---

# BigQuery column-level access control introduction

BigQuery restricts access to sensitive columns with policy tags (based on Data Catalog Policy Tag Manager taxonomies) or data governance tags (Resource Manager tags). At query time BigQuery checks the column's policy tag and its IAM policy. Dynamic data masking can optionally be layered on top. This page describes policy tags.

## Signature / Usage

### Workflow

1. Define a taxonomy and policy tags.
2. Assign policy tags to BigQuery columns using schema annotations.
3. Enforce access control on the taxonomy (this applies the restrictions of all policy tags in it).
4. Manage access on the policy tags with IAM policies; the policy applies to each column that belongs to the tag.

### Assign a policy tag in a table schema (`bq update`)

The `names` field of `policyTags` holds the ID of the policy tag:

```text
[
 ...
 {
   "name": "ssn",
   "type": "STRING",
   "mode": "REQUIRED",
   "policyTags": {
     "names": ["projects/project-id/locations/location/taxonomies/taxonomy-id/policyTags/policytag-id"]
   }
 },
 ...
]
```

### Query a table with protected columns

A user with dataset access but without the Fine-Grained Reader role gets an error listing the inaccessible columns on `SELECT *`. Exclude them:

```sql
SELECT * EXCEPT (ssn) FROM ...
```

### Keep policy tags when writing query results

```bash
bq query --destination_table mydataset.mytable2 \
  --use_legacy_sql=false --destination_schema=schema.json \
  'SELECT * FROM mydataset.mytable1'
```

## Options / Props

### Roles used with column-level access control

| Role/ID | Permissions | Description |
|---|---|---|
| Data Catalog Policy Tag Admin (`datacatalog.categoryAdmin`) | `datacatalog.categories.getIamPolicy`, `datacatalog.categories.setIamPolicy`, `datacatalog.taxonomies.create`, `datacatalog.taxonomies.delete`, `datacatalog.taxonomies.get`, `datacatalog.taxonomies.getIamPolicy`, `datacatalog.taxonomies.list`, `datacatalog.taxonomies.setIamPolicy`, `datacatalog.taxonomies.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list` | Applies at the project level. Create, read, update and delete taxonomies and policy tags; get and set IAM policies on policy tags. |
| BigQuery Data Policy Admin (`bigquerydatapolicy.admin`), BigQuery Admin (`bigquery.admin`) or BigQuery Data Owner (`bigquery.dataOwner`) | `bigquery.dataPolicies.create`, `bigquery.dataPolicies.delete`, `bigquery.dataPolicies.get`, `bigquery.dataPolicies.getIamPolicy`, `bigquery.dataPolicies.list`, `bigquery.dataPolicies.setIamPolicy`, `bigquery.dataPolicies.update` | `create` and `list` apply at the project level, the others at the data policy level. Create, read, update and delete data policies; get and set IAM policies on them. Also needs `datacatalog.taxonomies.get` (from several Data Catalog predefined roles). |
| Fine-Grained Reader (`datacatalog.categoryFineGrainedReader`) | `datacatalog.categories.fineGrainedGet` | Applies at the policy tag level. Access the content of columns restricted by a policy tag. |

### Impact of writes on policy tag checks

| Operation | Fine-grained read access required |
|---|---|
| Read from tables (including wildcard tables), views, copying tables | Always required |
| `INSERT` | Not required (inserted data is unreadable without fine-grained read access) |
| `INSERT SELECT` | Required on the queried table |
| `UPDATE`, `DELETE`, `MERGE` | Required on the read columns |
| Load from local files or Cloud Storage | Not checked on the destination columns |
| Streaming | Policy tags not checked (inserted data is unreadable without fine-grained read access) |

### Implicit removal of policy tags

| Operation | Effect on policy tags |
|---|---|
| `WRITE_TRUNCATE` write disposition (including `bq load --replace` and a query with `writeDisposition` `WRITE_TRUNCATE`) | Overwrites existing tags on the destination table unless a new schema with policy tags is provided (for example `--destination_schema`) |
| `WRITE_APPEND` write disposition | Destination table's tags preserved |
| `CREATE OR REPLACE TABLE` | All existing policy tags on the original table are dropped |
| Table deletion or expiration | All associated tags are removed from the table's schema |
| Copy of a table without tags onto a destination that has tags | Destination tags removed, unless `--append_table` or `"writeDisposition": "WRITE_APPEND"` is used |
| `TRUNCATE TABLE` (DML) | Does not remove policy tags |

### Limits

| Limit | Value |
|---|---|
| Policy tags per column | 1 |
| Unique policy tags per table | 1,000 |
| Taxonomies per project per location | 40 |
| Policy tags per taxonomy | 100 |
| Taxonomy or policy tag name | 200 bytes in UTF-8 |
| Policy tag hierarchy depth | 5 levels from root node to lowest-level subtag |
| Taxonomy name uniqueness | Unique among all projects within an organization |

## Notes

- This feature may not be available when using reservations that are created with certain BigQuery editions; see the BigQuery editions introduction.
- The `datacatalog.googleapis.com` API must remain enabled to create and manage the Data Catalog policy tags and taxonomies used for data masking and column-level security. Data Catalog metadata search and catalog features are deprecated and transitioning to Knowledge Catalog; the Policy Tag Manager service (taxonomies and policy tags), its `datacatalog.googleapis.com` API methods and audit logs, and the `roles/datacatalog` IAM roles are not deprecated.
- Column-level access control is enforced in addition to dataset ACLs; a user needs both dataset permission and policy tag permission. When the console enforces access control on a taxonomy, the service silently creates a data policy.
- Views: column-level security is enforced transparently whether or not the view is authorized (explicitly, or implicitly through an authorized dataset). For a non-authorized view the user needs IAM access to the underlying tables and dataset plus column-level access. For an authorized view only the column-level security on the underlying tables controls access; table-level and dataset-level IAM policies are not used.
- Time travel and materialized views with `max_staleness`: if the schema at time t is identical to or a subset of the current schema, the latest column-level security on the current table is checked. If the schema differs, the query fails. To delete or mask sensitive data in protected columns, relax column-level security safely only after the configured time travel window has passed since the clean-up of the data.
- Schema changes with `--destination_schema` happen in a separate operation from query execution; if the query then raises an exception, the schema changes may be skipped, so check and manually update the destination table schema. Writing results with `--destination_table` removes existing policy tags unless the schema is given.
- Destructive: `CREATE OR REPLACE TABLE`, `bq load --replace` and `WRITE_TRUNCATE` queries remove policy tags; try them on a disposable table first.
- Location: taxonomies are regional; the taxonomy and the table must be in the same regional location to apply a tag to a column (replicate the taxonomy to use it in other locations). References across organizations are not possible; a table and its policy tags must be in the same organization.
- Limitations: migrating a project between organizations does not update taxonomies, so recreate them in the destination organization; supported only for BigLake tables, BigQuery tables and BigQuery Omni tables; legacy SQL is rejected when target tables have policy tags; copying a table across regions is rejected if column-level or row-level access control is enabled (any policy tags on the source tables). Quotas: see Data policies in BigQuery quotas and limits.
- Sensitive Data Protection data profiles can help find which columns need policy tags.
- Pricing: requires BigQuery and Data Catalog; see the BigQuery pricing and Data Catalog pricing pages. Audit logging: reads of tagged columns save the referenced policy tags in Cloud Logging, not associated with the triggering query.
- The JSON fragment keeps the source's `...` elisions, so it is fenced as `text`; the source also shows the console path to set a policy tag.
- Source: https://docs.cloud.google.com/bigquery/docs/column-level-security-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [column-level-security-writes.md](./column-level-security-writes.md)
- [best-practices-policy-tags.md](./best-practices-policy-tags.md)
- [column-data-masking-intro.md](./column-data-masking-intro.md)
- [row-level-security-intro.md](./row-level-security-intro.md)
