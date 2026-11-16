---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/operations
---

# gcloud redis operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis operations cancel

```text
NAME
    gcloud redis operations cancel - cancel a Memorystore Redis import or
        export operation

SYNOPSIS
    gcloud redis operations cancel (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a Memorystore Redis import or export operation.

    An export operation can be canceled at any time. This does not impact the
    data or availability of an instance.

    An import operation can also be canceled. Note that the cancellation will
    result in the instance recovering with a fully flushed cache.

EXAMPLES
    To cancel an operation named my-redis-operation in the default region, run:

        $ gcloud redis operations cancel my-redis-operation

POSITIONAL ARGUMENTS
     Operation resource - Arguments and flags that specify the Memorystore
     Redis operation you want to cancel. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

       --region=REGION
          The name of the Redis region of the operation. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

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

        $ gcloud alpha redis operations cancel

        $ gcloud beta redis operations cancel
```

### gcloud redis operations describe

```text
NAME
    gcloud redis operations describe - show metadata for a Memorystore Redis
        operation

SYNOPSIS
    gcloud redis operations describe (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Redis operation given a valid
    operation name.

    This command can fail for the following reasons:
      o The operation specified does not exist.
      o The active account does not have permission to access the given
        operation.

EXAMPLES
    To display the metadata for an operation named my-redis-operation in the
    default region, run:

        $ gcloud redis operations describe my-redis-operation

POSITIONAL ARGUMENTS
     Operation resource - Arguments and flags that specify the Memorystore
     Redis operation you want to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

       --region=REGION
          The name of the Redis region of the operation. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

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

        $ gcloud alpha redis operations describe

        $ gcloud beta redis operations describe
```

### gcloud redis operations list

```text
NAME
    gcloud redis operations list - list Memorystore Redis operations

SYNOPSIS
    gcloud redis operations list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Redis operations under the specified project and region.

    To specify the maximum number of operations to list, use the --limit flag.

EXAMPLES
    To list up to five operations, run:

        $ gcloud redis operations list --limit=5

FLAGS
     Region resource - The region of the operations to display. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * set the property redis/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line;
        * set the property redis/region.

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

        $ gcloud alpha redis operations list

        $ gcloud beta redis operations list
```

### gcloud beta redis operations cancel

```text
NAME
    gcloud beta redis operations cancel - cancel a Memorystore Redis import or
        export operation

SYNOPSIS
    gcloud beta redis operations cancel (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis operations describe

```text
NAME
    gcloud beta redis operations describe - show metadata for a Memorystore
        Redis operation

SYNOPSIS
    gcloud beta redis operations describe (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis operations list

```text
NAME
    gcloud beta redis operations list - list Memorystore Redis operations

SYNOPSIS
    gcloud beta redis operations list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis operations cancel

```text
NAME
    gcloud alpha redis operations cancel - cancel a Memorystore Redis import or
        export operation

SYNOPSIS
    gcloud alpha redis operations cancel (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis operations describe

```text
NAME
    gcloud alpha redis operations describe - show metadata for a Memorystore
        Redis operation

SYNOPSIS
    gcloud alpha redis operations describe (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis operations list

```text
NAME
    gcloud alpha redis operations list - list Memorystore Redis operations

SYNOPSIS
    gcloud alpha redis operations list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
