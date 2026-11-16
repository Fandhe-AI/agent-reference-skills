---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services/operations
---

# gcloud services operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud services operations describe

```text
NAME
    gcloud services operations describe - describes an operation resource for a
        given operation name

SYNOPSIS
    gcloud services operations describe OPERATION [--full=FULL]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command will return information about an operation given the name of
    that operation.

EXAMPLES
    To describe an operation resource named operations/abc, run:

        $ gcloud services operations describe operations/abc

POSITIONAL ARGUMENTS
     OPERATION
        The name of the operation to describe.

FLAGS
     --full=FULL
        (DEPRECATED) This flag is deprecated.

        This flag is deprecated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services operations describe

        $ gcloud beta services operations describe
```

### gcloud services operations wait

```text
NAME
    gcloud services operations wait - waits for an operation to complete for a
        given operation name

SYNOPSIS
    gcloud services operations wait OPERATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command will block until an operation has been marked as complete.

EXAMPLES
    To wait on an operation named operations/abc to complete, run:

        $ gcloud services operations wait operations/abc

POSITIONAL ARGUMENTS
     OPERATION
        The name of the operation on which to wait.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services operations wait

        $ gcloud beta services operations wait
```

### gcloud beta services operations describe

```text
NAME
    gcloud beta services operations describe - describes an operation resource
        for a given operation name

SYNOPSIS
    gcloud beta services operations describe OPERATION [--full=FULL]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services operations wait

```text
NAME
    gcloud beta services operations wait - waits for an operation to complete
        for a given operation name

SYNOPSIS
    gcloud beta services operations wait OPERATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services operations describe

```text
NAME
    gcloud alpha services operations describe - describes an operation resource
        for a given operation name

SYNOPSIS
    gcloud alpha services operations describe OPERATION [--full=FULL]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services operations wait

```text
NAME
    gcloud alpha services operations wait - waits for an operation to complete
        for a given operation name

SYNOPSIS
    gcloud alpha services operations wait OPERATION [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud services operations describe --full`: "This flag is deprecated.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/services/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
