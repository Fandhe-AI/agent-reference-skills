---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/operations
---

# gcloud firestore operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore operations cancel

```text
NAME
    gcloud firestore operations cancel - cancel a currently-running Cloud
        Firestore admin operation

SYNOPSIS
    gcloud firestore operations cancel NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a currently-running Cloud Firestore admin operation.

EXAMPLES
    To cancel the currently-running exampleOperationId operation, run:

        $ gcloud firestore operations cancel exampleOperationId

POSITIONAL ARGUMENTS
     NAME
        The unique name of the Operation to cancel, formatted as either the
        full or relative resource path:

            projects/my-app-id/databases/(default)/operations/foo

        or:

            foo

FLAGS
     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore operations cancel --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore operations cancel

        $ gcloud beta firestore operations cancel
```

### gcloud firestore operations delete

```text
NAME
    gcloud firestore operations delete - delete a completed Cloud Firestore
        admin operation

SYNOPSIS
    gcloud firestore operations delete NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a completed Cloud Firestore admin operation.

EXAMPLES
    To delete the completed exampleOperationId operation, run:

        $ gcloud firestore operations delete exampleOperationId

POSITIONAL ARGUMENTS
     NAME
        The unique name of the operation to delete, formatted as either the
        full or relative resource path:

            projects/my-app-id/databases/(default)/operations/foo

        or:

            foo

FLAGS
     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore operations delete --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore operations delete

        $ gcloud beta firestore operations delete
```

### gcloud firestore operations describe

```text
NAME
    gcloud firestore operations describe - retrieves information about a Cloud
        Firestore admin operation

SYNOPSIS
    gcloud firestore operations describe NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves information about a Cloud Firestore admin operation.

EXAMPLES
    To retrieve information about the exampleOperationId operation, run:

        $ gcloud firestore operations describe exampleOperationId

POSITIONAL ARGUMENTS
     NAME
        The unique name of the Operation to retrieve, formatted as either the
        full or relative resource path:

            projects/my-app-id/databases/(default)/operations/foo

        or:

            foo

FLAGS
     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore operations describe --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore operations describe

        $ gcloud beta firestore operations describe
```

### gcloud firestore operations list

```text
NAME
    gcloud firestore operations list - list pending Cloud Firestore admin
        operations and their status

SYNOPSIS
    gcloud firestore operations list [--database=DATABASE; default="(default)"]
        [--filter=EXPRESSION] [--limit=LIMIT; default=100]
        [--page-size=PAGE_SIZE; default=100] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Filters are case-sensitive and have the following syntax:

        field = value [AND [field = value]] ...

    Only the logical AND operator is supported; space-separated items are
    treated as having an implicit AND operator.

EXAMPLES
    To retrieve information about recent operations, run:

        $ gcloud firestore operations list

    To only list operations that are done, run:

        $ gcloud firestore operations list --filter="done:true"

FLAGS
     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore operations list --database='foo'

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT; default=100
        Maximum number of resources to list. The default is 100. This flag
        interacts with other flags that are applied in this order: --flatten,
        --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE; default=100
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 100.
        Paging may be applied before or after --filter and --limit depending on
        the service.

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

        $ gcloud alpha firestore operations list

        $ gcloud beta firestore operations list
```

### gcloud beta firestore operations cancel

```text
NAME
    gcloud beta firestore operations cancel - cancel a currently-running Cloud
        Firestore admin operation

SYNOPSIS
    gcloud beta firestore operations cancel NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore operations delete

```text
NAME
    gcloud beta firestore operations delete - delete a completed Cloud
        Firestore admin operation

SYNOPSIS
    gcloud beta firestore operations delete NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore operations describe

```text
NAME
    gcloud beta firestore operations describe - retrieves information about a
        Cloud Firestore admin operation

SYNOPSIS
    gcloud beta firestore operations describe NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore operations list

```text
NAME
    gcloud beta firestore operations list - list pending Cloud Firestore admin
        operations and their status

SYNOPSIS
    gcloud beta firestore operations list
        [--database=DATABASE; default="(default)"] [--filter=EXPRESSION]
        [--limit=LIMIT; default=100] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore operations cancel

```text
NAME
    gcloud alpha firestore operations cancel - cancel a currently-running Cloud
        Firestore admin operation

SYNOPSIS
    gcloud alpha firestore operations cancel NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore operations delete

```text
NAME
    gcloud alpha firestore operations delete - delete a completed Cloud
        Firestore admin operation

SYNOPSIS
    gcloud alpha firestore operations delete NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore operations describe

```text
NAME
    gcloud alpha firestore operations describe - retrieves information about a
        Cloud Firestore admin operation

SYNOPSIS
    gcloud alpha firestore operations describe NAME
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore operations list

```text
NAME
    gcloud alpha firestore operations list - list pending Cloud Firestore admin
        operations and their status

SYNOPSIS
    gcloud alpha firestore operations list
        [--database=DATABASE; default="(default)"] [--filter=EXPRESSION]
        [--limit=LIMIT; default=100] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore operations wait

```text
NAME
    gcloud alpha firestore operations wait - waits a Cloud Firestore admin
        operation to complete

SYNOPSIS
    gcloud alpha firestore operations wait NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
