---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/delete
---

# gcloud storage buckets delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage buckets delete

```text
NAME
    gcloud storage buckets delete - deletes Cloud Storage buckets

SYNOPSIS
    gcloud storage buckets delete URLS [URLS ...]
        [--additional-headers=HEADER=VALUE] [--continue-on-error, -c]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes one or more Cloud Storage buckets.

EXAMPLES
    Delete a Google Cloud Storage bucket named "my-bucket":

        $ gcloud storage buckets delete gs://my-bucket

    Delete two buckets:

        $ gcloud storage buckets delete gs://my-bucket gs://my-other-bucket

POSITIONAL ARGUMENTS
     URLS [URLS ...]
        Specifies the URLs of the buckets to delete.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --continue-on-error, -c
        If any operations are unsuccessful, the command will exit with a
        non-zero exit status after completing the remaining operations. This
        flag takes effect only in sequential execution mode (i.e. processor and
        thread count are set to 1). Parallelism is default.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage buckets delete
```

### gcloud alpha storage buckets delete

```text
NAME
    gcloud alpha storage buckets delete - deletes Cloud Storage buckets

SYNOPSIS
    gcloud alpha storage buckets delete URLS [URLS ...]
        [--additional-headers=HEADER=VALUE] [--continue-on-error, -c]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
