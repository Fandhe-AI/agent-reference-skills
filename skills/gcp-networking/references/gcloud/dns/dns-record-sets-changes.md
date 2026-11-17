---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/changes
---

# gcloud dns record-sets changes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns record-sets changes describe

```text
NAME
    gcloud dns record-sets changes describe - view the details of a change

SYNOPSIS
    gcloud dns record-sets changes describe CHANGE_ID --zone=ZONE, -z ZONE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the details of the specified change.

EXAMPLES
    To display the details of a change, run:

        $ gcloud dns record-sets changes describe change_id

POSITIONAL ARGUMENTS
     CHANGE_ID
        The ID of the change you want details for.

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets changes describe

        $ gcloud beta dns record-sets changes describe
```

### gcloud dns record-sets changes list

```text
NAME
    gcloud dns record-sets changes list - view the list of changes that have
        been made to your record-sets

SYNOPSIS
    gcloud dns record-sets changes list --zone=ZONE, -z ZONE
        [--sort-order=SORT_ORDER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the list of changes that have been made to your
    record-sets.

EXAMPLES
    To see the list of changes, run:

        $ gcloud dns record-sets changes list

    To see the list of first 10 changes, run:

        $ gcloud dns record-sets changes list --limit=10

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

FLAGS
     --sort-order=SORT_ORDER
        Sort order for listing. SORT_ORDER must be one of: ascending,
        descending.

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

        $ gcloud alpha dns record-sets changes list

        $ gcloud beta dns record-sets changes list
```

### gcloud beta dns record-sets changes describe

```text
NAME
    gcloud beta dns record-sets changes describe - view the details of a change

SYNOPSIS
    gcloud beta dns record-sets changes describe CHANGE_ID --zone=ZONE, -z ZONE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns record-sets changes list

```text
NAME
    gcloud beta dns record-sets changes list - view the list of changes that
        have been made to your record-sets

SYNOPSIS
    gcloud beta dns record-sets changes list --zone=ZONE, -z ZONE
        [--sort-order=SORT_ORDER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets changes describe

```text
NAME
    gcloud alpha dns record-sets changes describe - view the details of a
        change

SYNOPSIS
    gcloud alpha dns record-sets changes describe CHANGE_ID --zone=ZONE, -z
        ZONE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets changes list

```text
NAME
    gcloud alpha dns record-sets changes list - view the list of changes that
        have been made to your record-sets

SYNOPSIS
    gcloud alpha dns record-sets changes list --zone=ZONE, -z ZONE
        [--sort-order=SORT_ORDER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud dns record-sets changes describe` and `gcloud dns record-sets changes list` examples omit `--zone`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --zone: Must be specified."). Add the required flag (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/changes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
