---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/datasets
---

# gcloud bq datasets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha bq datasets config export

```text
NAME
    gcloud alpha bq datasets config export - export the configuration for a
        Google BigQuery dataset

SYNOPSIS
    gcloud alpha bq datasets config export ([DATASET]] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq datasets create

```text
NAME
    gcloud alpha bq datasets create - create a new BigQuery dataset

SYNOPSIS
    gcloud alpha bq datasets create DATASET [--description=DESCRIPTION]
        [--overwrite] [--permissions-file=[PERMISSIONS_FILE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq datasets delete

```text
NAME
    gcloud alpha bq datasets delete - delete a BigQuery dataset

SYNOPSIS
    gcloud alpha bq datasets delete DATASET [--remove-tables]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq datasets describe

```text
NAME
    gcloud alpha bq datasets describe - describe a BigQuery dataset

SYNOPSIS
    gcloud alpha bq datasets describe DATASET [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq datasets list

```text
NAME
    gcloud alpha bq datasets list - list all BigQuery datasets in a project

SYNOPSIS
    gcloud alpha bq datasets list [--all] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq datasets update

```text
NAME
    gcloud alpha bq datasets update - update a BigQuery dataset

SYNOPSIS
    gcloud alpha bq datasets update DATASET [--description=DESCRIPTION]
        [--permissions-file=[PERMISSIONS_FILE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/datasets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
