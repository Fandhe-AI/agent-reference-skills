---
source: https://docs.cloud.google.com/bigquery/docs/row-level-security-intro
---

# BigQuery row-level security introduction

Row-level security filters the rows of a BigQuery table by user condition through row-level access policies. A policy names the table, a `grantee_list` of principals and a `filter_expression` (it works like a `WHERE` clause and matches the rows that are visible to the grantees). Principals that are not in any grantee list see no rows. One table can have several policies, and they coexist with column-level security and with dataset-level, table-level and project-level access controls.

## Signature / Usage

### Filter rows by region

```sql
CREATE TABLE IF NOT EXISTS
  dataset1.table1 (partner STRING,
    contact STRING,
    country STRING,
    region STRING);
INSERT INTO
  dataset1.table1 (partner,
    contact,
    country,
    region)
VALUES
  ('Example Customers Corp', 'alice@examplecustomers.com', 'Japan', 'APAC'),
  ('Example Enterprise Group', 'bob@exampleenterprisegroup.com', 'Singapore', 'APAC'),
  ('Example HighTouch Co.', 'carrie@examplehightouch.com', 'USA', 'US'),
  ('Example Buyers Inc.', 'david@examplebuyersinc.com', 'USA', 'US');
```

```sql
CREATE ROW ACCESS POLICY
  apac_filter
ON
  dataset1.table1 GRANT TO ("group:sales-apac@example.com")
FILTER USING
  (region="APAC" );
```

```sql
CREATE ROW ACCESS POLICY
  us_filter
ON
  dataset1.table1 GRANT TO ("group:sales-us@example.com",
"user:jon@example.com")
FILTER USING
  (region="US");
```

Users that are not in the `APAC` or `US` grantee lists see no rows.

### Filter rows by the current user

```sql
CREATE OR REPLACE TABLE
  dataset1.table1 (name STRING,
    department STRING,
    salary INT64,
    email STRING);
INSERT INTO
  dataset1.table1 ( name,
    department,
    salary,
    email)
VALUES
  ('Jim D', 'HR', 100000, 'jim@example.com'),
  ('Anna K', 'Finance', 100000, 'anna@example.com'),
  ('Bruce L', 'Engineering', 100000, 'bruce@example.com'),
  ('Carrie F', 'Business', 100000, 'carrie@example.com');
```

```sql
CREATE ROW ACCESS POLICY
  salary_personal
ON
  dataset1.table1 GRANT TO ("domain:example.com")
  FILTER USING
  (Email=SESSION_USER());
```

### Filter rows by a lookup table

With subquery support, one row access policy can reference other tables as lookup tables and replace several policies; updating the lookup table updates access without touching each policy. See the managing-row-level-security page for the SQL.

## Options / Props

### Row-level access policies versus other methods

| Method | Security considerations | Recommendation |
|---|---|---|
| Authorized views | Recommended for flexibility. Can be vulnerable to carefully crafted queries, query durations, and other types of side-channel attacks. | Good when you need to share data with others and flexibility and performance are important, for example within your work group. |
| Row-level access policies | Recommended for a balance of flexibility and security. Can be vulnerable to query duration side-channel attacks. | Good when you need to share data with others and want more security than views or table slices, for example people who use the same dashboard but have access to different amounts of data. |
| Separate tables | Recommended for security. Users cannot infer data without access to the table. | Good when you need to keep data isolated, for example with third-party partners and vendors when the total number of rows must be secret. |

### Operations that implicitly remove row access policies

| Operation | Effect on row access policies |
|---|---|
| `WRITE_TRUNCATE` write disposition (including `bq load --replace` and a query with `writeDisposition` set to `WRITE_TRUNCATE`) | Always overwrites the policies on the destination table. |
| `WRITE_APPEND` write disposition | The destination table's policies are preserved and the source table's policies are added. |
| `CREATE OR REPLACE TABLE` | All existing policies on the original table are dropped, even if the replacement query is based on the original table's data. |
| Table deletion or expiration | All associated policies are deleted. |
| Copy of a table without policies onto a destination table that has policies | The destination policies are removed, unless `--append_table` or `"writeDisposition": "WRITE_APPEND"` is used. |
| `TRUNCATE TABLE` (DML) | Does not remove row access policies. |

## Notes

- This feature may not be available when using reservations that are created with certain BigQuery editions; see the BigQuery editions introduction for the features of each edition.
- If you create a new row-level security policy to limit row access, users that previously had full access must be added to a `TRUE` filter to keep their access.
- Policies are created by principals with the BigQuery Admin or BigQuery Data Owner IAM roles.
- When managing access for users in external identity providers, replace Google Account principal identifiers such as `user:kiran@example.com`, `group:support@example.com` and `domain:example.com` with Workforce Identity Federation principal identifiers.
- Side channels such as query duration can leak information about rows at the edge of a storage shard; such attacks would likely require knowledge of how the table is sharded or a large number of queries. Monitor suspicious activity with audit logging, for both authorized views and row-level access policies.
- Pricing: included at no additional cost, but policies with subqueries that reference other tables can cause additional billing; policy filters do not participate in query pruning on partitioned and clustered tables; not all user filters are applied early, so more rows may be read and billed.
- Destructive: `CREATE OR REPLACE TABLE`, `bq load --replace` and `WRITE_TRUNCATE` queries silently remove row access policies. Try them on a disposable table first.
- Audit logging: creation and deletion of policies are audit logged with the policy name, but `filter_expression` and `grantee_list` are omitted from logs; listing and viewing policies are not audit logged. Reads of a table with policies record the authorizing policies (and tables referenced in subqueries) in the IAM authorization information. `INFORMATION_SCHEMA.ROW_ACCESS_POLICIES` returns each policy's target table, name, `filter_predicate`, creation time and last modified time.
- Limitations:
  - Not accelerated: BigQuery BI Engine and materialized views; a small performance degradation may occur.
  - Row access policies are not compatible with Legacy SQL (queries are rejected with an error).
  - Not supported: JSON columns, wildcard table queries, temporary tables, tables that reference other tables that have row-level security, previewing or browsing tables, table sampling.
  - Subquery policies are not compatible with the BigQuery Storage Read API (it only supports simple filter predicates). They support only BigQuery tables, BigLake external tables and BigLake managed tables.
  - Subquery policies have a 100 MB limit on results from top-level subqueries (per policy; the query fails if exceeded). Top-level `IN` subqueries whose `search_value` type is `FLOAT`, `STRUCT`, `ARRAY`, `JSON` or `GEOGRAPHY` are not available. If a referenced table is deleted, the query fails.
  - Column rename and drop statements are permitted only if the column is not part of any row access policy.
  - Policies are created, replaced and deleted with DDL or the row access policy APIs (all API actions are also in the `bq` tool); the Google Cloud console can list and view them.
  - Non-query operations (including service account jobs) that need full table data, such as table copying, can use the `TRUE` filter.
  - Data masking is compatible only with queries that have non-subquery row access policies and is applied on top of row-level security. Queries with a subquery policy need Fine-Grained Reader access on columns referenced by the policies.
  - Quotas: see the row-level security section of BigQuery quotas and limits.
- Source: https://docs.cloud.google.com/bigquery/docs/row-level-security-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-row-level-security.md](./managing-row-level-security.md)
- [column-level-security-intro.md](./column-level-security-intro.md)
- [column-data-masking-intro.md](./column-data-masking-intro.md)
