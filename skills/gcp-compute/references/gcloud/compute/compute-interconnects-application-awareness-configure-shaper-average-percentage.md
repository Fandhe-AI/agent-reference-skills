---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/configure-shaper-average-percentage
---

# gcloud compute interconnects application-awareness configure-shaper-average-percentage

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects application-awareness configure-shaper-average-percentage

```text
NAME
    gcloud compute interconnects application-awareness
        configure-shaper-average-percentage - configure shaper average
        percentage for application awareness configuration of a Compute Engine
        interconnect

SYNOPSIS
    gcloud compute interconnects application-awareness
        configure-shaper-average-percentage NAME
        --bandwidth-percentages=[TC1=TC1],
          [TC2=TC2],[TC3=TC3],[TC4=TC4],[TC5=TC5],[TC6=TC6] [--enabled]
        [--profile-description=PROFILE_DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects application-awareness
    configure-shaper-average-percentage is used to configure shaper average
    percentage for using application awareness on interconnect. Note that an
    application awareness policy (strict priority or bandwidth percentage)
    should be configure before configuring traffic shaping.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To configure shaper average percentage for an interconnect
    example-interconnect, run:

        $ gcloud compute interconnects application-awareness \
            configure-shaper-average-percentage example-interconnect \
            --bandwidth-percentages="TC1=30,TC2=90
        --enabled --profile-description="some string"

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect to patch.

REQUIRED FLAGS
     --bandwidth-percentages=[TC1=TC1],[TC2=TC2],[TC3=TC3],[TC4=TC4],[TC5=TC5],[TC6=TC6]
        A list of bandwidth percentages, for configuring the bandwidth
        percentage policy or traffic shaping.

        For configuring bandwidth percentages for the bandwidth percentage
        policy:

        1. Each bandwidth percentage value must be an integer between 1-100. 2.
        It is required to provide a percentage value for each class. 3. The sum
        of all bandwidth percentages must be 100.

        For configuring bandwidth percentages for traffic shaping:

        1. Each bandwidth percentage value must be an integer between 1-100. 2.
        It is not required to provide a percentage value for each class. 3. The
        sum of all bandwidth percentages does not need to be 100.

OPTIONAL FLAGS
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
            configure-shaper-average-percentage

        $ gcloud beta compute interconnects application-awareness \
            configure-shaper-average-percentage
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute interconnects application-awareness configure-shaper-average-percentage example-interconnect \
    --bandwidth-percentages="TC1=30,TC2=90" \
    --enabled \
    --profile-description="some string"
```

### gcloud beta compute interconnects application-awareness configure-shaper-average-percentage

```text
NAME
    gcloud beta compute interconnects application-awareness
        configure-shaper-average-percentage - configure shaper average
        percentage for application awareness configuration of a Compute Engine
        interconnect

SYNOPSIS
    gcloud beta compute interconnects application-awareness
        configure-shaper-average-percentage NAME
        --bandwidth-percentages=[TC1=TC1],
          [TC2=TC2],[TC3=TC3],[TC4=TC4],[TC5=TC5],[TC6=TC6] [--enabled]
        [--profile-description=PROFILE_DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects application-awareness configure-shaper-average-percentage

```text
NAME
    gcloud alpha compute interconnects application-awareness
        configure-shaper-average-percentage - configure shaper average
        percentage for application awareness configuration of a Compute Engine
        interconnect

SYNOPSIS
    gcloud alpha compute interconnects application-awareness
        configure-shaper-average-percentage NAME
        --bandwidth-percentages=[TC1=TC1],
          [TC2=TC2],[TC3=TC3],[TC4=TC4],[TC5=TC5],[TC6=TC6] [--enabled]
        [--profile-description=PROFILE_DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example does not close the `"` after `TC2=90`, so the shell keeps waiting for input; the runnable form closes it (`--bandwidth-percentages="TC1=30,TC2=90"`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/application-awareness/configure-shaper-average-percentage (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
