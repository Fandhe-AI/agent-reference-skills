---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/workload-identity/disable
---

# gcloud container fleet workload-identity disable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet workload-identity disable

```text
NAME
    gcloud container fleet workload-identity disable - disable Workload
        Identity Feature

SYNOPSIS
    gcloud container fleet workload-identity disable [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable the Workload Identity Feature in a fleet.

EXAMPLES
    To disable the Workload Identity Feature, run:

        $ gcloud container fleet workload-identity disable

FLAGS
     --force
        Force disablement. Bypasses any prompts for confirmation. When
        disabling the entire feature, proceeds even if the feature is in use.
        Might result in unexpected behavior.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet workload-identity disable

        $ gcloud beta container fleet workload-identity disable
```

### gcloud beta container fleet workload-identity disable

```text
NAME
    gcloud beta container fleet workload-identity disable - disable Workload
        Identity Feature

SYNOPSIS
    gcloud beta container fleet workload-identity disable [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet workload-identity disable

```text
NAME
    gcloud alpha container fleet workload-identity disable - disable Workload
        Identity Feature

SYNOPSIS
    gcloud alpha container fleet workload-identity disable [--force]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/workload-identity/disable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
