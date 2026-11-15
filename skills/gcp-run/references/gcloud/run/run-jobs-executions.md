---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs/executions
---

# gcloud run jobs executions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run jobs executions cancel

```text
NAME
    gcloud run jobs executions cancel - cancel an execution

SYNOPSIS
    gcloud run jobs executions cancel EXECUTION [--[no-]async]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel an execution.

EXAMPLES
    To cancel an execution:

        $ gcloud run jobs executions cancel my-execution

POSITIONAL ARGUMENTS
     Execution resource - Execution to cancel. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument EXECUTION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXECUTION
          ID of the Execution or fully qualified identifier for the Execution.

          To set the executions attribute:
          + provide the argument EXECUTION on the command line.

FLAGS
     --[no-]async
        Return immediately, without waiting for the operation in progress to
        complete. Defaults to --no-async. Use --async to enable and --no-async
        to disable.

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run jobs executions cancel

        $ gcloud beta run jobs executions cancel
```

### gcloud run jobs executions delete

```text
NAME
    gcloud run jobs executions delete - delete an execution

SYNOPSIS
    gcloud run jobs executions delete EXECUTION [--[no-]async]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an execution.

EXAMPLES
    To delete an execution:

        $ gcloud run jobs executions delete my-execution

POSITIONAL ARGUMENTS
     Execution resource - Execution to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument EXECUTION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXECUTION
          ID of the Execution or fully qualified identifier for the Execution.

          To set the executions attribute:
          + provide the argument EXECUTION on the command line.

FLAGS
     --[no-]async
        Return immediately, without waiting for the operation in progress to
        complete. Defaults to --no-async. Use --async to enable and --no-async
        to disable.

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run jobs executions delete

        $ gcloud beta run jobs executions delete
```

### gcloud run jobs executions describe

```text
NAME
    gcloud run jobs executions describe - obtain details about executions

SYNOPSIS
    gcloud run jobs executions describe EXECUTION [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about executions.

EXAMPLES
    To describe an execution:

        $ gcloud run jobs executions describe my-execution

POSITIONAL ARGUMENTS
     Execution resource - Execution to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument EXECUTION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXECUTION
          ID of the Execution or fully qualified identifier for the Execution.

          To set the executions attribute:
          + provide the argument EXECUTION on the command line.

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run jobs executions describe

        $ gcloud beta run jobs executions describe
```

### gcloud run jobs executions describe-latest

```text
NAME
    gcloud run jobs executions describe-latest - obtain details about the
        latest execution of a job

SYNOPSIS
    gcloud run jobs executions describe-latest --job=JOB [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about the latest execution of a job.

EXAMPLES
    To describe the latest execution of a job:

        $ gcloud run jobs executions describe-latest --job=my-job

REQUIRED FLAGS
     Job resource - Job to describe the latest execution of. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --job=JOB
          ID of the Job or fully qualified identifier for the Job.

          To set the jobs attribute:
          + provide the argument --job on the command line.

OPTIONAL FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run jobs executions describe-latest

        $ gcloud beta run jobs executions describe-latest
```

### gcloud run jobs executions list

```text
NAME
    gcloud run jobs executions list - list executions

SYNOPSIS
    gcloud run jobs executions list [--job=JOB] [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List executions.

EXAMPLES
    To list all executions in all regions:

        $ gcloud run jobs executions list

FLAGS
     --job=JOB
        Limit matched resources to the given job.

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

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

        $ gcloud alpha run jobs executions list

        $ gcloud beta run jobs executions list
```

### gcloud run jobs executions tasks describe

```text
NAME
    gcloud run jobs executions tasks describe - obtain details about tasks

SYNOPSIS
    gcloud run jobs executions tasks describe TASK [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about tasks.

EXAMPLES
    To describe a task:

        $ gcloud run jobs executions tasks describe my-task

POSITIONAL ARGUMENTS
     Task resource - Task to describe. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument TASK on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TASK
          ID of the Task or fully qualified identifier for the Task.

          To set the tasks attribute:
          + provide the argument TASK on the command line.

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run jobs executions tasks describe

        $ gcloud beta run jobs executions tasks describe
```

### gcloud run jobs executions tasks list

```text
NAME
    gcloud run jobs executions tasks list - list tasks

SYNOPSIS
    gcloud run jobs executions tasks list --execution=EXECUTION
        [--region=REGION] [--succeeded] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List tasks.

EXAMPLES
    To list all tasks for an execution:

        $ gcloud run jobs executions tasks list --execution=my-execution

REQUIRED FLAGS
     Execution resource - Execution for which to list tasks. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --execution on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --execution=EXECUTION
          ID of the Execution or fully qualified identifier for the Execution.

          To set the executions attribute:
          + provide the argument --execution on the command line.

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

     --succeeded
        Include succeeded tasks.

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

        $ gcloud alpha run jobs executions tasks list

        $ gcloud beta run jobs executions tasks list
```

### gcloud beta run jobs executions cancel

```text
NAME
    gcloud beta run jobs executions cancel - cancel an execution

SYNOPSIS
    gcloud beta run jobs executions cancel EXECUTION [--[no-]async]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions delete

```text
NAME
    gcloud beta run jobs executions delete - delete an execution

SYNOPSIS
    gcloud beta run jobs executions delete EXECUTION [--[no-]async]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions describe

```text
NAME
    gcloud beta run jobs executions describe - obtain details about executions

SYNOPSIS
    gcloud beta run jobs executions describe EXECUTION
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions describe-latest

```text
NAME
    gcloud beta run jobs executions describe-latest - obtain details about the
        latest execution of a job

SYNOPSIS
    gcloud beta run jobs executions describe-latest --job=JOB
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions list

```text
NAME
    gcloud beta run jobs executions list - list executions

SYNOPSIS
    gcloud beta run jobs executions list [--endpoint-mode=ENDPOINT_MODE]
        [--job=JOB] [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions logs read

```text
NAME
    gcloud beta run jobs executions logs read - read logs for Cloud Run job
        executions

SYNOPSIS
    gcloud beta run jobs executions logs read EXECUTION
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions logs tail

```text
NAME
    gcloud beta run jobs executions logs tail - tail logs for Cloud Run job
        executions

SYNOPSIS
    gcloud beta run jobs executions logs tail EXECUTION
        [--log-filter=LOG_FILTER] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions tasks describe

```text
NAME
    gcloud beta run jobs executions tasks describe - obtain details about tasks

SYNOPSIS
    gcloud beta run jobs executions tasks describe TASK
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run jobs executions tasks list

```text
NAME
    gcloud beta run jobs executions tasks list - list tasks

SYNOPSIS
    gcloud beta run jobs executions tasks list --execution=EXECUTION
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION] [--succeeded]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions cancel

```text
NAME
    gcloud alpha run jobs executions cancel - cancel an execution

SYNOPSIS
    gcloud alpha run jobs executions cancel EXECUTION [--[no-]async]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions delete

```text
NAME
    gcloud alpha run jobs executions delete - delete an execution

SYNOPSIS
    gcloud alpha run jobs executions delete EXECUTION [--[no-]async]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions describe

```text
NAME
    gcloud alpha run jobs executions describe - obtain details about executions

SYNOPSIS
    gcloud alpha run jobs executions describe EXECUTION
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions describe-latest

```text
NAME
    gcloud alpha run jobs executions describe-latest - obtain details about the
        latest execution of a job

SYNOPSIS
    gcloud alpha run jobs executions describe-latest --job=JOB
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions list

```text
NAME
    gcloud alpha run jobs executions list - list executions

SYNOPSIS
    gcloud alpha run jobs executions list [--endpoint-mode=ENDPOINT_MODE]
        [--job=JOB] [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions logs read

```text
NAME
    gcloud alpha run jobs executions logs read - read logs for Cloud Run job
        executions

SYNOPSIS
    gcloud alpha run jobs executions logs read EXECUTION
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions logs tail

```text
NAME
    gcloud alpha run jobs executions logs tail - tail logs for Cloud Run job
        executions

SYNOPSIS
    gcloud alpha run jobs executions logs tail EXECUTION
        [--log-filter=LOG_FILTER] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions tasks describe

```text
NAME
    gcloud alpha run jobs executions tasks describe - obtain details about
        tasks

SYNOPSIS
    gcloud alpha run jobs executions tasks describe TASK
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs executions tasks list

```text
NAME
    gcloud alpha run jobs executions tasks list - list tasks

SYNOPSIS
    gcloud alpha run jobs executions tasks list --execution=EXECUTION
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION] [--succeeded]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs/executions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
