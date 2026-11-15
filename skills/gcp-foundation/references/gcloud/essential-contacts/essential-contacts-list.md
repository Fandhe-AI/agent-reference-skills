---
source: https://docs.cloud.google.com/sdk/gcloud/reference/essential-contacts/list
---

# gcloud essential-contacts list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud essential-contacts list

```text
NAME
    gcloud essential-contacts list - list essential contacts for a resource

SYNOPSIS
    gcloud essential-contacts list
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list the contacts set on the current project:

        $ gcloud essential-contacts list [--page_size=10] [--limit=20]

    To list the contacts set on the folder with id 456, run:

        $ gcloud essential-contacts list --folder=456 [--page_size=10] \
          [--limit=20]

    To list the contacts set on the organization with id 456, run:

        $ gcloud essential-contacts list --organization=456 \
        [--page_size=10] [--limit=20]

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          folder number where contacts are set. If neither --project, --folder,
          nor --organization are provided then the config property
          [core/project] will be used as the resource.

       --organization=ORGANIZATION
          organization number where contacts are set. If neither --project,
          --folder, nor --organization are provided then the config property
          [core/project] will be used as the resource.

       --project=PROJECT
          project number or id where contacts are set. If neither --project,
          --folder, nor --organization are provided then the config property
          [core/project] will be used as the resource.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha essential-contacts list

        $ gcloud beta essential-contacts list
```

### gcloud beta essential-contacts list

```text
NAME
    gcloud beta essential-contacts list - list essential contacts for a
        resource

SYNOPSIS
    gcloud beta essential-contacts list
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha essential-contacts list

```text
NAME
    gcloud alpha essential-contacts list - list essential contacts for a
        resource

SYNOPSIS
    gcloud alpha essential-contacts list
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/essential-contacts/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
