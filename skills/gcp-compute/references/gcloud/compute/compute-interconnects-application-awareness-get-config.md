---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/get-config
---

# gcloud compute interconnects application-awareness get-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects application-awareness get-config

```text
NAME
    gcloud compute interconnects application-awareness get-config - get
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud compute interconnects application-awareness get-config NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects application-awareness get-config displays
    configuration data associated with application awareness on Compute Engine
    interconnect in a project.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To displays configuration data associated with application awareness on
    Compute Engine interconnect in a project, run:

        $ gcloud compute interconnects application-awareness get-config \
            example-interconnect

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects application-awareness get-config

        $ gcloud beta compute interconnects application-awareness get-config
```

### gcloud beta compute interconnects application-awareness get-config

```text
NAME
    gcloud beta compute interconnects application-awareness get-config - get
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud beta compute interconnects application-awareness get-config NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects application-awareness get-config

```text
NAME
    gcloud alpha compute interconnects application-awareness get-config - get
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud alpha compute interconnects application-awareness get-config NAME
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/get-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
