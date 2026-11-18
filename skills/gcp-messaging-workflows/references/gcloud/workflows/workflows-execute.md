---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workflows/execute
---

# gcloud workflows execute

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workflows execute

```text
NAME
    gcloud workflows execute - execute a workflow

SYNOPSIS
    gcloud workflows execute (WORKFLOW : --location=LOCATION)
        [--call-log-level=CALL_LOG_LEVEL; default="none"] [--data=DATA]
        [--disable-concurrency-quota-overflow-buffering]
        [--execution-history-level=EXECUTION_HISTORY_LEVEL; default="none"]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Execute a workflow.

EXAMPLES
    To execute a workflow named 'my-workflow' with the data that will be passed
    to the workflow, run:

        $ gcloud workflows execute my-workflow --data=my-data

POSITIONAL ARGUMENTS
     Workflow resource - Name of the workflow to execute. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument workflow on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKFLOW
          ID of the workflow or fully qualified identifier for the workflow.

          To set the workflow attribute:
          + provide the argument workflow on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the workflow. Alternatively, set the property
          [workflows/location].

          To set the location attribute:
          + provide the argument workflow on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property workflows/location.

FLAGS
     --call-log-level=CALL_LOG_LEVEL; default="none"
        Level of call logging to apply during execution. CALL_LOG_LEVEL must be
        one of:

         log-all-calls
            Log all calls to subworkflows or library functions and their
            results.

         log-errors-only
            Log when a call is stopped due to an exception.

         log-none
            Perform no call logging.

         none
            No call logging level specified.

     --data=DATA
        JSON string with data that will be passed to the workflow as an
        argument.

     --disable-concurrency-quota-overflow-buffering
        If set, the execution will not be backlogged when the concurrency quota
        is exhausted. Backlogged executions start when the concurrency quota
        becomes available.

     --execution-history-level=EXECUTION_HISTORY_LEVEL; default="none"
        Level of execution history to apply during execution.
        EXECUTION_HISTORY_LEVEL must be one of:

         execution-history-basic
            Enable basic execution history.

         execution-history-detailed
            Enable detailed execution history, including expected iterations
            and in-scope variable values.

         none
            No execution history level specified.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens,
        underscores, lowercase characters, and numbers. Values must contain
        only hyphens, underscores, lowercase characters, and numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the workflowexecutions/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/workflows

NOTES
    This variant is also available:

        $ gcloud beta workflows execute
```

### gcloud beta workflows execute

```text
NAME
    gcloud beta workflows execute - execute a workflow

SYNOPSIS
    gcloud beta workflows execute (WORKFLOW : --location=LOCATION)
        [--call-log-level=CALL_LOG_LEVEL; default="none"] [--data=DATA]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workflows/execute (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
