---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/service-config
---

# gcloud backup-dr service-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr service-config init

```text
NAME
    gcloud backup-dr service-config init - initialize a Backup and DR Service
        configuration

SYNOPSIS
    gcloud backup-dr service-config init --location=LOCATION
        --resource-type=RESOURCE_TYPE [--no-async]
        [--cloudsql-edition=CLOUDSQL_EDITION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Initialize a Backup and DR Service configuration.

EXAMPLES
    To initialize a new service configuration in location MY_LOCATION and
    project MY_PROJECT for resource type MY_RESOURCE_TYPE, run:

        $ gcloud backup-dr service-config init --project=MY_PROJECT \
            --location=MY_LOCATION --resource-type=MY_RESOURCE_TYPE

REQUIRED FLAGS
     Location resource - The location for which the service configuration
     should be created. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

     --resource-type=RESOURCE_TYPE
        The resource type to which the default service configuration will be
        applied. Examples include, "compute.<UNIVERSE_DOMAIN>.com/Instance"

OPTIONAL FLAGS
     --no-async
        Wait for the operation in progress to complete.

     --cloudsql-edition=CLOUDSQL_EDITION
        Cloud SQL Edition: (Required only for Cloud SQL instances, ignored
        otherwise). The edition of the Cloud SQL instance. Possible values:
        "ENTERPRISE" - Enterprise edition. "ENTERPRISE_PLUS" - Enterprise Plus
        edition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

BRIEF
    Initializes a Backup and DR Service configuration.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr service-config init

        $ gcloud beta backup-dr service-config init
```

### gcloud beta backup-dr service-config init

```text
NAME
    gcloud beta backup-dr service-config init - initialize a Backup and DR
        Service configuration

SYNOPSIS
    gcloud beta backup-dr service-config init --location=LOCATION
        --resource-type=RESOURCE_TYPE [--no-async]
        [--cloudsql-edition=CLOUDSQL_EDITION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr service-config init

```text
NAME
    gcloud alpha backup-dr service-config init - initialize a Backup and DR
        Service configuration

SYNOPSIS
    gcloud alpha backup-dr service-config init --location=LOCATION
        --resource-type=RESOURCE_TYPE [--no-async]
        [--cloudsql-edition=CLOUDSQL_EDITION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/service-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
