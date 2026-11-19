---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/processes
---

# gcloud datalineage processes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datalineage processes create

```text
NAME
    gcloud datalineage processes create - create a Data Lineage process

SYNOPSIS
    gcloud datalineage processes create (PROCESS : --location=LOCATION)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [--origin-name=ORIGIN_NAME]
        [--origin-source-type=ORIGIN_SOURCE_TYPE; default="custom"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Data Lineage process.

EXAMPLES
    To create a process with ID my-process in location us-central1 with display
    name My Process and origin custom, run:

        $ gcloud datalineage processes create my-process \
          --location=us-central1 --display-name="My Process" \
          --origin-source-type=custom --origin-name="my-app"

POSITIONAL ARGUMENTS
     Process resource - The process to create. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument process on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PROCESS
          ID of the process or fully qualified identifier for the process.

          To set the process attribute:
          + provide the argument process on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the process.

          To set the location attribute:
          + provide the argument process on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --attributes=[ATTRIBUTES,...]
        Additional attributes for the process.

     --display-name=DISPLAY_NAME
        A human-readable name for the process.

     --origin-name=ORIGIN_NAME
        The name of the origin (e.g. the application or pipeline name).

     --origin-source-type=ORIGIN_SOURCE_TYPE; default="custom"
        Type of the source. Use of a source type other than custom for process
        creation or updating is highly discouraged. It might be restricted in
        the future without notice. There will be increase in cost if you use
        any of the source types other than custom. ORIGIN_SOURCE_TYPE must be
        one of: bigquery, composer, custom, dataflow, dataproc, data-fusion,
        looker-core, looker-studio, source-type-unspecified, vertex-ai.

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

        $ gcloud alpha datalineage processes create

        $ gcloud beta datalineage processes create
```

### gcloud datalineage processes delete

```text
NAME
    gcloud datalineage processes delete - delete a Data Lineage process

SYNOPSIS
    gcloud datalineage processes delete (PROCESS : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Data Lineage process. All associated runs and lineage events will
    also be deleted.

EXAMPLES
    To delete a process with ID my-process in location us-central1, run:

        $ gcloud datalineage processes delete my-process \
          --location=us-central1

POSITIONAL ARGUMENTS
     Process resource - The process to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument process on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PROCESS
          ID of the process or fully qualified identifier for the process.

          To set the process attribute:
          + provide the argument process on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the process.

          To set the location attribute:
          + provide the argument process on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha datalineage processes delete

        $ gcloud beta datalineage processes delete
```

### gcloud datalineage processes describe

```text
NAME
    gcloud datalineage processes describe - describe a Data Lineage process

SYNOPSIS
    gcloud datalineage processes describe (PROCESS : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Data Lineage process.

EXAMPLES
    To describe a process with ID my-process in location us-central1, run:

        $ gcloud datalineage processes describe my-process \
          --location=us-central1

POSITIONAL ARGUMENTS
     Process resource - The name of the process to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument process on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PROCESS
          ID of the process or fully qualified identifier for the process.

          To set the process attribute:
          + provide the argument process on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the process.

          To set the location attribute:
          + provide the argument process on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha datalineage processes describe

        $ gcloud beta datalineage processes describe
```

### gcloud datalineage processes list

```text
NAME
    gcloud datalineage processes list - list Data Lineage processes

SYNOPSIS
    gcloud datalineage processes list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Data Lineage processes in the specified location.

EXAMPLES
    To list processes in location us, run:

        $ gcloud datalineage processes list --location=us

REQUIRED FLAGS
     Location resource - The location of the processes to list. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
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

        $ gcloud alpha datalineage processes list

        $ gcloud beta datalineage processes list
```

### gcloud datalineage processes update

```text
NAME
    gcloud datalineage processes update - update a data lineage process

SYNOPSIS
    gcloud datalineage processes update (PROCESS : --location=LOCATION)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a data lineage process.

EXAMPLES
    To update the display name of a process:

        $ gcloud datalineage processes update my-process \
            --location=us-central1 --display-name="New Name"

POSITIONAL ARGUMENTS
     Process resource - The process to update. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument process on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PROCESS
          ID of the process or fully qualified identifier for the process.

          To set the process attribute:
          + provide the argument process on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the process.

          To set the location attribute:
          + provide the argument process on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --attributes=[ATTRIBUTES,...]
        The new attributes of the process. This will replace any existing
        attributes.

     --display-name=DISPLAY_NAME
        The new display name of the process.

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

        $ gcloud alpha datalineage processes update

        $ gcloud beta datalineage processes update
```

### gcloud beta datalineage processes create

```text
NAME
    gcloud beta datalineage processes create - create a Data Lineage process

SYNOPSIS
    gcloud beta datalineage processes create (PROCESS : --location=LOCATION)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [--origin-name=ORIGIN_NAME]
        [--origin-source-type=ORIGIN_SOURCE_TYPE; default="custom"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage processes delete

```text
NAME
    gcloud beta datalineage processes delete - delete a Data Lineage process

SYNOPSIS
    gcloud beta datalineage processes delete (PROCESS : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage processes describe

```text
NAME
    gcloud beta datalineage processes describe - describe a Data Lineage
        process

SYNOPSIS
    gcloud beta datalineage processes describe (PROCESS : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage processes list

```text
NAME
    gcloud beta datalineage processes list - list Data Lineage processes

SYNOPSIS
    gcloud beta datalineage processes list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage processes update

```text
NAME
    gcloud beta datalineage processes update - update a data lineage process

SYNOPSIS
    gcloud beta datalineage processes update (PROCESS : --location=LOCATION)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage processes create

```text
NAME
    gcloud alpha datalineage processes create - create a Data Lineage process

SYNOPSIS
    gcloud alpha datalineage processes create (PROCESS : --location=LOCATION)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [--origin-name=ORIGIN_NAME]
        [--origin-source-type=ORIGIN_SOURCE_TYPE; default="custom"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage processes delete

```text
NAME
    gcloud alpha datalineage processes delete - delete a Data Lineage process

SYNOPSIS
    gcloud alpha datalineage processes delete (PROCESS : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage processes describe

```text
NAME
    gcloud alpha datalineage processes describe - describe a Data Lineage
        process

SYNOPSIS
    gcloud alpha datalineage processes describe (PROCESS : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage processes list

```text
NAME
    gcloud alpha datalineage processes list - list Data Lineage processes

SYNOPSIS
    gcloud alpha datalineage processes list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage processes update

```text
NAME
    gcloud alpha datalineage processes update - update a data lineage process

SYNOPSIS
    gcloud alpha datalineage processes update (PROCESS : --location=LOCATION)
        [--attributes=[ATTRIBUTES,...]] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/processes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
