---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/locations
---

# gcloud filestore locations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore locations describe

```text
NAME
    gcloud filestore locations describe - describe a Filestore location

SYNOPSIS
    gcloud filestore locations describe ZONE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Filestore location.

EXAMPLES
    The following command shows the details for the Filestore location named
    NAME.

        $ gcloud filestore locations describe NAME

POSITIONAL ARGUMENTS
     Zone resource - The location to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha filestore locations describe

        $ gcloud beta filestore locations describe
```

### gcloud filestore locations list

```text
NAME
    gcloud filestore locations list - list all Filestore locations

SYNOPSIS
    gcloud filestore locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Filestore locations.

EXAMPLES
    The following command lists a maximum of five Filestore locations sorted
    alphabetically by name in descending order:

        $ gcloud filestore locations list --limit=5 --sort-by=~name

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

        $ gcloud alpha filestore locations list

        $ gcloud beta filestore locations list
```

### gcloud beta filestore locations describe

```text
NAME
    gcloud beta filestore locations describe - describe a Filestore location

SYNOPSIS
    gcloud beta filestore locations describe ZONE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore locations list

```text
NAME
    gcloud beta filestore locations list - list all Filestore locations

SYNOPSIS
    gcloud beta filestore locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore locations describe

```text
NAME
    gcloud alpha filestore locations describe - describe a Filestore location

SYNOPSIS
    gcloud alpha filestore locations describe ZONE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore locations list

```text
NAME
    gcloud alpha filestore locations list - list all Filestore locations

SYNOPSIS
    gcloud alpha filestore locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/locations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
