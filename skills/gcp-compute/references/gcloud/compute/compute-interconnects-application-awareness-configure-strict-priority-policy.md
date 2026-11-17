---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/configure-strict-priority-policy
---

# gcloud compute interconnects application-awareness configure-strict-priority-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects application-awareness configure-strict-priority-policy

```text
NAME
    gcloud compute interconnects application-awareness
        configure-strict-priority-policy - configure strict priority policy for
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud compute interconnects application-awareness
        configure-strict-priority-policy NAME [--enabled]
        [--profile-description=PROFILE_DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects application-awareness
    configure-strict-priority-policy is used to configure strict priority
    policy for using application awareness on interconnect.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To configure strict priority policy for an interconnect
    example-interconnect, run:

        $ gcloud compute interconnects application-awareness \
            configure-strict-priority-policy example-interconnect \
            --enabled --profile-description="some string"

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect to patch.

FLAGS
     --enabled
        Enable or disable application awareness on the interconnect.
        Application awareness enablement will fail if the application awareness
        configuration is not specified. Use --no-enabled to disable it.

     --profile-description=PROFILE_DESCRIPTION
        Add profile description for application awareness.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects application-awareness \
            configure-strict-priority-policy

        $ gcloud beta compute interconnects application-awareness \
            configure-strict-priority-policy
```

### gcloud beta compute interconnects application-awareness configure-strict-priority-policy

```text
NAME
    gcloud beta compute interconnects application-awareness
        configure-strict-priority-policy - configure strict priority policy for
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud beta compute interconnects application-awareness
        configure-strict-priority-policy NAME [--enabled]
        [--profile-description=PROFILE_DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects application-awareness configure-strict-priority-policy

```text
NAME
    gcloud alpha compute interconnects application-awareness
        configure-strict-priority-policy - configure strict priority policy for
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud alpha compute interconnects application-awareness
        configure-strict-priority-policy NAME [--enabled]
        [--profile-description=PROFILE_DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/configure-strict-priority-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
