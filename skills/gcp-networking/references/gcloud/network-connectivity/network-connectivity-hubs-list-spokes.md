---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/list-spokes
---

# gcloud network-connectivity hubs list-spokes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs list-spokes

```text
NAME
    gcloud network-connectivity hubs list-spokes - list hub spokes

SYNOPSIS
    gcloud network-connectivity hubs list-spokes HUB
        [--spoke-locations=[LOCATION,...]] [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all spokes associated with a hub.

EXAMPLES
    To list all spokes in the us-central1 region and the global location, run:

        $ gcloud network-connectivity hubs list-spokes HUB \
        --spoke-locations=us-central1,global

    To list all spokes in the us-central1 region with a detailed view, run:

        $ gcloud network-connectivity hubs list-spokes HUB \
        --spoke-locations=us-central1 --view=detailed

    To list all spokes in the global location with a detailed view, run:

        $ gcloud network-connectivity hubs list-spokes HUB \
        --spoke-locations=global --view=detailed

POSITIONAL ARGUMENTS
     Hub resource - Name of the hub associated with the returned list of
     spokes. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument hub on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HUB
          ID of the hub or fully qualified identifier for the hub.

          To set the hub attribute:
          + provide the argument hub on the command line.

FLAGS
     --spoke-locations=[LOCATION,...]
        Comma-separated list of locations. The locations can be set to 'global'
        and/or Google Cloud supported regions. When --view=detailed is
        specified, --spoke-locations must be set to a single location, either
        'global' or a region. To see the names of regions, see Viewing a list
        of available regions
        (https://cloud.google.com/compute/docs/regions-zones/viewing-regions-zones#viewing_a_list_of_available_regions).

     --view=VIEW; default="basic"
        Enumeration to control which spoke fields are included in the response.
        VIEW must be one of:

         basic
            Includes basic spoke fields in the response. Supports listing
            spokes across one or more locations, or all locations if
            --spoke-locations is omitted.
         detailed
            Includes detailed spoke fields in the response. Supports both
            'global' and regional locations. Requires --spoke-locations to be
            set to a single location, either 'global' or a region.

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

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs list-spokes
```

### gcloud beta network-connectivity hubs list-spokes

```text
NAME
    gcloud beta network-connectivity hubs list-spokes - list hub spokes

SYNOPSIS
    gcloud beta network-connectivity hubs list-spokes HUB
        [--spoke-locations=[LOCATION,...]] [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/list-spokes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
