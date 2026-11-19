---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/jobs
---

# gcloud dataplex tasks jobs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex tasks jobs cancel

```text
NAME
    gcloud dataplex tasks jobs cancel - cancel a Dataplex Job running a
        particular task

SYNOPSIS
    gcloud dataplex tasks jobs cancel
        (JOB : --lake=LAKE --location=LOCATION --task=TASK)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel the operation that the given Dataplex Job is running task under a
    specific project, location, lake and task.

EXAMPLES
    To cancel an job test-job running task test-task within lake test-lake in
    location us-central1, run:

        $ gcloud dataplex tasks jobs cancel test-job \
            --location=us-central1 --lake=test-lake --task=test-task

POSITIONAL ARGUMENTS
     Job resource - Arguments and flags that define the Dataplex Job running a
     particular Task you want to cancel. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

       --task=TASK
          Identifier of the Dataplex task resource.

          To set the task attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --task on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex tasks jobs cancel
```

### gcloud dataplex tasks jobs describe

```text
NAME
    gcloud dataplex tasks jobs describe - describe a Dataplex job running a
        particular task

SYNOPSIS
    gcloud dataplex tasks jobs describe
        (JOB : --lake=LAKE --location=LOCATION --task=TASK)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Dataplex job running a particular task.

    Displays all details of a Dataplex job given a valid job ID.

EXAMPLES
    To describe a Dataplex job test-job running a task test-task within lake
    test-lake in location us-central1, run:

        $ gcloud dataplex tasks jobs describe test-job \
            --location=us-central1 --lake=test-lake --task=test-task

POSITIONAL ARGUMENTS
     Job resource - Arguments and flags that define the Dataplex Job running a
     particular Task you want to retrieve. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

       --task=TASK
          Identifier of the Dataplex task resource.

          To set the task attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --task on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex tasks jobs describe
```

### gcloud dataplex tasks jobs list

```text
NAME
    gcloud dataplex tasks jobs list - list job runs of a Dataplex task resource

SYNOPSIS
    gcloud dataplex tasks jobs list
        (--task=TASK : --lake=LAKE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Jobs runs of a Task under a specific project, location, lake and task.

EXAMPLES
    To list all the Dataplex job runs for a task test-task within lake
    test-lake in location us-central1, run:

        gcloud dataplex tasks jobs list --location=us-central1 --lake=test-lake --task=test-task

REQUIRED FLAGS
     Task resource - Arguments and flags that define the Dataplex Task to list
     the Jobs running the Task. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --task on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --task=TASK
          ID of the task or fully qualified identifier for the task.

          To set the task attribute:
          + provide the argument --task on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument --task on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument --task on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex tasks jobs list
```

### gcloud alpha dataplex tasks jobs cancel

```text
NAME
    gcloud alpha dataplex tasks jobs cancel - cancel a Dataplex Job running a
        particular task

SYNOPSIS
    gcloud alpha dataplex tasks jobs cancel
        (JOB : --lake=LAKE --location=LOCATION --task=TASK)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex tasks jobs describe

```text
NAME
    gcloud alpha dataplex tasks jobs describe - describe a Dataplex job running
        a particular task

SYNOPSIS
    gcloud alpha dataplex tasks jobs describe
        (JOB : --lake=LAKE --location=LOCATION --task=TASK)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex tasks jobs list

```text
NAME
    gcloud alpha dataplex tasks jobs list - list job runs of a Dataplex task
        resource

SYNOPSIS
    gcloud alpha dataplex tasks jobs list
        (--task=TASK : --lake=LAKE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/jobs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
