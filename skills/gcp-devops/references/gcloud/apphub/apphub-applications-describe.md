---
source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/describe
---

# gcloud apphub applications describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud apphub applications describe

```text
NAME
    gcloud apphub applications describe - describe an Apphub application

SYNOPSIS
    gcloud apphub applications describe (APPLICATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Apphub application.

EXAMPLES
    To describe the Application my-app in location us-east1, run:

        $ gcloud apphub applications describe my-app --location=us-east1

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub applications describe
```

### gcloud alpha apphub applications describe

```text
NAME
    gcloud alpha apphub applications describe - describe an Apphub application

SYNOPSIS
    gcloud alpha apphub applications describe
        (APPLICATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/applications/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
