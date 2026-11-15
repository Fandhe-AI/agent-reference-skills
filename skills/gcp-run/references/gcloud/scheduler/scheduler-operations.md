---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/operations
---

# gcloud scheduler operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scheduler operations describe

```text
NAME
    gcloud scheduler operations describe - show the latest status of an
        operation

SYNOPSIS
    gcloud scheduler operations describe --name=NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show the latest status of an operation.

EXAMPLES
    To describe the latest status of an operation:

        $ gcloud scheduler operations describe \
          projects/my-project/locations/us-central1/operations/\
        my-operation

REQUIRED FLAGS
     --name=NAME
        The full name of the Cloud Scheduler operation to describe. Format:
        projects/{project}/locations/{location}/operations/{operation}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud scheduler operations describe \
    --name=projects/my-project/locations/us-central1/operations/my-operation
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes the operation name as a positional argument, but the SYNOPSIS has no positional argument and requires `--name=NAME` (gcloud 593.0.0: "unrecognized arguments"); the runnable form passes the name with `--name=`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
