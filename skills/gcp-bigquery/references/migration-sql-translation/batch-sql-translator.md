---
source: https://docs.cloud.google.com/bigquery/docs/batch-sql-translator
---

# Migrate code with the batch SQL translator

The batch SQL translator translates scripts written in other SQL dialects into GoogleSQL in bulk. Submit and review jobs from the Google Cloud console, the command line, or the BigQuery Migration Service MCP server. Source files must be in Cloud Storage. For programmatic integrations, call the BigQuery Migration API directly.

## Signature / Usage

### Translate SQL files in Cloud Storage (Preview command)

```bash
gcloud alpha bq migration translate-batch \
    --source-dialect=SOURCE_DIALECT \
    --target-dialect=TARGET_DIALECT \
    --location=LOCATION \
    --source-gcs-uris=SOURCE_URI \
    --target-gcs-path=TARGET_URI
```

### Translate SQL files on the local machine

```bash
gcloud alpha bq migration translate-batch \
    --source-dialect=SOURCE_DIALECT \
    --target-dialect=TARGET_DIALECT \
    --location=LOCATION \
    --source-local-dirs=LOCAL_DIR=SOURCE_URI \
    --target-gcs-path=TARGET_URI
```

### Add a separately stored configuration YAML file

```bash
gcloud alpha bq migration translate-batch \
  --source-dialect=SOURCE_DIALECT \
  --target-dialect=TARGET_DIALECT \
  --location=LOCATION \
  --source-local-dirs=LOCAL_DIR=SOURCE_URI \
  --source-local-files=LOCAL_CONFIG_YAML=CONFIG_YAML_URI \
  --target-gcs-path=TARGET_URI
```

### Check the status of an asynchronous job (`--async`)

```bash
gcloud alpha bq migration translation describe TRANSLATION_ID \
    --location=LOCATION
```

### Retrieve the output files

```bash
gcloud storage cp --recursive TARGET_URI LOCAL_DIRECTORY
```

### Translate metadata (metadata ZIP files to DDL)

```bash
gcloud alpha bq migration translate-metadata \
  --source-dialect=SOURCE_DIALECT \
  --target-dialect=TARGET_DIALECT \
  --location=LOCATION \
  --source-gcs-uris=SOURCE_URI \
  --target-gcs-path=TARGET_URI
```

Translate SQL and metadata in one job:

```bash
gcloud alpha bq migration translate-batch \
  --source-dialect=SOURCE_DIALECT \
  --target-dialect=TARGET_DIALECT \
  --location=LOCATION \
  --source-gcs-uris=SOURCE_URI \
  --target-gcs-path=TARGET_URI \
  --target-types=sql,metadata
```

### Generate source DDL with Gemini (Preview)

```bash
gcloud alpha bq migration translation generate-source-ddl \
  --source-dialect=SOURCE_DIALECT \
  --target-dialect=TARGET_DIALECT \
  --location=LOCATION \
  --source-gcs-uris=SOURCE_URI \
  --target-gcs-path=TARGET_URI
```

### Debug one query locally

```bash
gcloud alpha bq migration translate \
  --source-dialect=SOURCE_DIALECT \
  --target-dialect=TARGET_DIALECT \
  --location=LOCATION \
  --input-file=INPUT_FILE \
  --output-file=OUTPUT_FILE \
  --translation-log-file=LOG_FILE \
  --explanation-output-file=EXPLANATION_FILE
```

### MCP prompts

```text
Translate the DIALECT SQL files in SOURCE_URI into GoogleSQL and write the output to TARGET_URI. Use PROJECT_NUMBER and LOCATION.
```

```text
Translate the DIALECT metadata file METADATA_FILE_URI into BigQuery DDL. Write the output to TARGET_URI. Use PROJECT_NUMBER and LOCATION.
```

```text
Generate DDL for the DIALECT SQL files in SOURCE_URI and write the output to TARGET_URI. Use PROJECT_NUMBER and LOCATION.
```

### Translation configuration file (alternative workflow), YAML

```yaml
tasks:
  translation_task:
    type: Teradata2BigQuery_Translation
    translationDetails:
      sourceTargetMapping:
      - sourceSpec:
          baseUri: gs://bq-translations/input
        targetSpec:
          relativePath: output
      targetBaseUri: gs://bq-translations
      targetTypes:
      - sql
      sourceEnvironment:
        defaultDatabase: default_db
        schemaSearchPath:
        - foo
```

### Translation configuration file, JSON

```json
{
  "tasks": {
    "translation_task": {
      "type": "Teradata2BigQuery_Translation",
      "translationDetails": {
        "sourceTargetMapping": [
          {
            "sourceSpec": {
              "literal": {
                "literalString": "sel 1",
                "relativePath": "my_input_1"
              },
              "encoding": "UTF-8"
            }
          },
          {
            "sourceSpec": {
              "literal": {
                "literalString": "sel 2",
                "relativePath": "my_input_2"
              },
              "encoding": "UTF-8"
            }
          }
        ],
        "targetReturnLiterals": [
          "sql/my_input_1",
          "sql/my_input_2"
        ]
      }
    }
  }
}
```

### Create and manage jobs with `gcloud bq migration-workflows`

```bash
gcloud bq migration-workflows create --location=LOCATION --config-file=CONFIG_FILE
```

```bash
gcloud bq migration-workflows create --location=LOCATION --config-file=CONFIG_FILE --async
```

```bash
gcloud bq migration-workflows list --location=LOCATION
```

```bash
gcloud bq migration-workflows describe projects/PROJECT_ID/locations/LOCATION/workflows/WORKFLOW_ID
```

## Options / Props

### `translate-batch` flags used on this page

| Flag | Description |
|------|-------------|
| `--source-dialect` / `--target-dialect` | Source dialect (for example `teradata`) and target (for example `bigquery`). |
| `--location` | Processing location (for example `us`). |
| `--source-gcs-uris` | Cloud Storage directories with the source files. |
| `--source-gcs-files` | Additional individual Cloud Storage files (for example a configuration YAML file stored outside the source directory). |
| `--source-local-dirs` | `LOCAL_DIR=SOURCE_URI`: uploads the local directory to that URI and includes it. |
| `--source-local-files` | Maps individual local files to Cloud Storage URIs; the URI must be outside the `SOURCE_URI` directory for a separate configuration YAML file. |
| `--target-gcs-path` | Cloud Storage directory for output. |
| `--target-types` | Outputs, for example `sql,metadata`. |
| `--enable-ai-suggestion` | Generate Gemini suggestions alongside the translated SQL. |
| `--async` | Submit and return immediately, printing a translation ID. |

### Output directories under the target path

| Directory | Content |
|-----------|---------|
| `sql/` | Translated SQL after applying `*.config.yaml` rules (if `SOURCE_SQL` rules in `*.ai_config.yaml` apply, the rewritten files from `source_sql_query_customization_suggestion/` are translated). |
| `metadata/` | Translated DDL for tables and views in input metadata ZIP files, plus a `config/` subdirectory with table metadata in YAML. |
| `report/` | Job-level reports, including `translation_report.csv`. |
| `source_sql_query_customization_suggestion/` | Source SQL rewritten by Gemini (`SOURCE_SQL` rules). |
| `target_sql_query_customization_suggestion/` | Translated SQL rewritten by Gemini (`TARGET_SQL` rules). |
| `translation_explanation_suggestion/` | Text explanations, for example `queries/report.sql` has `translation_explanation_suggestion/queries/report.txt`. |
| `source_sql_metadata_generation_suggestion/` | `generated_metadata.sql` with Gemini-suggested source DDL for unresolved objects. |

### Summary report (`translation_report.csv`) columns

| Column | Description |
|--------|-------------|
| Timestamp | When the issue occurred. |
| FilePath / FileName | Source file the issue belongs to. |
| ScriptLine / ScriptColumn | Line and column of the issue. |
| TranspilerComponent | Engine component (may be empty). |
| Environment | Dialect environment (may be empty). |
| ObjectName | SQL object (may be empty). |
| Severity | warning or error. |
| Category | Issue category. |
| SourceType | `SQL` (input SQL files) or `METADATA` (metadata package). |
| Message | Warning or error message. |
| ScriptContext | SQL snippet associated with the issue. |
| Action | Recommended action. |

### Quota and limits

| Limit | Value |
|-------|-------|
| Active translation tasks per project | At most 10 |
| Source and metadata files | No hard limit; keep under 1000 files for better performance |
| Other | BigQuery Migration API quotas apply |

## Notes

- Required roles and permissions are the same as on the enable-sql-translations page (`roles/bigquerymigration.viewer`, `roles/bigquerymigration.editor`, `roles/storage.objectAdmin` on the source and destination buckets). Metadata files and configuration YAML files placed in the source folder are detected automatically.
- Preview: all `gcloud alpha bq migration ...` commands, translating metadata, and generating source DDL are Preview ("Pre-GA Offerings Terms"). Fixing `RelationNotFound` / `AttributeNotFound` with Gemini (**Suggested fix**) is Preview (feedback: bq-edw-migration-support@google.com). Gemini features call Google models; the Gemini Developer API is in `google-gemini-api`.
- Translation is done on a best effort basis; validate the translated queries. The `*_suggestion/` directories are written only when Gemini AI suggestions are enabled.
- Add `metadata` to `--target-types` only if the batch inputs include your metadata ZIP files.
- For `RelationNotFound` / `AttributeNotFound`, supply metadata (generated with `dwh-migration-dumper`) as the recommended first step; Gemini-inferred DDL should always be reviewed before use. To retranslate with suggested DDL via MCP, copy it as unzipped SQL files to a directory under `SOURCE_URI` and run `translate_batch_queries` again. Source output directory for suggestions is returned by the `fetch_batch_ddl_suggestion` tool.
- MCP: the client calls `translate_batch_queries` (or `translate_metadata`, `generate_batch_ddl_suggestion`) and polls `fetch_batch_translation` / `fetch_batch_ddl_suggestion` until the state is `SUCCEEDED` or `FAILED`. For `TARGET_URI` use an empty Cloud Storage directory. `translation_report.csv` is written to `TARGET_URI`.
- Helper UDFs in the public `bqutil` dataset (for example `bqutil.fn.cw_count()`) are not recommended for production; deploy them into your own project (see the `bigquery-utils` repository).
- Configuration files: the translation configuration file that defines a job differs from a configuration YAML file that customizes how SQL is transformed. The `bq` form of the migration-workflows commands shown in the source (`bq mk`, `bq ls`, `bq show`, `bq rm` with `--migration_workflow`) is omitted because those flags are not in the `bq` command-line reference; use the `gcloud bq migration-workflows` form. The source also shows Console steps, Console output tabs (Log Summary, Log Messages, Code tab, Configuration tab) and Sankey diagrams.
- Both fenced config examples are tagged `yaml` / `json` here (the source tags both `bash`).
- Pricing: no charge for the batch SQL translator; storage for input and output files incurs normal fees.
- Try destructive or costly actions (for example removing a translation job from the list) on test jobs first.
- Source: https://docs.cloud.google.com/bigquery/docs/batch-sql-translator (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-sql-translations.md](./enable-sql-translations.md)
- [interactive-sql-translator.md](./interactive-sql-translator.md)
- [migration-intro.md](./migration-intro.md)
- [schema-data-overview.md](./schema-data-overview.md)
