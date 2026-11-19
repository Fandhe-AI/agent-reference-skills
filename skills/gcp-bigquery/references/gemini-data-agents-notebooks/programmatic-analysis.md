---
source: https://docs.cloud.google.com/bigquery/docs/programmatic-analysis
---

# Notebooks and programmatic analysis tools

BigQuery provides built-in Colab Enterprise notebooks, BigQuery DataFrames, and integrations with Jupyter, Zeppelin, Hadoop / Spark / Hive, Apache Beam and Dataflow for analysis in Python, Java or R.

## Signature / Usage

### SQL cells with Python variables

In a Colab Enterprise SQL cell, enclose a Python variable or a BigQuery DataFrame name in braces (`{ }`):

```sql
# Refer to the Python variable my_threshold in a SQL expression.
SELECT * FROM my_dataset.my_table WHERE x > {my_threshold};

# Reference previous query results to iterate on your queries.
SELECT * FROM {df};
```

## Options / Props

### Colab Enterprise cell types

| Cell | Purpose |
|---|---|
| Text cell | Markdown explanations and images |
| Code cell | Python; run individually; can reference variables from cells already run |
| SQL cell | GoogleSQL; output saved as a DataFrame named after the cell title; with multiple statements only the last result is saved |
| Visualization cell | Auto-generated visualization of any DataFrame in the notebook |

### Other programmatic solutions

| Solution | Integration |
|---|---|
| Jupyter Notebooks and JupyterLab | IPython Magics for BigQuery or client libraries; deploy on Vertex AI Workbench instances or Managed Service for Apache Spark |
| Apache Zeppelin | Zeppelin optional component on Managed Service for Apache Spark |
| Apache Hadoop, Spark, Hive | Open source BigQuery connectors using the BigQuery Storage API (parallel gRPC streaming) |
| Apache Beam and Dataflow | Beam BigQuery connector; Dataflow runs the jobs at scale |

## Notes

- Colab Enterprise notebooks are for end-to-end ML workflows (build, evaluate and deploy BigQuery ML models), data exploration with BigQuery DataFrames, and collaboration with version history and IAM sharing. They use Gemini Enterprise Agent Platform for assistive code development.
- Colab Enterprise Data Science Agent (DSA) automates exploratory data analysis, ML tasks and insights inside a notebook, using BigQuery ML, BigQuery DataFrames, or Managed Service for Apache Spark, with Python and SQL.
- The notebook gallery offers prebuilt templates for SQL, Python, Apache Spark and DataFrames.
- Runtimes are Compute Engine virtual machines allocated to a user; access is controlled with IAM roles. The Notebook Security Scanner can detect vulnerable Python packages.
- Code assets in BigQuery Studio are stored in a default region; changing it affects newly created assets. Notebooks are available in all regions where BigQuery Studio is available. Notebook capabilities are available only in the Google Cloud console.
- Monitor notebook slot usage in the Cloud Billing report by filtering the `goog-bq-feature-type` label with value `BQ_STUDIO_NOTEBOOK`.
- BigQuery DataFrames offers more than 750 pandas and scikit-learn APIs through transparent SQL conversion, deferred execution, user-defined Python functions deployed as remote functions, and Gemini text generation.
- Pricing: see notebook runtime pricing; not copied here.
- Cloud Storage, Dataflow and Spark clusters used from these tools are in their own skills.
- Source: https://docs.cloud.google.com/bigquery/docs/programmatic-analysis (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [bigquery-dataframes-introduction.md](./bigquery-dataframes-introduction.md)
- [gemini-overview.md](./gemini-overview.md)
