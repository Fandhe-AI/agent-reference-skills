---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/open-console
---

# gcloud app open-console

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app open-console

```text
NAME
    gcloud app open-console - open the App Engine dashboard, or log viewer, in
        a web browser

SYNOPSIS
    gcloud app open-console [--logs, -l] [--service=SERVICE, -s SERVICE]
        [--version=VERSION, -v VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Open the App Engine dashboard, or log viewer, in a web browser.

EXAMPLES
    Open the App Engine dashboard for the default service:

        $ gcloud app open-console

    Open the service specific dashboard view:

        $ gcloud app open-console --service="myService"

    Open the version specific dashboard view:

        $ gcloud app open-console --service="myService" --version="v1"

    Open the log viewer for the default service:

        $ gcloud app open-console --logs

FLAGS
     --logs, -l
        Open the log viewer instead of the App Engine dashboard.

     --service=SERVICE, -s SERVICE
        The service to consider. If not specified, use the default service.

     --version=VERSION, -v VERSION
        The version to consider. If not specified, all versions for the given
        service are considered.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app open-console
```

### gcloud beta app open-console

```text
NAME
    gcloud beta app open-console - open the App Engine dashboard, or log
        viewer, in a web browser

SYNOPSIS
    gcloud beta app open-console [--logs, -l] [--service=SERVICE, -s SERVICE]
        [--version=VERSION, -v VERSION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/open-console (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
