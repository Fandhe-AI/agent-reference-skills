---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/encryption-config
---

# gcloud dataplex encryption-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex encryption-config create

```text
NAME
    gcloud dataplex encryption-config create - create a Dataplex encryption
        config resource

SYNOPSIS
    gcloud dataplex encryption-config create
        (ENCRYPTION_CONFIG : --location=LOCATION --organization=ORGANIZATION)
        [--key=KEY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    An EncryptionConfig is created only for CMEK opted in organizations.

EXAMPLES
    To create an EncryptionConfig default in organization test-org-id at
    location us-central1 with key test-key, run:        $ gcloud dataplex encryption-config create default \
            --location=us-central1 --organization=test-org-id \
            --key='test-key'

POSITIONAL ARGUMENTS
     Encryption config resource - Arguments and flags that define the Dataplex
     EncryptionConfig you want to create. The arguments in this group can be
     used to specify the attributes of this resource.

     This must be specified.

       ENCRYPTION_CONFIG
          ID of the encryption config or fully qualified identifier for the
          encryption config.

          To set the encryption_config attribute:
          + provide the argument encryption_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument encryption_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

       --organization=ORGANIZATION
          The name of encryption config to use.

          To set the organization attribute:
          + provide the argument encryption_config on the command line with a
            fully specified name;
          + provide the argument --organization on the command line.

FLAGS
     --key=KEY
        The KMS key to use for encryption.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex encryption-config create
```

### gcloud dataplex encryption-config describe

```text
NAME
    gcloud dataplex encryption-config describe - describe an EncryptionConfig

SYNOPSIS
    gcloud dataplex encryption-config describe
        (ENCRYPTION_CONFIG : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an EncryptionConfig. Displays all the details of an
    EncryptionConfig used for CMEK with valid organization and location.

EXAMPLES
    To describe an EncryptionConfig:        $ gcloud dataplex encryption-config describe default \
            --location=us-central1 --organization=test-org

POSITIONAL ARGUMENTS
     Encryption config resource - encryption_config you want to Describe The
     arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       ENCRYPTION_CONFIG
          ID of the encryption config or fully qualified identifier for the
          encryption config.

          To set the encryption_config attribute:
          + provide the argument encryption_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument encryption_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

       --organization=ORGANIZATION
          Name of the Cloud organization to use.

          To set the organization attribute:
          + provide the argument encryption_config on the command line with a
            fully specified name;
          + provide the argument --organization on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex encryption-config describe
```

### gcloud dataplex encryption-config update

```text
NAME
    gcloud dataplex encryption-config update - update an Encryption Config

SYNOPSIS
    gcloud dataplex encryption-config update
        (ENCRYPTION_CONFIG : --location=LOCATION --organization=ORGANIZATION)
        [--enable-metastore-encryption] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Encryption Config.

EXAMPLES
    To update EncryptionConfig in organization 123 and location us-central1,
    run:

        $ gcloud dataplex encryption-config update \
            organizations/123/locations/us-central1/encryptionConfigs/\
        default --enable-metastore-encryption

POSITIONAL ARGUMENTS
     Encryption config resource - Arguments and flags that define the Dataplex
     EncryptionConfig you want to update. The arguments in this group can be
     used to specify the attributes of this resource.

     This must be specified.

       ENCRYPTION_CONFIG
          ID of the encryption config or fully qualified identifier for the
          encryption config.

          To set the encryption_config attribute:
          + provide the argument encryption_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument encryption_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

       --organization=ORGANIZATION
          The name of encryption config to use.

          To set the organization attribute:
          + provide the argument encryption_config on the command line with a
            fully specified name;
          + provide the argument --organization on the command line.

FLAGS
     --enable-metastore-encryption
        Helps user to explicitly enable cmek encryption for dataplex metadata
        storage.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex encryption-config update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex encryption-config update organizations/123/locations/us-central1/encryptionConfigs/default \
    --enable-metastore-encryption
```

### gcloud alpha dataplex encryption-config create

```text
NAME
    gcloud alpha dataplex encryption-config create - create a Dataplex
        encryption config resource

SYNOPSIS
    gcloud alpha dataplex encryption-config create
        (ENCRYPTION_CONFIG : --location=LOCATION --organization=ORGANIZATION)
        [--key=KEY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex encryption-config describe

```text
NAME
    gcloud alpha dataplex encryption-config describe - describe an
        EncryptionConfig

SYNOPSIS
    gcloud alpha dataplex encryption-config describe
        (ENCRYPTION_CONFIG : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex encryption-config update

```text
NAME
    gcloud alpha dataplex encryption-config update - update an Encryption
        Config

SYNOPSIS
    gcloud alpha dataplex encryption-config update
        (ENCRYPTION_CONFIG : --location=LOCATION --organization=ORGANIZATION)
        [--enable-metastore-encryption] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/encryption-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
