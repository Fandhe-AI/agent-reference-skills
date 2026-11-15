---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/browse
---

# gcloud app browse

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app browse

```text
NAME
    gcloud app browse - open the current app in a web browser

SYNOPSIS
    gcloud app browse [--no-launch-browser] [--service=SERVICE, -s SERVICE]
        [--version=VERSION, -v VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Open the current app in a web browser.

EXAMPLES
    To open the default service, run:

        $ gcloud app browse

    To open a specific service, run:

        $ gcloud app browse --service="myService"

    To open a specific version, run:

        $ gcloud app browse --service="myService" --version="v1"

FLAGS
     --launch-browser
        Launch a browser if possible. When disabled, only displays the URL.
        Enabled by default, use --no-launch-browser to disable.

     --service=SERVICE, -s SERVICE
        The service that should be opened. If not specified, use the default
        service. May be used in conjunction with --version.

     --version=VERSION, -v VERSION
        The version of the app that should be opened. If not specified, choose
        a version based on the service's traffic split.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app browse
```

### gcloud beta app browse

```text
NAME
    gcloud beta app browse - open the current app in a web browser

SYNOPSIS
    gcloud beta app browse [--no-launch-browser]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/browse (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
