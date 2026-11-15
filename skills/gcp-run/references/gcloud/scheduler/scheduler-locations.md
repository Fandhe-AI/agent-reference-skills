---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/locations
---

# gcloud scheduler locations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scheduler locations describe

```text
NAME
    gcloud scheduler locations describe - show details about a location

SYNOPSIS
    gcloud scheduler locations describe LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a location.

EXAMPLES
    To describe a location:

        $ gcloud scheduler locations describe my-location

POSITIONAL ARGUMENTS
     LOCATION
        The Cloud location to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha scheduler locations describe

        $ gcloud beta scheduler locations describe
```

### gcloud scheduler locations list

```text
NAME
    gcloud scheduler locations list - lists the locations where Cloud Scheduler
        is available

SYNOPSIS
    gcloud scheduler locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the locations where Cloud Scheduler is available.

EXAMPLES
    To list the locations where Cloud Scheduler is available:

        $ gcloud scheduler locations list

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha scheduler locations list

        $ gcloud beta scheduler locations list
```

### gcloud beta scheduler locations describe

```text
NAME
    gcloud beta scheduler locations describe - show details about a location

SYNOPSIS
    gcloud beta scheduler locations describe LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scheduler locations list

```text
NAME
    gcloud beta scheduler locations list - lists the locations where Cloud
        Scheduler is available

SYNOPSIS
    gcloud beta scheduler locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scheduler locations describe

```text
NAME
    gcloud alpha scheduler locations describe - show details about a location

SYNOPSIS
    gcloud alpha scheduler locations describe LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scheduler locations list

```text
NAME
    gcloud alpha scheduler locations list - lists the locations where Cloud
        Scheduler is available

SYNOPSIS
    gcloud alpha scheduler locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/locations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
