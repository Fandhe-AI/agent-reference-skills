---
source: https://docs.cloud.google.com/sdk/gcloud/reference/info
---

# gcloud info

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud info

```text
NAME
    gcloud info - display information about the current gcloud environment

SYNOPSIS
    gcloud info [--anonymize]
        [--show-log | [--run-diagnostics : --check-certs=HOSTNAME]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display information about the current gcloud environment.

EXAMPLES
    To display information about the current gcloud environment including the
    Google Cloud account, project and directory paths for logs, run:

        $ gcloud info

    To check network connectivity and hidden properties, run:

        $ gcloud info --run-diagnostics

    To troubleshoot certificate verification failures for a given host e.g.
    compute.googleapis.com when using a proxy and custom CA certs, run:

        $ gcloud info --run-diagnostics --check-certs=compute.googleapis.com

    To print the contents of the most recent log file, run:

        $ gcloud info --show-log

FLAGS
     --anonymize
        Minimize any personal identifiable information. Use it when sharing
        output with others.

     At most one of these can be specified:

       --show-log
          Print the contents of the last log file.

       Or at least one of these can be specified:

         --run-diagnostics
            Run diagnostics on your installation of the Google Cloud CLI.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --check-certs=HOSTNAME
            Run diagnostics on the certificate chain for a given host.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/info (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
