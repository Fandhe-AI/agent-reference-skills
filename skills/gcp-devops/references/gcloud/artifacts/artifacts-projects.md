---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/projects
---

# gcloud artifacts projects

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts projects describe

```text
NAME
    gcloud artifacts projects describe - describe project configuration

SYNOPSIS
    gcloud artifacts projects describe [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the Artifact Registry project configuration for the current
    project in a given location.

EXAMPLES
    To describe project configuration in us-west1:

        $ gcloud artifacts projects describe --location=us-west1

FLAGS
     Location resource - The location of the project configuration to describe.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property artifacts/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property artifacts/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

### gcloud artifacts projects update

```text
NAME
    gcloud artifacts projects update - update project configuration

SYNOPSIS
    gcloud artifacts projects update [--location=LOCATION]
        [--severity=SEVERITY]
        [--clear-platform-logs | --disable-platform-logs
          | --enable-platform-logs] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the Artifact Registry project configuration for the current project
    in a given location.

EXAMPLES
    To enable INFO level platform logs for project configuration in us-west1:

        $ gcloud artifacts projects update --location=us-west1 \
            --enable-platform-logs --severity=INFO

FLAGS
     Location resource - The location of the project configuration to update.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property artifacts/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property artifacts/location.

     --severity=SEVERITY
        The minimum severity level of logs to generate. This flag is only
        applicable when using --enable-platform-logs. SEVERITY must be one of:

         error
            Log events with severity ERROR or higher.
         info
            Log events with severity INFO or higher.

     At most one of these can be specified:

       --clear-platform-logs
          Clear platform logging settings for the project in this location to
          fall back to organization settings or AR defaults.

       --disable-platform-logs
          Disable platform logging for the project in this location.

       --enable-platform-logs
          Enable platform logging for the project in this location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/projects (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
