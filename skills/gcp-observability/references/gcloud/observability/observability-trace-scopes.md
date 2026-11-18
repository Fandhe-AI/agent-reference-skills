---
source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/trace-scopes
---

# gcloud observability trace-scopes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud observability trace-scopes create

```text
NAME
    gcloud observability trace-scopes create - create traceScopes

SYNOPSIS
    gcloud observability trace-scopes create
        (TRACE_SCOPE : --location=LOCATION)
        --resource-names=[RESOURCE_NAMES,...] [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a traceScope

EXAMPLES
    To create the traceScope, run:

        $ gcloud observability trace-scopes create

POSITIONAL ARGUMENTS
     TraceScope resource - Identifier. The resource name of the trace scope.

     For example:

         projects/my-project/locations/global/traceScopes/my-trace-scope The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument trace_scope on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRACE_SCOPE
          ID of the traceScope or fully qualified identifier for the
          traceScope.

          To set the trace_scope attribute:
          + provide the argument trace_scope on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the traceScope resource.

          To set the location attribute:
          + provide the argument trace_scope on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --resource-names=[RESOURCE_NAMES,...]
        Names of the projects that are included in this trace scope.

        * projects/[PROJECT_ID]

        A trace scope can include a maximum of 20 projects.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Describes this trace scope.

        The maximum length of the description is 8000 characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    These variants are also available:

        $ gcloud alpha observability trace-scopes create

        $ gcloud beta observability trace-scopes create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability trace-scopes create TRACE_SCOPE \
    --location=LOCATION \
    --resource-names=RESOURCE_NAMES
```

### gcloud observability trace-scopes delete

```text
NAME
    gcloud observability trace-scopes delete - delete traceScopes

SYNOPSIS
    gcloud observability trace-scopes delete
        (TRACE_SCOPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a traceScope

EXAMPLES
    To delete the traceScope, run:

        $ gcloud observability trace-scopes delete

POSITIONAL ARGUMENTS
     TraceScope resource - The full resource name of the trace scope to delete:

         projects/[PROJECT_ID]/locations/[LOCATION_ID]/traceScopes/[TRACE_SCOPE_ID]

     For example:

         projects/my-project/locations/global/traceScopes/my-trace-scope The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument trace_scope on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRACE_SCOPE
          ID of the traceScope or fully qualified identifier for the
          traceScope.

          To set the trace_scope attribute:
          + provide the argument trace_scope on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the traceScope resource.

          To set the location attribute:
          + provide the argument trace_scope on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    These variants are also available:

        $ gcloud alpha observability trace-scopes delete

        $ gcloud beta observability trace-scopes delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability trace-scopes delete TRACE_SCOPE \
    --location=LOCATION
```

### gcloud observability trace-scopes describe

```text
NAME
    gcloud observability trace-scopes describe - describe traceScopes

SYNOPSIS
    gcloud observability trace-scopes describe
        (TRACE_SCOPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a traceScope

EXAMPLES
    To describe the traceScope, run:

        $ gcloud observability trace-scopes describe

POSITIONAL ARGUMENTS
     TraceScope resource - The resource name of the trace scope:

         projects/[PROJECT_ID]/locations/[LOCATION_ID]/traceScopes/[TRACE_SCOPE_ID]

     For example:

         projects/my-project/locations/global/traceScopes/my-trace-scope The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument trace_scope on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRACE_SCOPE
          ID of the traceScope or fully qualified identifier for the
          traceScope.

          To set the trace_scope attribute:
          + provide the argument trace_scope on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the traceScope resource.

          To set the location attribute:
          + provide the argument trace_scope on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    These variants are also available:

        $ gcloud alpha observability trace-scopes describe

        $ gcloud beta observability trace-scopes describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability trace-scopes describe TRACE_SCOPE \
    --location=LOCATION
```

### gcloud observability trace-scopes list

```text
NAME
    gcloud observability trace-scopes list - list traceScopes

SYNOPSIS
    gcloud observability trace-scopes list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List traceScopes

EXAMPLES
    To list all traceScopes, run:

        $ gcloud observability trace-scopes list

REQUIRED FLAGS
     Location resource - The full resource name of the location to look for
     trace scopes:

         projects/[PROJECT_ID]/locations/[LOCATION_ID]

     For example:

         projects/my-project/locations/global This represents a Cloud resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

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
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    These variants are also available:

        $ gcloud alpha observability trace-scopes list

        $ gcloud beta observability trace-scopes list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability trace-scopes list \
    --location=LOCATION
```

### gcloud observability trace-scopes update

```text
NAME
    gcloud observability trace-scopes update - update traceScopes

SYNOPSIS
    gcloud observability trace-scopes update
        (TRACE_SCOPE : --location=LOCATION) [--description=DESCRIPTION]
        [--resource-names=[RESOURCE_NAMES,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a traceScope

EXAMPLES
    To update the traceScope, run:

        $ gcloud observability trace-scopes update

POSITIONAL ARGUMENTS
     TraceScope resource - Identifier. The resource name of the trace scope.

     For example:

         projects/my-project/locations/global/traceScopes/my-trace-scope The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument trace_scope on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRACE_SCOPE
          ID of the traceScope or fully qualified identifier for the
          traceScope.

          To set the trace_scope attribute:
          + provide the argument trace_scope on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the traceScope resource.

          To set the location attribute:
          + provide the argument trace_scope on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --description=DESCRIPTION
        Describes this trace scope.

        The maximum length of the description is 8000 characters.

     --resource-names=[RESOURCE_NAMES,...]
        Names of the projects that are included in this trace scope.

        * projects/[PROJECT_ID]

        A trace scope can include a maximum of 20 projects.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    These variants are also available:

        $ gcloud alpha observability trace-scopes update

        $ gcloud beta observability trace-scopes update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability trace-scopes update TRACE_SCOPE \
    --location=LOCATION \
    --description=DESCRIPTION
```

### gcloud beta observability trace-scopes create

```text
NAME
    gcloud beta observability trace-scopes create - create traceScopes

SYNOPSIS
    gcloud beta observability trace-scopes create
        (TRACE_SCOPE : --location=LOCATION)
        --resource-names=[RESOURCE_NAMES,...] [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability trace-scopes delete

```text
NAME
    gcloud beta observability trace-scopes delete - delete traceScopes

SYNOPSIS
    gcloud beta observability trace-scopes delete
        (TRACE_SCOPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability trace-scopes describe

```text
NAME
    gcloud beta observability trace-scopes describe - describe traceScopes

SYNOPSIS
    gcloud beta observability trace-scopes describe
        (TRACE_SCOPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability trace-scopes list

```text
NAME
    gcloud beta observability trace-scopes list - list traceScopes

SYNOPSIS
    gcloud beta observability trace-scopes list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability trace-scopes update

```text
NAME
    gcloud beta observability trace-scopes update - update traceScopes

SYNOPSIS
    gcloud beta observability trace-scopes update
        (TRACE_SCOPE : --location=LOCATION) [--description=DESCRIPTION]
        [--resource-names=[RESOURCE_NAMES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha observability trace-scopes create

```text
NAME
    gcloud alpha observability trace-scopes create - create traceScopes

SYNOPSIS
    gcloud alpha observability trace-scopes create
        (TRACE_SCOPE : --location=LOCATION)
        --resource-names=[RESOURCE_NAMES,...] [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha observability trace-scopes delete

```text
NAME
    gcloud alpha observability trace-scopes delete - delete traceScopes

SYNOPSIS
    gcloud alpha observability trace-scopes delete
        (TRACE_SCOPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha observability trace-scopes describe

```text
NAME
    gcloud alpha observability trace-scopes describe - describe traceScopes

SYNOPSIS
    gcloud alpha observability trace-scopes describe
        (TRACE_SCOPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha observability trace-scopes list

```text
NAME
    gcloud alpha observability trace-scopes list - list traceScopes

SYNOPSIS
    gcloud alpha observability trace-scopes list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha observability trace-scopes update

```text
NAME
    gcloud alpha observability trace-scopes update - update traceScopes

SYNOPSIS
    gcloud alpha observability trace-scopes update
        (TRACE_SCOPE : --location=LOCATION) [--description=DESCRIPTION]
        [--resource-names=[RESOURCE_NAMES,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example gives only the command, without the trace scope, `--location` and `--resource-names` that the SYNOPSIS requires (`gcloud observability trace-scopes create (TRACE_SCOPE : --location=LOCATION) --resource-names=[RESOURCE_NAMES,...]`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `delete` example gives only the command, without the trace scope and `--location` that the SYNOPSIS requires (`gcloud observability trace-scopes delete (TRACE_SCOPE : --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example gives only the command, without the trace scope and `--location` that the SYNOPSIS requires (`gcloud observability trace-scopes describe (TRACE_SCOPE : --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example gives only the command, without the `--location` that the SYNOPSIS requires (`gcloud observability trace-scopes list --location=LOCATION`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example gives only the command, without the trace scope and `--location` that the SYNOPSIS requires (`gcloud observability trace-scopes update (TRACE_SCOPE : --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders, and `--description` (the only optional change flag), since an update without a change flag has nothing to apply.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/trace-scopes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
