---
source: https://docs.cloud.google.com/sdk/gcloud/reference/billing/accounts
---

# gcloud billing accounts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud billing accounts add-iam-policy-binding

```text
NAME
    gcloud billing accounts add-iam-policy-binding - add an IAM policy binding
        to a Cloud Billing account

SYNOPSIS
    gcloud billing accounts add-iam-policy-binding ACCOUNT --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to the IAM policy of a Cloud Billing account. A
    binding consists of a member and a role.

EXAMPLES
    To add someone@example.com as a Billing Account Administrator for billing
    account 123456-789876-543210, run:

        $ gcloud billing accounts add-iam-policy-binding \
            123456-789876-543210 --member='user:someone@example.com' \
            --role='roles/billing.admin'

POSITIONAL ARGUMENTS
     Account resource - Name of the Cloud Billing account for which to add the
     IAM policy binding. This represents a Cloud resource.

     This must be specified.

       ACCOUNT
          ID of the account or fully qualified identifier for the account.

          To set the account attribute:
          + provide the argument account on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/docs/apis

NOTES
    These variants are also available:

        $ gcloud alpha billing accounts add-iam-policy-binding

        $ gcloud beta billing accounts add-iam-policy-binding
```

### gcloud billing accounts describe

```text
NAME
    gcloud billing accounts describe - show metadata for a billing account

SYNOPSIS
    gcloud billing accounts describe ACCOUNT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command shows info for a billing account, given its ID.

    This call can fail for the following reasons:

      o The account specified does not exist.
      o The active user does not have permission to access the given account.

EXAMPLES
    To see details for billing account 0X0X0X-0X0X0X-0X0X0X, run:

        $ gcloud billing accounts describe 0X0X0X-0X0X0X-0X0X0X

POSITIONAL ARGUMENTS
     ACCOUNT_ID
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

        $ gcloud alpha billing accounts describe

        $ gcloud beta billing accounts describe
```

### gcloud billing accounts get-iam-policy

```text
NAME
    gcloud billing accounts get-iam-policy - get the IAM policy for a Cloud
        Billing account

SYNOPSIS
    gcloud billing accounts get-iam-policy ACCOUNT [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud billing accounts get-iam-policy displays the IAM policy associated
    with a Cloud Billing account. If formatted as JSON, the output can be
    edited and used as a policy file for set-iam-policy. The output includes an
    "etag" field identifying the version emitted and allowing detection of
    concurrent policy updates; see $ {parent} set-iam-policy for additional
    details.

EXAMPLES
    To print the IAM policy for a given Cloud Billing account, run:

        $ gcloud billing accounts get-iam-policy my-account

POSITIONAL ARGUMENTS
     Account resource - The Cloud Billing account for which to display the IAM
     policy. This represents a Cloud resource.

     This must be specified.

       ACCOUNT
          ID of the account or fully qualified identifier for the account.

          To set the account attribute:
          + provide the argument account on the command line.

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
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/docs/apis

NOTES
    These variants are also available:

        $ gcloud alpha billing accounts get-iam-policy

        $ gcloud beta billing accounts get-iam-policy
```

### gcloud billing accounts list

```text
NAME
    gcloud billing accounts list - list all active billing accounts

SYNOPSIS
    gcloud billing accounts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud billing accounts list lists all billing accounts and subaccounts
    owned by the currently authenticated user. Subaccounts have a non-empty
    MASTER_ACCOUNT_ID value.

EXAMPLES
    To list only open billing accounts, run:

        $ gcloud billing accounts list --filter=open=true

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

API REFERENCE
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/v1/getting-started

NOTES
    These variants are also available:

        $ gcloud alpha billing accounts list

        $ gcloud beta billing accounts list
```

### gcloud billing accounts remove-iam-policy-binding

```text
NAME
    gcloud billing accounts remove-iam-policy-binding - remove an IAM policy
        binding from a Cloud Billing account

SYNOPSIS
    gcloud billing accounts remove-iam-policy-binding ACCOUNT
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding to the IAM policy from a Cloud Billing
    account. A binding consists of a member and a role.

EXAMPLES
    To remove someone@example.com as a Billing Account Administrator from
    billing account 123456-789876-543210, run:

        $ gcloud billing accounts remove-iam-policy-binding \
            123456-789876-543210 --member='user:someone@example.com' \
            --role='roles/billing.admin'

POSITIONAL ARGUMENTS
     Account resource - Name of the Cloud Billing account for which to remove
     the IAM policy binding. This represents a Cloud resource.

     This must be specified.

       ACCOUNT
          ID of the account or fully qualified identifier for the account.

          To set the account attribute:
          + provide the argument account on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/docs/apis

NOTES
    These variants are also available:

        $ gcloud alpha billing accounts remove-iam-policy-binding

        $ gcloud beta billing accounts remove-iam-policy-binding
```

### gcloud billing accounts set-iam-policy

```text
NAME
    gcloud billing accounts set-iam-policy - set the IAM policy for a Cloud
        Billing account

SYNOPSIS
    gcloud billing accounts set-iam-policy ACCOUNT POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud billing accounts set-iam-policy sets the IAM policy for a Cloud
    Billing account given an account ID and a JSON or YAML file that describes
    the IAM policy.

    Note: Setting the IAM policy for a Cloud Billing account replaces existing
    IAM bindings for that account.

EXAMPLES
    The following command reads an IAM policy defined in the JSON file
    policy.json and sets it for a Billing account ID 123456-789876-543210:

        $ gcloud billing accounts set-iam-policy 123456-789876-543210 \
            policy.json

    See https://cloud.google.com/iam/docs/managing-policies for policy file
    format and content details.

POSITIONAL ARGUMENTS
     Account resource - The Cloud Billing account for which to display the IAM
     policy. This represents a Cloud resource.

     This must be specified.

       ACCOUNT
          ID of the account or fully qualified identifier for the account.

          To set the account attribute:
          + provide the argument account on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbilling/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/billing/docs/apis

NOTES
    These variants are also available:

        $ gcloud alpha billing accounts set-iam-policy

        $ gcloud beta billing accounts set-iam-policy
```

### gcloud beta billing accounts add-iam-policy-binding

```text
NAME
    gcloud beta billing accounts add-iam-policy-binding - add an IAM policy
        binding to a Cloud Billing account

SYNOPSIS
    gcloud beta billing accounts add-iam-policy-binding ACCOUNT
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing accounts describe

```text
NAME
    gcloud beta billing accounts describe - show metadata for a billing account

SYNOPSIS
    gcloud beta billing accounts describe ACCOUNT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing accounts get-iam-policy

```text
NAME
    gcloud beta billing accounts get-iam-policy - get the IAM policy for a
        Cloud Billing account

SYNOPSIS
    gcloud beta billing accounts get-iam-policy ACCOUNT [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing accounts list

```text
NAME
    gcloud beta billing accounts list - list all active billing accounts

SYNOPSIS
    gcloud beta billing accounts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing accounts remove-iam-policy-binding

```text
NAME
    gcloud beta billing accounts remove-iam-policy-binding - remove an IAM
        policy binding from a Cloud Billing account

SYNOPSIS
    gcloud beta billing accounts remove-iam-policy-binding ACCOUNT
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing accounts set-iam-policy

```text
NAME
    gcloud beta billing accounts set-iam-policy - set the IAM policy for a
        Cloud Billing account

SYNOPSIS
    gcloud beta billing accounts set-iam-policy ACCOUNT POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts add-iam-policy-binding

```text
NAME
    gcloud alpha billing accounts add-iam-policy-binding - add an IAM policy
        binding to a Cloud Billing account

SYNOPSIS
    gcloud alpha billing accounts add-iam-policy-binding ACCOUNT
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts describe

```text
NAME
    gcloud alpha billing accounts describe - show metadata for a billing
        account

SYNOPSIS
    gcloud alpha billing accounts describe ACCOUNT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts get-iam-policy

```text
NAME
    gcloud alpha billing accounts get-iam-policy - get the IAM policy for a
        Cloud Billing account

SYNOPSIS
    gcloud alpha billing accounts get-iam-policy ACCOUNT [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts list

```text
NAME
    gcloud alpha billing accounts list - list all active billing accounts

SYNOPSIS
    gcloud alpha billing accounts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts projects describe

```text
NAME
    gcloud alpha billing accounts projects describe - show detailed billing
        information for a project

SYNOPSIS
    gcloud alpha billing accounts projects describe PROJECT_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts projects link

```text
NAME
    gcloud alpha billing accounts projects link - link a project with a billing
        account

SYNOPSIS
    gcloud alpha billing accounts projects link PROJECT_ID
        (--account-id=ACCOUNT_ID | --billing-account=ACCOUNT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts projects list

```text
NAME
    gcloud alpha billing accounts projects list - list all active projects
        associated with the specified billing account

SYNOPSIS
    gcloud alpha billing accounts projects list
        ([ACCOUNT_ID] --billing-account=ACCOUNT_ID) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts projects unlink

```text
NAME
    gcloud alpha billing accounts projects unlink - unlink the account (if any)
        linked with a project

SYNOPSIS
    gcloud alpha billing accounts projects unlink PROJECT_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts remove-iam-policy-binding

```text
NAME
    gcloud alpha billing accounts remove-iam-policy-binding - remove an IAM
        policy binding from a Cloud Billing account

SYNOPSIS
    gcloud alpha billing accounts remove-iam-policy-binding ACCOUNT
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing accounts set-iam-policy

```text
NAME
    gcloud alpha billing accounts set-iam-policy - set the IAM policy for a
        Cloud Billing account

SYNOPSIS
    gcloud alpha billing accounts set-iam-policy ACCOUNT POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/billing/accounts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
