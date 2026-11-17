---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/locations
---

# gcloud service-directory locations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-directory locations describe

```text
NAME
    gcloud service-directory locations describe - describes a location

SYNOPSIS
    gcloud service-directory locations describe LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a location.

EXAMPLES
    To describe a Service Directory location, run:

        $ gcloud service-directory locations describe location us-east1

POSITIONAL ARGUMENTS
     Location resource - The Service Directory location to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory locations describe

        $ gcloud beta service-directory locations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud service-directory locations describe us-east1
```

### gcloud service-directory locations list

```text
NAME
    gcloud service-directory locations list - lists locations

SYNOPSIS
    gcloud service-directory locations list [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists locations.

EXAMPLES
    To describe a Service Directory location, run:

        $ gcloud service-directory locations list

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory locations list

        $ gcloud beta service-directory locations list
```

### gcloud beta service-directory locations describe

```text
NAME
    gcloud beta service-directory locations describe - describes a location

SYNOPSIS
    gcloud beta service-directory locations describe LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory locations list

```text
NAME
    gcloud beta service-directory locations list - lists locations

SYNOPSIS
    gcloud beta service-directory locations list [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory locations describe

```text
NAME
    gcloud alpha service-directory locations describe - describes a location

SYNOPSIS
    gcloud alpha service-directory locations describe LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory locations list

```text
NAME
    gcloud alpha service-directory locations list - lists locations

SYNOPSIS
    gcloud alpha service-directory locations list [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example passes `location us-east1`, but the SYNOPSIS takes a single positional `LOCATION` (gcloud 593.0.0: "unrecognized arguments: us-east1"); the runnable form passes only `us-east1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/locations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
