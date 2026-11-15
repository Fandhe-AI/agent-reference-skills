---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/get-ancestors-iam-policy
---

# gcloud projects get-ancestors-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects get-ancestors-iam-policy

```text
NAME
    gcloud projects get-ancestors-iam-policy - get IAM policies for a project
        and its ancestors

SYNOPSIS
    gcloud projects get-ancestors-iam-policy PROJECT_ID [--include-deny]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get IAM policies for a project and its ancestors, given a project ID.

EXAMPLES
    To get IAM policies for project example-project-id-1 and its ancestors,
    run:

        $ gcloud projects get-ancestors-iam-policy example-project-id-1

POSITIONAL ARGUMENTS
     Project resource - ID for the project you want to get IAM policy for. This
     represents a Cloud resource.

     This must be specified.

       PROJECT_ID
          ID of the project or fully qualified identifier for the project.

          To set the project_id attribute:
          + provide the argument project_id on the command line.

FLAGS
     --include-deny
        Include deny policies on the project and its ancestors in the result

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

        $ gcloud alpha projects get-ancestors-iam-policy

        $ gcloud beta projects get-ancestors-iam-policy
```

### gcloud beta projects get-ancestors-iam-policy

```text
NAME
    gcloud beta projects get-ancestors-iam-policy - get IAM policies for a
        project and its ancestors

SYNOPSIS
    gcloud beta projects get-ancestors-iam-policy PROJECT_ID [--include-deny]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects get-ancestors-iam-policy

```text
NAME
    gcloud alpha projects get-ancestors-iam-policy - get IAM policies for a
        project and its ancestors

SYNOPSIS
    gcloud alpha projects get-ancestors-iam-policy PROJECT_ID [--include-deny]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/get-ancestors-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
