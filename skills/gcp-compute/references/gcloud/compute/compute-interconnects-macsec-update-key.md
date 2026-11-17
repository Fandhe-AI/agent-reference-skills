---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/macsec/update-key
---

# gcloud compute interconnects macsec update-key

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects macsec update-key

```text
NAME
    gcloud compute interconnects macsec update-key - update pre-shared key in a
        Compute Engine interconnect MACsec configuration

SYNOPSIS
    gcloud compute interconnects macsec update-key NAME --key-name=KEY_NAME
        [--start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects macsec update-key is used to update a
    pre-shared key in MACsec configuration of interconnect.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To update a pre-shared key in MACsec configuration, run:

        $ gcloud compute interconnects macsec update-key \
            example-interconnect --key-name=default-key \
            --start-time=2021-02-01T12:12:12Z

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect to update.

REQUIRED FLAGS
     --key-name=KEY_NAME
        A name of pre-shared key being added to MACsec configuration of the
        interconnect. The name must be 1-63 characters long, and comply with
        RFC1035.

OPTIONAL FLAGS
     --start-time=START_TIME
        A RFC3339 timestamp on or after which the key is valid. startTime can
        be in the future. If the keychain has a single key, --start-time can be
        omitted. If the keychain has multiple keys, --start-time is mandatory
        for each key. The start times of two consecutive keys must be at least
        6 hours apart.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects macsec update-key

        $ gcloud beta compute interconnects macsec update-key
```

### gcloud beta compute interconnects macsec update-key

```text
NAME
    gcloud beta compute interconnects macsec update-key - update pre-shared key
        in a Compute Engine interconnect MACsec configuration

SYNOPSIS
    gcloud beta compute interconnects macsec update-key NAME
        --key-name=KEY_NAME [--start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects macsec update-key

```text
NAME
    gcloud alpha compute interconnects macsec update-key - update pre-shared
        key in a Compute Engine interconnect MACsec configuration

SYNOPSIS
    gcloud alpha compute interconnects macsec update-key NAME
        --key-name=KEY_NAME [--start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/macsec/update-key (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
