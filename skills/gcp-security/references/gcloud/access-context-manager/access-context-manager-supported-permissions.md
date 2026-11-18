---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/supported-permissions
---

# gcloud access-context-manager supported-permissions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager supported-permissions describe

```text
NAME
    gcloud access-context-manager supported-permissions describe - describes
        which permissions in a provided role are supported by VPC Service
        Controls

SYNOPSIS
    gcloud access-context-manager supported-permissions describe ROLE_ID
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes which permissions in a provided role are supported by VPC Service
    Controls.

EXAMPLES
    To describe which permissions VPC Service Controls supports for a provided
    role, run:

        $ gcloud access-context-manager supported-permissions describe \
            roles/example.role.name

    This command prints out a list of all supported permissions in a tabular
    form:

        ROLE NAME               SUPPORT STATUS SUPPORTED PERMISSIONS
        roles/example.role.name SUPPORTED      example.permission.one
                                               example.permission.two

    To describe which permissions VPC Service Controls supports for a custom
    role, run:

        $ gcloud access-context-manager supported-permissions describe \
            TestCustomRole --project=example-project

    NOTE: If the provided role is a custom role, an organization or project
    must be specified.

    This command prints out a list of all supported permissions in a tabular
    form:

        ROLE NAME                                      SUPPORT STATUS SUPPORTED PERMISSIONS
        projects/example-project/roles/TestCustomRole  SUPPORTED      example.permission.one

POSITIONAL ARGUMENTS
     ROLE_ID
        ID of the role to describe. Curated roles example: roles/viewer. Custom
        roles example: CustomRole. For custom roles, you must also specify the
        --organization or --project flag.

FLAGS
     At most one of these can be specified:

       --organization=ORGANIZATION
          Organization of the role you want to describe.

       --project=PROJECT_ID
          Project of the role you want to describe.

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

        $ gcloud alpha access-context-manager supported-permissions describe

        $ gcloud beta access-context-manager supported-permissions describe
```

### gcloud access-context-manager supported-permissions list

```text
NAME
    gcloud access-context-manager supported-permissions list - lists all VPC
        Service Controls supported permissions

SYNOPSIS
    gcloud access-context-manager supported-permissions list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the permissions that VPC Service Controls supports.

EXAMPLES
    To list VPC Service Controls supported permissions, run:

        $ gcloud access-context-manager supported-permissions list

    This command prints out a list of all supported permissions in a tabular
    form:

        PERMISSION
        example.permission.one

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

        $ gcloud alpha access-context-manager supported-permissions list

        $ gcloud beta access-context-manager supported-permissions list
```

### gcloud beta access-context-manager supported-permissions describe

```text
NAME
    gcloud beta access-context-manager supported-permissions describe -
        describes which permissions in a provided role are supported by VPC
        Service Controls

SYNOPSIS
    gcloud beta access-context-manager supported-permissions describe ROLE_ID
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager supported-permissions list

```text
NAME
    gcloud beta access-context-manager supported-permissions list - lists all
        VPC Service Controls supported permissions

SYNOPSIS
    gcloud beta access-context-manager supported-permissions list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager supported-permissions describe

```text
NAME
    gcloud alpha access-context-manager supported-permissions describe -
        describes which permissions in a provided role are supported by VPC
        Service Controls

SYNOPSIS
    gcloud alpha access-context-manager supported-permissions describe ROLE_ID
        [--organization=ORGANIZATION | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager supported-permissions list

```text
NAME
    gcloud alpha access-context-manager supported-permissions list - lists all
        VPC Service Controls supported permissions

SYNOPSIS
    gcloud alpha access-context-manager supported-permissions list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/supported-permissions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
