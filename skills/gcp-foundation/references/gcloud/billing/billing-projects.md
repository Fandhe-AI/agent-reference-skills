---
source: https://docs.cloud.google.com/sdk/gcloud/reference/billing/projects
---

# gcloud billing projects

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud billing projects describe

```text
NAME
    gcloud billing projects describe - show detailed billing information for a
        project

SYNOPSIS
    gcloud billing projects describe PROJECT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command shows billing info for a project, given its ID.

    This call can fail for the following reasons:

      o The project specified does not exist.
      o The active user does not have permission to access the given project.

EXAMPLES
    To see detailed billing information for a project my-project, run:

        $ gcloud billing projects describe my-project

POSITIONAL ARGUMENTS
     PROJECT_ID
        Specify a project id.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/v1/getting-started

NOTES
    These variants are also available:

        $ gcloud alpha billing projects describe

        $ gcloud beta billing projects describe
```

### gcloud billing projects link

```text
NAME
    gcloud billing projects link - link a project with a billing account

SYNOPSIS
    gcloud billing projects link PROJECT_ID --billing-account=ACCOUNT_ID
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command sets or updates the billing account associated with a project.

    Billing is enabled on a project when the project is linked to a valid,
    active Cloud Billing account. The billing account accrues charges for the
    usage of resources in all of the linked projects. If the project is already
    linked to a billing account, this command moves the project to the billing
    account you specify, updating the billing account that is linked to the
    project.

    Note that associating a project with a closed billing account has the same
    effect as disabling billing on the project: any paid resources in use by
    the project are shut down, and your application stops functioning. Unless
    you want to disable billing, you should always specify a valid, active
    Cloud Billing account when you run this command. Learn how to confirm the
    status of a Cloud Billing account at
    https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#billing_account_status

EXAMPLES
    To link a billing account 0X0X0X-0X0X0X-0X0X0X with a project my-project,
    run:

        $ gcloud billing projects link my-project \
            --billing-account=0X0X0X-0X0X0X-0X0X0X

POSITIONAL ARGUMENTS
     PROJECT_ID
        Specify a project id.

REQUIRED FLAGS
     --billing-account=ACCOUNT_ID
        Specify a billing account ID. Billing account IDs are of the form
        0X0X0X-0X0X0X-0X0X0X. To see available IDs, run $ gcloud billing
        accounts list.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/v1/getting-started

NOTES
    These variants are also available:

        $ gcloud alpha billing projects link

        $ gcloud beta billing projects link
```

### gcloud billing projects list

```text
NAME
    gcloud billing projects list - list all active projects associated with the
        specified billing account

SYNOPSIS
    gcloud billing projects list --billing-account=ACCOUNT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud billing projects list ACCOUNT_ID -- lists all active projects, for
    the specified billing account id.

EXAMPLES
    To list projects linked to billing account 0X0X0X-0X0X0X-0X0X0X, run:

        $ gcloud billing projects list --billing-account=0X0X0X-0X0X0X-0X0X0X

REQUIRED FLAGS
     --billing-account=ACCOUNT_ID
        Specify a billing account ID. Billing account IDs are of the form
        0X0X0X-0X0X0X-0X0X0X. To see available IDs, run $ gcloud billing
        accounts list.

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

        $ gcloud alpha billing projects list

        $ gcloud beta billing projects list
```

### gcloud billing projects unlink

```text
NAME
    gcloud billing projects unlink - unlink the account (if any) linked with a
        project

SYNOPSIS
    gcloud billing projects unlink PROJECT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command unlinks a project from its associated billing account. This
    action disables billing on the project. Any billable resources and services
    in use in your project are stopped, and your application stops functioning.
    Any costs accrued prior to disabling billing on the project are charged to
    the previously associated billing account.

    Note: To link a project to a different billing account, use the billing
    projects link command. You do not need to unlink the project first.

EXAMPLES
    To unlink the project my-project from its linked billing account, run:

        $ gcloud billing projects unlink my-project

POSITIONAL ARGUMENTS
     PROJECT_ID
        Specify a project id.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/v1/getting-started

NOTES
    These variants are also available:

        $ gcloud alpha billing projects unlink

        $ gcloud beta billing projects unlink
```

### gcloud beta billing projects describe

```text
NAME
    gcloud beta billing projects describe - show detailed billing information
        for a project

SYNOPSIS
    gcloud beta billing projects describe PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing projects link

```text
NAME
    gcloud beta billing projects link - link a project with a billing account

SYNOPSIS
    gcloud beta billing projects link PROJECT_ID --billing-account=ACCOUNT_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing projects list

```text
NAME
    gcloud beta billing projects list - list all active projects associated
        with the specified billing account

SYNOPSIS
    gcloud beta billing projects list --billing-account=ACCOUNT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing projects unlink

```text
NAME
    gcloud beta billing projects unlink - unlink the account (if any) linked
        with a project

SYNOPSIS
    gcloud beta billing projects unlink PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing projects describe

```text
NAME
    gcloud alpha billing projects describe - show detailed billing information
        for a project

SYNOPSIS
    gcloud alpha billing projects describe PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing projects link

```text
NAME
    gcloud alpha billing projects link - link a project with a billing account

SYNOPSIS
    gcloud alpha billing projects link PROJECT_ID
        (--account-id=ACCOUNT_ID | --billing-account=ACCOUNT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing projects list

```text
NAME
    gcloud alpha billing projects list - list all active projects associated
        with the specified billing account

SYNOPSIS
    gcloud alpha billing projects list
        ([ACCOUNT_ID] --billing-account=ACCOUNT_ID) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing projects unlink

```text
NAME
    gcloud alpha billing projects unlink - unlink the account (if any) linked
        with a project

SYNOPSIS
    gcloud alpha billing projects unlink PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/billing/projects (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
