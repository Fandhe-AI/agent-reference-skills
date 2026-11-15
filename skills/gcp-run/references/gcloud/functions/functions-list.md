---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/list
---

# gcloud functions list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud functions list

```text
NAME
    gcloud functions list - list Google Cloud Functions

SYNOPSIS
    gcloud functions list [--regions=REGION,[REGION,...]; default="-"] [--v2]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Google Cloud Functions.

FLAGS
     --regions=REGION,[REGION,...]; default="-"
        Regions containing functions to list. By default, functions from the
        region configured in [functions/region] property are listed.

     --v2
        If specified, this command will use Cloud Functions v2 APIs and return
        the result in the v2 format (See
        https://cloud.google.com/functions/docs/reference/rest/v2/projects.locations.functions#Function).
        If not specified, 1st gen and 2nd gen functions will use v1 and v2 APIs
        respectively and return the result in the corresponding format (For v1
        format, see
        https://cloud.google.com/functions/docs/reference/rest/v1/projects.locations.functions#resource:-cloudfunction).
        This command conflicts with --no-gen2. If specified with this
        combination, v2 APIs will be used.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha functions list

        $ gcloud beta functions list
```

### gcloud beta functions list

```text
NAME
    gcloud beta functions list - list Google Cloud Functions

SYNOPSIS
    gcloud beta functions list [--regions=REGION,[REGION,...]; default="-"]
        [--v2] [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions list

```text
NAME
    gcloud alpha functions list - list Google Cloud Functions

SYNOPSIS
    gcloud alpha functions list [--regions=REGION,[REGION,...]; default="-"]
        [--v2] [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
