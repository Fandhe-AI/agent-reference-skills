---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/operations
---

# gcloud memcache operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memcache operations delete

```text
NAME
    gcloud memcache operations delete - delete a Memorystore Memcached
        operation

SYNOPSIS
    gcloud memcache operations delete (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Memorystore Memcached operation given a valid operation name.

    This command can fail for the following reasons:
      o The operation specified does not exist.
      o The active account does not have permission to access the given
        operation.

EXAMPLES
    To delete an operation named my-memcache-operation in region us-central1,
    run:

        $ gcloud memcache operations delete my-memcache-operation \
            --region=us-central1

POSITIONAL ARGUMENTS
     Operation resource - Arguments and flags that specify the Memorystore
     Memcached operation to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
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

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Memcached region of the operation. Overrides the
          default memcache/region property value for this command invocation.

          To set the region attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property memcache/region.

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

        $ gcloud alpha memcache operations delete

        $ gcloud beta memcache operations delete
```

### gcloud memcache operations describe

```text
NAME
    gcloud memcache operations describe - display metadata for a Memorystore
        Memcached operation

SYNOPSIS
    gcloud memcache operations describe (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Memorystore Memcached operation
    given a valid operation name.

    This command can fail for the following reasons:
      o The operation specified does not exist.
      o The active account does not have permission to access the given
        operation.

EXAMPLES
    To display the metadata for an operation named my-memcache-operation in
    region us-central1, run:

        $ gcloud memcache operations describe my-memcache-operation \
            --region=us-central1

POSITIONAL ARGUMENTS
     Operation resource - Arguments and flags that specify the Memorystore
     Memcached operation to describe. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
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

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Memcached region of the operation. Overrides the
          default memcache/region property value for this command invocation.

          To set the region attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property memcache/region.

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

        $ gcloud alpha memcache operations describe

        $ gcloud beta memcache operations describe
```

### gcloud memcache operations list

```text
NAME
    gcloud memcache operations list - list Memorystore Memcached operations

SYNOPSIS
    gcloud memcache operations list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Memorystore Memcached operations under the specified project and
    region.

    Specify the maximum number of operations to list using the --limit flag.

EXAMPLES
    To list all operations in region us-central1, run:

        $ gcloud memcache operations list --region=us-central1

    To list up to five operations in region us-central1, run:

        $ gcloud memcache operations list --limit=5 --region=us-central1

FLAGS
     Region resource - Region of the operations to display. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * set the property memcache/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line;
        * set the property memcache/region.

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

        $ gcloud alpha memcache operations list

        $ gcloud beta memcache operations list
```

### gcloud beta memcache operations delete

```text
NAME
    gcloud beta memcache operations delete - delete a Memorystore Memcached
        operation

SYNOPSIS
    gcloud beta memcache operations delete (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memcache operations describe

```text
NAME
    gcloud beta memcache operations describe - display metadata for a
        Memorystore Memcached operation

SYNOPSIS
    gcloud beta memcache operations describe (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memcache operations list

```text
NAME
    gcloud beta memcache operations list - list Memorystore Memcached
        operations

SYNOPSIS
    gcloud beta memcache operations list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache operations delete

```text
NAME
    gcloud alpha memcache operations delete - delete a Memorystore Memcached
        operation

SYNOPSIS
    gcloud alpha memcache operations delete (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache operations describe

```text
NAME
    gcloud alpha memcache operations describe - display metadata for a
        Memorystore Memcached operation

SYNOPSIS
    gcloud alpha memcache operations describe (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache operations list

```text
NAME
    gcloud alpha memcache operations list - list Memorystore Memcached
        operations

SYNOPSIS
    gcloud alpha memcache operations list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
