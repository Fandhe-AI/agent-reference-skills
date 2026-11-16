---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/perform-storage-shrink
---

# gcloud sql instances perform-storage-shrink

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances perform-storage-shrink

```text
NAME
    gcloud sql instances perform-storage-shrink - performs a storage size
        decrease of a Cloud SQL instance

SYNOPSIS
    gcloud sql instances perform-storage-shrink INSTANCE [--async]
        [--storage-size=STORAGE_SIZE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Performs a storage size decrease of a Cloud SQL instance.

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --storage-size=STORAGE_SIZE
        The target storage size must be an integer that represents the number
        of GB. For example, --storage-size=10GB. Only supported for primary or
        standalone instances. You can't set a target storage size for a replica
        instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances perform-storage-shrink

        $ gcloud beta sql instances perform-storage-shrink
```

### gcloud beta sql instances perform-storage-shrink

```text
NAME
    gcloud beta sql instances perform-storage-shrink - performs a storage size
        decrease of a Cloud SQL instance

SYNOPSIS
    gcloud beta sql instances perform-storage-shrink INSTANCE [--async]
        [--storage-size=STORAGE_SIZE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances perform-storage-shrink

```text
NAME
    gcloud alpha sql instances perform-storage-shrink - performs a storage size
        decrease of a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql instances perform-storage-shrink INSTANCE [--async]
        [--storage-size=STORAGE_SIZE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/perform-storage-shrink (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
