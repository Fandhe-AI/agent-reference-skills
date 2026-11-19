---
source: https://docs.cloud.google.com/bigquery/docs/bigquery-dataframes-introduction
---

# Introduction to BigQuery DataFrames

BigQuery DataFrames is an open-source Python library (`bigframes`) that lets you process terabytes of data and train AI and ML models with pandas and scikit-learn APIs, pushed down to BigQuery through SQL conversion.

## Signature / Usage

### Analyze a BigQuery table with pandas methods

```python
import bigframes.pandas as bpd

# Load data from BigQuery
query_or_table = "bigquery-public-data.ml_datasets.penguins"
bq_df = bpd.read_gbq(query_or_table)

# Inspect one of the columns (or series) of the DataFrame:
bq_df["body_mass_g"]

# Compute the mean of this series:
average_body_mass = bq_df["body_mass_g"].mean()
print(f"average_body_mass: {average_body_mass}")

# Find the heaviest species using the groupby operation to calculate the
# mean body_mass_g:
(
    bq_df["body_mass_g"]
    .groupby(by=bq_df["species"])
    .mean()
    .sort_values(ascending=False)
    .head(10)
)
```

## Options / Props

### Benefits

| Benefit | Detail |
|---|---|
| API coverage | More than 750 pandas and scikit-learn APIs implemented through SQL conversion to BigQuery and BigQuery ML APIs |
| Execution | Deferred execution of queries |
| Python functions | User-defined Python functions are automatically deployed as BigQuery remote functions |
| Gemini | Integration with Gemini Enterprise Agent Platform for text generation |

### Quotas, limits and storage

| Item | Value |
|---|---|
| Quotas | BigQuery quotas apply, including hardware, software and network components |
| API subset | A subset of pandas and scikit-learn APIs is supported (see Supported pandas APIs) |
| Cleanup | Automatically created Cloud Run functions must be cleaned up explicitly as part of session cleanup |
| Temporary data | Intermediate results are stored in BigQuery tables in the `_anonymous_` dataset of the project set in `bf.options.bigquery.project`; they persist for seven days by default and storage is charged |
| License | Apache-2.0; contains code derived from Ibis, pandas, Python, scikit-learn and XGBoost |

## Notes

- Version 2.0 changed some default parameters (breaking); see Migrate to BigQuery DataFrames 2.0.
- The library is free to download; BigQuery, Cloud Run functions, Agent Platform and other services used incur their own costs.
- The source also links ML and AI, custom Python functions, visualizations, dbt, the JupyterLab plugin, quickstart, install, data manipulation, data types, sessions and I/O, and performance pages, plus the GitHub notebooks and API reference (https://dataframes.bigquery.dev/reference/index.html).
- Gemini text generation here goes through Agent Platform models; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`. Client-library patterns for Python are in `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/bigquery/docs/bigquery-dataframes-introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [programmatic-analysis.md](./programmatic-analysis.md)
- [gemini-overview.md](./gemini-overview.md)
