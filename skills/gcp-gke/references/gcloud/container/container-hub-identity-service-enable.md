---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/identity-service/enable
---

# gcloud container hub identity-service enable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub identity-service enable

```text
NAME
    gcloud container hub identity-service enable - enable the Identity Service
        Feature

SYNOPSIS
    gcloud container hub identity-service enable
        [--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command enables the Identity Service Feature in a fleet.

EXAMPLES
    To enable the Identity Service Feature, run:

        $ gcloud container hub identity-service enable

    To enable the Identity Service Feature with a fleet-level default
    membership configuration, run:

        $ gcloud container hub identity-service enable \
            --fleet-default-member-config=/path/to/identity-service.yaml

FLAGS
     --fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
        The path to an identity-service.yaml identity configuration file. If
        specified, this configuration would be the default Identity Service
        configuration for all memberships in your fleet. It could be overridden
        with a membership-specific configuration by using the the Apply command
        with the --config argument.

            To enable the Identity Service Feature with a fleet-level default
            membership configuration, run:

            $ gcloud container hub identity-service enable \
            --fleet-default-member-config=/path/to/identity-service.yaml

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub identity-service enable

        $ gcloud beta container hub identity-service enable
```

### gcloud beta container hub identity-service enable

```text
NAME
    gcloud beta container hub identity-service enable - enable the Identity
        Service Feature

SYNOPSIS
    gcloud beta container hub identity-service enable
        [--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub identity-service enable

```text
NAME
    gcloud alpha container hub identity-service enable - enable the Identity
        Service Feature

SYNOPSIS
    gcloud alpha container hub identity-service enable
        [--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/identity-service/enable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
