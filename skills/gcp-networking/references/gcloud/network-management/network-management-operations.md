---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/operations
---

# gcloud network-management operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-management operations describe

```text
NAME
    gcloud network-management operations describe - describe a Network
        Management operation

SYNOPSIS
    gcloud network-management operations describe OPERATION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Network Management operation given a valid operation name.

EXAMPLES
    The following command describes an operation called operation-12345:

        $ gcloud network-management operations describe operation-12345

POSITIONAL ARGUMENTS
     Operation resource - Name of the Network Management operation you want to
     describe. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management operations describe
```

### gcloud network-management operations list

```text
NAME
    gcloud network-management operations list - list Network Management
        operations

SYNOPSIS
    gcloud network-management operations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Network Management operations in the specified project.

    You can specify the maximum number of operations to list using the --limit
    flag.

EXAMPLES
    The following command lists a maximum of five operations:

        $ gcloud network-management operations list --limit=5

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
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management operations list
```

### gcloud beta network-management operations describe

```text
NAME
    gcloud beta network-management operations describe - describe a Network
        Management operation

SYNOPSIS
    gcloud beta network-management operations describe OPERATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management operations list

```text
NAME
    gcloud beta network-management operations list - list Network Management
        operations

SYNOPSIS
    gcloud beta network-management operations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
