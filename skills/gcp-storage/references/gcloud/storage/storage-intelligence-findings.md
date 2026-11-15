---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/intelligence-findings
---

# gcloud storage intelligence-findings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage intelligence-findings describe

```text
NAME
    gcloud storage intelligence-findings describe - intelligence finding
        description

SYNOPSIS
    gcloud storage intelligence-findings describe FINDING_ID
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves detailed information about a specific intelligence finding by its
    ID.

EXAMPLES
    To describe intelligence finding with ID '123':

        $ gcloud storage intelligence-findings describe 123

POSITIONAL ARGUMENTS
     FINDING_ID
        The ID of the intelligence finding to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage intelligence-findings describe
```

### gcloud storage intelligence-findings list

```text
NAME
    gcloud storage intelligence-findings list - intelligence findings list

SYNOPSIS
    gcloud storage intelligence-findings list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists intelligence findings associated with a project.

EXAMPLES
    To list intelligence findings:

        $ gcloud storage intelligence-findings list

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

        $ gcloud alpha storage intelligence-findings list
```

### gcloud storage intelligence-findings revisions describe

```text
NAME
    gcloud storage intelligence-findings revisions describe - historical
        revision description of a finding

SYNOPSIS
    gcloud storage intelligence-findings revisions describe REVISION_ID
        --finding-id=FINDING_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves a specific historical revision of an intelligence finding.

EXAMPLES
    To describe revision 'abc' for finding '123':

        $ gcloud storage intelligence-findings revisions describe abc \
          --finding-id=123

POSITIONAL ARGUMENTS
     REVISION_ID
        The ID of the revision to describe.

REQUIRED FLAGS
     --finding-id=FINDING_ID
        The ID of the intelligence finding the revision belongs to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage intelligence-findings revisions describe
```

### gcloud storage intelligence-findings revisions list

```text
NAME
    gcloud storage intelligence-findings revisions list - historical revisions
        list of a finding

SYNOPSIS
    gcloud storage intelligence-findings revisions list --finding-id=FINDING_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all historical revisions of a specific finding in reverse
    chronological order.

EXAMPLES
    To list revisions for finding '123':

        $ gcloud storage intelligence-findings revisions list \
          --finding-id=123

REQUIRED FLAGS
     --finding-id=FINDING_ID
        The ID of the intelligence finding to list revisions for.

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

        $ gcloud alpha storage intelligence-findings revisions list
```

### gcloud storage intelligence-findings summarize

```text
NAME
    gcloud storage intelligence-findings summarize - intelligence findings
        summary

SYNOPSIS
    gcloud storage intelligence-findings summarize
        [--resource-scope=RESOURCE_SCOPE]
        [--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists finding summaries for a specific container scope.

EXAMPLES
    To summarize intelligence findings for project 'my-project':

        $ gcloud storage intelligence-findings summarize --project=my-project

FLAGS
     --resource-scope=RESOURCE_SCOPE
        The resource scope for the summary. If not specified, summaries are
        aggregated at the level of the parent resource. RESOURCE_SCOPE must be
        one of: PROJECT, PARENT.

     At most one of these can be specified:

       --organization=ORGANIZATION
          The organization to scope the summary to.

       --project=PROJECT
          The project to scope the summary to.

       --sub-folder=SUB_FOLDER
          The sub-folder to scope the summary to.

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

        $ gcloud alpha storage intelligence-findings summarize
```

### gcloud alpha storage intelligence-findings describe

```text
NAME
    gcloud alpha storage intelligence-findings describe - intelligence finding
        description

SYNOPSIS
    gcloud alpha storage intelligence-findings describe FINDING_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage intelligence-findings list

```text
NAME
    gcloud alpha storage intelligence-findings list - intelligence findings
        list

SYNOPSIS
    gcloud alpha storage intelligence-findings list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage intelligence-findings revisions describe

```text
NAME
    gcloud alpha storage intelligence-findings revisions describe - historical
        revision description of a finding

SYNOPSIS
    gcloud alpha storage intelligence-findings revisions describe REVISION_ID
        --finding-id=FINDING_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage intelligence-findings revisions list

```text
NAME
    gcloud alpha storage intelligence-findings revisions list - historical
        revisions list of a finding

SYNOPSIS
    gcloud alpha storage intelligence-findings revisions list
        --finding-id=FINDING_ID [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage intelligence-findings summarize

```text
NAME
    gcloud alpha storage intelligence-findings summarize - intelligence
        findings summary

SYNOPSIS
    gcloud alpha storage intelligence-findings summarize
        [--resource-scope=RESOURCE_SCOPE]
        [--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/intelligence-findings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
