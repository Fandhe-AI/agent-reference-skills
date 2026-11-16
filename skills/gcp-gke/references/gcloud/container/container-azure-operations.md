---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/operations
---

# gcloud container azure operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container azure operations cancel

```text
NAME
    gcloud container azure operations cancel - cancel an operation

SYNOPSIS
    gcloud container azure operations cancel
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Cancel an operation.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To cancel an operation in location us-west1, run:

        $ gcloud container azure operations cancel OPERATION_ID \
            --location=us-west1

POSITIONAL ARGUMENTS
     Operation resource - operation to cancel. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument operation_id on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION_ID
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation_id on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the operation.

          To set the location attribute:
          + provide the argument operation_id on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure operations cancel
```

### gcloud container azure operations describe

```text
NAME
    gcloud container azure operations describe - describe an operation

SYNOPSIS
    gcloud container azure operations describe
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Describe an operation.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To describe an operation in location us-west1, run:

        $ gcloud container azure operations describe OPERATION_ID \
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

          To set the operation attribute:
          + provide the argument operation_id on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the operation.

          To set the location attribute:
          + provide the argument operation_id on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure operations describe
```

### gcloud container azure operations list

```text
NAME
    gcloud container azure operations list - list operations

SYNOPSIS
    gcloud container azure operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) List operations.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To list all operations in location us-west1, run:

        $ gcloud container azure operations list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list operations. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_azure/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_azure/location.

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
    This variant is also available:

        $ gcloud alpha container azure operations list
```

### gcloud container azure operations wait

```text
NAME
    gcloud container azure operations wait - wait for an operation to complete

SYNOPSIS
    gcloud container azure operations wait (OPERATION_ID : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Wait for an operation to complete.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To wait for an operation in location us-west1 to complete, run:

        $ gcloud container azure operations wait OPERATION_ID \
            --location=us-west1

POSITIONAL ARGUMENTS
     Operation resource - operation to wait for. The arguments in this group
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

          To set the operation attribute:
          + provide the argument operation_id on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the operation.

          To set the location attribute:
          + provide the argument operation_id on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure operations wait
```

### gcloud alpha container azure operations cancel

```text
NAME
    gcloud alpha container azure operations cancel - cancel an operation

SYNOPSIS
    gcloud alpha container azure operations cancel
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure operations describe

```text
NAME
    gcloud alpha container azure operations describe - describe an operation

SYNOPSIS
    gcloud alpha container azure operations describe
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure operations list

```text
NAME
    gcloud alpha container azure operations list - list operations

SYNOPSIS
    gcloud alpha container azure operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure operations wait

```text
NAME
    gcloud alpha container azure operations wait - wait for an operation to
        complete

SYNOPSIS
    gcloud alpha container azure operations wait
        (OPERATION_ID : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud container azure operations cancel`: "Cancel an operation. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure operations describe`: "Describe an operation. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure operations list`: "List operations. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure operations wait`: "Wait for an operation to complete. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
