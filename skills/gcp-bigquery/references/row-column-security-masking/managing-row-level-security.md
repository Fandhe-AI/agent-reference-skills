---
source: https://docs.cloud.google.com/bigquery/docs/managing-row-level-security
---

# Use row-level security

How to create, update, combine, list, delete and query row-level access policies on a BigQuery table. Policies are created, replaced and dropped with GoogleSQL DDL; they are listed with the console, `bq ls --row_access_policies` or the `RowAccessPolicies.List` REST method.

## Signature / Usage

### Create or update a policy

Set up at least two policies on a table: one that grants full access to users and groups that need all the data (for example BigQuery administrators and service accounts that run DML), and one that filters access by business logic. Statements: `CREATE ROW ACCESS POLICY`, `CREATE ROW ACCESS POLICY IF NOT EXISTS`, `CREATE OR REPLACE ROW ACCESS POLICY` (updates the policy with the same name).

Grant access to a Google Account:

```sql
CREATE ROW ACCESS POLICY apac_filter
ON project.dataset.my_table
GRANT TO ('user:abc@example.com')
FILTER USING (region = 'APAC');
```

Grant access to a single identity in a workforce identity pool (`principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/IDENTITY`):

```sql
CREATE ROW ACCESS POLICY apac_filter
ON project.dataset.my_table
GRANT TO ('principal://iam.googleapis.com/locations/global/workforcePools/example-contractors/subject/abc@example.com')
FILTER USING (region = 'APAC');
```

Update a policy to grant access to a service account:

```sql
CREATE OR REPLACE ROW ACCESS POLICY apac_filter
ON project.dataset.my_table
GRANT TO ('serviceAccount:example@exampleproject.iam.gserviceaccount.com')
FILTER USING (region = 'APAC');
```

Grant access to a user and two groups:

```sql
CREATE ROW ACCESS POLICY sales_us_filter
ON project.dataset.my_table
GRANT TO ('user:john@example.com',
          'group:sales-us@example.com',
          'group:sales-managers@example.com')
FILTER USING (region = 'US');
```

Grant access to workforce identities in groups:

```sql
CREATE ROW ACCESS POLICY sales_us_filter
ON project.dataset.my_table
GRANT TO ('principal://iam.googleapis.com/locations/global/workforcePools/example-contractors/subject/sales-us@example.com',
          'principal://iam.googleapis.com/locations/global/workforcePools/example-contractors/subject/sales-managers@example.com')
FILTER USING (region = 'US');
```

Grant access to all authenticated users (`allAuthenticatedUsers`):

```sql
CREATE ROW ACCESS POLICY us_filter
ON project.dataset.my_table
GRANT TO ('allAuthenticatedUsers')
FILTER USING (region = 'US');
```

Filter on the current user:

```sql
CREATE ROW ACCESS POLICY my_row_filter
ON dataset.my_table
GRANT TO ('domain:example.com')
FILTER USING (email = SESSION_USER());
```

Filter on an `ARRAY` column:

```sql
CREATE ROW ACCESS POLICY my_reports_filter
ON project.dataset.my_table
GRANT TO ('domain:example.com')
FILTER USING (SESSION_USER() IN UNNEST(reporting_chain));
```

Use a subquery on a lookup table to replace several policies. The lookup table:

```text
+-----------------+--------------+
|      email      |    region    |
+-----------------+--------------+
| xyz@example.com | europe-west1 |
| abc@example.com | us-west1     |
| abc@example.com | us-west2     |
+-----------------+--------------+
```

```sql
CREATE OR REPLACE ROW ACCESS POLICY apac_filter
ON project.dataset.my_table
GRANT TO ('domain:example.com')
FILTER USING (region IN (
    SELECT
      region
    FROM
      lookup_table
    WHERE
      email = SESSION_USER()));
```

The preceding policy yields the same result as these two policies:

```sql
CREATE OR REPLACE ROW ACCESS POLICY us_filter
ON project.dataset.my_table
GRANT TO ('user:abc@example.com')
FILTER USING (region IN ('us-west1', 'us-west2'));

CREATE OR REPLACE ROW ACCESS POLICY eu_filter
ON project.dataset.my_table
GRANT TO ('user:xyz@example.com')
FILTER USING (region = 'europe-west1');
```

### Combine policies

If two or more policies grant a principal access to the same table, the principal sees all data covered by any of them (an `OR`). These two policies give `abc@example.com` shoes and also blue products (for example red shoes and blue cars):

```sql
CREATE ROW ACCESS POLICY shoes
ON project.dataset.my_table
GRANT TO ('user:abc@example.com')
FILTER USING (product_category = 'shoes');
```

```sql
CREATE OR REPLACE ROW ACCESS POLICY blue_products
ON project.dataset.my_table
GRANT TO ('user:abc@example.com')
FILTER USING (color = 'blue');
```

Equivalent single policy:

```sql
CREATE ROW ACCESS POLICY shoes_and_blue_products
ON project.dataset.my_table
GRANT TO ('user:abc@example.com')
FILTER USING (product_category = 'shoes' OR color = 'blue');
```

To require several conditions, use `AND` (blue shoes only, not red shoes or blue cars):

```sql
CREATE ROW ACCESS POLICY blue_shoes
ON project.dataset.my_table
GRANT TO ('user:abc@example.com')
FILTER USING (product_category = 'shoes' AND color = 'blue');
```

### List policies

```bash
    bq ls --row_access_policies dataset.table
```

```bash
    bq ls --row_access_policies my_dataset.my_table
```

REST: the `RowAccessPolicies.List` method (`https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/rowAccessPolicies/list`).

### Delete policies

Statements: `DROP ROW ACCESS POLICY`, `DROP ROW ACCESS POLICY IF EXISTS`, `DROP ALL ROW ACCESS POLICIES`.

```sql
DROP ROW ACCESS POLICY my_row_filter ON project.dataset.my_table;
```

```sql
DROP ALL ROW ACCESS POLICIES ON project.dataset.my_table;
```

### Query a table with policies

In the console, a banner says results might be filtered by a row-level access policy, even for grantees. With the Job API the `Job` response reports whether a read table had policies (truncated):

```text
{
  "configuration": {
    "jobType": "QUERY",
    "query": {
      "priority": "INTERACTIVE",
      "query": "SELECT * FROM dataset.table",
      "useLegacySql": false
    }
  },
  ...
  "statistics": {
    ...
    rowLevelSecurityStatistics: {
      rowLevelSecurityApplied: true
    },
    ...
  },
  "status": {
    "state": "DONE"
  },
  ...
}
```

## Options / Props

### Required IAM permissions

| Task | Permissions | Predefined roles |
|---|---|---|
| Create a policy | `bigquery.rowAccessPolicies.create`, `bigquery.rowAccessPolicies.setIamPolicy`, `bigquery.tables.getData` (on the target table and any referenced tables in granted subquery policies), `bigquery.jobs.create` | `roles/bigquery.admin`, `roles/bigquery.dataOwner` |
| Update a policy | `bigquery.rowAccessPolicies.update`, `bigquery.rowAccessPolicies.setIamPolicy`, `bigquery.tables.getData` (same scope as above), `bigquery.jobs.create` | `roles/bigquery.admin`, `roles/bigquery.dataOwner` |
| List policies | `bigquery.rowAccessPolicies.list` | `roles/bigquery.admin`, `roles/bigquery.dataOwner` |
| View policy members | `bigquery.rowAccessPolicies.getIamPolicy` | `roles/bigquery.admin`, `roles/bigquery.dataOwner` |
| Drop a policy | `bigquery.rowAccessPolicies.delete`, `bigquery.rowAccessPolicies.setIamPolicy`, `bigquery.jobs.create` | `roles/bigquery.admin`, `roles/bigquery.dataOwner` |
| Drop all policies on a table | `bigquery.rowAccessPolicies.delete`, `bigquery.rowAccessPolicies.setIamPolicy`, `bigquery.rowAccessPolicies.list`, `bigquery.jobs.create` | `roles/bigquery.admin`, `roles/bigquery.dataOwner` |
| Query a table with policies | `bigquery.tables.getData` on the table and `bigquery.rowAccessPolicies.getFilteredData`; plus `datacatalog.categories.fineGrainedGet` on columns with column-level security | `roles/bigquery.dataViewer` on the table through IAM, and `roles/bigquery.filteredDataViewer` through the row-level access policy; `datacatalog.categoryFineGrainedReader` for protected columns |

## Notes

- Limitation: the console Preview tab cannot show previews of tables with row access policies; run a query instead.
- Apache Iceberg tables managed by the Lakehouse runtime catalog (formerly BigLake): create and drop policies only through GoogleSQL DDL with the four-part `PROJECT_ID.CATALOG_ID.NAMESPACE.TABLE_NAME` identifier. Policies are not supported on federated catalog tables and do not support subqueries in `FILTER USING`. On catalogs that use credential vending mode, the Apache Iceberg REST catalog endpoint returns `403 Forbidden` for direct Cloud Storage credential requests unless the caller has unmasked (`RAW_DATA_ACCESS_POLICY`) access to every protected column and, if the table has policies, unfiltered row access (`FILTER USING (TRUE)`). To create, update, list or delete such policies you need the `biglake.rowAccessPolicies.*` permissions on the table (plus `biglake.tables.getData` to create or update, and `bigquery.jobs.create` on the query project); `roles/biglake.admin` includes them. The API, gcloud and IAM names stay `biglake`.
- BigQuery automatically grants the `bigquery.filteredDataViewer` role to the members of the grantee list. Do not apply `bigquery.filteredDataViewer` directly to a resource through IAM; it is system-managed and must be granted only through row-level access policies.
- Policy rules: each policy on a table needs a unique name; the `filter_expression` matches the data that should be visible to the `grantee_list`; list several principals comma-separated and quoted separately; all identities in the `grantee_list` must exist or the statement fails and no policy is created; row-level access policies cannot be applied on JSON columns.
- Adding or removing members of a policy is supported only with DDL statements.
- Dropping the last policy: `DROP ROW ACCESS POLICY` on the last policy of a table is an error; use `DROP ALL ROW ACCESS POLICIES`. Dropping policies can open or close access for every principal; try it on a disposable table first.
- `allAuthenticatedUsers` as a grantee opens the filtered rows to any authenticated Google Account principal; keep the source's form only for filtered, non-sensitive rows.
- A user needs access to the table itself even when they are on a grantee list; without it the query fails with an `access denied` error.
- When managing access for users in external identity providers, replace Google Account identifiers (`user:kiran@example.com`, `group:support@example.com`, `domain:example.com`) with Workforce Identity Federation principal identifiers.
- The `Job` JSON excerpt is the source's truncated response and uses `...` elisions, so it is fenced as `text`.
- The source also shows the console steps for listing policies.
- Source: https://docs.cloud.google.com/bigquery/docs/managing-row-level-security (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- DDL reference: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_row_access_policy_statement

## Related

- [row-level-security-intro.md](./row-level-security-intro.md)
- [column-level-security-intro.md](./column-level-security-intro.md)
- [column-data-masking-intro.md](./column-data-masking-intro.md)
