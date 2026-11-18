---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/locations
---

# gcloud logging locations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging locations describe

```text
NAME
    gcloud logging locations describe - display information about a location

SYNOPSIS
    gcloud logging locations describe LOCATION_ID
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays information about a location.

EXAMPLES
    To describe a location in a project, run:

        $ gcloud logging locations describe my-location

POSITIONAL ARGUMENTS
     LOCATION_ID
        Id of the location to describe.

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the location to describe.

       --folder=FOLDER_ID
          Folder of the location to describe.

       --organization=ORGANIZATION_ID
          Organization of the location to describe.

       --project=PROJECT_ID
          Project of the location to describe.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging locations describe

        $ gcloud beta logging locations describe
```

### gcloud logging locations list

```text
NAME
    gcloud logging locations list - list the availables location

SYNOPSIS
    gcloud logging locations list
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the available locations for Cloud Logging.

EXAMPLES
    To list the available locations, run:

        $ gcloud logging locations list

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the locations to list.

       --folder=FOLDER_ID
          Folder of the locations to list.

       --organization=ORGANIZATION_ID
          Organization of the locations to list.

       --project=PROJECT_ID
          Project of the locations to list.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

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

        $ gcloud alpha logging locations list

        $ gcloud beta logging locations list
```

### gcloud beta logging locations describe

```text
NAME
    gcloud beta logging locations describe - display information about a
        location

SYNOPSIS
    gcloud beta logging locations describe LOCATION_ID
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging locations list

```text
NAME
    gcloud beta logging locations list - list the availables location

SYNOPSIS
    gcloud beta logging locations list
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging locations describe

```text
NAME
    gcloud alpha logging locations describe - display information about a
        location

SYNOPSIS
    gcloud alpha logging locations describe LOCATION_ID
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging locations list

```text
NAME
    gcloud alpha logging locations list - list the availables location

SYNOPSIS
    gcloud alpha logging locations list
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/locations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
