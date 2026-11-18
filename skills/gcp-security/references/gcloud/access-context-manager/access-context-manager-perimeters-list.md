---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/list
---

# gcloud access-context-manager perimeters list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager perimeters list

```text
NAME
    gcloud access-context-manager perimeters list - list service perimeters

SYNOPSIS
    gcloud access-context-manager perimeters list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all service access zones in an access policy object.

FLAGS
     Policy resource - The access policy you want to list the service
     perimeters for. This represents a Cloud resource.

     --policy=POLICY
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument --policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

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

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters list

        $ gcloud beta access-context-manager perimeters list
```

### gcloud beta access-context-manager perimeters list

```text
NAME
    gcloud beta access-context-manager perimeters list - list service
        perimeters

SYNOPSIS
    gcloud beta access-context-manager perimeters list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters list

```text
NAME
    gcloud alpha access-context-manager perimeters list - list service
        perimeters

SYNOPSIS
    gcloud alpha access-context-manager perimeters list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
