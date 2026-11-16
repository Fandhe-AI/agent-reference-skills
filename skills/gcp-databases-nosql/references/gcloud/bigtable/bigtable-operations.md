---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/operations
---

# gcloud bigtable operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable operations describe

```text
NAME
    gcloud bigtable operations describe - describe a Cloud Bigtable operation

SYNOPSIS
    gcloud bigtable operations describe OPERATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Bigtable operation.

EXAMPLES
    To view details for operation OPERATION_ID, run:

        $ gcloud bigtable operations describe OPERATION_ID

POSITIONAL ARGUMENTS
     Operation resource - Cloud Bigtable operation to describe. This represents
     a Cloud resource.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable operations describe

        $ gcloud beta bigtable operations describe
```

### gcloud bigtable operations list

```text
NAME
    gcloud bigtable operations list - list Cloud Bigtable operations

SYNOPSIS
    gcloud bigtable operations list [--instance=INSTANCE]
        [--return-partial-success=RETURN_PARTIAL_SUCCESS; default=True]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Bigtable operations.

EXAMPLES
    To list all operations for the default project, run:

        $ gcloud bigtable operations list

    To list all operations for instance INSTANCE_NAME, run:

        $ gcloud bigtable operations list --instance=INSTANCE_NAME

    To fail the command if any location is unreachable, run:

        $ gcloud bigtable operations list --return-partial-success=false

FLAGS
     Instance resource - The instance to list operations for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --instance=INSTANCE
        ID of the instance or fully qualified identifier for the instance.

        To set the instance attribute:
        * provide the argument --instance on the command line.

     --return-partial-success=RETURN_PARTIAL_SUCCESS; default=True
        If true, operations that are reachable are returned as normal, and
        those that are unreachable are returned in the unreachable field of the
        response. If false, the command will fail if any location is
        unreachable. Enabled by default, use --no-return-partial-success to
        disable.

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

        $ gcloud alpha bigtable operations list

        $ gcloud beta bigtable operations list
```

### gcloud beta bigtable operations describe

```text
NAME
    gcloud beta bigtable operations describe - describe a Cloud Bigtable
        operation

SYNOPSIS
    gcloud beta bigtable operations describe OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable operations list

```text
NAME
    gcloud beta bigtable operations list - list Cloud Bigtable operations

SYNOPSIS
    gcloud beta bigtable operations list [--instance=INSTANCE]
        [--return-partial-success=RETURN_PARTIAL_SUCCESS; default=True]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable operations describe

```text
NAME
    gcloud alpha bigtable operations describe - describe a Cloud Bigtable
        operation

SYNOPSIS
    gcloud alpha bigtable operations describe OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable operations list

```text
NAME
    gcloud alpha bigtable operations list - list Cloud Bigtable operations

SYNOPSIS
    gcloud alpha bigtable operations list [--instance=INSTANCE]
        [--return-partial-success=RETURN_PARTIAL_SUCCESS; default=True]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
