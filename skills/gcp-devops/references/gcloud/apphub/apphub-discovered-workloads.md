---
source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/discovered-workloads
---

# gcloud apphub discovered-workloads

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud apphub discovered-workloads describe

```text
NAME
    gcloud apphub discovered-workloads describe - describe an Apphub discovered
        workload

SYNOPSIS
    gcloud apphub discovered-workloads describe
        (DISCOVERED_WORKLOAD : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Apphub discovered workload.

EXAMPLES
    To describe the DiscoveredWorkload my-discovered-workload in location
    us-east1, run:

        $ gcloud apphub discovered-workloads describe \
            my-discovered-workload --location=us-east1

POSITIONAL ARGUMENTS
     DiscoveredWorkload resource - The Discovered Workload ID. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument discovered_workload on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DISCOVERED_WORKLOAD
          ID of the discoveredWorkload or fully qualified identifier for the
          discoveredWorkload.

          To set the discovered_workload attribute:
          + provide the argument discovered_workload on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the discoveredWorkload.

          To set the location attribute:
          + provide the argument discovered_workload on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub discovered-workloads describe
```

### gcloud apphub discovered-workloads list

```text
NAME
    gcloud apphub discovered-workloads list - list Apphub discovered workloads
        that could be added to an application

SYNOPSIS
    gcloud apphub discovered-workloads list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Apphub discovered workloads that could be added to an application.

EXAMPLES
    To list DiscoveredWorkloads that could be added to an application in
    location us-east1, run:

        $ gcloud apphub discovered-workloads list --location=us-east1

REQUIRED FLAGS
     Location resource - Location. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

NOTES
    This variant is also available:

        $ gcloud alpha apphub discovered-workloads list
```

### gcloud apphub discovered-workloads lookup

```text
NAME
    gcloud apphub discovered-workloads lookup - lookup an Apphub discovered
        workload with URI

SYNOPSIS
    gcloud apphub discovered-workloads lookup --location=LOCATION --uri=URI
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lookup an Apphub discovered workload with URI.

EXAMPLES
    To lookup a discovered workload with uri my-workload-uri in location
    us-east1 run:

        $ gcloud apphub discovered-workloads lookup --location=us-east1 \
             --uri=my-workload-uri

REQUIRED FLAGS
     Location resource - Location. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

     --uri=URI
        Google Cloud Platform resource URI to look up workload for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub discovered-workloads lookup
```

### gcloud alpha apphub discovered-workloads describe

```text
NAME
    gcloud alpha apphub discovered-workloads describe - describe an Apphub
        discovered workload

SYNOPSIS
    gcloud alpha apphub discovered-workloads describe
        (DISCOVERED_WORKLOAD : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub discovered-workloads find-unregistered

```text
NAME
    gcloud alpha apphub discovered-workloads find-unregistered - list
        unregistered Apphub discovered workloads

SYNOPSIS
    gcloud alpha apphub discovered-workloads find-unregistered
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub discovered-workloads list

```text
NAME
    gcloud alpha apphub discovered-workloads list - list Apphub discovered
        workloads

SYNOPSIS
    gcloud alpha apphub discovered-workloads list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub discovered-workloads lookup

```text
NAME
    gcloud alpha apphub discovered-workloads lookup - lookup an Apphub
        discovered workload with URI

SYNOPSIS
    gcloud alpha apphub discovered-workloads lookup --location=LOCATION
        --uri=URI [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/discovered-workloads (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
