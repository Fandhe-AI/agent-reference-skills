---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/describe
---

# gcloud compute networks describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks describe

```text
NAME
    gcloud compute networks describe - describe a Compute Engine network

SYNOPSIS
    gcloud compute networks describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute networks describe displays all data associated with Compute
    Engine network in a project.

EXAMPLES
    To describe a network with the name 'network-name', run:

        $ gcloud compute networks describe network-name

POSITIONAL ARGUMENTS
     NAME
        Name of the network to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute networks describe

        $ gcloud beta compute networks describe
```

### gcloud beta compute networks describe

```text
NAME
    gcloud beta compute networks describe - describe a Compute Engine network

SYNOPSIS
    gcloud beta compute networks describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute networks describe

```text
NAME
    gcloud alpha compute networks describe - describe a Compute Engine network

SYNOPSIS
    gcloud alpha compute networks describe NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
