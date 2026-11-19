---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/config
---

# gcloud datalineage config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datalineage config describe

```text
NAME
    gcloud datalineage config describe - describe Data Lineage configuration

SYNOPSIS
    gcloud datalineage config describe
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe the configuration for the current project, run:

        $ gcloud datalineage config describe

    To describe the configuration for the project my-project, run:

        $ gcloud datalineage config describe --project=my-project

    To describe the configuration for the folder 123456, run:

        $ gcloud datalineage config describe --folder=123456

    To describe the configuration for the organization 789012, run:

        $ gcloud datalineage config describe --organization=789012

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder ID.

       --organization=ORGANIZATION
          Organization ID.

       --project=PROJECT
          Project ID or number. If none of --project, --folder, or
          --organization are provided, the current project will be used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datalineage config describe

        $ gcloud beta datalineage config describe
```

### gcloud datalineage config update

```text
NAME
    gcloud datalineage config update - update Data Lineage configuration

SYNOPSIS
    gcloud datalineage config update --config=CONFIG
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update the configuration for the current project using a JSON file
    ``my_config.json``, run:

        $ gcloud datalineage config update --config=my_config.json

    To update the configuration for the project ``my-project`` using an inline
    JSON string, run:

        $ gcloud datalineage config update --project=my-project \
        --config='{"ingestion": {"rules":
        [{"integrationSelector": {"integration": "BIGQUERY"},
        "lineageEnablement": {"enabled": true}}]}}'

REQUIRED FLAGS
     --config=CONFIG
        Inline JSON/YAML config or path to a file containing it.

OPTIONAL FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder ID.

       --organization=ORGANIZATION
          Organization ID.

       --project=PROJECT
          Project ID or number. If none of --project, --folder, or
          --organization are provided, the current project will be used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datalineage config update

        $ gcloud beta datalineage config update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud datalineage config update \
    --project=my-project \
    --config='{"ingestion": {"rules": [{"integrationSelector": {"integration": "BIGQUERY"}, "lineageEnablement": {"enabled": true}}]}}'
```

### gcloud beta datalineage config describe

```text
NAME
    gcloud beta datalineage config describe - describe Data Lineage
        configuration

SYNOPSIS
    gcloud beta datalineage config describe
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datalineage config update

```text
NAME
    gcloud beta datalineage config update - update Data Lineage configuration

SYNOPSIS
    gcloud beta datalineage config update --config=CONFIG
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage config describe

```text
NAME
    gcloud alpha datalineage config describe - describe Data Lineage
        configuration

SYNOPSIS
    gcloud alpha datalineage config describe
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datalineage config update

```text
NAME
    gcloud alpha datalineage config update - update Data Lineage configuration

SYNOPSIS
    gcloud alpha datalineage config update --config=CONFIG
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datalineage/config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
