---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/get-operational-status
---

# gcloud compute interconnects groups get-operational-status

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects groups get-operational-status

```text
NAME
    gcloud compute interconnects groups get-operational-status - get the
        operational status of a Compute Engine interconnect group

SYNOPSIS
    gcloud compute interconnects groups get-operational-status NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects groups get-operational-status is used to get
    the operational status of an interconnect group.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To get the operational status of interconnect group
    example-interconnect-group, run:

        $ gcloud compute interconnects groups get-operational-status \
            example-interconnect-group

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect group to get operational status.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects groups get-operational-status

        $ gcloud beta compute interconnects groups get-operational-status
```

### gcloud beta compute interconnects groups get-operational-status

```text
NAME
    gcloud beta compute interconnects groups get-operational-status - get the
        operational status of a Compute Engine interconnect group

SYNOPSIS
    gcloud beta compute interconnects groups get-operational-status NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects groups get-operational-status

```text
NAME
    gcloud alpha compute interconnects groups get-operational-status - get the
        operational status of a Compute Engine interconnect group

SYNOPSIS
    gcloud alpha compute interconnects groups get-operational-status NAME
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/get-operational-status (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
