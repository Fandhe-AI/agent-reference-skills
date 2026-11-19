---
source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/automigrationconfig
---

# gcloud infra-manager automigrationconfig

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud infra-manager automigrationconfig describe

```text
NAME
    gcloud infra-manager automigrationconfig describe - describe an
        AutoMigrationConfig

SYNOPSIS
    gcloud infra-manager automigrationconfig describe [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an AutoMigrationConfig.

EXAMPLES
    To describe an AutoMigrationConfig for location us-central1:        $ gcloud infra-manager automigrationconfig describe \
           --location=us-central1

FLAGS
     Location resource - The location to read the AutoMigrationConfig from.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property infra-manager/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property infra-manager/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

### gcloud infra-manager automigrationconfig disable-auto-migration

```text
NAME
    gcloud infra-manager automigrationconfig disable-auto-migration - disable
        AutoMigrationConfig

SYNOPSIS
    gcloud infra-manager automigrationconfig disable-auto-migration [--async]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable AutoMigrationConfig.

EXAMPLES
    To disable AutoMigrationConfig for location us-central1:        $ gcloud infra-manager automigrationconfig disable-auto-migration \
           --location=us-central1

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Location resource - The location to disable AutoMigrationConfig for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property infra-manager/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property infra-manager/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

### gcloud infra-manager automigrationconfig enable-auto-migration

```text
NAME
    gcloud infra-manager automigrationconfig enable-auto-migration - enable
        AutoMigrationConfig

SYNOPSIS
    gcloud infra-manager automigrationconfig enable-auto-migration [--async]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable AutoMigrationConfig.

EXAMPLES
    To enable AutoMigrationConfig for location us-central1:        $ gcloud infra-manager automigrationconfig enable-auto-migration \
           --location=us-central1

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Location resource - The location to enable AutoMigrationConfig for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property infra-manager/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property infra-manager/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/automigrationconfig (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
