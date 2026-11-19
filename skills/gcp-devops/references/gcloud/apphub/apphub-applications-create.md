---
source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/create
---

# gcloud apphub applications create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud apphub applications create

```text
NAME
    gcloud apphub applications create - create an Apphub application

SYNOPSIS
    gcloud apphub applications create (APPLICATION : --location=LOCATION)
        --scope-type=SCOPE_TYPE [--async]
        [--business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--criticality-type=CRITICALITY_TYPE] [--description=DESCRIPTION]
        [--developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [--display-name=DISPLAY_NAME] [--environment-type=ENVIRONMENT_TYPE]
        [--operator-owners=[display-name=DISPLAY-NAME],[email=EMAIL]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Apphub application.

EXAMPLES
    To create the Application my-app with scope type REGIONAL in location
    us-east1, run:

        $ gcloud apphub applications create my-app --location=us-east1 \
            --scope-type=REGIONAL

POSITIONAL ARGUMENTS
     Application resource - The Application ID. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the application.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --scope-type=SCOPE_TYPE
        Scope of the Application. SCOPE_TYPE must be one of:

         GLOBAL
            Represents a global application
         MULTI_REGIONAL
            Represents a multi-regional application
         REGIONAL
            Represents a regional application

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --business-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Business owners of the application

     --criticality-type=CRITICALITY_TYPE
        Criticality Type of the application. CRITICALITY_TYPE must be one of:

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
        Description of the Application

     --developer-owners=[display-name=DISPLAY-NAME],[email=EMAIL]
        Developer owners of the application

     --display-name=DISPLAY_NAME
        Human-friendly display name

     --environment-type=ENVIRONMENT_TYPE
        Environment Type of the application. ENVIRONMENT_TYPE must be one of:

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
        Operator owners of the application

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub applications create
```

### gcloud alpha apphub applications create

```text
NAME
    gcloud alpha apphub applications create - create an Apphub application

SYNOPSIS
    gcloud alpha apphub applications create (APPLICATION : --location=LOCATION)
        --scope-type=SCOPE_TYPE [--async]
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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
