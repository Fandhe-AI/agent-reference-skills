---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/links
---

# gcloud logging links

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging links create

```text
NAME
    gcloud logging links create - create a linked dataset on an analytics log
        bucket

SYNOPSIS
    gcloud logging links create LINK_ID --bucket=BUCKET --location=LOCATION
        [--async] [--description=DESCRIPTION]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a linked dataset for a log bucket.

EXAMPLES
    To create a linked dataset in a project, run:

        $ gcloud logging links create my-link --bucket=my-bucket \
           --location=global

POSITIONAL ARGUMENTS
     LINK_ID
        ID of the linked dataset to create.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of the bucket that will hold the linked dataset

     --location=LOCATION
        Location of the bucket that will hold the linked datasert.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A textual description for the linked dataset.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the linked dataset to create.

       --folder=FOLDER_ID
          Folder of the linked dataset to create.

       --organization=ORGANIZATION_ID
          Organization of the linked dataset to create.

       --project=PROJECT_ID
          Project of the linked dataset to create.

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

        $ gcloud alpha logging links create

        $ gcloud beta logging links create
```

### gcloud logging links delete

```text
NAME
    gcloud logging links delete - delete a linked dataset

SYNOPSIS
    gcloud logging links delete LINK_ID --bucket=BUCKET --location=LOCATION
        [--async]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a bucket's linked dataset.

EXAMPLES
    To delete a bucket's linked dataset, run:

        $ gcloud logging links delete my-link --bucket=my-bucket \
           --location=global

POSITIONAL ARGUMENTS
     LINK_ID
        ID of the linked dataset to delete.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of bucket

     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the linked dataset to delete.

       --folder=FOLDER_ID
          Folder of the linked dataset to delete.

       --organization=ORGANIZATION_ID
          Organization of the linked dataset to delete.

       --project=PROJECT_ID
          Project of the linked dataset to delete.

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

        $ gcloud alpha logging links delete

        $ gcloud beta logging links delete
```

### gcloud logging links describe

```text
NAME
    gcloud logging links describe - display information about a linked dataset

SYNOPSIS
    gcloud logging links describe LINK_ID --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display information about a linked dataset.

EXAMPLES
    To describe a linked dataset in a project, run:

        $ gcloud logging links describe my-link --bucket=my-bucket \
           --location=global

POSITIONAL ARGUMENTS
     LINK_ID
        Id of the linked dataset to describe.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of bucket

     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the linked dataset to describe.

       --folder=FOLDER_ID
          Folder of the linked dataset to describe.

       --organization=ORGANIZATION_ID
          Organization of the linked dataset to describe.

       --project=PROJECT_ID
          Project of the linked dataset to describe.

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

        $ gcloud alpha logging links describe

        $ gcloud beta logging links describe
```

### gcloud logging links list

```text
NAME
    gcloud logging links list - list created linked datasets on the specified
        bucket

SYNOPSIS
    gcloud logging links list --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the linked datasets created for a bucket.

EXAMPLES
    To list the linked datasets created for a bucket, run:

        $ gcloud logging links list

REQUIRED FLAGS
     --bucket=BUCKET
        ID of bucket

     --location=LOCATION
        Location of the specified bucket

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the linked datasets to list.

       --folder=FOLDER_ID
          Folder of the linked datasets to list.

       --organization=ORGANIZATION_ID
          Organization of the linked datasets to list.

       --project=PROJECT_ID
          Project of the linked datasets to list.

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

        $ gcloud alpha logging links list

        $ gcloud beta logging links list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud logging links list \
    --bucket=my-bucket \
    --location=global
```

### gcloud beta logging links create

```text
NAME
    gcloud beta logging links create - create a linked dataset on an analytics
        log bucket

SYNOPSIS
    gcloud beta logging links create LINK_ID --bucket=BUCKET
        --location=LOCATION [--async] [--description=DESCRIPTION]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging links delete

```text
NAME
    gcloud beta logging links delete - delete a linked dataset

SYNOPSIS
    gcloud beta logging links delete LINK_ID --bucket=BUCKET
        --location=LOCATION [--async]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging links describe

```text
NAME
    gcloud beta logging links describe - display information about a linked
        dataset

SYNOPSIS
    gcloud beta logging links describe LINK_ID --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging links list

```text
NAME
    gcloud beta logging links list - list created linked datasets on the
        specified bucket

SYNOPSIS
    gcloud beta logging links list --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging links create

```text
NAME
    gcloud alpha logging links create - create a linked dataset on an analytics
        log bucket

SYNOPSIS
    gcloud alpha logging links create LINK_ID --bucket=BUCKET
        --location=LOCATION [--async] [--description=DESCRIPTION]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging links delete

```text
NAME
    gcloud alpha logging links delete - delete a linked dataset

SYNOPSIS
    gcloud alpha logging links delete LINK_ID --bucket=BUCKET
        --location=LOCATION [--async]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging links describe

```text
NAME
    gcloud alpha logging links describe - display information about a linked
        dataset

SYNOPSIS
    gcloud alpha logging links describe LINK_ID --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging links list

```text
NAME
    gcloud alpha logging links list - list created linked datasets on the
        specified bucket

SYNOPSIS
    gcloud alpha logging links list --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example omits `--bucket` and `--location`, which the SYNOPSIS requires (`gcloud logging links list --bucket=BUCKET --location=LOCATION`; gcloud 593.0.0: "argument --bucket --location: Must be specified"); the runnable form adds `--bucket=my-bucket --location=global`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/links (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
