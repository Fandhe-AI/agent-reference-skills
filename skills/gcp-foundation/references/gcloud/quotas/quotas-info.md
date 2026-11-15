---
source: https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info
---

# gcloud quotas info

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud quotas info describe

```text
NAME
    gcloud quotas info describe - retrieve the QuotaInfo of a quota for a
        project, folder or organization

SYNOPSIS
    gcloud quotas info describe QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To get the details about quota CpusPerProject for service
    example.googleapis.com and projects/my-project, run:

        $ gcloud quotas info describe CpusPerProject \
            --service=example.googleapis.com --project=my-project

    To get the details about quota CpusPerProject for service
    example.googleapis.com and folders/123, run:

        $ gcloud quotas info describe CpusPerProject \
            --service=example.googleapis.com --folder=123

POSITIONAL ARGUMENTS
     QUOTA_ID
        ID of the quota, which is unique within the service.

REQUIRED FLAGS
     --service=SERVICE
        Name of the service in which the quota is defined.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the quota info to describe.

       --organization=ORGANIZATION_ID
          Organization of the quota info to describe.

       --project=PROJECT_ID_OR_NUMBER
          Project of the quota info to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha quotas info describe

        $ gcloud beta quotas info describe
```

### gcloud quotas info list

```text
NAME
    gcloud quotas info list - list QuotaInfos of all quotas for a given
        project, folder or organization

SYNOPSIS
    gcloud quotas info list --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all quota info for service example.googleapis.com and
    projects/12321, run:

        $ gcloud quotas info list --service=example.googleapis.com \
            --project=12321
        $ gcloud quotas info list --service=example.googleapis.comm \
            --project=my-project-id

        To list first 100 quota info ordered alphabetically for service
        `example.googleapis.com` and `folders/123`,
        run:

        $ gcloud quotas info list --service=example.googleapis.com \
            --folder=123 --page-size=100

REQUIRED FLAGS
     --service=SERVICE
        Name of the service in which the quota is defined.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder of the quota info to list.

       --organization=ORGANIZATION_ID
          Organization of the quota info to list.

       --project=PROJECT_ID_OR_NUMBER
          Project of the quota info to list.

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

        $ gcloud alpha quotas info list

        $ gcloud beta quotas info list
```

### gcloud beta quotas info describe

```text
NAME
    gcloud beta quotas info describe - retrieve the QuotaInfo of a quota for a
        project, folder or organization

SYNOPSIS
    gcloud beta quotas info describe QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta quotas info list

```text
NAME
    gcloud beta quotas info list - list QuotaInfos of all quotas for a given
        project, folder or organization

SYNOPSIS
    gcloud beta quotas info list --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha quotas info describe

```text
NAME
    gcloud alpha quotas info describe - retrieve the QuotaInfo of a quota for a
        project, folder or organization

SYNOPSIS
    gcloud alpha quotas info describe QUOTA_ID --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha quotas info list

```text
NAME
    gcloud alpha quotas info list - list QuotaInfos of all quotas for a given
        project, folder or organization

SYNOPSIS
    gcloud alpha quotas info list --service=SERVICE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
