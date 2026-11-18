---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-health/events
---

# gcloud service-health events

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-health events describe

```text
NAME
    gcloud service-health events describe - get details of an event affecting a
        project

SYNOPSIS
    gcloud service-health events describe (EVENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves a resource containing information about an event.

    To get service health incident event, use location global.

EXAMPLES
    To get the details of event my-event in project my-project and location
    global, run:

        $ gcloud service-health events describe my-event \
            --project=my-project --location=global

POSITIONAL ARGUMENTS
     Event resource - Unique name of the event in this scope including project
     and location using the form
     projects/{project_id}/locations/{location}/events/{event_id}.

     project_id - Project ID of the project that contains the event.

     location - The location to get the service health events from. Set this
     field to global.

     event_id - Event ID to retrieve. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument event on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EVENT
          ID of the event or fully qualified identifier for the event.

          To set the event attribute:
          + provide the argument event on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location to use when working with Service Health resources.

          If not specified, will use default servicehealth/location.

          To set the location attribute:
          + provide the argument event on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property servicehealth/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the servicehealth/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/service-health/

NOTES
    These variants are also available:

        $ gcloud alpha service-health events describe

        $ gcloud beta service-health events describe
```

### gcloud service-health events list

```text
NAME
    gcloud service-health events list - list events under a given project and
        location

SYNOPSIS
    gcloud service-health events list [--location=LOCATION] [--view=VIEW]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List events under a given project and location.

    To retrieve service health incident events, use location global.

EXAMPLES
    To list all events in project my-project and location global, run:

        $ gcloud service-health events list --project=my-project \
            --location=global

FLAGS
     Location resource - Parent value using the form
     projects/{project_id}/locations/{location}/events.

     project_id - ID of the project for which to list service health events.
     location - The location to get the service health events from. Set this
     field to global. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property servicehealth/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property servicehealth/location.

     --view=VIEW
        Event fields to include in response. VIEW must be one of:

         event-view-basic
            Includes all fields except updates. This view is the default for
            ListEvents API.
         event-view-full
            Includes all event fields.

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
    This command uses the servicehealth/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/service-health/

NOTES
    These variants are also available:

        $ gcloud alpha service-health events list

        $ gcloud beta service-health events list
```

### gcloud beta service-health events describe

```text
NAME
    gcloud beta service-health events describe - get details of an event
        affecting a project

SYNOPSIS
    gcloud beta service-health events describe (EVENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-health events list

```text
NAME
    gcloud beta service-health events list - list events under a given project
        and location

SYNOPSIS
    gcloud beta service-health events list [--location=LOCATION] [--view=VIEW]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-health events describe

```text
NAME
    gcloud alpha service-health events describe - get details of an event
        affecting a project

SYNOPSIS
    gcloud alpha service-health events describe (EVENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-health events list

```text
NAME
    gcloud alpha service-health events list - list events under a given project
        and location

SYNOPSIS
    gcloud alpha service-health events list [--location=LOCATION] [--view=VIEW]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-health/events (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
