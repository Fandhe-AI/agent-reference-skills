---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/get-iam-policy
---

# gcloud storage buckets get-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage buckets get-iam-policy

```text
NAME
    gcloud storage buckets get-iam-policy - get the IAM policy for a bucket

SYNOPSIS
    gcloud storage buckets get-iam-policy URL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy for a bucket. For more information, see Cloud Identity
    and Access Management
    (https://cloud.google.com/storage/docs/access-control/iam).

EXAMPLES
    To get the IAM policy for BUCKET:

        $ gcloud storage buckets get-iam-policy gs://BUCKET

    To output the IAM policy for BUCKET to a file:

        $ gcloud storage buckets get-iam-policy gs://BUCKET > policy.txt

POSITIONAL ARGUMENTS
     URL
        Request IAM policy for this bucket.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage buckets get-iam-policy
```

### gcloud alpha storage buckets get-iam-policy

```text
NAME
    gcloud alpha storage buckets get-iam-policy - get the IAM policy for a
        bucket

SYNOPSIS
    gcloud alpha storage buckets get-iam-policy URL [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/get-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
