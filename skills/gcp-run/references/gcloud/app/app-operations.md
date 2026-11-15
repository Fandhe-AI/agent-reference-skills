---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/operations
---

# gcloud app operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app operations describe

```text
NAME
    gcloud app operations describe - describes the operation

SYNOPSIS
    gcloud app operations describe OPERATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes the operation.

EXAMPLES
    To describe an App Engine operation called o1, run:

        $ gcloud app operations describe o1

POSITIONAL ARGUMENTS
     OPERATION
        ID of operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app operations describe
```

### gcloud app operations list

```text
NAME
    gcloud app operations list - list the operations

SYNOPSIS
    gcloud app operations list [--pending] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the operations.

EXAMPLES
    To list all App Engine operations, run:

        $ gcloud app operations list

    To list only 100 App Engine operations, run:

        $ gcloud app operations list --limit=100

    To list only pending App Engine operations, run:

        $ gcloud app operations list --pending

FLAGS
     --pending
        Only display pending operations

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
    This variant is also available:

        $ gcloud beta app operations list
```

### gcloud app operations wait

```text
NAME
    gcloud app operations wait - polls an operation until completion

SYNOPSIS
    gcloud app operations wait OPERATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Polls an operation until completion.

EXAMPLES
    To wait for an App Engine operation called o1 to complete, run:

        $ gcloud app operations wait o1

POSITIONAL ARGUMENTS
     OPERATION
        ID of operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app operations wait
```

### gcloud beta app operations describe

```text
NAME
    gcloud beta app operations describe - describes the operation

SYNOPSIS
    gcloud beta app operations describe OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app operations list

```text
NAME
    gcloud beta app operations list - list the operations

SYNOPSIS
    gcloud beta app operations list [--pending] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app operations wait

```text
NAME
    gcloud beta app operations wait - polls an operation until completion

SYNOPSIS
    gcloud beta app operations wait OPERATION [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
