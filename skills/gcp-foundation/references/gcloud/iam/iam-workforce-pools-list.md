---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/list
---

# gcloud iam workforce-pools list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workforce-pools list

```text
NAME
    gcloud iam workforce-pools list - list the workforce pools for an
        organization

SYNOPSIS
    gcloud iam workforce-pools list --location=LOCATION
        --organization=ORGANIZATION [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all of the workforce pools for an organization given a valid
    organization ID.

    This command can fail for the following reasons:
      o The organization specified does not exist.
      o The active account does not have permission to access the
        organization.

EXAMPLES
    The following command lists the workforce pools for an organization with
    the ID 12345, including soft-deleted pools:

        $ gcloud iam workforce-pools list --organization=12345 \
            --location=global --show-deleted

REQUIRED FLAGS
     --location=LOCATION
        The location of the workforce pools to list.

     --organization=ORGANIZATION
        The parent organization of the workforce pools to list.

FLAGS
     --show-deleted
        Show soft-deleted workforce pools by specifying this flag.

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

        $ gcloud alpha iam workforce-pools list

        $ gcloud beta iam workforce-pools list
```

### gcloud beta iam workforce-pools list

```text
NAME
    gcloud beta iam workforce-pools list - list the workforce pools for an
        organization

SYNOPSIS
    gcloud beta iam workforce-pools list --location=LOCATION
        --organization=ORGANIZATION [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools list

```text
NAME
    gcloud alpha iam workforce-pools list - list the workforce pools for an
        organization

SYNOPSIS
    gcloud alpha iam workforce-pools list --location=LOCATION
        --organization=ORGANIZATION [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
