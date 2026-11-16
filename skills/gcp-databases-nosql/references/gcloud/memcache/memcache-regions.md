---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/regions
---

# gcloud memcache regions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memcache regions describe

```text
NAME
    gcloud memcache regions describe - display metadata for a Memorystore
        Memcached region

SYNOPSIS
    gcloud memcache regions describe [REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Memorystore Memcached region given a
    valid region name.

    This command can fail for the following reasons:
      o The region specified does not exist.
      o The active account does not have permission to access the given
        region.

EXAMPLES
    To display the metadata for the region us-central1, run:

        $ gcloud memcache regions describe us-central1

POSITIONAL ARGUMENTS
     Region resource - Arguments and flags that specify the Memorystore
     Memcached region to describe. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument region on the command line with a fully
        specified name;
      * set the property memcache/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [REGION]
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument region on the command line;
        * set the property memcache/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memcache/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memcache regions describe

        $ gcloud beta memcache regions describe
```

### gcloud memcache regions list

```text
NAME
    gcloud memcache regions list - list Memorystore Memcached regions

SYNOPSIS
    gcloud memcache regions list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all regions where Memorystore Memcached API is available.

EXAMPLES
    To list all the regions where you can create Memcached instances, run:

        $ gcloud memcache regions list

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
    This command uses the memcache/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memcache regions list

        $ gcloud beta memcache regions list
```

### gcloud beta memcache regions describe

```text
NAME
    gcloud beta memcache regions describe - display metadata for a Memorystore
        Memcached region

SYNOPSIS
    gcloud beta memcache regions describe [REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memcache regions list

```text
NAME
    gcloud beta memcache regions list - list Memorystore Memcached regions

SYNOPSIS
    gcloud beta memcache regions list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache regions describe

```text
NAME
    gcloud alpha memcache regions describe - display metadata for a Memorystore
        Memcached region

SYNOPSIS
    gcloud alpha memcache regions describe [REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache regions list

```text
NAME
    gcloud alpha memcache regions list - list Memorystore Memcached regions

SYNOPSIS
    gcloud alpha memcache regions list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/regions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
