---
source: https://docs.cloud.google.com/sdk/gcloud/reference/components/reinstall
---

# gcloud components reinstall

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud components reinstall

```text
NAME
    gcloud components reinstall - reinstall the Google Cloud CLI with the same
        components you have now

SYNOPSIS
    gcloud components reinstall [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If your Google Cloud CLI installation becomes corrupt, this command
    attempts to fix it by downloading the latest version of the Google Cloud
    CLI and reinstalling it. This will replace your existing installation with
    a fresh one. The command is the equivalent of deleting your current
    installation, downloading a fresh copy of the gcloud CLI, and installing in
    the same location.

EXAMPLES
    To reinstall all components you have installed, run:

        $ gcloud components reinstall

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/reinstall (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
