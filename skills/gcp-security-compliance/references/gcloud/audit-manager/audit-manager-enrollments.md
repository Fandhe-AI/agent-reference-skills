---
source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/enrollments
---

# gcloud audit-manager enrollments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud audit-manager enrollments add

```text
NAME
    gcloud audit-manager enrollments add - enroll a new scope

SYNOPSIS
    gcloud audit-manager enrollments add --eligible-gcs-buckets=BUCKET
        URI,[BUCKET URI,...]
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enroll a new scope.

EXAMPLES
    To enroll a project with ID 123 with gs://test-bucket-1 and
    gs://my-bucket-2 as eligible storage buckets, run:

        $ gcloud audit-manager enrollments add --project=123 \
            --eligible-gcs-buckets="gs://test-bucket-1,gs://my-bucket-2"

REQUIRED FLAGS
     --eligible-gcs-buckets=BUCKET URI,[BUCKET URI,...]
        Eligible cloud storage buckets where report and evidence can be
        uploaded.

     Exactly one of these must be specified:

       --folder=FOLDER
          Folder Id to enroll

       --organization=ORGANIZATION
          Organization Id to enroll

       --project=PROJECT
          Project Id to enroll

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha audit-manager enrollments add
```

### gcloud alpha audit-manager enrollments add

```text
NAME
    gcloud alpha audit-manager enrollments add - enroll a new scope

SYNOPSIS
    gcloud alpha audit-manager enrollments add --eligible-gcs-buckets=BUCKET
        URI,[BUCKET URI,...]
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/enrollments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
