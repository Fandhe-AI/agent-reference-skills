---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/operations
---

# gcloud logging operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging operations cancel

```text
NAME
    gcloud logging operations cancel - cancel a long running operation

SYNOPSIS
    gcloud logging operations cancel OPERATION_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a long running operation with given OPERATION_ID in given LOCATION.
    This operation can be a copy_log_entries operation which is scheduled
    before.

EXAMPLES
    To cancel an operation, run:

        $ gcloud logging operations cancel OPERATION_ID --location=LOCATION

POSITIONAL ARGUMENTS
     OPERATION_ID
        The Id of the operation.

REQUIRED FLAGS
     --location=LOCATION
        Location of the operation.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the operation to cancel.

       --folder=FOLDER_ID
          Folder of the operation to cancel.

       --organization=ORGANIZATION_ID
          Organization of the operation to cancel.

       --project=PROJECT_ID
          Project of the operation to cancel.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging operations cancel

        $ gcloud beta logging operations cancel
```

### gcloud logging operations describe

```text
NAME
    gcloud logging operations describe - display the information about a long
        running operation

SYNOPSIS
    gcloud logging operations describe OPERATION_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the information about a long running operation which was scheduled
    before. For example, a copy_log_entries operation scheduled by command:
    "gcloud alpha logging copy BUCKET_ID DESTINATION --location=LOCATION"
    OPERATION_ID and LOCATION are required to locate such operation.

EXAMPLES
    To describe an operation, run:

        $ gcloud logging operations describe OPERATION_ID --location=LOCATION

POSITIONAL ARGUMENTS
     OPERATION_ID
        The Id of the operation.

REQUIRED FLAGS
     --location=LOCATION
        Location of the operation.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the operation to describe.

       --folder=FOLDER_ID
          Folder of the operation to describe.

       --organization=ORGANIZATION_ID
          Organization of the operation to describe.

       --project=PROJECT_ID
          Project of the operation to describe.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging operations describe

        $ gcloud beta logging operations describe
```

### gcloud logging operations list

```text
NAME
    gcloud logging operations list - list long running operations

SYNOPSIS
    gcloud logging operations list --location=LOCATION
        --operation-filter=OPERATION_FILTER [--page-token=PAGE_TOKEN]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Return a list of long running operations in the given LOCATION. The
    operations were scheduled by other gcloud commands.

    For example, a CopyLogEntries operation may be scheduled by the command:
    gcloud logging copy BUCKET_ID DESTINATION --location=LOCATION.

    The --operation-filter flag is required and must specify the request_type.
    Supported request types include but are not limited to: CopyLogEntries,
    CreateBucket and UpdateBucket.

    Additional supported filter expressions include: operation_start_time,
    operation_finish_time and operation_state. These can be combined with the
    case-sensitive keyword AND between them.

    For operation_start_time and operation_end_time, the operators >=, >, <=,
    and < are supported.

    Timestamps must be in either RFC3339 or ISO8601 formats. If the timestamp
    contains a time value, then it must be quoted. For examples:
    "YYYY-MM-DDTHH:MM:SSZ", "YYYY-MM-DDTHH:MM:SS.mmmZ", "YY-MM-DD",
    "YYYY-MM-DDTHH:MM:SS-0000", "YYYY-MM-DDTHH:MM+0000", "YYYY-MM-DD",
    YYYY-MM-DD, YY-MM-DD, etc.

    The operation_state filter expression can be used to filter for operations
    that are in a specific state. The value can be one of the following:
    SCHEDULED, WAITING_FOR_PRECONDITIONS, RUNNING, SUCCESS, FAILURE, CANCELLED,
    PENDING.

    For operation_state, the operators = and != are supported.

    Other filter options are not supported.

EXAMPLES
    To list CopyLogEntries operations, run:

        $ gcloud logging operations list --location=LOCATION \
          --operation-filter='request_type=CopyLogEntries'

    To list CopyLogEntries operations that started after a specified time, run:

        $ gcloud logging operations list --location=LOCATION \
          --operation-filter='request_type=CopyLogEntries AND
        operation_start_time>="2023-11-20T00:00:00Z"'

    To list CopyLogEntries operations that finished before a specified time,
    run:

        $ gcloud logging operations list --location=LOCATION \
          --operation-filter='request_type=CopyLogEntries AND
        operation_finish_time<="2023-11-20T00:00:00Z"'

    To list CopyLogEntries operations that completed successfully, run:

        $ gcloud logging operations list --location=LOCATION \
          --operation-filter='request_type=CopyLogEntries AND
        operation_state=SUCCESS'

    To list CopyLogEntries operations that have not failed, run:

        $ gcloud logging operations list --location=LOCATION \
          --operation-filter='request_type=CopyLogEntries AND
        operation_state!=FAILURE'

REQUIRED FLAGS
     --location=LOCATION
        Location of the operations.

     --operation-filter=OPERATION_FILTER
        Filter expression that specifies the operations to return.

FLAGS
     --page-token=PAGE_TOKEN
        The next_page_token value returned from a previous List request, if
        any.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the operations to list.

       --folder=FOLDER_ID
          Folder of the operations to list.

       --organization=ORGANIZATION_ID
          Organization of the operations to list.

       --project=PROJECT_ID
          Project of the operations to list.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

LIST COMMAND FLAGS
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

        $ gcloud alpha logging operations list

        $ gcloud beta logging operations list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud logging operations list \
    --location=LOCATION \
    --operation-filter='request_type=CopyLogEntries AND operation_start_time>="2023-11-20T00:00:00Z"'

gcloud logging operations list \
    --location=LOCATION \
    --operation-filter='request_type=CopyLogEntries AND operation_finish_time<="2023-11-20T00:00:00Z"'

gcloud logging operations list \
    --location=LOCATION \
    --operation-filter='request_type=CopyLogEntries AND operation_state=SUCCESS'

gcloud logging operations list \
    --location=LOCATION \
    --operation-filter='request_type=CopyLogEntries AND operation_state!=FAILURE'
```

### gcloud beta logging operations cancel

```text
NAME
    gcloud beta logging operations cancel - cancel a long running operation

SYNOPSIS
    gcloud beta logging operations cancel OPERATION_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging operations describe

```text
NAME
    gcloud beta logging operations describe - display the information about a
        long running operation

SYNOPSIS
    gcloud beta logging operations describe OPERATION_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging operations list

```text
NAME
    gcloud beta logging operations list - list long running operations

SYNOPSIS
    gcloud beta logging operations list --location=LOCATION
        --operation-filter=OPERATION_FILTER [--page-token=PAGE_TOKEN]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging operations cancel

```text
NAME
    gcloud alpha logging operations cancel - cancel a long running operation

SYNOPSIS
    gcloud alpha logging operations cancel OPERATION_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging operations describe

```text
NAME
    gcloud alpha logging operations describe - display the information about a
        long running operation

SYNOPSIS
    gcloud alpha logging operations describe OPERATION_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging operations list

```text
NAME
    gcloud alpha logging operations list - list long running operations

SYNOPSIS
    gcloud alpha logging operations list --location=LOCATION
        --operation-filter=OPERATION_FILTER [--page-token=PAGE_TOKEN]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
