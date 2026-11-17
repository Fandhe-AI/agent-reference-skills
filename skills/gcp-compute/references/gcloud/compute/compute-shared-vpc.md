---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/shared-vpc
---

# gcloud compute shared-vpc

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute shared-vpc associated-projects add

```text
NAME
    gcloud compute shared-vpc associated-projects add - associate the given
        project with a given shared VPC host project

SYNOPSIS
    gcloud compute shared-vpc associated-projects add PROJECT_ID
        --host-project=HOST_PROJECT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Associate the given project with a given shared VPC host project.

EXAMPLES
    To add the project service-project as an associated service project of the
    shared VPC host project host-project, run:

        $ gcloud compute shared-vpc associated-projects add \
            --host-project=host-project service-project

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project to add to the host project

REQUIRED FLAGS
     --host-project=HOST_PROJECT
        The XPN host to add an associated project to

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute shared-vpc associated-projects add

        $ gcloud beta compute shared-vpc associated-projects add
```

### gcloud compute shared-vpc associated-projects list

```text
NAME
    gcloud compute shared-vpc associated-projects list - list the associated
        service projects of the given host project

SYNOPSIS
    gcloud compute shared-vpc associated-projects list PROJECT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the associated service projects of the given host project.

EXAMPLES
    If service-project1 and service-project2 are associated service projects of
    the shared VPC host project host-project,

        $ gcloud compute shared-vpc associated-projects list host-project

    yields the output

        RESOURCE_ID         RESOURCE_TYPE
        service-project1    PROJECT
        service-project2    PROJECT

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project to get associated projects for

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

        $ gcloud alpha compute shared-vpc associated-projects list

        $ gcloud beta compute shared-vpc associated-projects list
```

### gcloud compute shared-vpc associated-projects remove

```text
NAME
    gcloud compute shared-vpc associated-projects remove - disassociate the
        given project from the given shared VPC host project

SYNOPSIS
    gcloud compute shared-vpc associated-projects remove PROJECT_ID
        --host-project=HOST_PROJECT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disassociate the given project from the given shared VPC host project.

EXAMPLES
    To remove the project service-project as an associated shared VPC service
    project of the shared VPC host project host-project, run:

        $ gcloud compute shared-vpc associated-projects remove \
            --host-project=host-project service-project

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project to remove from the host project

REQUIRED FLAGS
     --host-project=HOST_PROJECT
        The XPN host to remove the associated project from

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute shared-vpc associated-projects remove

        $ gcloud beta compute shared-vpc associated-projects remove
```

### gcloud compute shared-vpc disable

```text
NAME
    gcloud compute shared-vpc disable - disable the given project as a shared
        VPC host

SYNOPSIS
    gcloud compute shared-vpc disable PROJECT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    That is, after running this command, this project will not be able to share
    VPC networks to other projects.

EXAMPLES
    To disable the project myproject as a shared VPC host, run:

        $ gcloud compute shared-vpc disable myproject

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project to disable as a shared VPC host

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute shared-vpc disable

        $ gcloud beta compute shared-vpc disable
```

### gcloud compute shared-vpc enable

```text
NAME
    gcloud compute shared-vpc enable - enable the given project as a shared VPC
        host

SYNOPSIS
    gcloud compute shared-vpc enable PROJECT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    That is, after running this command, one can enable another project to use
    the VPC networks shared by this project.

EXAMPLES
    To enable the project myproject as a shared VPC host, run:

        $ gcloud compute shared-vpc enable myproject

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project to enable as a shared VPC host

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute shared-vpc enable

        $ gcloud beta compute shared-vpc enable
```

### gcloud compute shared-vpc get-host-project

```text
NAME
    gcloud compute shared-vpc get-host-project - get the shared VPC host
        project that the given project is associated with

SYNOPSIS
    gcloud compute shared-vpc get-host-project PROJECT_ID
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the shared VPC host project that the given project is associated with.

EXAMPLES
    If service-project1 and service-project2 are associated service projects of
    the shared VPC host project host-project,

        $ gcloud compute shared-vpc get-host-project service-project1

    will show the host-project project.

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project to get the host project for

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute shared-vpc get-host-project

        $ gcloud beta compute shared-vpc get-host-project
```

### gcloud compute shared-vpc list-associated-resources

```text
NAME
    gcloud compute shared-vpc list-associated-resources - list the resources
        associated with the given shared VPC host project

SYNOPSIS
    gcloud compute shared-vpc list-associated-resources PROJECT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the resources associated with the given shared VPC host project.

EXAMPLES
    If service-project1 and service-project2 are associated service projects of
    the shared VPC host project host-project,

        $ gcloud compute shared-vpc list-associated-resources host-project

    yields the output

        RESOURCE_ID         RESOURCE_TYPE
        service-project1    PROJECT
        service-project2    PROJECT

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project to get associated resources for

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

        $ gcloud alpha compute shared-vpc list-associated-resources

        $ gcloud beta compute shared-vpc list-associated-resources
```

### gcloud compute shared-vpc organizations list-host-projects

```text
NAME
    gcloud compute shared-vpc organizations list-host-projects - list shared
        VPC host projects in a given organization

SYNOPSIS
    gcloud compute shared-vpc organizations list-host-projects ORGANIZATION_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List shared VPC host projects in a given organization.

EXAMPLES
    To list the shared VPC host projects in the organization with ID 12345,
    run:

        $ gcloud compute shared-vpc organizations list-host-projects 12345

        NAME       CREATION_TIMESTAMP            XPN_PROJECT_STATUS
        xpn-host1  2000-01-01T12:00:00.00-00:00  HOST
        xpn-host2  2000-01-02T12:00:00.00-00:00  HOST

POSITIONAL ARGUMENTS
     ORGANIZATION_ID
        ID or domain for the organization whose XPN host projects to list.

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

        $ gcloud alpha compute shared-vpc organizations list-host-projects

        $ gcloud beta compute shared-vpc organizations list-host-projects
```

### gcloud beta compute shared-vpc associated-projects add

```text
NAME
    gcloud beta compute shared-vpc associated-projects add - associate the
        given project with a given shared VPC host project

SYNOPSIS
    gcloud beta compute shared-vpc associated-projects add PROJECT_ID
        --host-project=HOST_PROJECT [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute shared-vpc associated-projects list

```text
NAME
    gcloud beta compute shared-vpc associated-projects list - list the
        associated service projects of the given host project

SYNOPSIS
    gcloud beta compute shared-vpc associated-projects list PROJECT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute shared-vpc associated-projects remove

```text
NAME
    gcloud beta compute shared-vpc associated-projects remove - disassociate
        the given project from the given shared VPC host project

SYNOPSIS
    gcloud beta compute shared-vpc associated-projects remove PROJECT_ID
        --host-project=HOST_PROJECT [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute shared-vpc disable

```text
NAME
    gcloud beta compute shared-vpc disable - disable the given project as a
        shared VPC host

SYNOPSIS
    gcloud beta compute shared-vpc disable PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute shared-vpc enable

```text
NAME
    gcloud beta compute shared-vpc enable - enable the given project as a
        shared VPC host

SYNOPSIS
    gcloud beta compute shared-vpc enable PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute shared-vpc get-host-project

```text
NAME
    gcloud beta compute shared-vpc get-host-project - get the shared VPC host
        project that the given project is associated with

SYNOPSIS
    gcloud beta compute shared-vpc get-host-project PROJECT_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute shared-vpc list-associated-resources

```text
NAME
    gcloud beta compute shared-vpc list-associated-resources - list the
        resources associated with the given shared VPC host project

SYNOPSIS
    gcloud beta compute shared-vpc list-associated-resources PROJECT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute shared-vpc organizations list-host-projects

```text
NAME
    gcloud beta compute shared-vpc organizations list-host-projects - list
        shared VPC host projects in a given organization

SYNOPSIS
    gcloud beta compute shared-vpc organizations list-host-projects
        ORGANIZATION_ID [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc associated-projects add

```text
NAME
    gcloud alpha compute shared-vpc associated-projects add - associate the
        given project with a given shared VPC host project

SYNOPSIS
    gcloud alpha compute shared-vpc associated-projects add PROJECT_ID
        --host-project=HOST_PROJECT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc associated-projects list

```text
NAME
    gcloud alpha compute shared-vpc associated-projects list - list the
        associated service projects of the given host project

SYNOPSIS
    gcloud alpha compute shared-vpc associated-projects list PROJECT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc associated-projects remove

```text
NAME
    gcloud alpha compute shared-vpc associated-projects remove - disassociate
        the given project from the given shared VPC host project

SYNOPSIS
    gcloud alpha compute shared-vpc associated-projects remove PROJECT_ID
        --host-project=HOST_PROJECT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc disable

```text
NAME
    gcloud alpha compute shared-vpc disable - disable the given project as a
        shared VPC host

SYNOPSIS
    gcloud alpha compute shared-vpc disable PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc enable

```text
NAME
    gcloud alpha compute shared-vpc enable - enable the given project as a
        shared VPC host

SYNOPSIS
    gcloud alpha compute shared-vpc enable PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc get-host-project

```text
NAME
    gcloud alpha compute shared-vpc get-host-project - get the shared VPC host
        project that the given project is associated with

SYNOPSIS
    gcloud alpha compute shared-vpc get-host-project PROJECT_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc list-associated-resources

```text
NAME
    gcloud alpha compute shared-vpc list-associated-resources - list the
        resources associated with the given shared VPC host project

SYNOPSIS
    gcloud alpha compute shared-vpc list-associated-resources PROJECT_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute shared-vpc organizations list-host-projects

```text
NAME
    gcloud alpha compute shared-vpc organizations list-host-projects - list
        shared VPC host projects in a given organization

SYNOPSIS
    gcloud alpha compute shared-vpc organizations list-host-projects
        ORGANIZATION_ID [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/shared-vpc (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
