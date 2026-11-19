---
source: https://docs.cloud.google.com/bigquery/docs/ai-introduction
---

# Introduction to AI in BigQuery

BigQuery integrates AI, machine learning (ML), and agent capabilities into data workflows: tools to generate and refine code, prepare data, build pipelines, analyze data with natural language, and administer BigQuery resources. This page maps tasks to the matching feature and shows where each one is used.

## Signature / Usage

### Run an AI function in GoogleSQL

Snippet taken from https://docs.cloud.google.com/bigquery/docs/generate-text (a general-purpose AI function called from a query):

```sql
SELECT *
FROM
  AI.GENERATE_TEXT(
    MODEL `mydataset.text_model`,
    (
      SELECT CONCAT('Summarize this text', body) AS prompt
      FROM mydataset.articles
    ));
```

## Options / Props

### Choose an AI tool

| Use case | Feature | Where to use it |
|---|---|---|
| Generate, complete, or explain SQL queries | SQL code assist | Google Cloud console query editor |
| Ask questions about your data in natural language and get answers and charts | Conversational analytics | Google Cloud console (**Agents** page) or Conversational Analytics API |
| Find tables, join data, run SQL or natural language queries, and visualize results in a graphical workflow | BigQuery data canvas | Google Cloud console |
| Generate automated questions and SQL queries from table metadata | Data insights | Google Cloud console |
| Get AI-generated recommendations to clean, transform, and enrich data | Data preparation | Google Cloud console |
| Create custom rules to translate other SQL dialects to GoogleSQL | Interactive SQL translator | Google Cloud console |
| Analyze and troubleshoot jobs, manage reservations, trace lineage, discover resources, or optimize queries | Gemini Cloud Assist (Preview) | Google Cloud console toolbar chat pane |
| Generate, complete, or explain Python code | Python code assist | Colab Enterprise notebooks in BigQuery |
| Automate exploratory data analysis, ML workflows, and visualizations in a notebook | Data Science Agent | Colab Enterprise notebooks in BigQuery |
| Build, modify, and manage data pipelines using natural language prompts | Data Engineering Agent | Google Cloud console and Dataform workspaces |
| Generate text, extract structured data, classify, score, filter, or aggregate table data with LLMs | Generative AI functions | GoogleSQL queries |
| Perform translation, document processing, audio transcription, or computer vision on table data | Task-specific AI functions | GoogleSQL queries |
| Generate embeddings and run semantic or keyword search over structured, unstructured, or multimodal data | Embeddings and vector search, and text search | GoogleSQL queries |
| Train, evaluate, and run predictive ML models (forecasting, anomaly detection, classification, regression, clustering) | BigQuery ML | GoogleSQL queries, Google Cloud console, bq command-line tool, REST API, or notebooks |
| Connect custom AI applications or agents to BigQuery to inspect metadata, run queries, translate SQL, or manage transfers | BigQuery MCP server, BigQuery Migration Service MCP server, BigQuery Data Transfer Service MCP server, MCP Toolbox for Databases, or Agent Development Kit (ADK) | MCP clients and agent frameworks |
| Give agents reusable instructions and reference files for BigQuery tasks | BigQuery agent skills | Agentic clients and terminals |
| Log, monitor, and evaluate agent interactions, token usage, and latency | BigQuery agent analytics | ADK, LangGraph, or BigQuery Storage Write API (gRPC) |
| Explore BigQuery resources, run queries, and build pipelines from an IDE or CLI | Google Cloud Data Agent Kit, MCP IDE integrations, or Antigravity CLI | Antigravity, VS Code, Cursor, or command-line tools |

### Feature groups

| Group | Contents |
|---|---|
| Assistive features (Gemini in BigQuery) | SQL code assist, Python code assist (including PySpark and BigQuery DataFrames, in notebooks), data canvas (DAG workspace), data insights, data preparation, interactive SQL translator |
| Chat experiences | Conversational analytics (answers questions about data in your tables; chat with data sources or configured data agents with custom metadata, glossary terms, instructions, and verified queries). Gemini Cloud Assist (Preview; operate and administer BigQuery: discover resources, trace lineage, debug failed or slow jobs, analyze slot capacity and reservations, optimize or schedule queries) |
| Notebook and pipeline agents | Data Science Agent (BigQuery tables and CSV files in a Colab Enterprise notebook); Data Engineering Agent (builds, modifies, and troubleshoots Dataform pipelines) |
| AI functions | General-purpose (full control over model, prompt, output schema, parameters); managed (simplified syntax, BigQuery can choose a model to optimize cost and quality); task-specific (Cloud AI APIs for NLP, machine translation, document processing, audio transcription, computer vision) |
| Search and embeddings | `SEARCH` function and search indexes; embedding generation and autonomous embedding generation; `VECTOR_SEARCH`, `AI.SEARCH`, vector indexes |
| BigQuery ML | Create and run models with GoogleSQL; Colab Enterprise notebooks; explainable AI; `TimesFM`, `ARIMA_PLUS`, `ARIMA_PLUS_XREG` for forecasting and anomaly detection; `TabFM` (Preview) for zero-shot classification and regression; contribution analysis |
| Agent-building tools | Managed MCP servers (HTTPS endpoints), MCP Toolbox for Databases (open source local MCP server), ADK integrations, agent skills packages `bigquery-basics` and `bigquery-ai-ml`, agent analytics (streams logs from ADK or LangGraph into BigQuery) |
| IDE / terminal agents | Data Agent Kit (IDE extension for VS Code, Antigravity, Cursor; coding agent plugin for Antigravity CLI, Gemini CLI, Claude Code, Codex CLI), MCP IDE integrations (Antigravity, VS Code, Cursor, Windsurf, Claude Code), Antigravity CLI |

## Notes

- This feature may not be available when using reservations that are created with certain BigQuery editions; see the editions introduction for which features each edition enables.
- Gemini Cloud Assist and the `TabFM` model are marked Preview in the source.
- The AI functions call Gemini, partner, and open models on Gemini Enterprise Agent Platform (Vertex AI), Cloud AI APIs, or built-in models. The Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`, not here.
- Skills named `bigquery-basics` / `bigquery-ai-ml` are BigQuery agent skills packages, not the Agent Skills of this repository or Claude Code.
- Source: https://docs.cloud.google.com/bigquery/docs/ai-introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [generative-ai-overview.md](./generative-ai-overview.md)
- [vector-search-intro.md](./vector-search-intro.md)
- [generate-text.md](./generate-text.md)
