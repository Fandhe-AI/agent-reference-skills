---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/operations
---

# gcloud domains registrations operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations operations describe

```text
NAME
    gcloud domains registrations operations describe - show details about a
        Cloud Domains operation

SYNOPSIS
    gcloud domains registrations operations describe OPERATION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print information about a Cloud Domains operation.

EXAMPLES
    To describe an operation operation-id, run:

        $ gcloud domains registrations operations describe operation-id

POSITIONAL ARGUMENTS
     Operation resource - The operation to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the registration attribute:
          + provide the argument operation on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations operations describe

        $ gcloud beta domains registrations operations describe
```

### gcloud domains registrations operations list

```text
NAME
    gcloud domains registrations operations list - list Cloud Domains
        operations

SYNOPSIS
    gcloud domains registrations operations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Domains operations in the project.

EXAMPLES
    To list all operations in the project, run:

        $ gcloud domains registrations operations list

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

        $ gcloud alpha domains registrations operations list

        $ gcloud beta domains registrations operations list
```

### gcloud domains registrations operations wait

```text
NAME
    gcloud domains registrations operations wait - wait for asynchronous
        operation to complete

SYNOPSIS
    gcloud domains registrations operations wait OPERATION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Wait for a specified Cloud Domains operation to complete.

EXAMPLES
    To wait for an operation operation-id, run:

        $ gcloud domains registrations operations wait operation-id

POSITIONAL ARGUMENTS
     Operation resource - The operation to wait for. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the registration attribute:
          + provide the argument operation on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations operations wait

        $ gcloud beta domains registrations operations wait
```

### gcloud beta domains registrations operations describe

```text
NAME
    gcloud beta domains registrations operations describe - show details about
        a Cloud Domains operation

SYNOPSIS
    gcloud beta domains registrations operations describe OPERATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta domains registrations operations list

```text
NAME
    gcloud beta domains registrations operations list - list Cloud Domains
        operations

SYNOPSIS
    gcloud beta domains registrations operations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta domains registrations operations wait

```text
NAME
    gcloud beta domains registrations operations wait - wait for asynchronous
        operation to complete

SYNOPSIS
    gcloud beta domains registrations operations wait OPERATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations operations describe

```text
NAME
    gcloud alpha domains registrations operations describe - show details about
        a Cloud Domains operation

SYNOPSIS
    gcloud alpha domains registrations operations describe OPERATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations operations list

```text
NAME
    gcloud alpha domains registrations operations list - list Cloud Domains
        operations

SYNOPSIS
    gcloud alpha domains registrations operations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations operations wait

```text
NAME
    gcloud alpha domains registrations operations wait - wait for asynchronous
        operation to complete

SYNOPSIS
    gcloud alpha domains registrations operations wait OPERATION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
