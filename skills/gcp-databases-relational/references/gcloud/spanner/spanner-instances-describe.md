---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instances/describe
---

# gcloud spanner instances describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner instances describe

```text
NAME
    gcloud spanner instances describe - describe a Cloud Spanner instance

SYNOPSIS
    gcloud spanner instances describe INSTANCE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Spanner instance.

EXAMPLES
    To describe a Cloud Spanner instance, run:

        $ gcloud spanner instances describe my-instance-id

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud Spanner instance ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instances describe

        $ gcloud beta spanner instances describe
```

### gcloud beta spanner instances describe

```text
NAME
    gcloud beta spanner instances describe - describe a Cloud Spanner instance

SYNOPSIS
    gcloud beta spanner instances describe INSTANCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instances describe

```text
NAME
    gcloud alpha spanner instances describe - describe a Cloud Spanner instance

SYNOPSIS
    gcloud alpha spanner instances describe INSTANCE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instances/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
