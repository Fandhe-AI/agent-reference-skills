---
source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/workloads
---

# gcloud apphub applications workloads

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud apphub applications workloads create

```text
NAME
    gcloud apphub applications workloads create - create an Apphub application
        workload

SYNOPSIS
    gcloud apphub applications workloads create
        (WORKLOAD : --application=APPLICATION --location=LOCATION)
        --discovered-workload=DISCOVERED_WORKLOAD [--async]
        [--business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Apphub application workload.

EXAMPLES
    To create the Workload my-workload with discovered workload
    my-discovered-workload in the Application my-app in location us-east1, run:

        $ gcloud apphub applications workloads create my-workload \
            --application=my-app --location=us-east1 \
            --discovered-workload=my-discovered-workload

POSITIONAL ARGUMENTS
     Workload resource - The Workload resource. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument WORKLOAD on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKLOAD
          ID of the workload or fully qualified identifier for the workload.

          To set the workload attribute:
          + provide the argument WORKLOAD on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument WORKLOAD on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the workload.

          To set the location attribute:
          + provide the argument WORKLOAD on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     DiscoveredWorkload resource - The discovered workload resource. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --discovered-workload on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --discovered-workload on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --discovered-workload=DISCOVERED_WORKLOAD
          ID of the discoveredWorkload or fully qualified identifier for the
          discoveredWorkload.

          To set the discovered_workload attribute:
          + provide the argument --discovered-workload on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Business owners of the workload

     --criticality-type=CRITICALITY_TYPE
        Criticality Type of the workload. CRITICALITY_TYPE must be one of:

         HIGH
            High impact
         LOW
            Low impact
         MEDIUM
            Medium impact
         MISSION_CRITICAL
            Mission critical service, application or workload
         TYPE_UNSPECIFIED
            Unspecified criticality type

     --description=DESCRIPTION
        Description of the Workload

     --developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Developer owners of the workload

     --display-name=DISPLAY_NAME
        Human-friendly display name

     --environment-type=ENVIRONMENT_TYPE
        Environment Type of the workload. ENVIRONMENT_TYPE must be one of:

         DEVELOPMENT
            Development environment
         PRODUCTION
            Production environment
         STAGING
            Staging environment
         TEST
            Test environment
         TYPE_UNSPECIFIED
            Unspecified environment type

     --operator-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Operator owners of the workload

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub applications workloads create
```

### gcloud apphub applications workloads delete

```text
NAME
    gcloud apphub applications workloads delete - delete an Apphub application
        workload

SYNOPSIS
    gcloud apphub applications workloads delete
        (WORKLOAD : --application=APPLICATION --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Apphub application workload.

EXAMPLES
    To delete the Workload my-workload from the Application my-app in location
    us-east1, run:

        $ gcloud apphub applications workloads delete my-workload \
            --application=my-app --location=us-east1

POSITIONAL ARGUMENTS
     Workload resource - The Workload ID. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument workload on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKLOAD
          ID of the workload or fully qualified identifier for the workload.

          To set the workload attribute:
          + provide the argument workload on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the workload.

          To set the location attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha apphub applications workloads delete
```

### gcloud apphub applications workloads describe

```text
NAME
    gcloud apphub applications workloads describe - describe an Apphub
        application workload

SYNOPSIS
    gcloud apphub applications workloads describe
        (WORKLOAD : --application=APPLICATION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Apphub application workload.

EXAMPLES
    To describe the Workload my-workload in the Application my-app in location
    us-east1, run:

        $ gcloud apphub applications workloads describe my-workload \
            --application=my-app --location=us-east1

POSITIONAL ARGUMENTS
     Workload resource - The Workload ID. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument workload on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKLOAD
          ID of the workload or fully qualified identifier for the workload.

          To set the workload attribute:
          + provide the argument workload on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the workload.

          To set the location attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub applications workloads describe
```

### gcloud apphub applications workloads list

```text
NAME
    gcloud apphub applications workloads list - list Apphub application
        workloads

SYNOPSIS
    gcloud apphub applications workloads list
        (--application=APPLICATION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Apphub application workloads.

EXAMPLES
    To list all Workloads in the Application my-app in location us-east1, run:

        $ gcloud apphub applications workloads list --application=my-app \
            --location=us-east1

REQUIRED FLAGS
     Application resource - The Application ID. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --application=APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument --application on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The Cloud location for the application.

          To set the location attribute:
          + provide the argument --application on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha apphub applications workloads list
```

### gcloud apphub applications workloads update

```text
NAME
    gcloud apphub applications workloads update - update an Apphub application
        workload

SYNOPSIS
    gcloud apphub applications workloads update
        (WORKLOAD : --application=APPLICATION --location=LOCATION) [--async]
        [--business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Apphub application workload.

EXAMPLES
    To update the Workload my-workload with a new environment prod in the
    Application my-app in location us-east1, run:

        $ gcloud apphub applications workloads update my-workload \
            --environment-type=TEST --application=my-app --location=us-east1

POSITIONAL ARGUMENTS
     Workload resource - The Workload ID. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument workload on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKLOAD
          ID of the workload or fully qualified identifier for the workload.

          To set the workload attribute:
          + provide the argument workload on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the workload.

          To set the location attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Business owners of the workload

     --criticality-type=CRITICALITY_TYPE
        Criticality Type of the workload. CRITICALITY_TYPE must be one of:

         HIGH
            High impact
         LOW
            Low impact
         MEDIUM
            Medium impact
         MISSION_CRITICAL
            Mission critical service, application or workload
         TYPE_UNSPECIFIED
            Unspecified criticality type

     --description=DESCRIPTION
        Description of the Workload

     --developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Developer owners of the workload

     --display-name=DISPLAY_NAME
        Human-friendly display name

     --environment-type=ENVIRONMENT_TYPE
        Environment Type of the workload. ENVIRONMENT_TYPE must be one of:

         DEVELOPMENT
            Development environment
         PRODUCTION
            Production environment
         STAGING
            Staging environment
         TEST
            Test environment
         TYPE_UNSPECIFIED
            Unspecified environment type

     --operator-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Operator owners of the workload

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub applications workloads update
```

### gcloud alpha apphub applications workloads create

```text
NAME
    gcloud alpha apphub applications workloads create - create an Apphub
        application workload

SYNOPSIS
    gcloud alpha apphub applications workloads create
        (WORKLOAD : --application=APPLICATION --location=LOCATION)
        --discovered-workload=DISCOVERED_WORKLOAD [--async]
        [--business-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications workloads delete

```text
NAME
    gcloud alpha apphub applications workloads delete - delete an Apphub
        application workload

SYNOPSIS
    gcloud alpha apphub applications workloads delete
        (WORKLOAD : --application=APPLICATION --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications workloads describe

```text
NAME
    gcloud alpha apphub applications workloads describe - describe an Apphub
        application workload

SYNOPSIS
    gcloud alpha apphub applications workloads describe
        (WORKLOAD : --application=APPLICATION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications workloads list

```text
NAME
    gcloud alpha apphub applications workloads list - list Apphub application
        workloads

SYNOPSIS
    gcloud alpha apphub applications workloads list
        (--application=APPLICATION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications workloads update

```text
NAME
    gcloud alpha apphub applications workloads update - update an Apphub
        application workload

SYNOPSIS
    gcloud alpha apphub applications workloads update
        (WORKLOAD : --application=APPLICATION --location=LOCATION) [--async]
        [--business-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/workloads (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
