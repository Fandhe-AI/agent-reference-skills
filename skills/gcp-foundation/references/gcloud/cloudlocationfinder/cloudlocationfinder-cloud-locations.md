---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cloudlocationfinder/cloud-locations
---

# gcloud cloudlocationfinder cloud-locations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud cloudlocationfinder cloud-locations describe

```text
NAME
    gcloud cloudlocationfinder cloud-locations describe - describe a Cloud
        Location

SYNOPSIS
    gcloud cloudlocationfinder cloud-locations describe
        (CLOUD_LOCATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Location

EXAMPLES
    To describe the Cloud Location with name "gcp-us-central1", run:

        $ gcloud cloudlocationfinder cloud-locations describe gcp-us-central1

POSITIONAL ARGUMENTS
     CloudLocation resource - Name of the resource. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument cloud_location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_LOCATION
          ID of the cloudLocation or fully qualified identifier for the
          cloudLocation.

          To set the cloud_location attribute:
          + provide the argument cloud_location on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudLocation resource.

          To set the location attribute:
          + provide the argument cloud_location on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudlocationfinder/v1 API. The full documentation
    for this API can be found at: https://cloud.google.com/location-finder/docs

NOTES
    This variant is also available:

        $ gcloud alpha cloudlocationfinder cloud-locations describe
```

### gcloud cloudlocationfinder cloud-locations list

```text
NAME
    gcloud cloudlocationfinder cloud-locations list - list cloudLocations

SYNOPSIS
    gcloud cloudlocationfinder cloud-locations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Request for listing Cloudlocations.

EXAMPLES
    To list CloudLocations, run:

        $ gcloud cloudlocationfinder cloud-locations list

FLAGS
     Location resource - The resource location. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * location is always global with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * location is always global.

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
    This variant is also available:

        $ gcloud alpha cloudlocationfinder cloud-locations list
```

### gcloud cloudlocationfinder cloud-locations search

```text
NAME
    gcloud cloudlocationfinder cloud-locations search - search cloudLocations

SYNOPSIS
    gcloud cloudlocationfinder cloud-locations search
        --source-cloud-location=SOURCE_CLOUD_LOCATION [--limit=LIMIT]
        [--location=LOCATION] [--page-size=PAGE_SIZE] [--query=QUERY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search Cloudlocations.

EXAMPLES
    To search CloudLocations, run:

        $ gcloud cloudlocationfinder cloud-locations search \
          --source-cloud-location=aws-us-east-1 \
          --query=display_name="us-east4"

REQUIRED FLAGS
     Source cloud location resource - The source Cloud location. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --source-cloud-location on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --source-cloud-location on the command line with
        a fully specified name;
      * provide the argument --location on the command line;
      * location is always global.

     This must be specified.

       --source-cloud-location=SOURCE_CLOUD_LOCATION
          ID of the source_cloud_location or fully qualified identifier for the
          source_cloud_location.

          To set the cloud_location attribute:
          + provide the argument --source-cloud-location on the command line.

OPTIONAL FLAGS
     --limit=LIMIT
        Maximum number of resources to return.

     Location resource - The resource location. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * location is always global with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * location is always global.

     --page-size=PAGE_SIZE
        Maximum number of resources per page.

     --query=QUERY
        Query to use for searching Cloudlocations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha cloudlocationfinder cloud-locations search
```

### gcloud alpha cloudlocationfinder cloud-locations describe

```text
NAME
    gcloud alpha cloudlocationfinder cloud-locations describe - describe
        cloudLocations

SYNOPSIS
    gcloud alpha cloudlocationfinder cloud-locations describe
        (CLOUD_LOCATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha cloudlocationfinder cloud-locations list

```text
NAME
    gcloud alpha cloudlocationfinder cloud-locations list - list cloudLocations

SYNOPSIS
    gcloud alpha cloudlocationfinder cloud-locations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha cloudlocationfinder cloud-locations search

```text
NAME
    gcloud alpha cloudlocationfinder cloud-locations search - search
        cloudLocations

SYNOPSIS
    gcloud alpha cloudlocationfinder cloud-locations search
        --source-cloud-location=SOURCE_CLOUD_LOCATION [--limit=LIMIT]
        [--location=LOCATION] [--page-size=PAGE_SIZE] [--query=QUERY]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cloudlocationfinder/cloud-locations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
