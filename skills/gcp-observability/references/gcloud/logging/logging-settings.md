---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/settings
---

# gcloud logging settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging settings describe

```text
NAME
    gcloud logging settings describe - display the settings for the Cloud
        Logging Logs Router

SYNOPSIS
    gcloud logging settings describe
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If kmsKeyName is present in the output, then CMEK is enabled for your
    project, folder, organization or billing-account. You can also find the
    Logs Router service account using this command.

EXAMPLES
    To describe the Logs Router settings for a project, run:

        $ gcloud logging settings describe --project=[PROJECT_ID]

    To describe the Logs Router settings for an organization, run:

        $ gcloud logging settings describe --organization=[ORGANIZATION_ID]

        kmsKeyName:
        'projects/my-project/locations/my-location/keyRings/my-keyring/cryptoKeys/key'
        name: 'organizations/[ORGANIZATION_ID]/settings'
        serviceAccountId:
        '[SERVICE_ACCOUNT_ID]@gcp-sa-logging.iam.gserviceaccount.com'

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the settings to describe.

       --folder=FOLDER_ID
          Folder of the settings to describe.

       --organization=ORGANIZATION_ID
          Organization of the settings to describe.

       --project=PROJECT_ID
          Project of the settings to describe.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging settings describe

        $ gcloud beta logging settings describe
```

### gcloud logging settings update

```text
NAME
    gcloud logging settings update - update the settings for the Cloud Logging
        Logs Router

SYNOPSIS
    gcloud logging settings update
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [--disable-default-sink] [--storage-location=STORAGE_LOCATION]
        [--clear-kms-key | [--kms-key-name=KMS_KEY_NAME
          : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Use this command to update the --kms-key-name, --storage-location,
    --disable-default-sink and --analytics-mode associated with the Cloud
    Logging Logs Router.

    The Cloud KMS key must already exist and Cloud Logging must have permission
    to access it.

    The storage location must be allowed by Org Policy.

    Customer-managed encryption keys (CMEK) for the Logs Router can currently
    only be configured at the organization-level and will apply to all projects
    in the organization.

EXAMPLES
    To enable CMEK for the Logs Router for an organization, run:

        $ gcloud logging settings update --organization=[ORGANIZATION_ID] \
            --kms-key-name='projects/my-project/locations/my-location/keyRin\
        gs/my-keyring/cryptoKeys/key'

    To disable CMEK for the Logs Router for an organization, run:

        $ gcloud logging settings update --organization=[ORGANIZATION_ID] \
            --clear-kms-key

    To update storage location for the Logs Router for an organization, run:

        $ gcloud logging settings update --organization=[ORGANIZATION_ID] \
            --storage-location=[LOCATION_ID]

    To update storage location for the Logs Router for a folder, run:

        $ gcloud logging settings update --folder=[FOLDER_ID] \
            --storage-location=[LOCATION_ID]

    To disable default sink for the Logs Router for an organization, run:

        $ gcloud logging settings update --organization=[ORGANIZATION_ID] \
            --disable-default-sink=true

    To enable default sink for the Logs Router for an organization, run:

        $ gcloud logging settings update --organization=[ORGANIZATION_ID] \
            --disable-default-sink=false

    To enable analytics for the log buckets under an organization, run:

        $ gcloud logging settings update --organization=[ORGANIZATION_ID] \
            --disable-default-sink=false --analytics-mode=required

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder to update Logs Router settings for.

       --organization=ORGANIZATION_ID
          Organization to update Logs Router settings for.

OPTIONAL FLAGS
     --disable-default-sink
        Enable or disable _Default sink for the _Default bucket. Specify
        --no-disable-default-sink to enable a disabled _Default sink. Note: It
        only applies to the newly created projects and will not affect the
        projects created before.

     --storage-location=STORAGE_LOCATION
        Update the storage location for _Default bucket and _Required bucket.
        Note: It only applies to the newly created projects and will not affect
        the projects created before.

     At most one of these can be specified:

       --clear-kms-key
          Disable CMEK for the Logs Router by clearing out Cloud KMS cryptokey
          in the organization's CMEK settings.

       Or at least one of these can be specified:

         Key resource - The Cloud KMS (Key Management Service) cryptokey that
         will be used to protect the logs being processed by the Cloud Logging
         Logs Router. The Cloud KMS CryptoKey Encrypter/Decryper role must be
         assigned to the Cloud Logging Logs Router service account. The
         arguments in this group can be used to specify the attributes of this
         resource.

         --kms-key-name=KMS_KEY_NAME
            ID of the key or fully qualified identifier for the key.

            To set the kms-key attribute:
            - provide the argument --kms-key-name on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --kms-keyring=KMS_KEYRING
            The KMS keyring of the key.

            To set the kms-keyring attribute:
            - provide the argument --kms-key-name on the command line with a
              fully specified name;
            - provide the argument --kms-keyring on the command line.

         --kms-location=KMS_LOCATION
            The Google Cloud location for the key.

            To set the kms-location attribute:
            - provide the argument --kms-key-name on the command line with a
              fully specified name;
            - provide the argument --kms-location on the command line.

         --kms-project=KMS_PROJECT
            The Google Cloud project for the key.

            To set the kms-project attribute:
            - provide the argument --kms-key-name on the command line with a
              fully specified name;
            - provide the argument --kms-project on the command line;
            - set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging settings update

        $ gcloud beta logging settings update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud logging settings update \
    --organization=[ORGANIZATION_ID] \
    --kms-key-name='projects/my-project/locations/my-location/keyRings/my-keyring/cryptoKeys/key'

gcloud logging settings update \
    --organization=[ORGANIZATION_ID] \
    --disable-default-sink

gcloud logging settings update \
    --organization=[ORGANIZATION_ID] \
    --no-disable-default-sink

gcloud beta logging settings update \
    --organization=[ORGANIZATION_ID] \
    --no-disable-default-sink \
    --analytics-mode=required
```

### gcloud beta logging settings describe

```text
NAME
    gcloud beta logging settings describe - display the settings for the Cloud
        Logging Logs Router

SYNOPSIS
    gcloud beta logging settings describe
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging settings update

```text
NAME
    gcloud beta logging settings update - update the settings for the Cloud
        Logging Logs Router

SYNOPSIS
    gcloud beta logging settings update
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [--disable-default-sink] [--storage-location=STORAGE_LOCATION]
        [--clear-kms-key | [--kms-key-name=KMS_KEY_NAME
          : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging settings describe

```text
NAME
    gcloud alpha logging settings describe - display the settings for the Cloud
        Logging Logs Router

SYNOPSIS
    gcloud alpha logging settings describe
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging settings update

```text
NAME
    gcloud alpha logging settings update - update the settings for the Cloud
        Logging Logs Router

SYNOPSIS
    gcloud alpha logging settings update
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [--disable-default-sink] [--storage-location=STORAGE_LOCATION]
        [--clear-kms-key | [--kms-key-name=KMS_KEY_NAME
          : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `--disable-default-sink` is a boolean flag that takes no value (gcloud 593.0.0: "ignored explicit argument 'true'"); the runnable form passes `--disable-default-sink` to disable the `_Default` sink and `--no-disable-default-sink` (as the flag description says) to enable it.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the analytics example passes `--analytics-mode`, which the GA command does not have in 593.0.0 ("unrecognized arguments"); `gcloud beta logging settings update` has it, so the runnable form uses the beta command. In addition, `--disable-default-sink` is a boolean flag that takes no value (gcloud 593.0.0: "ignored explicit argument 'false'"); the flag description says to specify `--no-disable-default-sink` to enable a disabled `_Default` sink.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
