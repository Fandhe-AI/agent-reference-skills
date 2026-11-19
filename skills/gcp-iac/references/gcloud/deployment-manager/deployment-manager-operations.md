---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deployment-manager/operations
---

# gcloud deployment-manager operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deployment-manager operations describe

```text
NAME
    gcloud deployment-manager operations describe - provide information about
        an operation

SYNOPSIS
    gcloud deployment-manager operations describe OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command prints out all available details about an operation.

EXAMPLES
    To display information about an operation, run:

        $ gcloud deployment-manager operations describe operation-name

POSITIONAL ARGUMENTS
     OPERATION_NAME
        Operation name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deployment-manager operations describe

        $ gcloud beta deployment-manager operations describe
```

### gcloud deployment-manager operations list

```text
NAME
    gcloud deployment-manager operations list - list operations in a project

SYNOPSIS
    gcloud deployment-manager operations list [--simple-list]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Prints a table with summary information on all operations in the project.

EXAMPLES
    To print out a list of operations with some summary information about each,
    run:

        $ gcloud deployment-manager operations list

    To print only the name of each operation, run:

        $ gcloud deployment-manager operations list --simple-list

FLAGS
     --simple-list
        Changes the --format flag to print the resource IDs. Otherwise either
        the --format value or the default format is used.

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

        $ gcloud alpha deployment-manager operations list

        $ gcloud beta deployment-manager operations list
```

### gcloud deployment-manager operations wait

```text
NAME
    gcloud deployment-manager operations wait - wait for all operations
        specified to complete before returning

SYNOPSIS
    gcloud deployment-manager operations wait OPERATION_NAME
        [OPERATION_NAME ...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Polls until all operations have finished, then prints the resulting
    operations along with any operation errors.

EXAMPLES
    To poll until an operation has completed, run:

        $ gcloud deployment-manager operations wait operation-name

    To poll until several operations have all completed, run:

        $ gcloud deployment-manager operations wait operation-one \
            operation-two operation-three

POSITIONAL ARGUMENTS
     OPERATION_NAME [OPERATION_NAME ...]
        Operation name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deployment-manager operations wait

        $ gcloud beta deployment-manager operations wait
```

### gcloud beta deployment-manager operations describe

```text
NAME
    gcloud beta deployment-manager operations describe - provide information
        about an operation

SYNOPSIS
    gcloud beta deployment-manager operations describe OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager operations list

```text
NAME
    gcloud beta deployment-manager operations list - list operations in a
        project

SYNOPSIS
    gcloud beta deployment-manager operations list [--simple-list]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager operations wait

```text
NAME
    gcloud beta deployment-manager operations wait - wait for all operations
        specified to complete before returning

SYNOPSIS
    gcloud beta deployment-manager operations wait OPERATION_NAME
        [OPERATION_NAME ...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager operations describe

```text
NAME
    gcloud alpha deployment-manager operations describe - provide information
        about an operation

SYNOPSIS
    gcloud alpha deployment-manager operations describe OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager operations list

```text
NAME
    gcloud alpha deployment-manager operations list - list operations in a
        project

SYNOPSIS
    gcloud alpha deployment-manager operations list [--simple-list]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager operations wait

```text
NAME
    gcloud alpha deployment-manager operations wait - wait for all operations
        specified to complete before returning

SYNOPSIS
    gcloud alpha deployment-manager operations wait OPERATION_NAME
        [OPERATION_NAME ...] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026.", "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down. All related APIs and functions will no longer be supported." and "As of June 30, 2026, new users are blocked from enabling Google Cloud Deployment Manager V2 API or creating their first deployment."; it recommends Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deployment-manager/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
