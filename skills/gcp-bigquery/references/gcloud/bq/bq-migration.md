---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/migration
---

# gcloud bq migration

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha bq migration metadata extract

```text
NAME
    gcloud alpha bq migration metadata extract - extract metadata from a source
        data warehouse

SYNOPSIS
    gcloud alpha bq migration metadata extract --connector=CONNECTOR
        --output=OUTPUT [--endpoint-mode=ENDPOINT_MODE]
        [--expected-owner=EXPECTED_OWNER]
        [--run-mode=RUN_MODE; default="local"]
        [--no-address --gce-instance=GCE_INSTANCE
          --gce-service-account=GCE_SERVICE_ACCOUNT
          --gce-startup-script-url=GCE_STARTUP_SCRIPT_URL --network=NETWORK
          --secret=SECRET --service-account-user=SERVICE_ACCOUNT_USER
          --subnet=SUBNET --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
        [-- EXTRACTOR_ARGS ...]
```

### gcloud alpha bq migration query-logs extract

```text
NAME
    gcloud alpha bq migration query-logs extract - extract query logs from a
        source data warehouse

SYNOPSIS
    gcloud alpha bq migration query-logs extract --connector=CONNECTOR
        --output=OUTPUT [--endpoint-mode=ENDPOINT_MODE]
        [--expected-owner=EXPECTED_OWNER]
        [--run-mode=RUN_MODE; default="local"]
        [--no-address --gce-instance=GCE_INSTANCE
          --gce-service-account=GCE_SERVICE_ACCOUNT
          --gce-startup-script-url=GCE_STARTUP_SCRIPT_URL --network=NETWORK
          --secret=SECRET --service-account-user=SERVICE_ACCOUNT_USER
          --subnet=SUBNET --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
        [-- EXTRACTOR_ARGS ...]
```

### gcloud alpha bq migration translate

```text
NAME
    gcloud alpha bq migration translate - translate a SQL query from a source
        dialect to BigQuery

SYNOPSIS
    gcloud alpha bq migration translate --location=LOCATION
        --source-dialect=SOURCE_DIALECT --target-dialect=TARGET_DIALECT
        [--endpoint-mode=ENDPOINT_MODE]
        [--explanation-output-file=EXPLANATION_OUTPUT_FILE]
        [--input-file=INPUT_FILE] [--metadata-gcs-uri=METADATA_GCS_URI]
        [--output-file=OUTPUT_FILE]
        [--source-ddl-output-file=SOURCE_DDL_OUTPUT_FILE]
        [--source-sql-suggestion-output-file=SOURCE_SQL_SUGGESTION_OUTPUT_FILE]
        [--target-sql-suggestion-output-file=TARGET_SQL_SUGGESTION_OUTPUT_FILE]
        [--translation-config-files=[CONFIG_FILE,...]]
        [--translation-log-file=TRANSLATION_LOG_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration translate-batch

```text
NAME
    gcloud alpha bq migration translate-batch - translates a batch of SQL
        queries

SYNOPSIS
    gcloud alpha bq migration translate-batch --location=LOCATION
        --source-dialect=SOURCE_DIALECT --target-dialect=TARGET_DIALECT
        --target-gcs-path=TARGET_GCS_PATH [--async] [--enable-ai-suggestion]
        [--endpoint-mode=ENDPOINT_MODE] [--source-gcs-files=[FILE_URI,...]]
        [--source-gcs-uris=[URI,...]]
        [--source-local-dirs=[LOCAL_DIR=CLOUD_STORAGE_URI,...]]
        [--source-local-files=[LOCAL_FILE=CLOUD_STORAGE_FILE_URI,...]]
        [--target-types=[TARGET_TYPE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration translate-metadata

```text
NAME
    gcloud alpha bq migration translate-metadata - translates metadata from zip
        files into DDL statements and table mappings

SYNOPSIS
    gcloud alpha bq migration translate-metadata --location=LOCATION
        --source-dialect=SOURCE_DIALECT --target-dialect=TARGET_DIALECT
        --target-gcs-path=TARGET_GCS_PATH [--async]
        [--endpoint-mode=ENDPOINT_MODE] [--source-gcs-files=[FILE_URI,...]]
        [--source-gcs-uris=[URI,...]]
        [--source-local-dirs=[LOCAL_DIR=CLOUD_STORAGE_URI,...]]
        [--source-local-files=[LOCAL_FILE=CLOUD_STORAGE_FILE_URI,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration translation describe

```text
NAME
    gcloud alpha bq migration translation describe - get the details or status
        of a submitted translation

SYNOPSIS
    gcloud alpha bq migration translation describe TRANSLATION_ID
        --location=LOCATION [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration translation generate-source-ddl

```text
NAME
    gcloud alpha bq migration translation generate-source-ddl - generates
        source DDL schemas from a batch of SQL queries using AI

SYNOPSIS
    gcloud alpha bq migration translation generate-source-ddl
        --location=LOCATION --source-dialect=SOURCE_DIALECT
        --target-dialect=TARGET_DIALECT --target-gcs-path=TARGET_GCS_PATH
        [--async] [--endpoint-mode=ENDPOINT_MODE]
        [--source-gcs-files=[FILE_URI,...]] [--source-gcs-uris=[URI,...]]
        [--source-local-dirs=[LOCAL_DIR=CLOUD_STORAGE_URI,...]]
        [--source-local-files=[LOCAL_FILE=CLOUD_STORAGE_FILE_URI,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration validation configure

```text
NAME
    gcloud alpha bq migration validation configure - generate the configuration
        for validating migrated data

SYNOPSIS
    gcloud alpha bq migration validation configure --output=DIRECTORY
        (--metadata=PATH --tables-yaml=[PATH,...])
        [--endpoint-mode=ENDPOINT_MODE] [--force] [--schemas=[SCHEMA,...]]
        [--tables=[TABLE,...]] [--target-dataset=TARGET_DATASET]
        [GCLOUD_WIDE_FLAG ...] [-- CLIENT_ARGS ...]
```

### gcloud alpha bq migration validation run

```text
NAME
    gcloud alpha bq migration validation run - validate data migrated to
        BigQuery against its source

SYNOPSIS
    gcloud alpha bq migration validation run CONFIG_PATH [CONFIG_PATH ...]
        --location=LOCATION [--endpoint-mode=ENDPOINT_MODE]
        [--gcs-path=GCS_PATH] [--labels=[KEY=VALUE,...]] [--tables=[TABLE,...]]
        [--validation-types=[TYPE,...]] [GCLOUD_WIDE_FLAG ...]
        [-- CLIENT_ARGS ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/migration (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
