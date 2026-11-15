---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/list
---

# gcloud projects list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects list

```text
NAME
    gcloud projects list - list projects accessible by the active account

SYNOPSIS
    gcloud projects list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all active projects, where the active account has Owner, Editor,
    Browser or Viewer permissions. Projects are listed in alphabetical order by
    project name. Projects that have been deleted or are pending deletion are
    not included.

    The active account can be a user account or a service account. If the
    active account is a service account, then the list of projects might be
    incomplete. Specifically, the list excludes projects that the active
    account only has access to because they're in a service account principal
    set (https://cloud.google.com/iam/help/service-accounts/principal-sets)
    with access to the project.

    You can specify the maximum number of projects to list using the --limit
    flag.

EXAMPLES
    The following command lists the last five created projects, sorted
    alphabetically by project ID:

        $ gcloud projects list --sort-by=projectId --limit=5

    To list projects that have been marked for deletion:

        $ gcloud projects list --filter='lifecycleState:DELETE_REQUESTED'

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

        $ gcloud alpha projects list

        $ gcloud beta projects list
```

### gcloud beta projects list

```text
NAME
    gcloud beta projects list - list projects accessible by the active account

SYNOPSIS
    gcloud beta projects list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects list

```text
NAME
    gcloud alpha projects list - list projects for which the user has
        resourcemanager.projects.list permission

SYNOPSIS
    gcloud alpha projects list [--folder=FOLDER_ID]
        [--organization=ORGANIZATION_ID] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
