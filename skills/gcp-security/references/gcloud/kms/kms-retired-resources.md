---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/retired-resources
---

# gcloud kms retired-resources

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms retired-resources describe

```text
NAME
    gcloud kms retired-resources describe - get metadata for a given retired
        resource

SYNOPSIS
    gcloud kms retired-resources describe
        (RETIRED_RESOURCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get metadata for a given retired resource.

POSITIONAL ARGUMENTS
     Retired resource resource - The KMS retired resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument retired_resource on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RETIRED_RESOURCE
          ID of the retired-resource or fully qualified identifier for the
          retired-resource.

          To set the retired-resource attribute:
          + provide the argument retired_resource on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the retired-resource.

          To set the location attribute:
          + provide the argument retired_resource on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms retired-resources describe

        $ gcloud beta kms retired-resources describe
```

### gcloud kms retired-resources list

```text
NAME
    gcloud kms retired-resources list - list the retired resources within a
        location

SYNOPSIS
    gcloud kms retired-resources list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all retired resources within the given location.

EXAMPLES
    The following command lists a maximum of five retired resources in the
    location global:

        $ gcloud kms retired-resources list --location=global --limit=5

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
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
    These variants are also available:

        $ gcloud alpha kms retired-resources list

        $ gcloud beta kms retired-resources list
```

### gcloud beta kms retired-resources describe

```text
NAME
    gcloud beta kms retired-resources describe - get metadata for a given
        retired resource

SYNOPSIS
    gcloud beta kms retired-resources describe
        (RETIRED_RESOURCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms retired-resources list

```text
NAME
    gcloud beta kms retired-resources list - list the retired resources within
        a location

SYNOPSIS
    gcloud beta kms retired-resources list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms retired-resources describe

```text
NAME
    gcloud alpha kms retired-resources describe - get metadata for a given
        retired resource

SYNOPSIS
    gcloud alpha kms retired-resources describe
        (RETIRED_RESOURCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms retired-resources list

```text
NAME
    gcloud alpha kms retired-resources list - list the retired resources within
        a location

SYNOPSIS
    gcloud alpha kms retired-resources list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/retired-resources (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
