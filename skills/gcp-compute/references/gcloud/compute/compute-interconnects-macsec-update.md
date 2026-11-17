---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/macsec/update
---

# gcloud compute interconnects macsec update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects macsec update

```text
NAME
    gcloud compute interconnects macsec update - update a Compute Engine
        interconnect MACsec configuration

SYNOPSIS
    gcloud compute interconnects macsec update NAME [--enabled] [--fail-open]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects macsec update is used to update MACsec
    configuration of interconnect. An interconnect represents a single specific
    connection between Google and the customer.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To enable MACsec on an interconnect, run:

        $ gcloud compute interconnects macsec update example-interconnect \
            --enabled

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect to update.

FLAGS
     --enabled
        Enable or disable MACsec on this Interconnect. MACsec enablement will
        fail if the MACsec configuration is not specified. Use --no-enabled to
        disable it.

     --fail-open
        If enabled, the Interconnect will be configured with a should-secure
        MACsec security policy, that allows the Google router to fallback to
        cleartext traffic if the MKA session cannot be established. By default,
        the Interconnect will be configured with a must-secure security policy
        that drops all traffic if the MKA session cannot be established with
        your router. Use --no-fail-open to disable it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects macsec update

        $ gcloud beta compute interconnects macsec update
```

### gcloud beta compute interconnects macsec update

```text
NAME
    gcloud beta compute interconnects macsec update - update a Compute Engine
        interconnect MACsec configuration

SYNOPSIS
    gcloud beta compute interconnects macsec update NAME [--enabled]
        [--fail-open] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects macsec update

```text
NAME
    gcloud alpha compute interconnects macsec update - update a Compute Engine
        interconnect MACsec configuration

SYNOPSIS
    gcloud alpha compute interconnects macsec update NAME [--enabled]
        [--fail-open] [--clear-key-group | --key-group=KEY_GROUP]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/macsec/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
