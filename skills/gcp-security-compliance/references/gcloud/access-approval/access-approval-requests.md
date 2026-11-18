---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/requests
---

# gcloud access-approval requests

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-approval requests approve

```text
NAME
    gcloud access-approval requests approve - approve an Access Approval
        request

SYNOPSIS
    gcloud access-approval requests approve NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Approve an Access Approval request. This will raise an error if the request
    does not exist or is not in a pending state.

EXAMPLES
    To approve an approval request using its name (e.g.
    projects/12345/approvalRequests/abc123), run:

        $ gcloud access-approval requests approve \
            projects/12345/approvalRequests/abc123

POSITIONAL ARGUMENTS
     NAME
        Name of the Access Approval request to invalidate

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-approval requests approve

        $ gcloud beta access-approval requests approve
```

### gcloud access-approval requests dismiss

```text
NAME
    gcloud access-approval requests dismiss - dismiss an Access Approval
        request

SYNOPSIS
    gcloud access-approval requests dismiss NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Dismiss an Access Approval request. Note: this does not deny access to the
    resource if another request has been made and approved for the same
    resource. This will raise an error if the request does not exist.

EXAMPLES
    To dismiss an approval request using its name (e.g.
    projects/12345/approvalRequests/abc123), run:

        $ gcloud access-approval requests dismiss \
            projects/12345/approvalRequests/abc123

POSITIONAL ARGUMENTS
     NAME
        Name of the Access Approval request to invalidate

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-approval requests dismiss

        $ gcloud beta access-approval requests dismiss
```

### gcloud access-approval requests get

```text
NAME
    gcloud access-approval requests get - get an Access Approval request

SYNOPSIS
    gcloud access-approval requests get NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get an Access Approval Request. Raise error if the request does not exist.

EXAMPLES
    To get an approval request using its name (e.g.
    projects/my-project-123/approvalRequests/abc123), run:

        $ gcloud access-approval requests get \
            projects/my-project-123/approvalRequests/abc123

POSITIONAL ARGUMENTS
     NAME
        Name of the Access Approval request to invalidate

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-approval requests get

        $ gcloud beta access-approval requests get
```

### gcloud access-approval requests invalidate

```text
NAME
    gcloud access-approval requests invalidate - invalidate an Access Approval
        request

SYNOPSIS
    gcloud access-approval requests invalidate NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Invalidate an Access Approval request. This will raise an error if the
    request does not exist or is not in an approved state.

EXAMPLES
    To invalidate an approval request using its name (e.g.
    projects/12345/approvalRequests/abc123), run:

        $ gcloud access-approval requests invalidate \
            projects/12345/approvalRequests/abc123

POSITIONAL ARGUMENTS
     NAME
        Name of the Access Approval request to invalidate

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-approval requests invalidate

        $ gcloud beta access-approval requests invalidate
```

### gcloud access-approval requests list

```text
NAME
    gcloud access-approval requests list - list Access Approval requests

SYNOPSIS
    gcloud access-approval requests list [--state=STATE; default="pending"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Access Approval requests by parent (project/folder/organization).

EXAMPLES
    To list all approval requests owned by project my-project-123, run:

        $ gcloud access-approval requests list --project=my-project-123 \
            --state=all

    To list pending approval requests owned by organization 999, run:

        $ gcloud access-approval requests list --organization=999

    or

        $ gcloud access-approval requests list --organization=999 \
            --state=pending

    Note that the user needs to have permission accessapproval.requests.list on
    the project/folder/organization

FLAGS
     --state=STATE; default="pending"
        filter for request state

     At most one of these can be specified:

       --folder=FOLDER
          Folder number. Only one of --project, --folder, or --organization can
          be provided. If none are provided then it uses config property
          [core/project].

       --organization=ORGANIZATION
          Organization number. Either --project, --folder, or --organization
          must be provided. If none are provided then it uses config property
          [core/project].

       --project=PROJECT
          Project number or id. Only one of --project, --folder, or
          --organization can be provided. If none are provided then it uses
          config property [core/project].

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

        $ gcloud alpha access-approval requests list

        $ gcloud beta access-approval requests list
```

### gcloud beta access-approval requests approve

```text
NAME
    gcloud beta access-approval requests approve - approve an Access Approval
        request

SYNOPSIS
    gcloud beta access-approval requests approve NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-approval requests dismiss

```text
NAME
    gcloud beta access-approval requests dismiss - dismiss an Access Approval
        request

SYNOPSIS
    gcloud beta access-approval requests dismiss NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-approval requests get

```text
NAME
    gcloud beta access-approval requests get - get an Access Approval request

SYNOPSIS
    gcloud beta access-approval requests get NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-approval requests invalidate

```text
NAME
    gcloud beta access-approval requests invalidate - invalidate an Access
        Approval request

SYNOPSIS
    gcloud beta access-approval requests invalidate NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-approval requests list

```text
NAME
    gcloud beta access-approval requests list - list Access Approval requests

SYNOPSIS
    gcloud beta access-approval requests list
        [--state=STATE; default="pending"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval requests approve

```text
NAME
    gcloud alpha access-approval requests approve - approve an Access Approval
        request

SYNOPSIS
    gcloud alpha access-approval requests approve NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval requests dismiss

```text
NAME
    gcloud alpha access-approval requests dismiss - dismiss an Access Approval
        request

SYNOPSIS
    gcloud alpha access-approval requests dismiss NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval requests get

```text
NAME
    gcloud alpha access-approval requests get - get an Access Approval request

SYNOPSIS
    gcloud alpha access-approval requests get NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval requests invalidate

```text
NAME
    gcloud alpha access-approval requests invalidate - invalidate an Access
        Approval request

SYNOPSIS
    gcloud alpha access-approval requests invalidate NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval requests list

```text
NAME
    gcloud alpha access-approval requests list - list Access Approval requests

SYNOPSIS
    gcloud alpha access-approval requests list
        [--state=STATE; default="pending"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/requests (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
