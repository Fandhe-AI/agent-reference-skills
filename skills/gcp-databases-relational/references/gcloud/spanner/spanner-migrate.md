---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/spanner/migrate
---

# gcloud spanner migrate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha spanner migrate cleanup

```text
NAME
    gcloud alpha spanner migrate cleanup - cleanup migration resources given a
        data migration job id

SYNOPSIS
    gcloud alpha spanner migrate cleanup --job-id=JOB_ID
        --target-profile=TARGET_PROFILE [--data-shard-ids=DATA_SHARD_IDS]
        [--dataflow] [--datastream] [--log-level=LOG_LEVEL] [--monitoring]
        [--pub-sub] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner migrate data

```text
NAME
    gcloud alpha spanner migrate data - migrate data from a source database to
        Cloud Spanner given a schema

SYNOPSIS
    gcloud alpha spanner migrate data --session=SESSION --source=SOURCE
        --target-profile=TARGET_PROFILE [--dataflow-template=DATAFLOW_TEMPLATE]
        [--dry-run] [--log-level=LOG_LEVEL] [--prefix=PREFIX]
        [--project=PROJECT] [--skip-foreign-keys]
        [--source-profile=SOURCE_PROFILE] [--target=TARGET]
        [--write-limit=WRITE_LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner migrate schema

```text
NAME
    gcloud alpha spanner migrate schema - migrate schema from a source database
        to Cloud Spanner

SYNOPSIS
    gcloud alpha spanner migrate schema --source=SOURCE
        --target-profile=TARGET_PROFILE [--dry-run] [--log-level=LOG_LEVEL]
        [--prefix=PREFIX] [--project=PROJECT] [--source-profile=SOURCE_PROFILE]
        [--target=TARGET] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner migrate schema-and-data

```text
NAME
    gcloud alpha spanner migrate schema-and-data - migrate data from a source
        database to Cloud Spanner given a schema

SYNOPSIS
    gcloud alpha spanner migrate schema-and-data --source=SOURCE
        --target-profile=TARGET_PROFILE [--dataflow-template=DATAFLOW_TEMPLATE]
        [--dry-run] [--log-level=LOG_LEVEL] [--prefix=PREFIX]
        [--project=PROJECT] [--skip-foreign-keys]
        [--source-profile=SOURCE_PROFILE] [--target=TARGET]
        [--write-limit=WRITE_LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner migrate web

```text
NAME
    gcloud alpha spanner migrate web - run the web UI assistant for schema
        migrations

SYNOPSIS
    gcloud alpha spanner migrate web [--dataflow-template=DATAFLOW_TEMPLATE]
        [--log-level=LOG_LEVEL] [--open] [--port=PORT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/spanner/migrate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
