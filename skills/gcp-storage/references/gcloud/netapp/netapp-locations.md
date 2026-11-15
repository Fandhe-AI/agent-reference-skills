---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/locations
---

# gcloud netapp locations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp locations describe

```text
NAME
    gcloud netapp locations describe - describe a Cloud NetApp Files location

SYNOPSIS
    gcloud netapp locations describe LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud NetApp Files location.

EXAMPLES
    The following command shows the details for the NetApp Files location named
    NAME.

        $ gcloud netapp locations describe NAME

POSITIONAL ARGUMENTS
     Location resource - The location to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp locations describe

        $ gcloud beta netapp locations describe
```

### gcloud netapp locations list

```text
NAME
    gcloud netapp locations list - list all Cloud NetApp Files locations

SYNOPSIS
    gcloud netapp locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all Cloud NetApp Files locations.

EXAMPLES
    The following command lists NetApp Files locations.

        $ gcloud netapp locations list

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

        $ gcloud alpha netapp locations list

        $ gcloud beta netapp locations list
```

### gcloud beta netapp locations describe

```text
NAME
    gcloud beta netapp locations describe - describe a Cloud NetApp Files
        location

SYNOPSIS
    gcloud beta netapp locations describe LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp locations list

```text
NAME
    gcloud beta netapp locations list - list all Cloud NetApp Files locations

SYNOPSIS
    gcloud beta netapp locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp locations describe

```text
NAME
    gcloud alpha netapp locations describe - describe a Cloud NetApp Files
        location

SYNOPSIS
    gcloud alpha netapp locations describe LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp locations list

```text
NAME
    gcloud alpha netapp locations list - list all Cloud NetApp Files locations

SYNOPSIS
    gcloud alpha netapp locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/locations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
