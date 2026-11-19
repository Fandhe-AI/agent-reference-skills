---
source: https://docs.cloud.google.com/dataform/docs/overview
---

# Dataform overview

Dataform is a service for data analysts to develop, test, version control, and schedule complex data transformation workflows in BigQuery (the ELT "transform" step). Workflows are written in Dataform core, an open source SQL extension (SQLX files plus optional JavaScript), compiled into SQL, and run in BigQuery in dependency order.

## Signature / Usage

### Workflow stages

1. Create a repository (Git-backed; can link to a third-party Git provider).
2. Create development workspaces inside the repository.
3. Develop Dataform core (tables, dependencies, documentation, JavaScript).
4. Dataform compiles Dataform core into GoogleSQL, adds boilerplate (`CREATE TABLE`, `INSERT`), transpiles JavaScript, resolves dependencies and checks for missing or circular dependencies.
5. Dataform runs the dependency tree in BigQuery (SQL commands, assertions, other operations) and updates metadata in Knowledge Catalog.

### SQLX config block: document data and add Knowledge Catalog metadata

```sql
config {
  type: "table",
  description: "This table joins orders information from OnlineStore & payment information from PaymentApp",
  columns: {
    order_date: "The date when a customer placed their order",
    id: "Order ID as defined by OnlineStore",
    order_status: "The status of an order, for example, sent, delivered",
    customer_id: "Unique customer ID",
    payment_status: "The status of a payment, for example, pending, paid",
    payment_method: "How the customer chose to pay",
    item_count: "The number of items the customer ordered",
    amount: "The amount the customer paid"
  },
  metadata: {
    overview: "This table provides joined orders and payment data.",
    extraProperties: {
      generic: {
        system: "BigQuery",
        type: "table"
      }
    }
  }
}
```

### Assertion in the config block

```sql
config {
  assertions: {
    uniqueKey: ["id"]
  }
}
```

### Define a table with `ref`

```sql
config { type: "table" }

SELECT
  order_date AS date,
  order_id AS order_id,
  order_status AS order_status,
  SUM(item_count) AS item_count,
  SUM(amount) AS revenue

FROM ${ref("store_clean")}

GROUP BY 1, 2, 3
```

Compiled output is similar to:

```sql
CREATE OR REPLACE TABLE Dataform.orders AS

SELECT
  order_date AS date,
  order_id AS order_id,
  order_status AS order_status,
  SUM(item_count) AS item_count,
  SUM(amount) AS revenue

FROM Dataform_stg.store_clean

GROUP BY 1, 2, 3
```

### Post-query operation

```sql
SELECT * FROM ...

post_operations {
  GRANT `roles/bigquery.dataViewer` ON TABLE ${self()} TO "group:someusers@dataform.co"
}
```

### JavaScript block

```sql
js {
  const columnName = "foo";
}

SELECT 1 AS ${columnName} FROM "..."
```

## Options / Props

### Repository file types

| Type | Description |
|------|-------------|
| Config files | JSON or SQLX files for general configuration, execution schedules, or schema for new tables and views |
| Definitions | SQLX and JavaScript files that define tables, views, and additional SQL operations |
| Includes | JavaScript files with variables and functions to reuse in the project |

### Ways to schedule runs

| Method | Description |
|--------|-------------|
| Workflow configurations | Schedule runs of compilation results created in release configurations |
| Managed Service for Apache Airflow | Schedule runs externally |
| Workflows and Cloud Scheduler | Schedule runs externally |
| Cloud Build triggers | Automate runs |

### Limitations

| Limitation | Detail |
|------------|--------|
| Runtime | Plain V8 runtime; Node.js capabilities and modules are not supported. Add a `name` property in `package.json` to avoid `package-lock.json` diffs |
| Dependency URLs | `git`+`https://` URLs in `package.json` are not supported; convert to plain `https://` archive URLs |
| Unit tests | Manually running unit tests is not available |
| Search | Searching for file content in development workspaces is not available |
| Docker image | As of Dataform core `3.0.0`, no Docker image is distributed |
| Update methods | `releaseConfigs - patch`, `repositories - patch`, `updateConfig`, `workflowConfigs - patch` don't comply with AIP.134: the `*` wildcard is treated as a bad request, and all fields are updated when `field_mask` is omitted |
| Overlapping runs | If a scheduled workflow configuration run doesn't finish before the next scheduled run starts, the next run is skipped and marked with an error |

## Notes

- Compilation is hermetic (same code, same SQL result) and runs in a sandbox with no internet access; no external API calls during compilation.
- Compilation doesn't connect to BigQuery: it doesn't check GoogleSQL syntax or semantics, whether datasets, tables or columns exist, or IAM permissions. These checks happen only during query validation dry runs in a workspace or during workflow execution.
- Every Dataform repository must be connected to a custom service account, selected when creating the repository and editable later. The Dataform repositories list excludes BigQuery Studio assets (notebooks, saved queries).
- Secure Source Manager repository connection is in Preview; GitHub, GitLab, Azure DevOps Services and Bitbucket are also supported.
- After each successful action, Dataform starts an asynchronous metadata sync to Knowledge Catalog (with retries, so API unavailability doesn't fail the workflow). Overview metadata requires Dataform core 3.0.37 or later; generic aspects require 3.0.52 or later.
- Dataform core is part of the open-source Dataform framework, which also includes the Dataform CLI for local compile and run outside Google Cloud.
- The source also shows Console steps, which are omitted. Egress IP ranges for allow-listing are on the Dataform locations page.
- Dataform pipelines and BigQuery pipelines/notebooks/saved queries are managed in BigQuery; the tables themselves are covered in the `gcp-bigquery` skill, and Knowledge Catalog (formerly Dataplex Universal Catalog; API and IAM names stay `dataplex`) in `gcp-knowledge-catalog`.
- Source: https://docs.cloud.google.com/dataform/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [sql-workflows.md](./sql-workflows.md)
- [create-tables.md](./create-tables.md)
- [dependencies.md](./dependencies.md)
