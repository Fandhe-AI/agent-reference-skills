---
source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/services
---

# gcloud apphub applications services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud apphub applications services create

```text
NAME
    gcloud apphub applications services create - create an Apphub application
        service

SYNOPSIS
    gcloud apphub applications services create
        (SERVICE : --application=APPLICATION --location=LOCATION)
        --discovered-service=DISCOVERED_SERVICE [--async]
        [--business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Apphub application service.

EXAMPLES
    To create the Service my-service with discovered service
    my-discovered-service in the Application my-app in location us-east1, run:

        $ gcloud apphub applications services create my-service \
            --application=my-app --location=us-east1 \
            --discovered-service=my-discovered-service

POSITIONAL ARGUMENTS
     Service resource - The Service resource. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument SERVICE on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument SERVICE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument SERVICE on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the service.

          To set the location attribute:
          + provide the argument SERVICE on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     DiscoveredService resource - The discovered service resource. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --discovered-service on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --discovered-service on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --discovered-service=DISCOVERED_SERVICE
          ID of the discoveredService or fully qualified identifier for the
          discoveredService.

          To set the discovered_service attribute:
          + provide the argument --discovered-service on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Business owners of the service

     --criticality-type=CRITICALITY_TYPE
        Criticality Type of the service. CRITICALITY_TYPE must be one of:

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
        Description of the service

     --developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Developer owners of the service

     --display-name=DISPLAY_NAME
        Human-friendly display name

     --environment-type=ENVIRONMENT_TYPE
        Environment Type of the service. ENVIRONMENT_TYPE must be one of:

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
        Operator owners of the service

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub applications services create
```

### gcloud apphub applications services delete

```text
NAME
    gcloud apphub applications services delete - delete an Apphub application
        service

SYNOPSIS
    gcloud apphub applications services delete
        (SERVICE : --application=APPLICATION --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Apphub application service.

EXAMPLES
    To delete the Service my-service from the Application my-app in location
    us-east1, run:

        $ gcloud apphub applications services delete my-service \
            --application=my-app --location=us-east1

POSITIONAL ARGUMENTS
     Service resource - The Service ID. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
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

        $ gcloud alpha apphub applications services delete
```

### gcloud apphub applications services describe

```text
NAME
    gcloud apphub applications services describe - describe an Apphub
        application service

SYNOPSIS
    gcloud apphub applications services describe
        (SERVICE : --application=APPLICATION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Apphub application service.

EXAMPLES
    To describe the Service my-service in the Application my-app in location
    us-east1, run:

        $ gcloud apphub applications services describe my-service \
            --application=my-app --location=us-east1

POSITIONAL ARGUMENTS
     Service resource - The Service ID. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
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

        $ gcloud alpha apphub applications services describe
```

### gcloud apphub applications services list

```text
NAME
    gcloud apphub applications services list - list Apphub application services

SYNOPSIS
    gcloud apphub applications services list
        (--application=APPLICATION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Apphub application services.

EXAMPLES
    To list all Services in the Application my-app in location us-east1, run:

        $ gcloud apphub applications services list --application=my-app \
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

        $ gcloud alpha apphub applications services list
```

### gcloud apphub applications services update

```text
NAME
    gcloud apphub applications services update - update an Apphub application
        service

SYNOPSIS
    gcloud apphub applications services update
        (SERVICE : --application=APPLICATION --location=LOCATION) [--async]
        [--business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Apphub application service.

EXAMPLES
    To update the Service my-service with a new environment prod in the
    Application my-app in location us-east1, run:

        $ gcloud apphub applications services update my-service \
            --environment-type=TEST --application=my-app --location=us-east1

POSITIONAL ARGUMENTS
     Service resource - The Service ID. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application=APPLICATION
          Name for the application

          To set the application attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --application on the command line.

       --location=LOCATION
          The Cloud location for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Business owners of the service

     --criticality-type=CRITICALITY_TYPE
        Criticality Type of the service. CRITICALITY_TYPE must be one of:

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
        Description of the service

     --developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Developer owners of the service

     --display-name=DISPLAY_NAME
        Human-friendly display name

     --environment-type=ENVIRONMENT_TYPE
        Environment Type of the service. ENVIRONMENT_TYPE must be one of:

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
        Operator owners of the service

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub applications services update
```

### gcloud alpha apphub applications services create

```text
NAME
    gcloud alpha apphub applications services create - create an Apphub
        application service

SYNOPSIS
    gcloud alpha apphub applications services create
        (SERVICE : --application=APPLICATION --location=LOCATION)
        --discovered-service=DISCOVERED_SERVICE [--async]
        [--business-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[channel-uri=CHANNEL-URI],
          [display-name=DISPLAY-NAME],[email=EMAIL]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications services delete

```text
NAME
    gcloud alpha apphub applications services delete - delete an Apphub
        application service

SYNOPSIS
    gcloud alpha apphub applications services delete
        (SERVICE : --application=APPLICATION --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications services describe

```text
NAME
    gcloud alpha apphub applications services describe - describe an Apphub
        application service

SYNOPSIS
    gcloud alpha apphub applications services describe
        (SERVICE : --application=APPLICATION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications services list

```text
NAME
    gcloud alpha apphub applications services list - list Apphub application
        services

SYNOPSIS
    gcloud alpha apphub applications services list
        (--application=APPLICATION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub applications services update

```text
NAME
    gcloud alpha apphub applications services update - update an Apphub
        application service

SYNOPSIS
    gcloud alpha apphub applications services update
        (SERVICE : --application=APPLICATION --location=LOCATION) [--async]
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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
