---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/list-preconfigured-expression-sets
---

# gcloud compute security-policies list-preconfigured-expression-sets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute security-policies list-preconfigured-expression-sets

```text
NAME
    gcloud compute security-policies list-preconfigured-expression-sets - list
        all available preconfigured expression sets

SYNOPSIS
    gcloud compute security-policies list-preconfigured-expression-sets
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies list-preconfigured-expression-sets lists
    all available preconfigured expression sets that can be used with the Cloud
    Armor rules language.

EXAMPLES
    To list all current preconfigured expressions sets run this:

        $ gcloud compute security-policies list-preconfigured-expression-sets

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

        $ gcloud alpha compute security-policies \
            list-preconfigured-expression-sets

        $ gcloud beta compute security-policies \
            list-preconfigured-expression-sets
```

### gcloud beta compute security-policies list-preconfigured-expression-sets

```text
NAME
    gcloud beta compute security-policies list-preconfigured-expression-sets -
        list all available preconfigured expression sets

SYNOPSIS
    gcloud beta compute security-policies list-preconfigured-expression-sets
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies list-preconfigured-expression-sets

```text
NAME
    gcloud alpha compute security-policies list-preconfigured-expression-sets -
        list all available preconfigured expression sets

SYNOPSIS
    gcloud alpha compute security-policies list-preconfigured-expression-sets
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/list-preconfigured-expression-sets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
