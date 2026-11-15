---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/operations
---

# gcloud storage operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage operations cancel

```text
NAME
    gcloud storage operations cancel - cancel a storage operation

SYNOPSIS
    gcloud storage operations cancel OPERATION_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a storage operation. Since operations are asynchronous, this request
    is best effort and may fail in cases such as when the operation is already
    complete.

EXAMPLES
    To cancel the operation "C894F35J" on bucket "my-bucket", run:

        $ gcloud storage operations cancel \
            projects/_/buckets/my-bucket/operations/C894F35J

POSITIONAL ARGUMENTS
     OPERATION_NAME
        The operation name including the Cloud Storage bucket and operation ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage operations cancel
```

### gcloud storage operations describe

```text
NAME
    gcloud storage operations describe - get configuration and latest storage
        operation details

SYNOPSIS
    gcloud storage operations describe OPERATION_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details about a specific storage operation.

EXAMPLES
    To describe an operation "C894F35J" on bucket "my-bucket", run:

        $ gcloud storage operations describe \
            projects/_/buckets/my-bucket/operations/C894F35J

POSITIONAL ARGUMENTS
     OPERATION_NAME
        The operation name including the Cloud Storage bucket and operation ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage operations describe
```

### gcloud storage operations list

```text
NAME
    gcloud storage operations list - list storage operations

SYNOPSIS
    gcloud storage operations list PARENT_RESOURCE_NAME
        [--server-filter=SERVER_FILTER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List storage operations.

EXAMPLES
    To list all storage operations that belong to the bucket "my-bucket", run:

        $ gcloud storage operations list projects/_/buckets/my-bucket

    To list operations in JSON format, run:

        $ gcloud storage operations list projects/_/buckets/my-bucket \
            --format=json

    An alternative bucket format is available:

        $ gcloud storage operations list gs://my-bucket

POSITIONAL ARGUMENTS
     PARENT_RESOURCE_NAME
        The operation parent resource in the format
        "projects/_/buckets/BUCKET".

FLAGS
     --server-filter=SERVER_FILTER
        Server-side filter string used to determine what operations to return.
        Example: '(done = true AND complete_time >= "2023-01-01T00:00:00Z") OR
        requested_cancellation = true' Note that the entire filter string must
        be in quotes and date strings within the filter must be in embedded
        quotes.

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
    This variant is also available:

        $ gcloud alpha storage operations list
```

### gcloud alpha storage operations cancel

```text
NAME
    gcloud alpha storage operations cancel - cancel a storage operation

SYNOPSIS
    gcloud alpha storage operations cancel OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage operations describe

```text
NAME
    gcloud alpha storage operations describe - get configuration and latest
        storage operation details

SYNOPSIS
    gcloud alpha storage operations describe OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage operations list

```text
NAME
    gcloud alpha storage operations list - list storage operations

SYNOPSIS
    gcloud alpha storage operations list PARENT_RESOURCE_NAME
        [--server-filter=SERVER_FILTER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
