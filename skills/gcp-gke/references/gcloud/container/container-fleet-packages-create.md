---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/packages/create
---

# gcloud container fleet packages create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet packages create

```text
NAME
    gcloud container fleet packages create - create Package Rollouts Fleet
        Package

SYNOPSIS
    gcloud container fleet packages create NAME --source=SOURCE
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create Package Rollouts Fleet Package.

EXAMPLES
    To create Fleet Package cert-manager-app, run:

        $ gcloud container fleet packages create cert-manager-app \
             --source=source.yaml

POSITIONAL ARGUMENTS
     NAME
        Resource name.

REQUIRED FLAGS
     --source=SOURCE
        Source file containing Fleet Package configuration.

OPTIONAL FLAGS
     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet packages create

        $ gcloud beta container fleet packages create
```

### gcloud beta container fleet packages create

```text
NAME
    gcloud beta container fleet packages create - create Package Rollouts Fleet
        Package

SYNOPSIS
    gcloud beta container fleet packages create NAME --source=SOURCE
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet packages create

```text
NAME
    gcloud alpha container fleet packages create - create Package Rollouts
        Fleet Package

SYNOPSIS
    gcloud alpha container fleet packages create NAME --source=SOURCE
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/packages/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
