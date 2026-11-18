---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workflows/executions
---

# gcloud workflows executions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workflows executions cancel

```text
NAME
    gcloud workflows executions cancel - cancel a workflow execution

SYNOPSIS
    gcloud workflows executions cancel
        (EXECUTION : --location=LOCATION --workflow=WORKFLOW)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a workflow execution.

EXAMPLES
    To cancel an execution with ID 'my-workflow-execution-ID' from a workflow
    named 'my-workflow', run:

        $ gcloud workflows executions cancel my-workflow-execution-ID \
          --workflow=my-workflow

POSITIONAL ARGUMENTS
     Execution resource - The name of the workflow execution to cancel. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument execution on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXECUTION
          ID of the execution or fully qualified identifier for the execution.

          To set the execution attribute:
          + provide the argument execution on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the execution. Alternatively, set the property
          [workflows/location].

          To set the location attribute:
          + provide the argument execution on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property workflows/location.

       --workflow=WORKFLOW
          The Cloud Workflow for the execution.

          To set the workflow attribute:
          + provide the argument execution on the command line with a fully
            specified name;
          + provide the argument --workflow on the command line.

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

        $ gcloud beta workflows executions cancel
```

### gcloud workflows executions describe

```text
NAME
    gcloud workflows executions describe - show metadata for a workflow
        execution

SYNOPSIS
    gcloud workflows executions describe
        (EXECUTION : --location=LOCATION --workflow=WORKFLOW)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a workflow execution of given ID.

EXAMPLES
    To describe an execution with ID 'my-workflow-execution-ID' from a workflow
    named 'my-workflow', run:

        $ gcloud workflows executions describe my-workflow-execution-ID \
          --workflow=my-workflow

POSITIONAL ARGUMENTS
     Execution resource - The name of the workflow execution to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument execution on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXECUTION
          ID of the execution or fully qualified identifier for the execution.

          To set the execution attribute:
          + provide the argument execution on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the execution. Alternatively, set the property
          [workflows/location].

          To set the location attribute:
          + provide the argument execution on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property workflows/location.

       --workflow=WORKFLOW
          The Cloud Workflow for the execution.

          To set the workflow attribute:
          + provide the argument execution on the command line with a fully
            specified name;
          + provide the argument --workflow on the command line.

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

        $ gcloud beta workflows executions describe
```

### gcloud workflows executions describe-last

```text
NAME
    gcloud workflows executions describe-last - show metadata for the last
        cached workflow execution

SYNOPSIS
    gcloud workflows executions describe-last [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for the last cached workflow execution.

EXAMPLES
    To show metadata for the last cached workflow execution, run:

        $ gcloud workflows executions describe-last

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta workflows executions describe-last
```

### gcloud workflows executions list

```text
NAME
    gcloud workflows executions list - list workflow executions

SYNOPSIS
    gcloud workflows executions list (WORKFLOW : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List workflow executions for a given workflow.

EXAMPLES
    To list executions of a workflow named 'my-workflow', run:

        $ gcloud workflows executions list my-workflow

POSITIONAL ARGUMENTS
     Workflow resource - The workflow name. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

API REFERENCE
    This command uses the workflowexecutions/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/workflows

NOTES
    This variant is also available:

        $ gcloud beta workflows executions list
```

### gcloud workflows executions wait

```text
NAME
    gcloud workflows executions wait - wait for an execution to complete

SYNOPSIS
    gcloud workflows executions wait
        (EXECUTION : --location=LOCATION --workflow=WORKFLOW)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Wait for an execution to complete.

EXAMPLES
    To wait for an execution with ID 'my-workflow-execution-ID' from a workflow
    named 'my-workflow' to finish, run:

        $ gcloud workflows executions wait my-workflow-execution-ID \
            --workflow=my-workflow

POSITIONAL ARGUMENTS
     Execution resource - Name of the execution to wait on. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument execution on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXECUTION
          ID of the execution or fully qualified identifier for the execution.

          To set the execution attribute:
          + provide the argument execution on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Cloud location for the execution. Alternatively, set the property
          [workflows/location].

          To set the location attribute:
          + provide the argument execution on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property workflows/location.

       --workflow=WORKFLOW
          Workflow for the execution.

          To set the workflow attribute:
          + provide the argument execution on the command line with a fully
            specified name;
          + provide the argument --workflow on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta workflows executions wait
```

### gcloud workflows executions wait-last

```text
NAME
    gcloud workflows executions wait-last - wait for the last cached workflow
        execution to complete

SYNOPSIS
    gcloud workflows executions wait-last [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Wait for the last cached workflow execution to complete.

EXAMPLES
    To wait for the last cached workflow execution to complete, run:

        $ gcloud workflows executions wait-last

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta workflows executions wait-last
```

### gcloud beta workflows executions cancel

```text
NAME
    gcloud beta workflows executions cancel - cancel a workflow execution

SYNOPSIS
    gcloud beta workflows executions cancel
        (EXECUTION : --location=LOCATION --workflow=WORKFLOW)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workflows executions describe

```text
NAME
    gcloud beta workflows executions describe - show metadata for a workflow
        execution

SYNOPSIS
    gcloud beta workflows executions describe
        (EXECUTION : --location=LOCATION --workflow=WORKFLOW)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workflows executions describe-last

```text
NAME
    gcloud beta workflows executions describe-last - show metadata for the last
        cached workflow execution

SYNOPSIS
    gcloud beta workflows executions describe-last [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workflows executions list

```text
NAME
    gcloud beta workflows executions list - list workflow executions

SYNOPSIS
    gcloud beta workflows executions list (WORKFLOW : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workflows executions wait

```text
NAME
    gcloud beta workflows executions wait - wait for an execution to complete

SYNOPSIS
    gcloud beta workflows executions wait
        (EXECUTION : --location=LOCATION --workflow=WORKFLOW)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workflows executions wait-last

```text
NAME
    gcloud beta workflows executions wait-last - wait for the last cached
        workflow execution to complete

SYNOPSIS
    gcloud beta workflows executions wait-last [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workflows/executions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
