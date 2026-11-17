---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/update
---

# gcloud compute interconnects application-awareness update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects application-awareness update

```text
NAME
    gcloud compute interconnects application-awareness update - updates
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud compute interconnects application-awareness update NAME [--enabled]
        [--profile-description=PROFILE_DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects application-awareness update allows the user
    to enable or disable application awareness on Interconnect, as well as
    add/update the description of the application awareness on Interconnect
    profile. For an example, refer to the EXAMPLES section below.

EXAMPLES
    To update the application awareness config on Compute Engine interconnect
    in a project, run:

        $ gcloud compute interconnects application-awareness update \
            example-interconnect application-awareness update --enabled \
            --profile-description="Some string"

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

        $ gcloud alpha compute interconnects application-awareness update

        $ gcloud beta compute interconnects application-awareness update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute interconnects application-awareness update example-interconnect \
    --enabled \
    --profile-description="Some string"
```

### gcloud beta compute interconnects application-awareness update

```text
NAME
    gcloud beta compute interconnects application-awareness update - updates
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud beta compute interconnects application-awareness update NAME
        [--enabled] [--profile-description=PROFILE_DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects application-awareness update

```text
NAME
    gcloud alpha compute interconnects application-awareness update - updates
        application awareness configuration of a Compute Engine interconnect

SYNOPSIS
    gcloud alpha compute interconnects application-awareness update NAME
        [--enabled] [--profile-description=PROFILE_DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example repeats `application-awareness update` after NAME `example-interconnect`, which the SYNOPSIS does not accept as positional arguments; the runnable form drops the two extra words.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
