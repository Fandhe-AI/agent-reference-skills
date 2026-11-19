---
source: https://docs.cloud.google.com/knowledge-catalog/docs/auto-data-quality-overview
---

# Auto data quality overview

Auto data quality in Knowledge Catalog (formerly Dataplex Universal Catalog) validates BigQuery, Iceberg REST Catalog, SAP Business Data Cloud Delta Lake, and Apache Hive tables against defined rules. A data quality scan is a Knowledge Catalog data scan (`DataScan` of type `data quality`) that runs on only one BigQuery table, uses resources in a Google tenant project, and reports pass/fail results, quality scores, and Cloud Logging alerts.

## Signature / Usage

### Data reference parameter `${data()}`

In a custom SQL rule, `${data()}` refers to the source table and all of its precondition filters (row filters, sampling percents, incremental filters). The parameter is case sensitive. Rule without the parameter, for a source table `my_project_id.dim_dataset.dim_currency` with the row filter `transaction_timestamp >= current_date()`:

```text
discount_pct IN (SELECT discount_pct FROM my_project_id.dim_dataset.dim_currency WHERE transaction_timestamp >= current_date())
```

The same rule with the data reference parameter:

```text
discount_pct IN (SELECT discount_pct FROM ${data()})
```

### Debug query

A debug query is optional and runs alongside a rule. It returns up to 10 scalar values to help diagnose a failure. At most one debug query per rule; at most 1024 characters. Example debug query that returns total revenue, distinct items, and average revenue per item:

```sql
SELECT
  SUM(revenue),
  COUNT(DISTINCT item_id),
  SUM(revenue) / COUNT(DISTINCT item_id)
FROM `example_project.example_dataset.table`
```

### Filter rules (AIP-160)

Use AIP-160 filter syntax to run only selected rules. Operators: `=`, `!=`, `>`, `<`, `=~`, combined with `AND` / `OR`. Numeric and boolean values aren't quoted. In an API call, escape the double quotes inside the JSON string (`"filter": "name = \"critical_check\""`).

| Filter by | Examples |
|---|---|
| name | `name = "critical_check"`, `name =~ "temp_.*"` |
| dimension | `dimension = "COMPLETENESS"`, `dimension = "VALIDITY" OR dimension = "ACCURACY"` |
| column / threshold | `column = "user_id"`, `threshold > 0.95`, `threshold >= 0.8 AND threshold < 0.9` |
| ignore_null | `ignore_null = true` |
| attributes | `attributes:environment`, `attributes.environment = "prod"`, `attributes.tag =~ "prio-.*"`, `attributes.environment = "prod" AND attributes.criticality = "high"` |

## Options / Props

### Built-in rule categories

| Category | Behavior |
|---|---|
| Row-level | Expectation applied to each row; each row passes or fails (for example `column_A_value < 1`). Requires a passing threshold; the rule fails when the percentage of passing rows falls below it. |
| Aggregate | Expectation applied to a single value aggregated across the data (for example `Avg(someCol) >= 10`); must evaluate to boolean `true`. No per-row pass or fail count. |

For both categories you set the column the rule applies to and a dimension.

### Built-in rule types

| Rule type (console name) | Category | Description | Supported column types | Parameters |
|---|---|---|---|---|
| `RangeExpectation` (Range Check) | Row-level | Value is between min and max. | All numeric, date, and timestamp columns. | Required: passing threshold percentage; `min` or `max` (at least one). Optional: `strict min` (uses ">" instead of ">="), `strict max` (uses "<" instead of "<="), `ignore null`. |
| `NonNullExpectation` (Null check) | Row-level | Values are not NULL. | All supported column types. | Required: passing threshold percentage. |
| `SetExpectation` (Set check) | Row-level | Value is one of a set. | All supported column types, except `Record` and `Struct`. | Required: set of string values, passing threshold percentage. Optional: `ignore null`. |
| `RegexExpectation` (Regular expression check) | Row-level | Value matches a regular expression (GoogleSQL uses the re2 library). | String | Required: regular expression pattern, passing threshold percentage. Optional: `ignore null`. |
| `Uniqueness` (Uniqueness Check) | Aggregate | All values in a column are unique. | All supported column types, except `Record` and `Struct`. | Required: column and dimension. Optional: `ignore null`. |
| `StatisticRangeExpectation` (Statistic check) | Aggregate | A statistical measure matches the range expectation. | All supported numeric column types. | Required: `mean`, `min`, or `max` (at least one). Optional: `strict min`, `strict max`. |

### Custom SQL rule types

| Rule type | Category | Description | Parameters | Example |
|---|---|---|---|---|
| Row condition | Row-level | SQL expression per row (`WHERE` clause style) that evaluates to `true` or `false`; the percentage of passing rows is compared with the passing threshold. May reference another table (for example referential integrity). | Required: SQL condition, passing threshold percentage, dimension. Optional: column. | `grossWeight` <= `netWeight` |
| Table condition (aggregate SQL expression) | Aggregate | Executed once per table; expression evaluates to boolean. May reference another table with expression subqueries. | Required: SQL condition, dimension. Optional: column. | `avg(price) > 100` |
| SQL assertion | Aggregate | SQL statement returning rows that match the invalid state; if it returns any rows, the rule fails. Omit the trailing semicolon. May reference another table with expression subqueries. | Required: SQL statement, dimension. Optional: column. | `SELECT * FROM example_project.example_dataset.table WHERE discount_pct > 100` |

### Dimensions

Every rule must be associated with a dimension. Predefined dimensions: Freshness, Volume, Completeness, Validity, Consistency, Accuracy, Uniqueness. With the Google Cloud CLI or REST API you can use a custom dimension name (uppercase letters `A-Z` only, at most 30 characters, for example `TIMELINESS` instead of `FRESHNESS`). In the console the choice is fixed to the seven predefined dimensions.

| Dimension | Measures | Example |
|---|---|---|
| Freshness | When data was last updated. | Latest timestamp in an events table is within the last 24 hours (custom SQL or the `freshness_expectation` system rule template). |
| Volume | Quantity of records. | `COUNT(*) >= 100000` for a daily ingestion table. |
| Completeness | Required fields are populated. | `NonNullExpectation` on `customer_id` or `order_date`. |
| Validity | Conformance to formats, schemas, ranges. | `RegexExpectation` for email format; `RangeExpectation` for 0 to 100; `SetExpectation` for `('PENDING', 'SHIPPED', 'DELIVERED')`. |
| Consistency | Agreement across tables, columns, systems. | Referential integrity between `orders` and `customers`; `gross_weight >= net_weight`. |
| Accuracy | Correctness against real-world or authoritative values. | Transaction timestamp isn't in the future. |
| Uniqueness | Distinct values, no duplicates. | `UniquenessExpectation` on `transaction_id`. |

### Typed input in rules

All value parameters are passed to the API as strings in the BigQuery literal format. Binary values are base64-encoded strings.

| Type | Supported formats | Example |
|---|---|---|
| Binary | Base64 encoded value | `YXBwbGU=` |
| Timestamp | `YYYY-[M]M-[D]D[( \|T)[H]H:[M]M:[S]S[.F]] [time_zone]` or `YYYY-[M]M-[D]D[( \|T)[H]H:[M]M:[S]S[.F]][time_zone_offset]` | `2014-09-27 12:30:00.45-08` |
| Date | `YYYY-M[M]-D[D]` | `2014-09-27` |
| Time | `[H]H:[M]M:[S]S[.DDDDDD]` | `12:30:00.45` |
| DateTime | `YYYY-[M]M-[D]D [[H]H:[M]M:[S]S[.DDDDDD]]` | `2014-09-27 12:30:00.45` |

### Execution and results

| Topic | Details |
|---|---|
| Execution identity | Default is the centralized service agent `service-PROJECT_NUMBER@gcp-sa-dataplex.iam.gserviceaccount.com`. Override with a custom service account or End-User Credentials (EUC). With a custom identity, processing and storage charges are centralized under BigQuery (bypassing Knowledge Catalog Premium SKUs). |
| Networking | Private Google Access must be enabled on the VPC subnet used for the scan (or on the default subnet if none is specified). |
| Job scope | Full Table (each job validates the entire table) or Incremental (a `Date` / `Timestamp` column marks increments, typically the partitioning column). |
| Row filter, sampling | Row filters and a sampling percentage reduce run time and cost. |
| Results | Available in Knowledge Catalog and BigQuery; export to a BigQuery table; publish as Knowledge Catalog metadata on the source table's entry under the `data-quality-scorecard` system aspect type (Data quality tab); scores at overall job, column (API only), and dimension level. |
| Cloud Logging | `data_scan` log (with `data_scan_type` set to `DATA_QUALITY`) and `data_quality_scan_rule_result` log (every succeeded job) in the Logs Explorer. |
| Email reports | Sent when the score is lower than a target score, the job failed, or the job finished; configured when creating the scan. |
| Cost tracking | No time-series metrics in Cloud Monitoring; query the Cloud Billing export in BigQuery using `goog-dataplex-datascan-*` system labels. |

### Limitations

| Limitation | Value |
|---|---|
| Rules per data quality scan | 1000 |
| Rule recommendations in the gcloud CLI | Not supported |
| Console dimension choice | Fixed to the seven predefined dimensions |
| Column-level scores | API only |
| Supported tables | BigQuery, Iceberg REST Catalog, SAP Business Data Cloud Delta Lake, and Apache Hive tables only |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/auto-data-quality-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Knowledge Catalog was formerly Dataplex Universal Catalog; the API, gcloud group, and IAM names stay `dataplex`.
- The BigQuery tables themselves are covered by the gcp-bigquery skill; Knowledge Catalog scans and catalogs them.
- Omitted from the source: the first SQL assertion example of the Debug queries section (it puts `SUM(revenue) / COUNT(DISTINCT item_id)` in a `WHERE` clause, which GoogleSQL does not allow) and the three `${data()}` alias examples (the "Recommended: omit the table reference" block is missing its closing parenthesis). The guidance they illustrate: when an alias in a subquery refers to source-table columns, use `${data()}` or omit the table reference instead of a direct table reference in the `WHERE` clause; a direct table reference is valid only for a different table.
- Debug queries are Preview ("Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support).
- Pricing: see Knowledge Catalog pricing (https://cloud.google.com/dataplex/pricing); no prices are copied here.
- Terraform: the `google_dataplex_datascan` resource and a Cloud Foundation Fabric module (YAML-based rule configuration) exist; the source links them.

## Related

- [reuse-data-quality-rules.md](./reuse-data-quality-rules.md)
- [system-rule-templates-list.md](./system-rule-templates-list.md)
- [data-profiling-overview.md](./data-profiling-overview.md)
- [data-quality-tasks-overview.md](./data-quality-tasks-overview.md)
