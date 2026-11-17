---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/operations
---

# gcloud transfer operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer operations cancel

```text
NAME
    gcloud transfer operations cancel - cancel a transfer operation

SYNOPSIS
    gcloud transfer operations cancel NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a transfer operation.

EXAMPLES
    To cancel an operation, run:

        $ gcloud transfer operations cancel OPERATION-NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the transfer operation you want to cancel.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer operations cancel
```

### gcloud transfer operations describe

```text
NAME
    gcloud transfer operations describe - get configuration and latest transfer
        operation details

SYNOPSIS
    gcloud transfer operations describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details about a specific transfer operation.

EXAMPLES
    To describe an operation, run:

        $ gcloud transfer operations describe OPERATION-NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the operation you want to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer operations describe
```

### gcloud transfer operations list

```text
NAME
    gcloud transfer operations list - list Transfer Service transfer operations

SYNOPSIS
    gcloud transfer operations list [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=256] [--job-names=[JOB_NAMES,...]]
        [--operation-names=[OPERATION_NAMES,...]]
        [--operation-statuses=[OPERATION_STATUSES,...]] [--expand-table]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Transfer Service transfer operations to view their progress details at
    a glance.

EXAMPLES
    To list all transfer operations in your current project, run:

        $ gcloud transfer operations list

    To list all failed operations in your project, run:

        $ gcloud transfer operations list --operation-statuses=failed

    To list operations 'foo' and 'bar', run:

        $ gcloud transfer operations list --operation-names=foo,bar

    To list all operations in your current project as JSON, which provides all
    fields and formatting available in the API, run:

        $ gcloud transfer operations list --format=json

FLAGS
     --limit=LIMIT
        Return the first items from the API up to this limit.

     --page-size=PAGE_SIZE; default=256
        Retrieve batches of this many items from the API.

     --job-names=[JOB_NAMES,...]
        The names of the jobs whose operations you want to list. Separate
        multiple job names with commas (e.g., --job-names=foo,bar). If not
        specified, operations for all jobs are listed.

     --operation-names=[OPERATION_NAMES,...]
        The names of operations you want to list. Separate multiple operation
        names with commas (e.g., --operation-names-name=foo,bar). If not
        specified, all operations are listed.

     --operation-statuses=[OPERATION_STATUSES,...]
        List only transfer operations with the statuses you specify. Options
        include 'in_progress', 'paused', 'success','failed', 'aborted'.
        Separate multiple statuses with commas (e.g.,
        --operation-statuses=failed,aborted).

     --expand-table
        Include additional table columns (operation name, start time, status,
        data copied, status, has errors, job name) in command output. Tip:
        increase the size of your terminal before running the command.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer operations list
```

### gcloud transfer operations monitor

```text
NAME
    gcloud transfer operations monitor - track progress in real time for a
        transfer operation

SYNOPSIS
    gcloud transfer operations monitor NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Track progress in real time for a transfer operation.

EXAMPLES
    To monitor an operation, run:

        $ gcloud transfer operations monitor OPERATION-NAME

    If you're looking for specific error details, use the "operations describe"
    command:

        $ gcloud transfer operations describe OPERATION-NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the operation you want to monitor.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer operations monitor
```

### gcloud transfer operations pause

```text
NAME
    gcloud transfer operations pause - pause a currently running transfer
        operation

SYNOPSIS
    gcloud transfer operations pause NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Pause a currently running transfer operation.

EXAMPLES
    To pause an operation, run:

        $ gcloud transfer operations pause OPERATION-NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the paused transfer operation you want to cancel.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer operations pause
```

### gcloud transfer operations resume

```text
NAME
    gcloud transfer operations resume - resume a currently paused transfer
        operation

SYNOPSIS
    gcloud transfer operations resume NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resume a currently paused transfer operation.

EXAMPLES
    To resume an operation, run:

        $ gcloud transfer operations resume OPERATION-NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the paused transfer operation you want to resume.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer operations resume
```

### gcloud alpha transfer operations cancel

```text
NAME
    gcloud alpha transfer operations cancel - cancel a transfer operation

SYNOPSIS
    gcloud alpha transfer operations cancel NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer operations describe

```text
NAME
    gcloud alpha transfer operations describe - get configuration and latest
        transfer operation details

SYNOPSIS
    gcloud alpha transfer operations describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer operations list

```text
NAME
    gcloud alpha transfer operations list - list Transfer Service transfer
        operations

SYNOPSIS
    gcloud alpha transfer operations list [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=256] [--job-names=[JOB_NAMES,...]]
        [--operation-names=[OPERATION_NAMES,...]]
        [--operation-statuses=[OPERATION_STATUSES,...]] [--expand-table]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer operations monitor

```text
NAME
    gcloud alpha transfer operations monitor - track progress in real time for
        a transfer operation

SYNOPSIS
    gcloud alpha transfer operations monitor NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer operations pause

```text
NAME
    gcloud alpha transfer operations pause - pause a currently running transfer
        operation

SYNOPSIS
    gcloud alpha transfer operations pause NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer operations resume

```text
NAME
    gcloud alpha transfer operations resume - resume a currently paused
        transfer operation

SYNOPSIS
    gcloud alpha transfer operations resume NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--operation-names` description of `list` gives the example "--operation-names-name=foo,bar", but there is no `--operation-names-name` flag (gcloud 593.0.0: "unrecognized arguments: --operation-names-name=foo,bar (did you mean '--operation-names'?)"); use `--operation-names=foo,bar`, as in the EXAMPLES.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
