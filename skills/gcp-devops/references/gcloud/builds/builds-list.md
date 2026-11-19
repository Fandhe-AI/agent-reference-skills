---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/list
---

# gcloud builds list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds list

```text
NAME
    gcloud builds list - list builds

SYNOPSIS
    gcloud builds list [--ongoing] [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT; default=50] [--page-size=PAGE_SIZE; default=20]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List builds.

EXAMPLES
    To list all completed builds in the current project:

        $ gcloud builds list

    To list all builds in the current project in QUEUED or WORKING status.:

        $ gcloud builds list --ongoing

FLAGS
     --ongoing
        Only list builds that are currently QUEUED or WORKING.

     --region=REGION
        The region of the Cloud Build Service to use. Must be set to a
        supported region name (e.g. us-central1). If unset, builds/region,
        which is the default region to use when working with Cloud Build
        resources, is used. If builds/region is unset, region is set to global.
        Note: Region must be specified in 2nd gen repo; global is not
        supported.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT; default=50
        Maximum number of resources to list. The default is 50. This flag
        interacts with other flags that are applied in this order: --flatten,
        --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE; default=20
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 20.
        Paging may be applied before or after --filter and --limit depending on
        the service.

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

        $ gcloud alpha builds list

        $ gcloud beta builds list
```

### gcloud beta builds list

```text
NAME
    gcloud beta builds list - list builds

SYNOPSIS
    gcloud beta builds list [--ongoing] [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT; default=50] [--page-size=PAGE_SIZE; default=20]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds list

```text
NAME
    gcloud alpha builds list - list builds

SYNOPSIS
    gcloud alpha builds list [--ongoing] [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT; default=50]
        [--page-size=PAGE_SIZE; default=20] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
