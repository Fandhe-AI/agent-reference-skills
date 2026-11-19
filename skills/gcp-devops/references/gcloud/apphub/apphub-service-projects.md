---
source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/service-projects
---

# gcloud apphub service-projects

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud apphub service-projects add

```text
NAME
    gcloud apphub service-projects add - add an Apphub service project

SYNOPSIS
    gcloud apphub service-projects add (SERVICE_PROJECT : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an Apphub service project.

EXAMPLES
    To add the service project my-service-project to the host project
    my-host-project, run:

        $ gcloud apphub service-projects add my-service-project \
            --project=my-host-project

POSITIONAL ARGUMENTS
     ServiceProjectAttachment resource - The Service Project ID. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument service_project on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE_PROJECT
          ID of the ServiceProjectAttachment or fully qualified identifier for
          the ServiceProjectAttachment.

          To set the service_project attribute:
          + provide the argument service_project on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the ServiceProjectAttachment.

          To set the location attribute:
          + provide the argument service_project on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + Service project attachments only support global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub service-projects add
```

### gcloud apphub service-projects describe

```text
NAME
    gcloud apphub service-projects describe - describe an Apphub service
        project

SYNOPSIS
    gcloud apphub service-projects describe
        (SERVICE_PROJECT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Apphub service project.

EXAMPLES
    To describe the service project my-service-project attached to the host
    project my-host-project, run:

        $ gcloud apphub service-projects describe my-service-project \
            --project=my-host-project

POSITIONAL ARGUMENTS
     ServiceProjectAttachment resource - The Service Project ID. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument service_project on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE_PROJECT
          ID of the ServiceProjectAttachment or fully qualified identifier for
          the ServiceProjectAttachment.

          To set the service_project attribute:
          + provide the argument service_project on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the ServiceProjectAttachment.

          To set the location attribute:
          + provide the argument service_project on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + Service project attachments only support global location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub service-projects describe
```

### gcloud apphub service-projects detach

```text
NAME
    gcloud apphub service-projects detach - detach an Apphub service project

SYNOPSIS
    gcloud apphub service-projects detach [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Detach an Apphub service project.

EXAMPLES
    To detach the service project my-service-project, run:

        $ gcloud apphub service-projects detach --project=my-service-project

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub service-projects detach
```

### gcloud apphub service-projects list

```text
NAME
    gcloud apphub service-projects list - list Apphub service projects

SYNOPSIS
    gcloud apphub service-projects list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Apphub service projects.

EXAMPLES
    To list all service projects attached to the host project my-host-project,
    run:

        $ gcloud apphub service-projects list --project=my-host-project

FLAGS
     Location resource - Location. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * Service project attachments only support global location with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * Service project attachments only support global location.

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
    This variant is also available:

        $ gcloud alpha apphub service-projects list
```

### gcloud apphub service-projects lookup

```text
NAME
    gcloud apphub service-projects lookup - lookup an Apphub service project

SYNOPSIS
    gcloud apphub service-projects lookup [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lookup an Apphub service project.

EXAMPLES
    To lookup the service project my-service-project, run:

        $ gcloud apphub service-projects lookup --project=my-service-project

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub service-projects lookup
```

### gcloud apphub service-projects remove

```text
NAME
    gcloud apphub service-projects remove - remove an Apphub service project

SYNOPSIS
    gcloud apphub service-projects remove
        (SERVICE_PROJECT : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an Apphub service project.

EXAMPLES
    To remove the service project my-service-project from the host project
    my-host-project, run:

        $ gcloud apphub service-projects remove my-service-project \
            --project=my-host-project

POSITIONAL ARGUMENTS
     ServiceProjectAttachment resource - The Service Project ID. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument service_project on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE_PROJECT
          ID of the ServiceProjectAttachment or fully qualified identifier for
          the ServiceProjectAttachment.

          To set the service_project attribute:
          + provide the argument service_project on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the ServiceProjectAttachment.

          To set the location attribute:
          + provide the argument service_project on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + Service project attachments only support global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub service-projects remove
```

### gcloud alpha apphub service-projects add

```text
NAME
    gcloud alpha apphub service-projects add - add an Apphub service project

SYNOPSIS
    gcloud alpha apphub service-projects add
        (SERVICE_PROJECT : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub service-projects describe

```text
NAME
    gcloud alpha apphub service-projects describe - describe an Apphub service
        project

SYNOPSIS
    gcloud alpha apphub service-projects describe
        (SERVICE_PROJECT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub service-projects detach

```text
NAME
    gcloud alpha apphub service-projects detach - detach an Apphub service
        project

SYNOPSIS
    gcloud alpha apphub service-projects detach [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub service-projects list

```text
NAME
    gcloud alpha apphub service-projects list - list Apphub service projects

SYNOPSIS
    gcloud alpha apphub service-projects list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub service-projects lookup

```text
NAME
    gcloud alpha apphub service-projects lookup - lookup an Apphub service
        project

SYNOPSIS
    gcloud alpha apphub service-projects lookup [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub service-projects remove

```text
NAME
    gcloud alpha apphub service-projects remove - remove an Apphub service
        project

SYNOPSIS
    gcloud alpha apphub service-projects remove
        (SERVICE_PROJECT : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/service-projects (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
