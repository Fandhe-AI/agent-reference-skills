---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/operations
---

# gcloud datastore operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datastore operations cancel

```text
NAME
    gcloud datastore operations cancel - cancel a currently-running Cloud
        Datastore admin operation

SYNOPSIS
    gcloud datastore operations cancel NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a currently-running Cloud Datastore admin operation.

EXAMPLES
    To cancel the currently-running operation with id exampleId, run:

        $ gcloud datastore operations cancel exampleId

    or

        $ gcloud datastore operations cancel \
            projects/your-project-id/operations/exampleId

POSITIONAL ARGUMENTS
     NAME
        The unique name of the Operation to cancel, formatted as either the
        full or relative resource path:

            projects/my-app-id/operations/foo

        or:

            foo

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datastore operations cancel

        $ gcloud beta datastore operations cancel
```

### gcloud datastore operations delete

```text
NAME
    gcloud datastore operations delete - delete a completed Cloud Datastore
        admin operation

SYNOPSIS
    gcloud datastore operations delete NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a completed Cloud Datastore admin operation.

EXAMPLES
    To delete the completed operation with id exampleId, run:

        $ gcloud datastore operations delete exampleId

    or

        $ gcloud datastore operations delete \
            projects/your-project-id/operations/exampleId

POSITIONAL ARGUMENTS
     NAME
        The unique name of the Operation to delete, formatted as either the
        full or relative resource path:

            projects/my-app-id/operations/foo

        or:

            foo

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datastore operations delete

        $ gcloud beta datastore operations delete
```

### gcloud datastore operations describe

```text
NAME
    gcloud datastore operations describe - retrieves information about a Cloud
        Datastore admin operation

SYNOPSIS
    gcloud datastore operations describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves information about a Cloud Datastore admin operation.

EXAMPLES
    To see information on the operation with id exampleId, run:

        $ gcloud datastore operations describe exampleId

    or

        $ gcloud datastore operations describe \
            projects/your-project-id/operations/exampleId

POSITIONAL ARGUMENTS
     NAME
        The unique name of the Operation to retrieve, formatted as either the
        full or relative resource path:

            projects/my-app-id/operations/foo

        or:

            foo

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datastore operations describe

        $ gcloud beta datastore operations describe
```

### gcloud datastore operations list

```text
NAME
    gcloud datastore operations list - list pending Cloud Datastore admin
        operations and their status

SYNOPSIS
    gcloud datastore operations list [--filter=EXPRESSION]
        [--limit=LIMIT; default=100] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Filters are case-sensitive and have the following syntax:

        field = value [AND [field = value]] ...

    where field is one of kind, namespace, type, or labels.[KEY], and [KEY] is
    a label key. kind and namespace may be * to query for operations on all
    kinds and/or all namespaces. type may be one of export_entities or
    import_entities.

    Only the logical AND operator is supported; space-separated items are
    treated as having an implicit AND operator.

EXAMPLES
    To see the list of all operations, run:

        $ gcloud datastore operations list

    To see the list of all export operations, run:

        $ gcloud datastore operations list --filter='type:export_entities'

    To see the list of all export operations for kind 'MyKind', run:

        $ gcloud datastore operations list \
            --filter='type:export_entities AND kind:MyKind'

    To see the list of all operations with particular labels, run:

        $ gcloud datastore operations list --filter='labels.run = daily'

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

        $ gcloud alpha datastore operations list

        $ gcloud beta datastore operations list
```

### gcloud beta datastore operations cancel

```text
NAME
    gcloud beta datastore operations cancel - cancel a currently-running Cloud
        Datastore admin operation

SYNOPSIS
    gcloud beta datastore operations cancel NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datastore operations delete

```text
NAME
    gcloud beta datastore operations delete - delete a completed Cloud
        Datastore admin operation

SYNOPSIS
    gcloud beta datastore operations delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datastore operations describe

```text
NAME
    gcloud beta datastore operations describe - retrieves information about a
        Cloud Datastore admin operation

SYNOPSIS
    gcloud beta datastore operations describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datastore operations list

```text
NAME
    gcloud beta datastore operations list - list pending Cloud Datastore admin
        operations and their status

SYNOPSIS
    gcloud beta datastore operations list [--filter=EXPRESSION]
        [--limit=LIMIT; default=100] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore operations cancel

```text
NAME
    gcloud alpha datastore operations cancel - cancel a currently-running Cloud
        Datastore admin operation

SYNOPSIS
    gcloud alpha datastore operations cancel NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore operations delete

```text
NAME
    gcloud alpha datastore operations delete - delete a completed Cloud
        Datastore admin operation

SYNOPSIS
    gcloud alpha datastore operations delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore operations describe

```text
NAME
    gcloud alpha datastore operations describe - retrieves information about a
        Cloud Datastore admin operation

SYNOPSIS
    gcloud alpha datastore operations describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore operations list

```text
NAME
    gcloud alpha datastore operations list - list pending Cloud Datastore admin
        operations and their status

SYNOPSIS
    gcloud alpha datastore operations list [--filter=EXPRESSION]
        [--limit=LIMIT; default=100] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
