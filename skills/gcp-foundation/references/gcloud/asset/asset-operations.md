---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/operations
---

# gcloud asset operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud asset operations describe

```text
NAME
    gcloud asset operations describe - describe a Cloud Asset Inventory
        operation

SYNOPSIS
    gcloud asset operations describe OPERATION_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Asset Inventory operation.

EXAMPLES
    To describe the operation
    'projects/19306908007/operations/ExportAssets/RESOURCE/78689643348272423423',
    run:

        $ gcloud asset operations describe \
            projects/19306908007/operations/ExportAssets/RESOURCE/\
        78689643348272423423

POSITIONAL ARGUMENTS
     OPERATION_NAME
        Name of the operation to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha asset operations describe

        $ gcloud beta asset operations describe
```

### gcloud beta asset operations describe

```text
NAME
    gcloud beta asset operations describe - describe a Cloud Asset Inventory
        operation

SYNOPSIS
    gcloud beta asset operations describe OPERATION_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset operations describe

```text
NAME
    gcloud alpha asset operations describe - describe a Cloud Asset Inventory
        operation

SYNOPSIS
    gcloud alpha asset operations describe OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
