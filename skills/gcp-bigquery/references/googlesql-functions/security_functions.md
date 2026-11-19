---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/security_functions
---

# Security functions

## Signature / Usage

GoogleSQL for BigQuery supports the following security functions.

### Function list

| Name | Summary |
|---|---|
| [`SECURE_CONTEXT`](#secure_context) | Returns the value of a request-scoped secure context parameter provided at query run time. |
| [`SESSION_USER`](#session_user) | Get the email address or principal identifier of the user that's running the query. |

### `SECURE_CONTEXT`

> [!WARNING]
> **Preview**
>
>
> This product or feature is subject to the "Pre-GA Offerings Terms"
> in the General Service Terms section of the
> [Service Specific Terms](https://cloud.google.com/terms/service-terms).
> Pre-GA products and features are available "as is" and might have
> limited support. For more information, see the
> [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-sql-preview-support@googlegroups.com](mailto:bigquery-sql-preview-support@googlegroups.com).

```sql
SECURE_CONTEXT(key)
```

**Description**

Returns the value of a request-scoped secure context parameter provided at query
run time. You can use `SECURE_CONTEXT` in logical views to
dynamically filter and evaluate data based on context variables---such as user
attributes, department IDs, or tenant identifiers---passed in the query request
body, without creating separate static views for each attribute
value.

**Definitions**

- `key`: A constant, non-`NULL` `STRING` literal or query parameter representing the name of the secure context parameter to retrieve. `key` isn't coercible.

**Details**

- **Passing secure context in query requests** : Pass secure context parameters
  in the `secureContext` field of the BigQuery `jobs.query` or `jobs.insert`
  API request payload. For example:

  ```json
  {
    "query": "SELECT * FROM my_dataset.sales_view",
    "useLegacySql": false,
    "secureContext": {
      "secureParameterEntries": {
        "user_dept": "Sales",
        "user_region": "US"
      }
    }
  }
  ```

- **Sessions** : When you use multi-statement query sessions, you must supply
  secure context parameters when you create the session by specifying
  `createSession: true`. After a session is created, subsequent queries in the
  same session automatically inherit the initial session context and can't
  modify or supply new `secureContext` parameters.

- **Security and architecture best practices** : Dynamic context
  parameterization with `SECURE_CONTEXT` is intended for large-scale
  multi-tenant systems and dynamic, attribute-based access control where
  maintaining separate tables or datasets per tenant is impractical due to
  data scale.

  `SECURE_CONTEXT` evaluates parameters supplied in the query request payload.
  Allow only trusted applications or middle-tier services to set
  `secureContext` parameters. The trusted application must authenticate the
  client and supply the verified context parameters on its behalf. Untrusted
  end users, clients, or AI agents must not be permitted to set or modify
  these parameters directly because doing so would let them spoof context
  attributes and bypass the view's access controls.

  For most multi-tenant architecture workloads, standardized table-level
  or dataset-level tenant isolation combined with IAM-based access control,
  Row-Level Security (RLS) policies, and Column-Level Security (CLS) remain
  Google's recommended best practices to ensure strict tenant isolation and
  prevent data leakage.

  For more information about multi-tenant architectures and access control,
  see the following resources:
  - [Best practices for multi-tenant workloads on BigQuery](https://docs.cloud.google.com/bigquery/docs/best-practices-for-multi-tenant-workloads-on-bigquery)
  - [Introduction to BigQuery access control](https://docs.cloud.google.com/bigquery/docs/access-control)
  - [Introduction to row-level security](https://docs.cloud.google.com/bigquery/docs/row-level-security-intro)

**Limitations**

- **View support** : `SECURE_CONTEXT` is only supported within logical view definitions. Calling `SECURE_CONTEXT` directly at the top level of an ad hoc query, within materialized views, or within temporary session views returns an error.
- **Supported types** : Values supplied in the secure context must be `STRING` values.
- **Error mode** : `SECURE_CONTEXT` doesn't support the `SAFE.` prefix. Calling `SAFE.SECURE_CONTEXT(key)` returns an analysis error.
- **Missing parameter handling** : If a query evaluates `SECURE_CONTEXT('my_param')` and `my_param` isn't provided in the request's secure context, the query fails and returns an error.
- **Side-channel exposure** : A `SECURE_CONTEXT` filter is evaluated inside a
  view and isn't a hard isolation boundary. A caller that can submit arbitrary
  SQL against the view might infer the existence or values of rows that the
  filter excludes---through crafted expressions that fail on filtered-out rows,
  query statistics such as bytes processed, or query duration. Don't rely on a
  view filter alone to separate tenants when the SQL reaching the view is
  untrusted, such as SQL generated by an AI agent.

  For a comparison of the isolation strength of authorized views, row-level
  security, and separate tables, see the following resources:
  - [Comparison of authorized views, row-level security, and separate
    tables](https://docs.cloud.google.com/bigquery/docs/row-level-security-intro#comparison_of_authorized_views_row-level_security_and_separate_tables)
  - [Best practices for multi-tenant workloads on BigQuery](https://docs.cloud.google.com/bigquery/docs/best-practices-for-multi-tenant-workloads-on-bigquery)

**Return type**

`STRING`

**Examples**

The following example creates a logical view `my_dataset.sales_view` that
filters rows using the `SECURE_CONTEXT` function:

```sql
CREATE OR REPLACE VIEW my_dataset.sales_view AS
WITH
  Orders AS (
    SELECT 1001 AS order_id, 'Sales' AS department, 250.00 AS amount
    UNION ALL
    SELECT 1002 AS order_id, 'Engineering' AS department, 500.00 AS amount
    UNION ALL
    SELECT 1004 AS order_id, 'Sales' AS department, 430.50 AS amount
  )
SELECT
  order_id,
  department,
  amount
FROM Orders
WHERE department = SECURE_CONTEXT('user_dept');
```

The following example queries `my_dataset.sales_view` when the API request
payload contains
`secureContext: {"secureParameterEntries": {"user_dept": "Sales"}}`. The view
evaluates `SECURE_CONTEXT('user_dept')` as `'Sales'`:

```sql
SELECT * FROM my_dataset.sales_view;

/*----------+------------+--------+
 | order_id | department | amount |
 +----------+------------+--------+
 | 1001     | Sales      | 250.00 |
 | 1004     | Sales      | 430.50 |
 +----------+------------+--------*/
```

### `SESSION_USER`

```sql
SESSION_USER()
```

**Description**

For first-party users, returns the email address of the user that's running the
query.
For third-party users, returns the
[principal identifier](https://cloud.google.com/iam/docs/principal-identifiers)
of the user that's running the query.
For more information about identities, see
[Principals](https://cloud.google.com/docs/authentication#principal).

**Return Data Type**

`STRING`

**Example**

```sql
SELECT SESSION_USER() as user;

/*----------------------+
 | user                 |
 +----------------------+
 | jdoe@example.com     |
 +----------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/security_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
