---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/describe
---

# gcloud storage buckets describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage buckets describe

```text
NAME
    gcloud storage buckets describe - describes Cloud Storage buckets

SYNOPSIS
    gcloud storage buckets describe URL [--additional-headers=HEADER=VALUE]
        [--raw] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Storage bucket.

EXAMPLES
    Describe a Google Cloud Storage bucket named "my-bucket":

        $ gcloud storage buckets describe gs://my-bucket

    Describe bucket with JSON formatting, only returning the "name" key:

        $ gcloud storage buckets describe gs://my-bucket \
            --format="json(name)"

POSITIONAL ARGUMENTS
     URL
        Specifies URL of bucket to describe.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --raw
        Shows metadata in the format returned by the API instead of
        standardizing it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage buckets describe
```

### gcloud alpha storage buckets describe

```text
NAME
    gcloud alpha storage buckets describe - describes Cloud Storage buckets

SYNOPSIS
    gcloud alpha storage buckets describe URL
        [--additional-headers=HEADER=VALUE] [--raw] [--soft-deleted]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
