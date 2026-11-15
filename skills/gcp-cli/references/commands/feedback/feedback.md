---
source: https://docs.cloud.google.com/sdk/gcloud/reference/feedback
---

# gcloud feedback

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud feedback

```text
NAME
    gcloud feedback - provide feedback to the Google Cloud CLI team

SYNOPSIS
    gcloud feedback [--log-file=LOG_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The Google Cloud CLI team offers support through a number of channels:

      o Paid Google Cloud support packages
      o Google Cloud CLI Issue Tracker

    This command lists the available channels and facilitates getting help
    through one of them by opening a web browser to the relevant page, possibly
    with information relevant to the current install and configuration
    pre-populated in form fields on that page.

EXAMPLES
    To send feedback, including the log file for the most recent command, run:

        $ gcloud feedback

    To send feedback with a previously generated log file named 'my-logfile',
    run:

        $ gcloud feedback --log-file=my-logfile

FLAGS
     --log-file=LOG_FILE
        Path to the log file from a prior gcloud run.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/feedback (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
