---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/batch/resource-allowances
---

# gcloud batch resource-allowances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha batch resource-allowances create

```text
NAME
    gcloud alpha batch resource-allowances create - create a Batch resource
        allowance

SYNOPSIS
    gcloud alpha batch resource-allowances create
        [[RESOURCE_ALLOWANCE] --location=LOCATION] --config=PATH_TO_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch resource-allowances delete

```text
NAME
    gcloud alpha batch resource-allowances delete - delete a Batch resource
        allowance

SYNOPSIS
    gcloud alpha batch resource-allowances delete
        (RESOURCE_ALLOWANCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch resource-allowances describe

```text
NAME
    gcloud alpha batch resource-allowances describe - show details of a
        resource allowance

SYNOPSIS
    gcloud alpha batch resource-allowances describe
        (RESOURCE_ALLOWANCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch resource-allowances list

```text
NAME
    gcloud alpha batch resource-allowances list - list resource allowances for
        a specified Batch project/location

SYNOPSIS
    gcloud alpha batch resource-allowances list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch resource-allowances update

```text
NAME
    gcloud alpha batch resource-allowances update - update a Batch resource
        allowance

SYNOPSIS
    gcloud alpha batch resource-allowances update
        (RESOURCE_ALLOWANCE : --location=LOCATION) [--usage-limit=USAGE_LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/batch/resource-allowances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
