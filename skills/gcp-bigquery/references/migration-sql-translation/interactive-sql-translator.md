---
source: https://docs.cloud.google.com/bigquery/docs/interactive-sql-translator
---

# Translate queries with the interactive SQL translator

The interactive SQL translator translates queries from other SQL dialects into GoogleSQL from the Google Cloud console, the Google Cloud CLI, or the BigQuery Migration Service MCP server. Translations can be customized with translation rules (Gemini-enhanced rules are Preview).

## Signature / Usage

### Translate a query with gcloud (Preview)

```bash
gcloud alpha bq migration translate \
  --source-dialect=SOURCE_DIALECT \
  --target-dialect=TARGET_DIALECT \
  --location=LOCATION \
  --input-file=INPUT_FILE
```

The command prints the translated query; add `--output-file` to write it to a file.

### Translate from standard input

```bash
echo 'SELECT 1;' | gcloud alpha bq migration translate \
  --source-dialect=teradata \
  --target-dialect=bigquery \
  --location=us
```

### Translate with an MCP client

```text
Translate this query from DIALECT: QUERY. Use PROJECT_NUMBER and LOCATION.
```

### Supply DDL before the query to resolve `RelationNotFound` / `AttributeNotFound`

```sql
create table schema1.table1 (id int, field1 int, field2 varchar(16));
create table schema1.table2 (id int, field1 varchar(30), field2 date);

select table1.field1, table2.field1
from table1, table2
where table1.id = table2.id;
```

## Options / Props

### `gcloud alpha bq migration translate` flags used on this page

| Flag | Description |
|------|-------------|
| `--source-dialect` | SQL dialect to translate, such as `teradata`. |
| `--target-dialect` | Dialect to translate into, for example `bigquery`. |
| `--location` | Location where the translation job runs (for example `eu` to keep data in Europe). |
| `--input-file` | Local file with the query. If omitted, the command reads standard input. |
| `--output-file` | Local file for the translated SQL produced after applying rules in `*.config.yaml` files. |
| `--translation-config-files` | Comma-separated configuration YAML files; names must end with `.config.yaml` or `.ai_config.yaml`. |
| `--metadata-gcs-uri` | Cloud Storage URI of a metadata ZIP file. |
| `--source-sql-suggestion-output-file` | Rewritten source SQL from `SOURCE_SQL` rules in `*.ai_config.yaml` files (Gemini, before translation). |
| `--target-sql-suggestion-output-file` | Rewritten target SQL from `TARGET_SQL` rules in `*.ai_config.yaml` files. |
| `--explanation-output-file` | Gemini-generated explanation. Generated only when this flag is set; never printed to standard output. |

### MCP prompt placeholders and tools

| Item | Description |
|------|-------------|
| `DIALECT` | Source dialect, such as `Teradata`. |
| `QUERY` | The SQL query to translate. |
| `PROJECT_NUMBER` | Google Cloud project number. |
| `LOCATION` | Processing location, such as `us` or `eu`. |
| `translate_query` / `get_translation` | Tools called to start and poll until state is `SUCCEEDED` or `FAILED`. |
| `explain_translation` | Explains the translation. |
| `generate_ddl_suggestion` / `fetch_ddl_suggestion` | Infer source DDL statements. |

### Where each output appears in the console

| Output | Location |
|--------|----------|
| Translated SQL | Right pane after **Translate** |
| Rewritten source SQL | **Preview suggested changes** dialog, or **Assist > View suggestions** in the left pane |
| Rewritten target SQL | **Assist > View suggestions** in the right pane |
| Explanation | **Assist > Explain this translation** |

## Notes

- Console steps: **Tools > Translation settings** (source dialect, optional processing location, **Save**), then **Tools > Enable SQL translation**, enter the query in the left pane, click **Translate**. The source also shows Console screenshots.
- Locations: the interactive translator is available only in select processing locations (see the enable-sql-translations page). Gemini-based translation configurations are only available in specific processing locations (the Vertex AI "Google model endpoint locations" list). These Gemini features call Google models; the Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`.
- Preview: the `gcloud alpha bq migration translate` command, Gemini-enhanced translation rules (**ASSIST > Customize**), and **Explain this translation** are Preview ("Pre-GA Offerings Terms"; "available as is and might have limited support"). Support and feedback for Preview features: ai-sql-translation-help@google.com. Gemini-enhanced translations have a limited amount of Gemini usage at no charge, which the source says suffices for most migration projects.
- Rules saved from the console go to `__default.ai_config.yaml` in the Cloud Storage folder set in **Translation Configuration Source Location**.
- Configuration size limit: the compressed metadata file or YAML config file must be smaller than 50 MB; larger files are skipped with an error similar to `CONFIG ERROR: Skip reading file "gs://metadata-file.zip". File size (150,000,000 bytes) exceeds limit (50 MB).` Use the `--database` or `--schema` flags of the metadata extractor to reduce size.
- To reuse a batch job's settings, put its batch translation configuration ID (shown as **Resource name** on the job's **Translation Configuration** tab) into **Translation Configuration ID** in the translation settings.
- Supply DDL for referenced tables before the query for the most accurate translation. **Suggested fix** with Gemini for these errors is Preview (feedback: bq-edw-migration-support@google.com).
- Helper UDFs for source functions with no direct equivalent are commonly in the public `bqutil` dataset (for example `bqutil.fn.cw_count()`). The source recommends not depending on `bqutil` in production (the latest definitions can change, and organization policy may block public datasets) and deploying the UDFs into your own project and dataset (deployment scripts in the GoogleCloudPlatform `bigquery-utils` repository).
- Pricing: no charge for the interactive SQL translator; storage for input and output files incurs normal fees.
- The source also shows Console click-paths and screenshots (omitted).
- Source: https://docs.cloud.google.com/bigquery/docs/interactive-sql-translator (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-sql-translations.md](./enable-sql-translations.md)
- [batch-sql-translator.md](./batch-sql-translator.md)
- [migration-intro.md](./migration-intro.md)
