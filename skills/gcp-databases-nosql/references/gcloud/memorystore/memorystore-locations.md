---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/locations
---

# gcloud memorystore locations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore locations describe

```text
NAME
    gcloud memorystore locations describe - show metadata for a Memorystore for
        Valkey location

SYNOPSIS
    gcloud memorystore locations describe LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Memorystore for Valkey location
    given a valid location name.

    This command can fail for the following reasons:
      o The location specified does not exist.
      o The active account does not have permission to access the given
        location.

EXAMPLES
    To display the metadata for the location us-central1, run:

        $ gcloud memorystore locations describe us-central1

POSITIONAL ARGUMENTS
     Location resource - Arguments and flags that specify the Memorystore for
     Valkey location you want to describe. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore locations describe

        $ gcloud beta memorystore locations describe
```

### gcloud memorystore locations list

```text
NAME
    gcloud memorystore locations list - list Memorystore for Valkey locations

SYNOPSIS
    gcloud memorystore locations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all locations where Memorystore for Valkey API is available.

EXAMPLES
    To list all the locations where Memorystore for Valkey instances can be
    created, run:

        $ gcloud memorystore locations list

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
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore locations list

        $ gcloud beta memorystore locations list
```

### gcloud beta memorystore locations describe

```text
NAME
    gcloud beta memorystore locations describe - show metadata for a
        Memorystore for Valkey location

SYNOPSIS
    gcloud beta memorystore locations describe LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore locations list

```text
NAME
    gcloud beta memorystore locations list - list Memorystore for Valkey
        locations

SYNOPSIS
    gcloud beta memorystore locations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore locations describe

```text
NAME
    gcloud alpha memorystore locations describe - show metadata for a
        Memorystore for Valkey location

SYNOPSIS
    gcloud alpha memorystore locations describe LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore locations list

```text
NAME
    gcloud alpha memorystore locations list - list Memorystore for Valkey
        locations

SYNOPSIS
    gcloud alpha memorystore locations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/locations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
