---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/logs
---

# gcloud app logs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app logs read

```text
NAME
    gcloud app logs read - reads log entries for the current App Engine app

SYNOPSIS
    gcloud app logs read [--level=LEVEL; default="any"]
        [--limit=LIMIT; default=200]
        [--logs=APP_LOG,[APP_LOG,...];
          default="stderr,stdout,crash.log,nginx.request,request_log"]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the latest log entries from stdout, stderr and crash log for the
    current Google App Engine app in a human readable format. This command
    requires that the caller have the logging.logEntries.list permission.

EXAMPLES
    To display the latest entries for the current app, run:

        $ gcloud app logs read

    To show only the entries with severity at warning or higher, run:

        $ gcloud app logs read --level=warning

    To show only the entries with a specific version, run:

        $ gcloud app logs read --version=v1

    To show only the 10 latest log entries for the default service, run:

        $ gcloud app logs read --limit=10 --service=default

    To show only the logs from the request log for standard apps, run:

        $ gcloud app logs read --logs=request_log

    To show only the logs from the request log for Flex apps, run:

        $ gcloud app logs read --logs=nginx.request

FLAGS
     --level=LEVEL; default="any"
        Filter entries with severity equal to or higher than a given level.
        LEVEL must be one of: critical, error, warning, info, debug, any.

     --limit=LIMIT; default=200
        Number of log entries to show.

     --logs=APP_LOG,[APP_LOG,...]; default="stderr,stdout,crash.log,nginx.request,request_log"
        Filter entries from a particular set of logs. Must be a comma-separated
        list of log names (request_log, stdout, stderr, etc).

     --service=SERVICE, -s SERVICE
        Limit to specific service.

     --version=VERSION, -v VERSION
        Limit to specific version.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app logs read
```

### gcloud app logs tail

```text
NAME
    gcloud app logs tail - streams logs for App Engine apps

SYNOPSIS
    gcloud app logs tail [--level=LEVEL; default="any"]
        [--logs=APP_LOG,[APP_LOG,...];
          default="stderr,stdout,crash.log,nginx.request,request_log"]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Streams logs for App Engine apps.

EXAMPLES
    To stream logs from a serving app, run:

        $ gcloud app logs tail

    To show only logs with a specific service, version, and level, run:

        $ gcloud app logs tail --service=s1 --version=v1 --level=warning

    To show only the logs from the request log for Standard apps, run:

        $ gcloud app logs tail --logs=request_log

    To show only the logs from the request log for Flex apps, run:

        $ gcloud app logs tail --logs=nginx.request

FLAGS
     --level=LEVEL; default="any"
        Filter entries with severity equal to or higher than a given level.
        LEVEL must be one of: critical, error, warning, info, debug, any.

     --logs=APP_LOG,[APP_LOG,...]; default="stderr,stdout,crash.log,nginx.request,request_log"
        Filter entries from a particular set of logs. Must be a comma-separated
        list of log names (request_log, stdout, stderr, etc).

     --service=SERVICE, -s SERVICE
        Limit to specific service.

     --version=VERSION, -v VERSION
        Limit to specific version.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app logs tail
```

### gcloud beta app logs read

```text
NAME
    gcloud beta app logs read - reads log entries for the current App Engine
        app

SYNOPSIS
    gcloud beta app logs read [--level=LEVEL; default="any"]
        [--limit=LIMIT; default=200]
        [--logs=APP_LOG,[APP_LOG,...];
          default="stderr,stdout,crash.log,nginx.request,request_log"]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app logs tail

```text
NAME
    gcloud beta app logs tail - streams logs for App Engine apps

SYNOPSIS
    gcloud beta app logs tail [--level=LEVEL; default="any"]
        [--logs=APP_LOG,[APP_LOG,...];
          default="stderr,stdout,crash.log,nginx.request,request_log"]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/logs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
