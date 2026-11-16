---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/operations
---

# gcloud alloydb operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alloydb operations cancel

```text
NAME
    gcloud alloydb operations cancel - cancels an AlloyDB operation

SYNOPSIS
    gcloud alloydb operations cancel OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancels an AlloyDB operation.

EXAMPLES
    To cancel an operation, run:

        $ gcloud alloydb operations cancel operation-123456789 \
            --region=us-central1

POSITIONAL ARGUMENTS
     OPERATION
        AlloyDB operation ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb operations cancel

        $ gcloud beta alloydb operations cancel
```

### gcloud alloydb operations delete

```text
NAME
    gcloud alloydb operations delete - deletes an AlloyDB operation

SYNOPSIS
    gcloud alloydb operations delete OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an AlloyDB operation.

EXAMPLES
    To delete an operation, run:

        $ gcloud alloydb operations delete operation-123456789 \
            --region=us-central1

POSITIONAL ARGUMENTS
     OPERATION
        AlloyDB operation ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb operations delete

        $ gcloud beta alloydb operations delete
```

### gcloud alloydb operations describe

```text
NAME
    gcloud alloydb operations describe - describes an AlloyDB operation

SYNOPSIS
    gcloud alloydb operations describe OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes an AlloyDB operation.

EXAMPLES
    To describe an operation, run:

        $ gcloud alloydb operations describe operation-123456789 \
            --region=us-central1

POSITIONAL ARGUMENTS
     OPERATION
        AlloyDB operation ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb operations describe

        $ gcloud beta alloydb operations describe
```

### gcloud alloydb operations list

```text
NAME
    gcloud alloydb operations list - lists AlloyDB operations

SYNOPSIS
    gcloud alloydb operations list [--cluster=CLUSTER]
        [--region=REGION; default="-"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists AlloyDB operations.

EXAMPLES
    To list operations, run:

        $ gcloud alloydb operations list --region=us-central1

FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION; default="-"
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.
        Default: list operations in all regions.

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

        $ gcloud alpha alloydb operations list

        $ gcloud beta alloydb operations list
```

### gcloud beta alloydb operations cancel

```text
NAME
    gcloud beta alloydb operations cancel - cancels an AlloyDB operation

SYNOPSIS
    gcloud beta alloydb operations cancel OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb operations delete

```text
NAME
    gcloud beta alloydb operations delete - deletes an AlloyDB operation

SYNOPSIS
    gcloud beta alloydb operations delete OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb operations describe

```text
NAME
    gcloud beta alloydb operations describe - describes an AlloyDB operation

SYNOPSIS
    gcloud beta alloydb operations describe OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb operations list

```text
NAME
    gcloud beta alloydb operations list - lists AlloyDB operations

SYNOPSIS
    gcloud beta alloydb operations list [--cluster=CLUSTER]
        [--region=REGION; default="-"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb operations cancel

```text
NAME
    gcloud alpha alloydb operations cancel - cancels an AlloyDB operation

SYNOPSIS
    gcloud alpha alloydb operations cancel OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb operations delete

```text
NAME
    gcloud alpha alloydb operations delete - deletes an AlloyDB operation

SYNOPSIS
    gcloud alpha alloydb operations delete OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb operations describe

```text
NAME
    gcloud alpha alloydb operations describe - describes an AlloyDB operation

SYNOPSIS
    gcloud alpha alloydb operations describe OPERATION --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb operations list

```text
NAME
    gcloud alpha alloydb operations list - lists AlloyDB operations

SYNOPSIS
    gcloud alpha alloydb operations list [--cluster=CLUSTER]
        [--region=REGION; default="-"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
