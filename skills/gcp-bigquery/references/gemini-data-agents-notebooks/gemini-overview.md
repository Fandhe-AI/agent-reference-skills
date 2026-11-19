---
source: https://docs.cloud.google.com/bigquery/docs/gemini-overview
---

# Gemini in BigQuery overview

Gemini in BigQuery is part of the Gemini for Google Cloud product suite and provides AI-powered assistance for data exploration, conversational analytics, data canvas, SQL and Python code assist, data preparation, data pipelines and SQL translation rules.

## Signature / Usage

### Features

| Feature | What it does |
|---|---|
| Data insights | Generates insightful queries from table metadata to uncover patterns and run statistical analysis |
| Conversational analytics | Natural language conversations with data agents or data sources (tables, views, graphs, Lakehouse tables) |
| Data canvas | Find, join, query and visualize table assets with natural language |
| SQL code assist | SQL generation tool, prompt to generate SQL, explain a SQL query; also Gemini Cloud Assist chat, convert comments to SQL and complete a SQL query |
| Python code assist | Code generation tool, Python code completion; also Gemini Cloud Assist chat and BigQuery DataFrames code generation |
| Data preparation | Context-aware, AI-generated transformation recommendations |
| Data Engineering Agent | Build, modify and troubleshoot data pipelines with natural language; also generates semantic metadata |
| SQL translation rules | Gemini-enhanced rules for the interactive SQL translator |

### Where to interact in BigQuery Studio

- Data insights: the **Insights** tab of a table entry.
- Conversational analytics: the BigQuery **Agents** page (**Agent catalog** tab for data agents, **Conversations** tab for conversations).
- Data canvas: create a data canvas, or use it from a table or query.
- Code assist: comments in code, the SQL generation tool, or autocomplete while typing.
- Data preparation: **Create new** list, **Data preparation**.

```sql
SELECT
  COUNT(*) AS job_count
FROM
  `PROJECT_ID`.`region-REGION`.INFORMATION_SCHEMA.JOBS
WHERE
  EXISTS (
    SELECT 1
    FROM UNNEST(labels) AS label
    WHERE label.key = 'ca-bq-job' AND label.value = 'true'
  );
```

## Options / Props

### Enhanced features (require access to Customer Data and metadata, including tables and query history)

| Feature |
|---|
| SQL generation tool |
| Prompt to generate SQL queries |
| Convert comments to SQL |
| Complete a SQL query |
| Explain a SQL query |
| Generate python code |
| Python code completion |
| Conversational analytics |
| Data canvas |
| Data preparation |
| Data insights |

## Notes

- Preview in the source: Gemini Cloud Assist SQL generation, convert comments to SQL, complete a SQL query, Gemini Cloud Assist Python generation, BigQuery DataFrames code generation, and SQL translation rules.
- Gemini for Google Cloud does not use your prompts or its responses as data to train its models without your express permission. Gemini in BigQuery doesn't use your data to train or fine-tune its models.
- Caution from the source: Gemini for Google Cloud products can generate output that seems plausible but is factually incorrect; validate all output before use.
- Gemini in BigQuery is part of Gemini for Google Cloud and doesn't support the same compliance and security offerings as BigQuery. Set it up only for BigQuery projects that don't require compliance offerings that Gemini for Google Cloud doesn't support.
- Pricing: see Gemini for Google Cloud pricing (https://cloud.google.com/products/gemini/pricing). Prices are not copied here.
- Gemini in BigQuery is the Gemini for Google Cloud assistant inside BigQuery Studio, not the BigQuery AI functions or remote models; the Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/conversational-analytics (the `INFORMATION_SCHEMA.JOBS` query that counts jobs run by conversational analytics; replace `PROJECT_ID` and `REGION`).
- Source: https://docs.cloud.google.com/bigquery/docs/gemini-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [gemini-set-up.md](./gemini-set-up.md)
- [conversational-analytics.md](./conversational-analytics.md)
- [data-canvas.md](./data-canvas.md)
