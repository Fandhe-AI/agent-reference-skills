---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/operations
---

# gcloud container operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container operations cancel

```text
NAME
    gcloud container operations cancel - cancel a running operation

SYNOPSIS
    gcloud container operations cancel OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a running operation.

    Cancel is a best-effort method for aborting a running operation. Operations
    that have already completed can not be cancelled. If the operation has
    passed the "point of no-return", cancel will have no effect.

    An example of "point of no-return" in the context of Upgrade operations
    would be if all the nodes have been upgraded but the operation hasn't been
    marked as complete.

    Only node pool upgrade operations support cancellation.

EXAMPLES
    To cancel an operation, run:

        $ gcloud container operations cancel sample-operation-id

POSITIONAL ARGUMENTS
     OPERATION_ID
        The operation id to cancel.

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          Compute zone or region (e.g. us-central1-a or us-central1) for the
          cluster. Overrides the default compute/region or compute/zone value
          for this command invocation. Prefer using this flag over the --region
          or --zone flags.

       --region=REGION
          Compute region (e.g. us-central1) for a regional cluster. Overrides
          the default compute/region property value for this command
          invocation.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for a zonal cluster. Overrides the
          default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container operations cancel

        $ gcloud beta container operations cancel
```

### gcloud container operations describe

```text
NAME
    gcloud container operations describe - describe an operation

SYNOPSIS
    gcloud container operations describe OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an operation.

EXAMPLES
    To describe an operation, run:

        $ gcloud container operations describe sample-operation-id

POSITIONAL ARGUMENTS
     OPERATION_ID
        The operation id to look up.

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          Compute zone or region (e.g. us-central1-a or us-central1) for the
          cluster. Overrides the default compute/region or compute/zone value
          for this command invocation. Prefer using this flag over the --region
          or --zone flags.

       --region=REGION
          Compute region (e.g. us-central1) for a regional cluster. Overrides
          the default compute/region property value for this command
          invocation.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for a zonal cluster. Overrides the
          default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container operations describe

        $ gcloud beta container operations describe
```

### gcloud container operations list

```text
NAME
    gcloud container operations list - list operations for container clusters

SYNOPSIS
    gcloud container operations list
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List operations for container clusters.

EXAMPLES
    To list operations, run:

        $ gcloud container operations list

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          Compute zone or region (e.g. us-central1-a or us-central1) for the
          cluster. Overrides the default compute/region or compute/zone value
          for this command invocation. Prefer using this flag over the --region
          or --zone flags.

       --region=REGION
          Compute region (e.g. us-central1) for a regional cluster. Overrides
          the default compute/region property value for this command
          invocation.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for a zonal cluster. Overrides the
          default compute/zone property value for this command invocation.

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

        $ gcloud alpha container operations list

        $ gcloud beta container operations list
```

### gcloud container operations wait

```text
NAME
    gcloud container operations wait - poll an operation for completion

SYNOPSIS
    gcloud container operations wait OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Poll an operation for completion.

EXAMPLES
    To poll an operation for completion, run:

        $ gcloud container operations wait sample-operation-id

POSITIONAL ARGUMENTS
     OPERATION_ID
        The operation id to poll.

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          Compute zone or region (e.g. us-central1-a or us-central1) for the
          cluster. Overrides the default compute/region or compute/zone value
          for this command invocation. Prefer using this flag over the --region
          or --zone flags.

       --region=REGION
          Compute region (e.g. us-central1) for a regional cluster. Overrides
          the default compute/region property value for this command
          invocation.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for a zonal cluster. Overrides the
          default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container operations wait

        $ gcloud beta container operations wait
```

### gcloud beta container operations cancel

```text
NAME
    gcloud beta container operations cancel - cancel a running operation

SYNOPSIS
    gcloud beta container operations cancel OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container operations describe

```text
NAME
    gcloud beta container operations describe - describe an operation

SYNOPSIS
    gcloud beta container operations describe OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container operations list

```text
NAME
    gcloud beta container operations list - list operations for container
        clusters

SYNOPSIS
    gcloud beta container operations list
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container operations wait

```text
NAME
    gcloud beta container operations wait - poll an operation for completion

SYNOPSIS
    gcloud beta container operations wait OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container operations cancel

```text
NAME
    gcloud alpha container operations cancel - cancel a running operation

SYNOPSIS
    gcloud alpha container operations cancel OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container operations describe

```text
NAME
    gcloud alpha container operations describe - describe an operation

SYNOPSIS
    gcloud alpha container operations describe OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container operations list

```text
NAME
    gcloud alpha container operations list - list operations for container
        clusters

SYNOPSIS
    gcloud alpha container operations list
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container operations wait

```text
NAME
    gcloud alpha container operations wait - poll an operation for completion

SYNOPSIS
    gcloud alpha container operations wait OPERATION_ID
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
