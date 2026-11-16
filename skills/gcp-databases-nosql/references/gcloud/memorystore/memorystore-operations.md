---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/operations
---

# gcloud memorystore operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore operations cancel

```text
NAME
    gcloud memorystore operations cancel - cancel a Memorystore operation

SYNOPSIS
    gcloud memorystore operations cancel (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a Memorystore operation.

EXAMPLES
    To cancel operation my-operation in project my-project and location
    us-central1, run:

        $ gcloud memorystore operations cancel my-operation \
            --project=my-project --location=us-central1

POSITIONAL ARGUMENTS
     Operation resource - The Memorystore operation to cancel. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha memorystore operations cancel

        $ gcloud beta memorystore operations cancel
```

### gcloud memorystore operations delete

```text
NAME
    gcloud memorystore operations delete - delete a Memorystore operation

SYNOPSIS
    gcloud memorystore operations delete (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Memorystore operation.

EXAMPLES
    To delete operation my-operation in project my-project and location
    us-central1, run:

        $ gcloud memorystore operations delete my-operation \
            --project=my-project --location=us-central1

POSITIONAL ARGUMENTS
     Operation resource - The Memorystore operation to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha memorystore operations delete

        $ gcloud beta memorystore operations delete
```

### gcloud memorystore operations describe

```text
NAME
    gcloud memorystore operations describe - describe a Memorystore operation

SYNOPSIS
    gcloud memorystore operations describe (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Memorystore operation.

EXAMPLES
    To describe operation my-operation in project my-project and location
    us-central1, run:

        $ gcloud memorystore operations describe my-operation \
            --project=my-project --location=us-central1

POSITIONAL ARGUMENTS
     Operation resource - The Memorystore operation to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha memorystore operations describe

        $ gcloud beta memorystore operations describe
```

### gcloud memorystore operations list

```text
NAME
    gcloud memorystore operations list - list Memorystore operations

SYNOPSIS
    gcloud memorystore operations list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Memorystore operations.

EXAMPLES
    To list Memorystore operations in project my-project and location
    us-central1, run:

        $ gcloud memorystore operations list --project=my-project \
            --location=us-central1

REQUIRED FLAGS
     Location resource - The parent collection of the Memorystore operations.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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

        $ gcloud alpha memorystore operations list

        $ gcloud beta memorystore operations list
```

### gcloud beta memorystore operations cancel

```text
NAME
    gcloud beta memorystore operations cancel - cancel a Memorystore operation

SYNOPSIS
    gcloud beta memorystore operations cancel (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore operations delete

```text
NAME
    gcloud beta memorystore operations delete - delete a Memorystore operation

SYNOPSIS
    gcloud beta memorystore operations delete (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore operations describe

```text
NAME
    gcloud beta memorystore operations describe - describe a Memorystore
        operation

SYNOPSIS
    gcloud beta memorystore operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore operations list

```text
NAME
    gcloud beta memorystore operations list - list Memorystore operations

SYNOPSIS
    gcloud beta memorystore operations list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore operations cancel

```text
NAME
    gcloud alpha memorystore operations cancel - cancel a Memorystore operation

SYNOPSIS
    gcloud alpha memorystore operations cancel
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore operations delete

```text
NAME
    gcloud alpha memorystore operations delete - delete a Memorystore operation

SYNOPSIS
    gcloud alpha memorystore operations delete
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore operations describe

```text
NAME
    gcloud alpha memorystore operations describe - describe a Memorystore
        operation

SYNOPSIS
    gcloud alpha memorystore operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore operations list

```text
NAME
    gcloud alpha memorystore operations list - list Memorystore operations

SYNOPSIS
    gcloud alpha memorystore operations list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
