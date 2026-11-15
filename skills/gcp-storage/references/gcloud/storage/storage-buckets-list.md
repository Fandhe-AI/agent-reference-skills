---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/list
---

# gcloud storage buckets list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage buckets list

```text
NAME
    gcloud storage buckets list - lists Cloud Storage buckets

SYNOPSIS
    gcloud storage buckets list [URLS ...] [--additional-headers=HEADER=VALUE]
        [--raw] [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Storage buckets.

EXAMPLES
    List all Google Cloud Storage buckets in default project:

        $ gcloud storage buckets list

    List buckets beginning with ``b'':

        $ gcloud storage buckets list gs://b*

    List buckets with JSON formatting, only returning the name key:

        $ gcloud storage buckets list --format="json(name)"

POSITIONAL ARGUMENTS
     [URLS ...]
        Specifies URL of buckets to List.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --raw
        Shows metadata in the format returned by the API instead of
        standardizing it.

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

        $ gcloud alpha storage buckets list
```

### gcloud alpha storage buckets list

```text
NAME
    gcloud alpha storage buckets list - lists Cloud Storage buckets

SYNOPSIS
    gcloud alpha storage buckets list [URLS ...]
        [--additional-headers=HEADER=VALUE] [--raw] [--soft-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
