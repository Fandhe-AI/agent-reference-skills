---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/applications/recommend-iam-roles
---

# gcloud design-center spaces applications recommend-iam-roles

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces applications recommend-iam-roles

```text
NAME
    gcloud design-center spaces applications recommend-iam-roles - get
        recommended IAM roles for a Design Center application

SYNOPSIS
    gcloud design-center spaces applications recommend-iam-roles
        (APPLICATION : --location=LOCATION --space=SPACE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get recommended IAM roles for an application in a space.

EXAMPLES
    To get recommended IAM roles for the application my-application in space
    my-space, project my-project and location us-central1, run:

        $ gcloud design-center spaces applications recommend-iam-roles \
          my-application --space=my-space --project=my-project \
          --location=us-central1

    Or run:

        $ gcloud design-center spaces applications recommend-iam-roles \
          projects/my-project/locations/us-central1/spaces/my-space/\
        applications/my-application

    To get recommended IAM roles asynchronously without waiting for the
    operation to complete, run:

        $ gcloud design-center spaces applications recommend-iam-roles \
          my-application --space=my-space --project=my-project \
          --location=us-central1 --async

POSITIONAL ARGUMENTS
     Application resource - The application to get recommended roles for IaC.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument APPLICATION on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument APPLICATION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the application.

          To set the location attribute:
          + provide the argument APPLICATION on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The ID of the space.

          To set the space attribute:
          + provide the argument APPLICATION on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

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

        $ gcloud alpha design-center spaces applications recommend-iam-roles
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces applications recommend-iam-roles projects/my-project/locations/us-central1/spaces/my-space/applications/my-application
```

### gcloud alpha design-center spaces applications recommend-iam-roles

```text
NAME
    gcloud alpha design-center spaces applications recommend-iam-roles - get
        recommended IAM roles for a Design Center application

SYNOPSIS
    gcloud alpha design-center spaces applications recommend-iam-roles
        (APPLICATION : --location=LOCATION --space=SPACE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/applications/recommend-iam-roles (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
