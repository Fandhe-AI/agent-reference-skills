---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/get-storage-shrink-config
---

# gcloud sql instances get-storage-shrink-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances get-storage-shrink-config

```text
NAME
    gcloud sql instances get-storage-shrink-config - displays the minimum
        storage size to which a Cloud SQL instance can be decreased

SYNOPSIS
    gcloud sql instances get-storage-shrink-config INSTANCE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the minimum storage size to which a Cloud SQL instance can be
    decreased.

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances get-storage-shrink-config

        $ gcloud beta sql instances get-storage-shrink-config
```

### gcloud beta sql instances get-storage-shrink-config

```text
NAME
    gcloud beta sql instances get-storage-shrink-config - displays the minimum
        storage size to which a Cloud SQL instance can be decreased

SYNOPSIS
    gcloud beta sql instances get-storage-shrink-config INSTANCE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances get-storage-shrink-config

```text
NAME
    gcloud alpha sql instances get-storage-shrink-config - displays the minimum
        storage size to which a Cloud SQL instance can be decreased

SYNOPSIS
    gcloud alpha sql instances get-storage-shrink-config INSTANCE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/get-storage-shrink-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
