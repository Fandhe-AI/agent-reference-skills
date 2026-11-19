---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/tables
---

# gcloud bq tables

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha bq tables config export

```text
NAME
    gcloud alpha bq tables config export - export the configuration for a
        Google BigQuery table

SYNOPSIS
    gcloud alpha bq tables config export ([TABLE : --dataset=DATASET] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables copy

```text
NAME
    gcloud alpha bq tables copy - copy one BigQuery table to another

SYNOPSIS
    gcloud alpha bq tables copy
        (--destination=DESTINATION : --destination-dataset=DESTINATION_DATASET)
        (--source=SOURCE : --source-dataset=SOURCE_DATASET) [--async]
        [--job-id=JOB_ID] [--overwrite] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables create

```text
NAME
    gcloud alpha bq tables create - create a new BigQuery table

SYNOPSIS
    gcloud alpha bq tables create (TABLE : --dataset=DATASET)
        [--description=DESCRIPTION] [--expiration=EXPIRATION] [--overwrite]
        [--schema=[FIELD_NAME=FIELD_TYPE,...] | --schema-file=PATH_TO_FILE
          | [--view=VIEW : --use-legacy-sql]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables delete

```text
NAME
    gcloud alpha bq tables delete - delete a BigQuery table

SYNOPSIS
    gcloud alpha bq tables delete (TABLE : --dataset=DATASET)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables describe

```text
NAME
    gcloud alpha bq tables describe - describe a BigQuery table

SYNOPSIS
    gcloud alpha bq tables describe (TABLE : --dataset=DATASET)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables insert

```text
NAME
    gcloud alpha bq tables insert - insert records specified into an existing
        table

SYNOPSIS
    gcloud alpha bq tables insert (TABLE : --dataset=DATASET)
        --data=PATH_TO_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables list

```text
NAME
    gcloud alpha bq tables list - list all BigQuery tables and views in a
        dataset

SYNOPSIS
    gcloud alpha bq tables list --dataset=DATASET [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables show-rows

```text
NAME
    gcloud alpha bq tables show-rows - display selected rows in a specified
        table or view

SYNOPSIS
    gcloud alpha bq tables show-rows (--table=TABLE : --dataset=DATASET)
        [--limit=LIMIT; default=100] [--start=START] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq tables update

```text
NAME
    gcloud alpha bq tables update - update a new BigQuery table

SYNOPSIS
    gcloud alpha bq tables update (TABLE : --dataset=DATASET)
        [--description=DESCRIPTION] [--expiration=EXPIRATION]
        [--relax-columns=[FIELD_NAME,...]]
        [--add-columns=[FIELD_NAME=FIELD_TYPE,...]
          | --add-columns-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/tables (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
