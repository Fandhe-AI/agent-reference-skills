---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/copy
---

# gcloud logging copy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging copy

```text
NAME
    gcloud logging copy - copy log entries

SYNOPSIS
    gcloud logging copy BUCKET_ID DESTINATION --location=LOCATION
        [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud logging copy starts the process to copy log entries from a log
    bucket to a destination.

EXAMPLES
    To start a copy log entries operation, run:

        $ gcloud logging copy BUCKET_ID DESTINATION --location=LOCATION

    To copy log entries in a specific time window, run:

        $ gcloud logging copy BUCKET_ID DESTINATION --location=LOCATION \
            --log-filter='timestamp<="2021-05-31T23:59:59Z" AND
         timestamp>="2021-05-31T00:00:00Z"'

POSITIONAL ARGUMENTS
     BUCKET_ID
        Id of the log bucket to copy logs from. Example: my-bucket

     DESTINATION
        Destination to copy logs to. Example: Cloud Storage bucket:
        storage.googleapis.com/my-cloud-storage-bucket

REQUIRED FLAGS
     --location=LOCATION
        Location of the log bucket.

OPTIONAL FLAGS
     --log-filter=LOG_FILTER
        A filter specifying which log entries to copy. The filter must be no
        more than 20k characters. An empty filter matches all log entries.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the log entries to copy.

       --folder=FOLDER_ID
          Folder of the log entries to copy.

       --organization=ORGANIZATION_ID
          Organization of the log entries to copy.

       --project=PROJECT_ID
          Project of the log entries to copy.

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

        $ gcloud alpha logging copy

        $ gcloud beta logging copy
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud logging copy BUCKET_ID DESTINATION \
    --location=LOCATION \
    --log-filter='timestamp<="2021-05-31T23:59:59Z" AND timestamp>="2021-05-31T00:00:00Z"'
```

### gcloud beta logging copy

```text
NAME
    gcloud beta logging copy - copy log entries

SYNOPSIS
    gcloud beta logging copy BUCKET_ID DESTINATION --location=LOCATION
        [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging copy

```text
NAME
    gcloud alpha logging copy - copy log entries

SYNOPSIS
    gcloud alpha logging copy BUCKET_ID DESTINATION --location=LOCATION
        [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/copy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
