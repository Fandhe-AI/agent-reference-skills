---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/regions
---

# gcloud redis regions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis regions describe

```text
NAME
    gcloud redis regions describe - show metadata for a Memorystore Redis
        region

SYNOPSIS
    gcloud redis regions describe REGION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Redis region given a valid region
    name.

    This command can fail for the following reasons:
      o The region specified does not exist.
      o The active account does not have permission to access the given
        region.

EXAMPLES
    To display the metadata for the region us-central1, run:

        $ gcloud redis regions describe us-central1

POSITIONAL ARGUMENTS
     Region resource - Arguments and flags that specify the Memorystore Redis
     region you want to describe. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
          + provide the argument region on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis regions describe

        $ gcloud beta redis regions describe
```

### gcloud redis regions list

```text
NAME
    gcloud redis regions list - list Memorystore Redis regions

SYNOPSIS
    gcloud redis regions list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all regions where Memorystore Redis API is available.

EXAMPLES
    To list all the regions where Redis instances can be created, run:

        $ gcloud redis regions list

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis regions list

        $ gcloud beta redis regions list
```

### gcloud beta redis regions describe

```text
NAME
    gcloud beta redis regions describe - show metadata for a Memorystore Redis
        region

SYNOPSIS
    gcloud beta redis regions describe REGION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis regions list

```text
NAME
    gcloud beta redis regions list - list Memorystore Redis regions

SYNOPSIS
    gcloud beta redis regions list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis regions describe

```text
NAME
    gcloud alpha redis regions describe - show metadata for a Memorystore Redis
        region

SYNOPSIS
    gcloud alpha redis regions describe REGION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis regions list

```text
NAME
    gcloud alpha redis regions list - list Memorystore Redis regions

SYNOPSIS
    gcloud alpha redis regions list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/regions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
