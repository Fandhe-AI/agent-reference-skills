---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/operations
---

# gcloud sql operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql operations cancel

```text
NAME
    gcloud sql operations cancel - cancels a Cloud SQL instance operation

SYNOPSIS
    gcloud sql operations cancel OPERATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancels a Cloud SQL instance operation.

EXAMPLES
    To cancel an operation with the id "prod-operation-id", like
    "acb40108-a483-4a8b-8a5c-e27100000032", run:

        $ gcloud sql operations cancel prod-operation-id

POSITIONAL ARGUMENTS
     OPERATION
        Name that uniquely identifies the operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql operations cancel

        $ gcloud beta sql operations cancel
```

### gcloud sql operations describe

```text
NAME
    gcloud sql operations describe - retrieves information about a Cloud SQL
        instance operation

SYNOPSIS
    gcloud sql operations describe OPERATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves information about a Cloud SQL instance operation.

EXAMPLES
    To describe an operation with the name "prod-operation-id", run:

        $ gcloud sql operations describe prod-operation-id

POSITIONAL ARGUMENTS
     OPERATION
        Name that uniquely identifies the operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql operations describe

        $ gcloud beta sql operations describe
```

### gcloud sql operations list

```text
NAME
    gcloud sql operations list - lists all instance operations for the given
        Cloud SQL instance

SYNOPSIS
    gcloud sql operations list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all instance operations for the given Cloud SQL instance.

EXAMPLES
    To list operations for instances with ID "prod-instance" , run:

        $ gcloud sql operations list --instance=prod-instance

    To list operations for instances with ID "prod-instance" that have 10
    results, run:

        $ gcloud sql operations list --instance=prod-instance --limit=10

    To list operations for instances with ID "prod-instance" that have 10
    results in a page, run:

        $ gcloud sql operations list --instance=prod-instance --page-size=10

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

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

        $ gcloud alpha sql operations list

        $ gcloud beta sql operations list
```

### gcloud sql operations wait

```text
NAME
    gcloud sql operations wait - waits for one or more operations to complete

SYNOPSIS
    gcloud sql operations wait OPERATION [OPERATION ...]
        [--timeout=TIMEOUT; default=300] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Waits for one or more operations to complete.

POSITIONAL ARGUMENTS
     OPERATION [OPERATION ...]
        An identifier that uniquely identifies the operation.

FLAGS
     --timeout=TIMEOUT; default=300
        Maximum number of seconds to wait for an operation to complete. By
        default, wait for 300s. Set to unlimited to wait indefinitely.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql operations wait

        $ gcloud beta sql operations wait
```

### gcloud beta sql operations cancel

```text
NAME
    gcloud beta sql operations cancel - cancels a Cloud SQL instance operation

SYNOPSIS
    gcloud beta sql operations cancel OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql operations describe

```text
NAME
    gcloud beta sql operations describe - retrieves information about a Cloud
        SQL instance operation

SYNOPSIS
    gcloud beta sql operations describe OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql operations list

```text
NAME
    gcloud beta sql operations list - lists all instance operations for the
        given Cloud SQL instance

SYNOPSIS
    gcloud beta sql operations list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql operations wait

```text
NAME
    gcloud beta sql operations wait - waits for one or more operations to
        complete

SYNOPSIS
    gcloud beta sql operations wait OPERATION [OPERATION ...]
        [--timeout=TIMEOUT; default=300] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql operations cancel

```text
NAME
    gcloud alpha sql operations cancel - cancels a Cloud SQL instance operation

SYNOPSIS
    gcloud alpha sql operations cancel OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql operations describe

```text
NAME
    gcloud alpha sql operations describe - retrieves information about a Cloud
        SQL instance operation

SYNOPSIS
    gcloud alpha sql operations describe OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql operations list

```text
NAME
    gcloud alpha sql operations list - lists all instance operations for the
        given Cloud SQL instance

SYNOPSIS
    gcloud alpha sql operations list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql operations wait

```text
NAME
    gcloud alpha sql operations wait - waits for one or more operations to
        complete

SYNOPSIS
    gcloud alpha sql operations wait OPERATION [OPERATION ...]
        [--timeout=TIMEOUT; default=300] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
