---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/cmek-config
---

# gcloud scheduler cmek-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scheduler cmek-config describe

```text
NAME
    gcloud scheduler cmek-config describe - get CMEK configuration for Cloud
        Scheduler in the specified location

SYNOPSIS
    gcloud scheduler cmek-config describe --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get CMEK configuration for Cloud Scheduler in the specified location.

EXAMPLES
    To get a CMEK config:

        $ gcloud scheduler cmek-config describe --location=my-location

REQUIRED FLAGS
     --location=LOCATION
        Google Cloud location for the KMS key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud scheduler cmek-config update

```text
NAME
    gcloud scheduler cmek-config update - update CMEK configuration for Cloud
        Scheduler in the specified location

SYNOPSIS
    gcloud scheduler cmek-config update [--location=LOCATION]
        [--clear-kms-key | [--kms-key-name=KMS_KEY_NAME
          : --kms-keyring=KMS_KEYRING --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update CMEK configuration for Cloud Scheduler in the specified location.

EXAMPLES
    To update a CMEK config:        $ gcloud scheduler cmek-config update --location=my-location \
          --kms-project=new-kms-project --kms-keyring=kms-keyring2 \
          --kms-key-name=crypto-key2

FLAGS
     --location=LOCATION
        Google Cloud location for the KMS key.

     Flags for Clearing or Updating CMEK Resource

     At most one of these can be specified:

       Flags for clearing CMEK Resource key.

       --clear-kms-key
          Disables CMEK for Cloud Scheduler in the specified location by
          clearing the Cloud KMS cryptokey from the Cloud Scheduler project and
          CMEK configuration.

       Flags for Updating CMEK Resource key

       --kms-key-name=KMS_KEY_NAME
          Fully qualified identifier for the key or just the key ID. The latter
          requires that the --kms-keyring and --kms-project flags be provided
          too.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --kms-keyring=KMS_KEYRING
          KMS keyring of the KMS key.

       --kms-project=KMS_PROJECT
          Google Cloud project for the KMS key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/cmek-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
