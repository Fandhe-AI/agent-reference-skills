---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/mesh/disable
---

# gcloud container hub mesh disable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub mesh disable

```text
NAME
    gcloud container hub mesh disable - disable Service Mesh Feature

SYNOPSIS
    gcloud container hub mesh disable [--fleet-default-member-config] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable the Service Mesh Feature in a fleet.

EXAMPLES
    To disable the Service Mesh Feature, run:

        $ gcloud container hub mesh disable

    To delete the fleet-level default Membership configuration, run:

        $ gcloud container hub mesh disable --fleet-default-member-config

FLAGS
     --fleet-default-member-config
        If specified, deletes the default membership configuration present in
        your fleet.

            To delete the fleet-level default Membership configuration present in
            your fleet, run:

            $ gcloud container hub mesh disable --fleet-default-member-config

     --force
        Disable this feature, even if it is currently in use. Force disablement
        may result in unexpected behavior.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub mesh disable

        $ gcloud beta container hub mesh disable
```

### gcloud beta container hub mesh disable

```text
NAME
    gcloud beta container hub mesh disable - disable Service Mesh Feature

SYNOPSIS
    gcloud beta container hub mesh disable [--fleet-default-member-config]
        [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub mesh disable

```text
NAME
    gcloud alpha container hub mesh disable - disable Service Mesh Feature

SYNOPSIS
    gcloud alpha container hub mesh disable [--fleet-default-member-config]
        [--force] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/mesh/disable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
