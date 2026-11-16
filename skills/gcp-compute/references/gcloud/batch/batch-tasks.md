---
source: https://docs.cloud.google.com/sdk/gcloud/reference/batch/tasks
---

# gcloud batch tasks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud batch tasks describe

```text
NAME
    gcloud batch tasks describe - show details of a task

SYNOPSIS
    gcloud batch tasks describe
        (TASK : --job=JOB --location=LOCATION --task_group=TASK_GROUP)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The task specified does not exist.
      o The active account does not have permission to access the given task.

EXAMPLES
    To print details of the task with name
    projects/foo/locations/us-central1/jobs/bar/taskGroups/group0/tasks/0, run:

        $ gcloud batch tasks describe \
            projects/foo/locations/us-central1/jobs/bar/taskGroups/group0/\
        tasks/0

POSITIONAL ARGUMENTS
     Task resource - The Batch task resource. If not specified,the current
     batch/location is used. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument TASK on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TASK
          ID of the task or fully qualified identifier for the task.

          To set the task attribute:
          + provide the argument TASK on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --job=JOB
          The job ID for the task.

          To set the job attribute:
          + provide the argument TASK on the command line with a fully
            specified name;
          + provide the argument --job on the command line.

       --location=LOCATION
          Google Cloud location for the task.

          To set the location attribute:
          + provide the argument TASK on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property batch/location.

       --task_group=TASK_GROUP
          The task_group ID for the task.

          To set the task_group attribute:
          + provide the argument TASK on the command line with a fully
            specified name;
          + provide the argument --task_group on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha batch tasks describe

        $ gcloud beta batch tasks describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud batch tasks describe projects/foo/locations/us-central1/jobs/bar/taskGroups/group0/tasks/0
```

### gcloud batch tasks list

```text
NAME
    gcloud batch tasks list - list tasks for a specified Batch job

SYNOPSIS
    gcloud batch tasks list (--job=JOB : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Currently, since Batch only supports one taskGroup, group0, the command
    takes --job as the required argument and will list all tasks in group0 of
    the job.

    This command can fail for the following reasons:
      o The job specified does not exist.
      o The active account does not have permission to access the given job

EXAMPLES
    To print all tasks in the job with name
    projects/foo/locations/us-central1/jobs/bar, run:

        $ gcloud batch tasks list \
            --job projects/foo/locations/us-central1/jobs/bar

REQUIRED FLAGS
     Job resource - The Batch job resource. If not specified,the current
     batch/location is used. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --job=JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument --job on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Google Cloud location for the job.

          To set the location attribute:
          + provide the argument --job on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property batch/location.

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

        $ gcloud alpha batch tasks list

        $ gcloud beta batch tasks list
```

### gcloud beta batch tasks describe

```text
NAME
    gcloud beta batch tasks describe - show details of a task

SYNOPSIS
    gcloud beta batch tasks describe
        (TASK : --job=JOB --location=LOCATION --task_group=TASK_GROUP)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta batch tasks list

```text
NAME
    gcloud beta batch tasks list - list tasks for a specified Batch job

SYNOPSIS
    gcloud beta batch tasks list (--job=JOB : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch tasks describe

```text
NAME
    gcloud alpha batch tasks describe - show details of a task

SYNOPSIS
    gcloud alpha batch tasks describe
        (TASK : --job=JOB --location=LOCATION --task_group=TASK_GROUP)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha batch tasks list

```text
NAME
    gcloud alpha batch tasks list - list tasks for a specified Batch job

SYNOPSIS
    gcloud alpha batch tasks list (--job=JOB : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/batch/tasks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
