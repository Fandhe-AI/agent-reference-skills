---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/runs
---

# gcloud datalineage runs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datalineage runs create

```text
NAME
    gcloud datalineage runs create - create a data lineage run

SYNOPSIS
    gcloud datalineage runs create
        (RUN : --location=LOCATION --process=PROCESS) --start-time=START_TIME
        --state=STATE [--attributes=[ATTRIBUTES,...]]
        [--display-name=DISPLAY_NAME] [--end-time=END_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a data lineage run.

EXAMPLES
    To create a run with ID my-run under process my-process, run:

        $ gcloud datalineage runs create my-run --process=my-process \
            --location=us-central1 --state=started \
            --start-time="2026-06-19T10:00:00Z"

POSITIONAL ARGUMENTS
     Run resource - The run to create. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument run on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RUN
          ID of the run or fully qualified identifier for the run.

          To set the run attribute:
          + provide the argument run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the run.

          To set the location attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --process on the command line.

REQUIRED FLAGS
     --start-time=START_TIME
        The start time of the run.

     --state=STATE
        The state of the run. STATE must be one of: aborted, completed, failed,
        started, unknown.

OPTIONAL FLAGS
     --attributes=[ATTRIBUTES,...]
        Additional attributes for the run.

     --display-name=DISPLAY_NAME
        The display name of the run.

     --end-time=END_TIME
        The end time of the run.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datalineage/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog

NOTES
    These variants are also available:

        $ gcloud alpha datalineage runs create

        $ gcloud beta datalineage runs create
```

### gcloud datalineage runs delete

```text
NAME
    gcloud datalineage runs delete - delete a Data Lineage run

SYNOPSIS
    gcloud datalineage runs delete
        (RUN : --location=LOCATION --process=PROCESS) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Data Lineage run. All associated lineage events will also be
    deleted.

EXAMPLES
    To delete a run with ID 'my-run' under process 'my-process' in location
    'us-central1', run:

        $ gcloud datalineage runs delete my-run --process=my-process \
          --location=us-central1

POSITIONAL ARGUMENTS
     Run resource - The run to delete. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument run on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RUN
          ID of the run or fully qualified identifier for the run.

          To set the run attribute:
          + provide the argument run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the run.

          To set the location attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --process on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datalineage/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog

NOTES
    These variants are also available:

        $ gcloud alpha datalineage runs delete

        $ gcloud beta datalineage runs delete
```

### gcloud datalineage runs describe

```text
NAME
    gcloud datalineage runs describe - describe a Data Lineage run

SYNOPSIS
    gcloud datalineage runs describe
        (RUN : --location=LOCATION --process=PROCESS) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Data Lineage run.

EXAMPLES
    To describe a run with ID 'my-run' under process 'my-process' in location
    'us-central1', run:

        $ gcloud datalineage runs describe my-run --process=my-process \
          --location=us-central1

POSITIONAL ARGUMENTS
     Run resource - The name of the run to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument run on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RUN
          ID of the run or fully qualified identifier for the run.

          To set the run attribute:
          + provide the argument run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the run.

          To set the location attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --process on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datalineage/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog

NOTES
    These variants are also available:

        $ gcloud alpha datalineage runs describe

        $ gcloud beta datalineage runs describe
```

### gcloud datalineage runs list

```text
NAME
    gcloud datalineage runs list - list Data Lineage runs

SYNOPSIS
    gcloud datalineage runs list (--process=PROCESS : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Data Lineage runs under the specified process.

EXAMPLES
    To list runs under process 'my-process' in location 'us-central1', run:

        $ gcloud datalineage runs list --process=my-process \
          --location=us-central1

REQUIRED FLAGS
     Process resource - The process to list runs for. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --process on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --process=PROCESS
          ID of the process or fully qualified identifier for the process.

          To set the process attribute:
          + provide the argument --process on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location of the process.

          To set the location attribute:
          + provide the argument --process on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
    This command uses the datalineage/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog

NOTES
    These variants are also available:

        $ gcloud alpha datalineage runs list

        $ gcloud beta datalineage runs list
```

### gcloud datalineage runs update

```text
NAME
    gcloud datalineage runs update - update a data lineage run

SYNOPSIS
    gcloud datalineage runs update
        (RUN : --location=LOCATION --process=PROCESS)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [--end-time=END_TIME] [--state=STATE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a data lineage run.

EXAMPLES
    To update the display name and state of a run:

        $ gcloud datalineage runs update my-run --process=my-process \
            --location=us-central1 --display-name="New Name" \
            --state=completed

POSITIONAL ARGUMENTS
     Run resource - The run to update. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument run on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RUN
          ID of the run or fully qualified identifier for the run.

          To set the run attribute:
          + provide the argument run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the run.

          To set the location attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument run on the command line with a fully
            specified name;
          + provide the argument --process on the command line.

FLAGS
     --attributes=[ATTRIBUTES,...]
        The new attributes of the run. This will replace any existing
        attributes.

     --display-name=DISPLAY_NAME
        The new display name of the run.

     --end-time=END_TIME
        The end time of the run.

     --state=STATE
        The new state of the run. STATE must be one of: aborted, completed,
        failed, started, unknown.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datalineage/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog

NOTES
    These variants are also available:

        $ gcloud alpha datalineage runs update

        $ gcloud beta datalineage runs update
```

### gcloud beta datalineage runs create

```text
NAME
    gcloud beta datalineage runs create - create a data lineage run

SYNOPSIS
    gcloud beta datalineage runs create
        (RUN : --location=LOCATION --process=PROCESS) --start-time=START_TIME
        --state=STATE [--attributes=[ATTRIBUTES,...]]
        [--display-name=DISPLAY_NAME] [--end-time=END_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage runs delete

```text
NAME
    gcloud beta datalineage runs delete - delete a Data Lineage run

SYNOPSIS
    gcloud beta datalineage runs delete
        (RUN : --location=LOCATION --process=PROCESS) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage runs describe

```text
NAME
    gcloud beta datalineage runs describe - describe a Data Lineage run

SYNOPSIS
    gcloud beta datalineage runs describe
        (RUN : --location=LOCATION --process=PROCESS) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage runs list

```text
NAME
    gcloud beta datalineage runs list - list Data Lineage runs

SYNOPSIS
    gcloud beta datalineage runs list (--process=PROCESS : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage runs update

```text
NAME
    gcloud beta datalineage runs update - update a data lineage run

SYNOPSIS
    gcloud beta datalineage runs update
        (RUN : --location=LOCATION --process=PROCESS)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [--end-time=END_TIME] [--state=STATE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage runs create

```text
NAME
    gcloud alpha datalineage runs create - create a data lineage run

SYNOPSIS
    gcloud alpha datalineage runs create
        (RUN : --location=LOCATION --process=PROCESS) --start-time=START_TIME
        --state=STATE [--attributes=[ATTRIBUTES,...]]
        [--display-name=DISPLAY_NAME] [--end-time=END_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage runs delete

```text
NAME
    gcloud alpha datalineage runs delete - delete a Data Lineage run

SYNOPSIS
    gcloud alpha datalineage runs delete
        (RUN : --location=LOCATION --process=PROCESS) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage runs describe

```text
NAME
    gcloud alpha datalineage runs describe - describe a Data Lineage run

SYNOPSIS
    gcloud alpha datalineage runs describe
        (RUN : --location=LOCATION --process=PROCESS) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage runs list

```text
NAME
    gcloud alpha datalineage runs list - list Data Lineage runs

SYNOPSIS
    gcloud alpha datalineage runs list
        (--process=PROCESS : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage runs update

```text
NAME
    gcloud alpha datalineage runs update - update a data lineage run

SYNOPSIS
    gcloud alpha datalineage runs update
        (RUN : --location=LOCATION --process=PROCESS)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [--end-time=END_TIME] [--state=STATE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/runs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
