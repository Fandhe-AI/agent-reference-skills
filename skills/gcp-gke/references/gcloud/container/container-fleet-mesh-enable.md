---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/mesh/enable
---

# gcloud container fleet mesh enable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet mesh enable

```text
NAME
    gcloud container fleet mesh enable - enable Service Mesh Feature

SYNOPSIS
    gcloud container fleet mesh enable
        [--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable the Service Mesh Feature in a fleet.

EXAMPLES
    To enable the Service Mesh Feature, run:

        $ gcloud container fleet mesh enable

    To enable the Service Mesh Feature with a fleet-level default Membership
    configuration, run:

        $ gcloud container fleet mesh enable \
            --fleet-default-member-config=/path/to/service-mesh.yaml

FLAGS
     --fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
        The path to a service-mesh.yaml configuration file.

            To enable the Service Mesh Feature with a fleet-level default
            membership configuration, run:

            $ gcloud container fleet mesh enable \
            --fleet-default-member-config=/path/to/service-mesh.yaml

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet mesh enable

        $ gcloud beta container fleet mesh enable
```

### gcloud beta container fleet mesh enable

```text
NAME
    gcloud beta container fleet mesh enable - enable Service Mesh Feature

SYNOPSIS
    gcloud beta container fleet mesh enable
        [--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet mesh enable

```text
NAME
    gcloud alpha container fleet mesh enable - enable Service Mesh Feature

SYNOPSIS
    gcloud alpha container fleet mesh enable
        [--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/mesh/enable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
