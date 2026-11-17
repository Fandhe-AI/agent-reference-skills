---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/cross-site-networks/create
---

# gcloud compute interconnects cross-site-networks create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects cross-site-networks create

```text
NAME
    gcloud compute interconnects cross-site-networks create - create a Compute
        Engine cross site network

SYNOPSIS
    gcloud compute interconnects cross-site-networks create NAME
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects cross-site-networks create is used to create
    cross site networks. A cross site network contains wire groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To create a cross site network, run:

        $ gcloud compute interconnects cross-site-networks create \
            example-csn --description="Example cross site network"

POSITIONAL ARGUMENTS
     NAME
        Name of the crossSiteNetwork to create.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the cross site network.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects cross-site-networks create

        $ gcloud beta compute interconnects cross-site-networks create
```

### gcloud beta compute interconnects cross-site-networks create

```text
NAME
    gcloud beta compute interconnects cross-site-networks create - create a
        Compute Engine cross site network

SYNOPSIS
    gcloud beta compute interconnects cross-site-networks create NAME
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects cross-site-networks create

```text
NAME
    gcloud alpha compute interconnects cross-site-networks create - create a
        Compute Engine cross site network

SYNOPSIS
    gcloud alpha compute interconnects cross-site-networks create NAME
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/cross-site-networks/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
