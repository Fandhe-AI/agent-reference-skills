---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/lineage-events
---

# gcloud datalineage lineage-events

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datalineage lineage-events create

```text
NAME
    gcloud datalineage lineage-events create - create a Data Lineage event

SYNOPSIS
    gcloud datalineage lineage-events create
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        --start-time=START_TIME [--end-time=END_TIME]
        [--links=[source=SOURCE],[target=TARGET]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Data Lineage event.

EXAMPLES
    To create a lineage event with ID my-event under run my-run and process
    my-process, run:

        $ gcloud datalineage lineage-events create my-event --run=my-run \
            --process=my-process --location=us-central1 \
            --start-time="2026-06-19T10:00:00Z" \
            --end-time="2026-06-19T10:30:00Z"

    To record a lineage link with column-level details:

        $ gcloud datalineage lineage-events create my-event --run=my-run \
            --process=my-process --location=us-central1 \
            --start-time="2026-06-19T10:00:00Z" \
            --links="source={fullyQualifiedName=my_source_fqn,field=[col1]},\
        target={fullyQualifiedName=my_target_fqn,field=[col2]}"

POSITIONAL ARGUMENTS
     Lineage event resource - The lineage event to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument lineage_event on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LINEAGE_EVENT
          ID of the lineage_event or fully qualified identifier for the
          lineage_event.

          To set the lineage_event attribute:
          + provide the argument lineage_event on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the lineage_event.

          To set the location attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --process on the command line.

       --run=RUN
          The name of the run.

          To set the run attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --run on the command line.

REQUIRED FLAGS
     --start-time=START_TIME
        The start time of the lineage event.

OPTIONAL FLAGS
     --end-time=END_TIME
        The end time of the lineage event.

     --links=[source=SOURCE],[target=TARGET]
        A list of source-target links representing data lineage.

         source
            Required, The source entity.

             field
                The fields of the source entity.

             fullyQualifiedName
                Required, The fully qualified name of the source entity.

         target
            Required, The target entity.

             field
                The fields of the target entity.

             fullyQualifiedName
                Required, The fully qualified name of the target entity.

        Shorthand Example:

            --links=source={field=[string],fullyQualifiedName=string},target={field=[string],fullyQualifiedName=string} --links=source={field=[string],fullyQualifiedName=string},target={field=[string],fullyQualifiedName=string}

        JSON Example:

            --links='[{"source": {"field": ["string"], "fullyQualifiedName": "string"}, "target": {"field": ["string"], "fullyQualifiedName": "string"}}]'

        File Example:

            --links=path_to_file.(yaml|json)

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

        $ gcloud alpha datalineage lineage-events create

        $ gcloud beta datalineage lineage-events create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud datalineage lineage-events create my-event \
    --run=my-run \
    --process=my-process \
    --location=us-central1 \
    --start-time="2026-06-19T10:00:00Z" \
    --links="source={fullyQualifiedName=my_source_fqn,field=[col1]},target={fullyQualifiedName=my_target_fqn,field=[col2]}"
```

### gcloud datalineage lineage-events delete

```text
NAME
    gcloud datalineage lineage-events delete - delete a Data Lineage event

SYNOPSIS
    gcloud datalineage lineage-events delete
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Data Lineage event.

EXAMPLES
    To delete a lineage event with ID 'my-event' under run 'my-run', process
    'my-process' in location 'us-central1', run:

        $ gcloud datalineage lineage-events delete my-event --run=my-run \
          --process=my-process --location=us-central1

POSITIONAL ARGUMENTS
     Lineage event resource - The lineage event to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument lineage_event on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LINEAGE_EVENT
          ID of the lineage_event or fully qualified identifier for the
          lineage_event.

          To set the lineage_event attribute:
          + provide the argument lineage_event on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the lineage_event.

          To set the location attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --process on the command line.

       --run=RUN
          The name of the run.

          To set the run attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --run on the command line.

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

        $ gcloud alpha datalineage lineage-events delete

        $ gcloud beta datalineage lineage-events delete
```

### gcloud datalineage lineage-events describe

```text
NAME
    gcloud datalineage lineage-events describe - describe a Data Lineage event

SYNOPSIS
    gcloud datalineage lineage-events describe
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Data Lineage event.

EXAMPLES
    To describe a lineage event with ID 'my-event' under run 'my-run', process
    'my-process', in location 'us-central1', run:

        $ gcloud datalineage lineage-events describe my-event --run=my-run \
          --process=my-process --location=us-central1

POSITIONAL ARGUMENTS
     Lineage event resource - The name of the lineage event to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument lineage_event on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LINEAGE_EVENT
          ID of the lineage_event or fully qualified identifier for the
          lineage_event.

          To set the lineage_event attribute:
          + provide the argument lineage_event on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the lineage_event.

          To set the location attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --process on the command line.

       --run=RUN
          The name of the run.

          To set the run attribute:
          + provide the argument lineage_event on the command line with a
            fully specified name;
          + provide the argument --run on the command line.

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

        $ gcloud alpha datalineage lineage-events describe

        $ gcloud beta datalineage lineage-events describe
```

### gcloud datalineage lineage-events list

```text
NAME
    gcloud datalineage lineage-events list - list Data Lineage events

SYNOPSIS
    gcloud datalineage lineage-events list
        (--run=RUN : --location=LOCATION --process=PROCESS)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Data Lineage events under the specified run.

EXAMPLES
    To list lineage events under run 'my-run', process 'my-process' in location
    'us-central1', run:

        $ gcloud datalineage lineage-events list --run=my-run \
          --process=my-process --location=us-central1

REQUIRED FLAGS
     Run resource - The run to list lineage events for. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --run on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --run=RUN
          ID of the run or fully qualified identifier for the run.

          To set the run attribute:
          + provide the argument --run on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location of the run.

          To set the location attribute:
          + provide the argument --run on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --process=PROCESS
          The name of the process.

          To set the process attribute:
          + provide the argument --run on the command line with a fully
            specified name;
          + provide the argument --process on the command line.

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

        $ gcloud alpha datalineage lineage-events list

        $ gcloud beta datalineage lineage-events list
```

### gcloud beta datalineage lineage-events create

```text
NAME
    gcloud beta datalineage lineage-events create - create a Data Lineage event

SYNOPSIS
    gcloud beta datalineage lineage-events create
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        --start-time=START_TIME [--end-time=END_TIME]
        [--links=[source=SOURCE],[target=TARGET]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage lineage-events delete

```text
NAME
    gcloud beta datalineage lineage-events delete - delete a Data Lineage event

SYNOPSIS
    gcloud beta datalineage lineage-events delete
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage lineage-events describe

```text
NAME
    gcloud beta datalineage lineage-events describe - describe a Data Lineage
        event

SYNOPSIS
    gcloud beta datalineage lineage-events describe
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage lineage-events list

```text
NAME
    gcloud beta datalineage lineage-events list - list Data Lineage events

SYNOPSIS
    gcloud beta datalineage lineage-events list
        (--run=RUN : --location=LOCATION --process=PROCESS)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage lineage-events create

```text
NAME
    gcloud alpha datalineage lineage-events create - create a Data Lineage
        event

SYNOPSIS
    gcloud alpha datalineage lineage-events create
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        --start-time=START_TIME [--end-time=END_TIME]
        [--links=[source=SOURCE],[target=TARGET]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage lineage-events delete

```text
NAME
    gcloud alpha datalineage lineage-events delete - delete a Data Lineage
        event

SYNOPSIS
    gcloud alpha datalineage lineage-events delete
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage lineage-events describe

```text
NAME
    gcloud alpha datalineage lineage-events describe - describe a Data Lineage
        event

SYNOPSIS
    gcloud alpha datalineage lineage-events describe
        (LINEAGE_EVENT : --location=LOCATION --process=PROCESS --run=RUN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage lineage-events list

```text
NAME
    gcloud alpha datalineage lineage-events list - list Data Lineage events

SYNOPSIS
    gcloud alpha datalineage lineage-events list
        (--run=RUN : --location=LOCATION --process=PROCESS)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/lineage-events (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
