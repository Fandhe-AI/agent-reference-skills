---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/describe
---

# gcloud compute backend-buckets describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-buckets describe

```text
NAME
    gcloud compute backend-buckets describe - describe a backend bucket

SYNOPSIS
    gcloud compute backend-buckets describe BACKEND_BUCKET_NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-buckets describe displays all data associated with a
    backend bucket in a project.

POSITIONAL ARGUMENTS
     BACKEND_BUCKET_NAME
        Name of the backend bucket to describe.

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend bucket is global.

       --region=REGION
          Region of the backend bucket to describe. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-buckets describe

        $ gcloud beta compute backend-buckets describe
```

### gcloud beta compute backend-buckets describe

```text
NAME
    gcloud beta compute backend-buckets describe - describe a backend bucket

SYNOPSIS
    gcloud beta compute backend-buckets describe BACKEND_BUCKET_NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute backend-buckets describe

```text
NAME
    gcloud alpha compute backend-buckets describe - describe a backend bucket

SYNOPSIS
    gcloud alpha compute backend-buckets describe BACKEND_BUCKET_NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
