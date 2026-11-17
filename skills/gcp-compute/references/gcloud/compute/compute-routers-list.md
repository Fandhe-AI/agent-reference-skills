---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/list
---

# gcloud compute routers list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers list

```text
NAME
    gcloud compute routers list - list Google Compute Engine routers

SYNOPSIS
    gcloud compute routers list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--regions=REGION,[REGION,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers list displays all Google Compute Engine routers in a
    project.

    By default, routers from all regions are listed. The results can be
    narrowed down using a filter: --filter="region:( REGION ... )".

EXAMPLES
    To list all routers in a project in table form, run:

        $ gcloud compute routers list

    To list the URIs of all routers in a project, run:

        $ gcloud compute routers list --uri

    To list all routers in the us-central1 and europe-west1 regions, run:

        $ gcloud compute routers list \
            --filter="region:( us-central1 europe-west1 )"

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --regions=REGION,[REGION,...]
        If provided, only resources from the given regions are queried.

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

        $ gcloud alpha compute routers list

        $ gcloud beta compute routers list
```

### gcloud beta compute routers list

```text
NAME
    gcloud beta compute routers list - list Google Compute Engine routers

SYNOPSIS
    gcloud beta compute routers list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--regions=REGION,[REGION,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers list

```text
NAME
    gcloud alpha compute routers list - list Google Compute Engine routers

SYNOPSIS
    gcloud alpha compute routers list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--regions=REGION,[REGION,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute routers list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute routers list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
