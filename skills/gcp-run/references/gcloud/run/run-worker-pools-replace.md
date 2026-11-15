---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/replace
---

# gcloud run worker-pools replace

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run worker-pools replace

```text
NAME
    gcloud run worker-pools replace - create or replace a worker-pool from a
        YAML worker-pool specification

SYNOPSIS
    gcloud run worker-pools replace [FILE] [--async] [--dry-run]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates or replaces a worker-pool from a YAML worker-pool specification.

EXAMPLES
    To replace the specification for a worker-pool defined in
    my-worker-pool.yaml

        $ gcloud run worker-pools replace my-worker-pool.yaml

POSITIONAL ARGUMENTS
     [FILE]
        The absolute path to the YAML file with a Cloud Run worker-pool
        definition for the worker-pool to update or create. Defaults to
        worker-pool.yaml if not specified.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --dry-run
        If set to true, only validates the configuration. The configuration is
        not applied.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run worker-pools replace

        $ gcloud beta run worker-pools replace
```

### gcloud beta run worker-pools replace

```text
NAME
    gcloud beta run worker-pools replace - create or replace a worker-pool from
        a YAML worker-pool specification

SYNOPSIS
    gcloud beta run worker-pools replace [FILE] [--async] [--dry-run]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools replace

```text
NAME
    gcloud alpha run worker-pools replace - create or replace a worker-pool
        from a YAML worker-pool specification

SYNOPSIS
    gcloud alpha run worker-pools replace [FILE] [--async] [--dry-run]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/replace (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
