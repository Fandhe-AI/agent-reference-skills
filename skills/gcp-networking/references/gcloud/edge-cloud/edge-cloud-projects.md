---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/projects
---

# gcloud edge-cloud projects

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud projects describe

```text
NAME
    gcloud edge-cloud projects describe - describe a Google Cloud Platform
        project enabled on Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud projects describe
        (ZONAL_PROJECT
          : --location=LOCATION --organization=ORGANIZATION --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Google Cloud Platform project enabled on Google Distributed
    Cloud Connected zone.

EXAMPLES
    To describe a Google Cloud Platform project sample-project in Google
    Distributed Cloud zone sample-zone in organization sample-org and location
    us-central1, run:

        $ gcloud edge-cloud projects describe sample-project \
            --location=us-central1 --zone=sample-zone \
            --organization=sample-org

POSITIONAL ARGUMENTS
     Zonal Project resource - Google Cloud Platform project enabled on Google
     Distributed Cloud Connected zone. The arguments in this group can be used
     to specify the attributes of this resource.

     This must be specified.

       ZONAL_PROJECT
          ID of the Zonal Project or fully qualified identifier for the Zonal
          Project.

          To set the zonal_project attribute:
          + provide the argument zonal_project on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument zonal_project on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization name.

          To set the organization attribute:
          + provide the argument zonal_project on the command line with a
            fully specified name;
          + provide the argument --organization on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument zonal_project on the command line with a
            fully specified name;
          + provide the argument --zone on the command line.

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

        $ gcloud alpha edge-cloud projects describe
```

### gcloud edge-cloud projects enable

```text
NAME
    gcloud edge-cloud projects enable - enables a Google Cloud Platform project
        on Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud projects enable ZONAL_PROJECT [--async]
        [--location=LOCATION] [--organization=ORGANIZATION] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enables a Google Cloud Platform project on Google Distributed Cloud zone.

EXAMPLES
    To enable a Google Cloud Platform project called sample-project in Google
    Distributed Cloud zone sample-zone in organization sample-org and location
    us-central1, run:

        $ gcloud edge-cloud projects enable sample-project \
            --location=us-central1 --zone=sample-zone \
            --organization=sample-org

POSITIONAL ARGUMENTS
     Zonal Project resource - Google Cloud Platform project This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the organization attribute:
      * provide the argument zonal_project on the command line with a fully
        specified name;
      * provide the argument --organization on the command line.

     To set the location attribute:
      * provide the argument zonal_project on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     To set the zone attribute:
      * provide the argument zonal_project on the command line with a fully
        specified name;
      * provide the argument --zone on the command line.

     This must be specified.

       ZONAL_PROJECT
          ID of the Zonal Project or fully qualified identifier for the Zonal
          Project.

          To set the zonal_project attribute:
          + provide the argument zonal_project on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        For resources [location, zonal_project, zone], provides fallback value
        for resource location attribute. When the resource's full URI path is
        not provided, location will fallback to this flag value.

     --organization=ORGANIZATION
        For resources [location, organization, zonal_project, zone], provides
        fallback value for resource organization attribute. When the resource's
        full URI path is not provided, organization will fallback to this flag
        value.

     --zone=ZONE
        For resources [zonal_project, zone], provides fallback value for
        resource zone attribute. When the resource's full URI path is not
        provided, zone will fallback to this flag value.

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

        $ gcloud alpha edge-cloud projects enable
```

### gcloud edge-cloud projects list

```text
NAME
    gcloud edge-cloud projects list - list the Google Cloud Platform projects
        enabled on Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud projects list
        (--zone=ZONE : --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the Google Cloud Platform projects enabled on Google Distributed Cloud
    zone.

EXAMPLES
    To list Google Cloud Platform projects enabled on Google Distributed Cloud
    zone sample-zone in organization sample-org and location us-central1, run:

        $ gcloud edge-cloud projects list --location=us-central1 \
            --zone=sample-zone --organization=sample-org

REQUIRED FLAGS
     Zone resource - Google Distributed Cloud zone The arguments in this group
     can be used to specify the attributes of this resource.

     This must be specified.

       --zone=ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument --zone on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument --zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization name.

          To set the organization attribute:
          + provide the argument --zone on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

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

        $ gcloud alpha edge-cloud projects list
```

### gcloud alpha edge-cloud projects describe

```text
NAME
    gcloud alpha edge-cloud projects describe - describe a Google Cloud
        Platform project enabled on Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud projects describe
        (ZONAL_PROJECT
          : --location=LOCATION --organization=ORGANIZATION --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud projects disable

```text
NAME
    gcloud alpha edge-cloud projects disable - disables a Google Cloud Platform
        project on Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud projects disable ZONAL_PROJECT [--async]
        [--location=LOCATION] [--organization=ORGANIZATION] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud projects enable

```text
NAME
    gcloud alpha edge-cloud projects enable - enables a Google Cloud Platform
        project on Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud projects enable ZONAL_PROJECT [--async]
        [--location=LOCATION] [--organization=ORGANIZATION] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud projects list

```text
NAME
    gcloud alpha edge-cloud projects list - list the Google Cloud Platform
        projects enabled on Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud projects list
        (--zone=ZONE : --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/projects (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
