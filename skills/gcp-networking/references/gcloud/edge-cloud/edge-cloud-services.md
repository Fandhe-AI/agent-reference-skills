---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/services
---

# gcloud edge-cloud services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud services describe

```text
NAME
    gcloud edge-cloud services describe - describe a Google Cloud Platform
        service enabled on a Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud services describe (ZONAL_SERVICE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Google Cloud Platform service enabled on a Google Distributed
    Cloud zone.

EXAMPLES
    To describe a service with id service-id in project sample-project and
    location us-central1, run:

        $ gcloud edge-cloud services describe service-id \
            --location=us-central1 --project=sample-project

POSITIONAL ARGUMENTS
     Zonal Service resource - Service ID to describe which is enabled on a
     Google Distributed Cloud zone. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zonal_service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONAL_SERVICE
          ID of the Zonal Service or fully qualified identifier for the Zonal
          Service.

          To set the zonal_service attribute:
          + provide the argument zonal_service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument zonal_service on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud services describe
```

### gcloud edge-cloud services enable

```text
NAME
    gcloud edge-cloud services enable - enables a Google Cloud Platform service
        on a Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud services enable SERVICE_NAME --location=LOCATION
        --zone=ZONE [--async] [--id=ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enables a Google Cloud Platform service on a Google Distributed Cloud zone.

EXAMPLES
    To enable sample-service service in location us-central1 in sample-project
    project and sample-zone zone, run:

        $ gcloud edge-cloud services enable sample-service \
            --location=us-central1 --project=sample-project \
            --zone=sample-zone

POSITIONAL ARGUMENTS
     SERVICE_NAME
        Google Cloud Platform service name.

REQUIRED FLAGS
     Location resource - Google Cloud Platform region This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

     --zone=ZONE
        Google Distributed Cloud zone.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --id=ID
        Service ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud services enable
```

### gcloud edge-cloud services list

```text
NAME
    gcloud edge-cloud services list - list Google Cloud Platform services
        enabled on a Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud services list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Google Cloud Platform services enabled on a Google Distributed Cloud
    zone.

EXAMPLES
    To list Google Cloud Platform services enabled on a Google Distributed
    Cloud zone, run:

        $ gcloud edge-cloud services list --location=us-central1 \
            --project=sample-project

REQUIRED FLAGS
     Location resource - Google Cloud Platform region This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud services list
```

### gcloud alpha edge-cloud services describe

```text
NAME
    gcloud alpha edge-cloud services describe - describe a Google Cloud
        Platform service enabled on a Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud services describe
        (ZONAL_SERVICE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud services disable

```text
NAME
    gcloud alpha edge-cloud services disable - disables a Google Cloud Platform
        service on a Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud services disable
        (ZONAL_SERVICE : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud services enable

```text
NAME
    gcloud alpha edge-cloud services enable - enables a Google Cloud Platform
        service on a Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud services enable SERVICE_NAME --location=LOCATION
        --zone=ZONE [--async] [--id=ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud services list

```text
NAME
    gcloud alpha edge-cloud services list - list Google Cloud Platform services
        enabled on a Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud services list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
