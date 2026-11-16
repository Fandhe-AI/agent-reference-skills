---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/operations
---

# gcloud container vmware operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container vmware operations describe

```text
NAME
    gcloud container vmware operations describe - describe an operation

SYNOPSIS
    gcloud container vmware operations describe
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an operation.

EXAMPLES
    To describe an operation in location us-west1, run:

        $ gcloud container vmware operations describe OPERATION_ID \
            --location=us-west1

POSITIONAL ARGUMENTS
     Operation resource - operation to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument operation_id on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION_ID
          ID of the operation or fully qualified identifier for the operation.

          To set the name attribute:
          + provide the argument operation_id on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the operation.

          To set the location attribute:
          + provide the argument operation_id on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_vmware/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware operations describe

        $ gcloud beta container vmware operations describe
```

### gcloud container vmware operations list

```text
NAME
    gcloud container vmware operations list - list operations

SYNOPSIS
    gcloud container vmware operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List operations.

EXAMPLES
    To list all operations in location us-west1, run:

        $ gcloud container vmware operations list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list operations. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_vmware/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_vmware/location.

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

        $ gcloud alpha container vmware operations list

        $ gcloud beta container vmware operations list
```

### gcloud container vmware operations wait

```text
NAME
    gcloud container vmware operations wait - poll an operation for completion

SYNOPSIS
    gcloud container vmware operations wait
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Poll an operation for completion.

EXAMPLES
    To wait for an operation in location us-west1 to complete, run:

        $ gcloud container vmware operations wait OPERATION_ID \
            --location=us-west1

POSITIONAL ARGUMENTS
     Operation resource - operation to wait for completion. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument operation_id on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION_ID
          ID of the operation or fully qualified identifier for the operation.

          To set the name attribute:
          + provide the argument operation_id on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the operation.

          To set the location attribute:
          + provide the argument operation_id on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_vmware/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware operations wait

        $ gcloud beta container vmware operations wait
```

### gcloud beta container vmware operations describe

```text
NAME
    gcloud beta container vmware operations describe - describe an operation

SYNOPSIS
    gcloud beta container vmware operations describe
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware operations list

```text
NAME
    gcloud beta container vmware operations list - list operations

SYNOPSIS
    gcloud beta container vmware operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware operations wait

```text
NAME
    gcloud beta container vmware operations wait - poll an operation for
        completion

SYNOPSIS
    gcloud beta container vmware operations wait
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware operations describe

```text
NAME
    gcloud alpha container vmware operations describe - describe an operation

SYNOPSIS
    gcloud alpha container vmware operations describe
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware operations list

```text
NAME
    gcloud alpha container vmware operations list - list operations

SYNOPSIS
    gcloud alpha container vmware operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware operations wait

```text
NAME
    gcloud alpha container vmware operations wait - poll an operation for
        completion

SYNOPSIS
    gcloud alpha container vmware operations wait
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
