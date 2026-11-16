---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/fleetobservability/update
---

# gcloud container hub fleetobservability update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub fleetobservability update

```text
NAME
    gcloud container hub fleetobservability update - updates the Fleet
        Observability Feature resource

SYNOPSIS
    gcloud container hub fleetobservability update
        [--logging-config=LOGGING_CONFIG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates the Fleet Observability Feature in a fleet.

EXAMPLES
    To describe the Fleet Observability Feature, run:

        $ gcloud container hub fleetobservability update \
            --logging-config=LOGGING-CONFIG

FLAGS
     --logging-config=LOGGING_CONFIG
        Path of the YAML(or JSON) file that contains the logging
        configurations.

        The JSON file is formatted as follows, with camelCase field naming:

            {
                "loggingConfig": {
                    "defaultConfig": {
                        "mode": "COPY"
                    },
                    "fleetScopeLogsConfig": {
                        "mode": "MOVE"
                    }
                }
            }

        The YAML file is formatted as follows, with camelCase field naming:

            ---
            loggingConfig:
              defaultConfig:
                mode: COPY
              fleetScopeLogsConfig:
                mode: MOVE

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub fleetobservability update

        $ gcloud beta container hub fleetobservability update
```

### gcloud beta container hub fleetobservability update

```text
NAME
    gcloud beta container hub fleetobservability update - updates the Fleet
        Observability Feature resource

SYNOPSIS
    gcloud beta container hub fleetobservability update
        [--logging-config=LOGGING_CONFIG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub fleetobservability update

```text
NAME
    gcloud alpha container hub fleetobservability update - updates the Fleet
        Observability Feature resource

SYNOPSIS
    gcloud alpha container hub fleetobservability update
        [--logging-config=LOGGING_CONFIG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/fleetobservability/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
