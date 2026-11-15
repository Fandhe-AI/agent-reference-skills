---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/analyze-org-policy-governed-assets
---

# gcloud asset analyze-org-policy-governed-assets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud asset analyze-org-policy-governed-assets

```text
NAME
    gcloud asset analyze-org-policy-governed-assets - analyze organization
        policies governed assets under a scope

SYNOPSIS
    gcloud asset analyze-org-policy-governed-assets --constraint=CONSTRAINT
        --scope=SCOPE [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Analyze organization policies governed assets under a scope.

EXAMPLES
    To list 10 assets governed by a constraint in an organization, run:

        $ gcloud asset analyze-org-policy-governed-assets \
            --scope=organizations/YOUR_ORG_ID \
            --constraint=YOUR_CONSTRAINT_NAME --limit=10

REQUIRED FLAGS
     --constraint=CONSTRAINT
        The name of the constraint to analyze organization policies for. The
        response only contains analyzed organization policies for the provided
        constraint.

        Examples:

        * organizations/{ORGANIZATION_NUMBER}/customConstraints/{CUSTOM_CONSTRAINT_NAME}
          for a user-defined custom constraint.
        * organizations/{ORGANIZATION_NUMBER}/constraints/{CANNED_CONSTRAINT_NAME}
          for a gcp-service-defined canned constraint.

     --scope=SCOPE
        Scope can only be an organization. The analysis is limited to the Cloud
        organization policies and assets within this scope. The caller must be
        granted the cloudasset.assets.searchAllResources and
        cloudasset.assets.searchAllIamPolicies permission on the desired scope.

        The allowed values are:

        * organizations/{ORGANIZATION_NUMBER} (e.g. organizations/123456)

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
    This variant is also available:

        $ gcloud beta asset analyze-org-policy-governed-assets
```

### gcloud beta asset analyze-org-policy-governed-assets

```text
NAME
    gcloud beta asset analyze-org-policy-governed-assets - analyze organization
        policies governed assets under a scope

SYNOPSIS
    gcloud beta asset analyze-org-policy-governed-assets
        --constraint=CONSTRAINT --scope=SCOPE [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/analyze-org-policy-governed-assets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
