---
source: https://docs.cloud.google.com/knowledge-catalog/docs/system-rule-templates-list
---

# System rule templates list

Knowledge Catalog (formerly Dataplex Universal Catalog) provides predefined system rule templates, usable in any region, for common row-level and aggregate data validation checks. Run data profiling first to analyze table statistics and get rule recommendations, then pick templates from the categories below to define rules.

## Signature / Usage

List the system rule templates (the entries of the `rule-library` entry group in the `dataplex-templates` project):

```bash
alias gcurl='curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json"'
```

```bash
gcurl "https://dataplex.googleapis.com/v1/projects/dataplex-templates/locations/global/entryGroups/rule-library/entries"
```

## Options / Props

Template ID is the last segment of the template's resource name (for example `projects/dataplex-templates/locations/global/entryGroups/rule-library/entries/non_null_expectation`). BQ-permissions note: templates marked "BQ perms" require `bigquery.tables.get`, `bigquery.tables.list`, and `bigquery.datasets.get` on the table and dataset being queried.

### Table shape

| Name | ID | Description |
|---|---|---|
| Column Count Equality Expectation | `column_count_equality_expectation` | Aggregate. Number of columns equals a specified value. BQ perms. |
| Column Count Range Expectation | `column_count_range_expectation` | Aggregate. Number of columns lies within a specified range. BQ perms. |
| Column Existence Expectation | `column_existence_expectation` | Aggregate. A specific column exists in the table. BQ perms. |
| Freshness Expectation | `freshness_expectation` | Aggregate. Latest data in a column is newer than a specified interval. |
| Grouped Freshness Expectation | `grouped_freshness_expectation` | Aggregate. Latest grouped data in a column is newer than a specified interval. |
| Ordered Schema Match Expectation | `ordered_schema_match_expectation` | Aggregate. Ordered columns exactly match an ordered, specified list. |
| Row Count Equality Expectation | `row_count_equality_expectation` | Aggregate. Number of rows equals a specified value. |
| Row Count Range Expectation | `row_count_range_expectation` | Aggregate. Number of rows lies within a specified range. |
| Schema Containment Expectation | `schema_containment_expectation` | Aggregate. Columns contain all columns in a specified set. BQ perms. |
| Schema Exclusion Expectation | `schema_exclusion_expectation` | Aggregate. Columns aren't in a specified set. BQ perms. |
| Schema Match Expectation | `schema_match_expectation` | Aggregate. Columns exactly match a specified set. BQ perms. |
| Table Comparison Aggregate Equality Expectation | `table_comparison_aggregate_equality_expectation` | Aggregate. Result of an aggregate expression is equal between the current table and a reference table. |
| Table Comparison Aggregate Range Expectation | `table_comparison_aggregate_range_expectation` | Aggregate. Aggregate expression result on the current table deviates from the reference table by no more than a specified tolerance. |
| Table Comparison Row Count Equality Expectation | `table_comparison_row_count_equality_expectation` | Aggregate. Row count equals that of a reference table, with optional row filtering before counting. |
| Table Comparison Row Count Factor Equality Expectation | `table_comparison_row_count_factor_equality_expectation` | Aggregate. Row count equals a factor of the reference table's row count, with optional row filtering before counting. |

### Missing values, unique values, and types

| Name | ID | Description |
|---|---|---|
| Column Type Expectation | `column_type_expectation` | Aggregate. Column data type matches a specified type. BQ perms. |
| Column Type List Expectation | `column_type_list_expectation` | Aggregate. Column data type is in a specified set. BQ perms. |
| Non Null Expectation | `non_null_expectation` | Row-level. Each column value is not null. |
| Null Expectation | `null_expectation` | Row-level. Each column value is null. |
| String Case Expectation | `string_case_expectation` | Row-level. Each string value matches a specified casing. |
| Uniqueness Expectation | `uniqueness_expectation` | Row-level. Each column value is unique. |

### Sets and ranges

| Name | ID | Description |
|---|---|---|
| Decreasing Expectation | `decreasing_expectation` | Aggregate. Values in a column are decreasing. `NULL` values are ignored. Returns the first row where the expectation isn't met. |
| Increasing Expectation | `increasing_expectation` | Aggregate. Values in a column are increasing. `NULL` values are ignored. Returns the first row where the expectation isn't met. |
| Range Expectation | `range_expectation` | Row-level. Each value lies within a specified range. |
| Reference Set Expectation | `reference_set_expectation` | Row-level. Each value is contained by a specified reference set. |
| Set Exclusion Expectation | `set_exclusion_expectation` | Row-level. Each value isn't contained by a specified set. |
| Set Expectation | `set_expectation` | Row-level. Each value is contained by a specified set. |

### String matching

| Name | ID | Description |
|---|---|---|
| Pattern Exclusion Expectation | `pattern_exclusion_expectation` | Row-level. Value doesn't match a specified SQL `LIKE` pattern. |
| Pattern Exclusion Expectation List | `pattern_exclusion_expectation_list` | Row-level. Value doesn't match any of the specified SQL `LIKE` patterns. |
| Pattern Expectation | `pattern_expectation` | Row-level. Value matches a specified SQL `LIKE` pattern. |
| Pattern Expectation List | `pattern_expectation_list` | Row-level. Value matches at least one of the specified SQL `LIKE` patterns. |
| Regex Exclusion Expectation | `regex_exclusion_expectation` | Row-level. Value doesn't match a specified regular expression. |
| Regex Exclusion Expectation List | `regex_exclusion_expectation_list` | Row-level. Value doesn't match any of the specified regular expressions. |
| Regex Expectation | `regex_expectation` | Row-level. Value matches a specified regular expression. |
| Regex Expectation List | `regex_expectation_list` | Row-level. Value matches at least one of the specified regular expressions. |
| String Length Equality Expectation | `string_length_equality_expectation` | Row-level. String length equals a specified value. |
| String Length Range Expectation | `string_length_range_expectation` | Row-level. String length lies within a specified range. |

### Aggregate functions

| Name | ID | Description |
|---|---|---|
| Distinct Values Containment Expectation | `distinct_values_containment_expectation` | Aggregate. Distinct column values contain all values in a specified set. |
| Distinct Values Count Equality Expectation | `distinct_values_count_equality_expectation` | Aggregate. Number of distinct values equals a specified value. |
| Distinct Values Count Range Expectation | `distinct_values_count_range_expectation` | Aggregate. Number of distinct values lies within a specified range. |
| Distinct Values Match Expectation | `distinct_values_match_expectation` | Aggregate. Distinct column values exactly match a specified set. |
| Distinct Values Proportion Expectation | `distinct_values_proportion_expectation` | Aggregate. Distinct values count / total rows count is within a specified range. |
| Distinct Values Set Expectation | `distinct_values_set_expectation` | Aggregate. Each distinct column value is contained by a specified set. |
| Max Range Expectation | `max_range_expectation` | Aggregate. Column maximum lies within a specified range. |
| Mean Range Expectation | `mean_range_expectation` | Aggregate. Column average lies within a specified range. If a floating-point type is returned, the `AVG()` result is non-deterministic. |
| Median Range Expectation | `median_range_expectation` | Aggregate. Column median lies within a specified range. |
| Min Range Expectation | `min_range_expectation` | Aggregate. Column minimum lies within a specified range. |
| Mode Range Expectation | `mode_range_expectation` | Aggregate. All column modes lie within a specified range; with multiple modes each is checked and failing modes are returned. |
| Mode Set Expectation | `mode_set_expectation` | Aggregate. All column modes are within the specified set. `NULL` values are ignored when calculating modes; with several modes of the same highest frequency each is checked and failing modes are returned in an array. |
| Quantile Range Expectation | `quantile_range_expectation` | Aggregate. Value at the specified quantile lies within a specified range. |
| Standard Deviation Range Expectation | `standard_deviation_range_expectation` | Aggregate. Column standard deviation lies within a specified range. |
| Sum Range Expectation | `sum_range_expectation` | Aggregate. Column sum lies within a specified range. If a floating-point type is returned, the `SUM()` result is non-deterministic. |
| Table Comparison Unique Values Count Equality Expectation | `table_comparison_unique_values_count_equality_expectation` | Aggregate. Number of unique values in a column is equal between the current table and a reference table. |

### Multi-column

| Name | ID | Description |
|---|---|---|
| Column Comparison Equality Expectation | `column_comparison_equality_expectation` | Row-level. Value in column A equals value in column B for each row. |
| Column Comparison Greater Expectation | `column_comparison_greater_expectation` | Row-level. Value in column A is greater than value in column B for each row. |
| Column Pairs Set Expectation | `column_pairs_set_expectation` | Aggregate. Paired values from column A and B are contained by a specified set. |
| Multi Column Sum Equality Expectation | `multi_column_sum_equality_expectation` | Aggregate. Sum of all rows across a list of columns equals a specified value. If a floating-point type is returned, the `SUM()` result is non-deterministic. |
| Multi Column Uniqueness Expectation | `multi_column_uniqueness_expectation` | Row-level. Combination of values across a list of columns is unique per row (for example a multi-column primary key). |
| Record Column Uniqueness Expectation | `record_column_uniqueness_expectation` | Row-level. Values across a list of columns are unique within each record (row). Records can be duplicated. |

### Distributional functions

| Name | ID | Description |
|---|---|---|
| Date Part Completeness Expectation | `date_part_completeness_expectation` | Aggregate. Table has data for every interval (for example every day) within a date range. |
| Standard Deviation Values Expectation | `standard_deviation_values_expectation` | Row-level. Each value lies within a specified number of standard deviations from the column average. |

### Generic conditions

| Name | ID | Description |
|---|---|---|
| Row Condition Expectation | `row_condition_expectation` | Row-level. Each row passes the specified condition. |
| SQL Assertion | `sql_assertion` | Aggregate. Evaluates the number of rows returned for the provided statement; any returned row fails the rule. |
| Table Condition Expectation | `table_condition_expectation` | Aggregate. The provided expression is true for the table. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/system-rule-templates-list (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/reuse-data-quality-rules (the page has no code of its own; the `gcurl` alias is defined there).
- Template IDs were derived from the template links in the source (the last path segment of each `ruleTemplates/<id>` link).
- Knowledge Catalog was formerly Dataplex Universal Catalog; the API, gcloud group, and IAM names stay `dataplex`. The BigQuery tables the templates validate are covered by the gcp-bigquery skill.

## Related

- [reuse-data-quality-rules.md](./reuse-data-quality-rules.md)
- [auto-data-quality-overview.md](./auto-data-quality-overview.md)
- [data-profiling-overview.md](./data-profiling-overview.md)
