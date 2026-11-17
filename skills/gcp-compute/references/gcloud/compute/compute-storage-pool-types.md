---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/storage-pool-types
---

# gcloud compute storage-pool-types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute storage-pool-types describe

```text
NAME
    gcloud compute storage-pool-types describe - describe a storage pool type

SYNOPSIS
    gcloud compute storage-pool-types describe
        (STORAGE_POOL_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a storage pool.

EXAMPLES
    To retrieve a single storage pool type and print its properties, run the
    following command:

        $ gcloud compute storage-pool-types describe my-storage-pool

POSITIONAL ARGUMENTS
     Storage pool type resource - Name of the storage pool you want to inspect.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument storage_pool_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL_TYPE
          ID of the storage pool type or fully qualified identifier for the
          storage pool type.

          To set the storage_pool_type attribute:
          + provide the argument storage_pool_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument storage_pool_type on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute storage-pool-types describe

        $ gcloud beta compute storage-pool-types describe
```

### gcloud compute storage-pool-types list

```text
NAME
    gcloud compute storage-pool-types list - view storage pools types

SYNOPSIS
    gcloud compute storage-pool-types list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    View storage pools.

EXAMPLES
    To display all storage pool types and their locations visible the project,
    run the following command:

        $ gcloud compute storage-pool-types list

    The --filter option can be used to filter down available options. To
    display all available storage pool types in US-based zones, run the
    following command:

        $ gcloud compute storage-pool-types list --filter="zone ~ us"

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute storage-pool-types list

        $ gcloud beta compute storage-pool-types list
```

### gcloud beta compute storage-pool-types describe

```text
NAME
    gcloud beta compute storage-pool-types describe - describe a storage pool
        type

SYNOPSIS
    gcloud beta compute storage-pool-types describe
        (STORAGE_POOL_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pool-types list

```text
NAME
    gcloud beta compute storage-pool-types list - view storage pools types

SYNOPSIS
    gcloud beta compute storage-pool-types list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pool-types describe

```text
NAME
    gcloud alpha compute storage-pool-types describe - describe a storage pool
        type

SYNOPSIS
    gcloud alpha compute storage-pool-types describe
        (STORAGE_POOL_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pool-types list

```text
NAME
    gcloud alpha compute storage-pool-types list - view storage pools types

SYNOPSIS
    gcloud alpha compute storage-pool-types list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/storage-pool-types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
