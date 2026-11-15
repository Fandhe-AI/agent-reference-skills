---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/logs
---

# gcloud run worker-pools logs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run worker-pools logs read

```text
NAME
    gcloud run worker-pools logs read - read logs for a Cloud Run worker pool

SYNOPSIS
    gcloud run worker-pools logs read WORKER_POOL
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud run worker-pools logs read reads log entries. Log entries matching
    --log-filter are returned according to the specified --order. If the log
    entries come from multiple logs, then entries from different logs might be
    intermingled in the results.

EXAMPLES
    To read log entries from for a Cloud Run Worker Pool, run:

        $ gcloud run worker-pools logs read my-worker-pool

    To read log entries with severity ERROR or higher, run:

        $ gcloud run worker-pools logs read my-worker-pool \
            --log-filter="severity>=ERROR"

    To read log entries written in a specific time window, run:

        $ gcloud run worker-pools logs read my-worker-pool \
            --log-filter='timestamp<="2015-05-31T23:59:59Z" AND
         timestamp>="2015-05-31T00:00:00Z"'

    To read up to 10 log entries in your worker pool payloads that include the
    word SearchText and format the output in JSON format, run:

        $ gcloud run worker-pools logs read my-worker-pool \
            --log-filter="textPayload:SearchText" --limit=10 --format=json

    Detailed information about filters can be found at:
    https://cloud.google.com/logging/docs/view/advanced_filters

POSITIONAL ARGUMENTS
     WORKER_POOL
        Name for a Cloud Run worker pool.

FLAGS
     --freshness=FRESHNESS; default="1d"
        Return entries that are not older than this value. Works only with DESC
        ordering and filters without a timestamp. See $ gcloud topic datetimes
        for information on duration formats.

     --log-filter=LOG_FILTER
        Filter expression that specifies the log entries to return. Detailed
        information about filters can be found at:
        https://cloud.google.com/logging/docs/view/logging-query-language

     --order=ORDER; default="desc"
        Ordering of returned log entries based on timestamp field. ORDER must
        be one of: desc, asc.

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

LIST COMMAND FLAGS
     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run worker-pools logs read

        $ gcloud beta run worker-pools logs read
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud run worker-pools logs read my-worker-pool \
    --log-filter='timestamp<="2015-05-31T23:59:59Z" AND timestamp>="2015-05-31T00:00:00Z"'
```

### gcloud run worker-pools logs tail

```text
NAME
    gcloud run worker-pools logs tail - tail logs for a Cloud Run worker pool

SYNOPSIS
    gcloud run worker-pools logs tail WORKER_POOL [--log-filter=LOG_FILTER]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud run worker-pools logs tail tails log-entries for a particular Cloud
    Run worker pool in real time. The log entries are formatted for consumption
    in a terminal.

EXAMPLES
    To tail log entries for a Cloud Run Worker Pool, run:

        $ gcloud run worker-pools logs tail my-worker-pool

    To tail log entries with severity ERROR or higher, run:

        $ gcloud run worker-pools logs tail my-worker-pool \
            --log-filter="severity>=ERROR"

    Detailed information about filters can be found at:
    https://cloud.google.com/logging/docs/view/advanced_filters

POSITIONAL ARGUMENTS
     WORKER_POOL
        Name for a Cloud Run worker pool.

FLAGS
     --log-filter=LOG_FILTER
        Filter expression that specifies the log entries to return. Detailed
        information about filters can be found at:
        https://cloud.google.com/logging/docs/view/logging-query-language

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run worker-pools logs tail

        $ gcloud beta run worker-pools logs tail
```

### gcloud beta run worker-pools logs read

```text
NAME
    gcloud beta run worker-pools logs read - read logs for a Cloud Run worker
        pool

SYNOPSIS
    gcloud beta run worker-pools logs read WORKER_POOL
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run worker-pools logs tail

```text
NAME
    gcloud beta run worker-pools logs tail - tail logs for a Cloud Run worker
        pool

SYNOPSIS
    gcloud beta run worker-pools logs tail WORKER_POOL
        [--log-filter=LOG_FILTER] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools logs read

```text
NAME
    gcloud alpha run worker-pools logs read - read logs for a Cloud Run worker
        pool

SYNOPSIS
    gcloud alpha run worker-pools logs read WORKER_POOL
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools logs tail

```text
NAME
    gcloud alpha run worker-pools logs tail - tail logs for a Cloud Run worker
        pool

SYNOPSIS
    gcloud alpha run worker-pools logs tail WORKER_POOL
        [--log-filter=LOG_FILTER] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/logs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
