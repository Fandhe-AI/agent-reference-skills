---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/metrics
---

# gcloud logging metrics

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging metrics create

```text
NAME
    gcloud logging metrics create - create a logs-based metric

SYNOPSIS
    gcloud logging metrics create METRIC_NAME
        (--config-from-file=PATH_TO_FILE
          | [--description=DESCRIPTION --log-filter=LOG_FILTER
          : --bucket-name=BUCKET_NAME]) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a logs-based metric to count the number of log entries that match a
    filter expression. Logs-based metrics can also be used to extract values
    from logs and create a distribution of the values.

    For more information, see the logs-based metrics overview at:
    https://cloud.google.com/logging/docs/logs-based-metrics.

EXAMPLES
    To create a metric that counts the number of log entries with a severity
    level higher than WARNING, run:

        $ gcloud logging metrics create high_severity_count \
            --description="Number of high severity log entries" \
            --log-filter="severity > WARNING"

    Detailed information about filters can be found at:
    https://cloud.google.com/logging/docs/view/logging-query-language

    To create a metric that uses advanced features like distribution or
    user-defined labels, run:

        $ gcloud logging metrics create my_metric \
            --config-from-file=$PATH_TO_FILE

    The config file can be in YAML or JSON format. Detailed information about
    how to configure metrics can be found at:
    https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.

    For an example of the file structure for a distribution metric, see:
    https://cloud.google.com/logging/docs/logs-based-metrics/distribution-metrics#example.

    To create a bucket log-based metric, run:

        $ gcloud logging metrics create my_bucket_metric \
            --description="DESCRIPTION" --log-filter="LOG_FILTER" \
            --bucket-name="BUCKET_NAME"

POSITIONAL ARGUMENTS
     METRIC_NAME
        The name of the new metric.

REQUIRED FLAGS
     Data about the new metric.

     Exactly one of these must be specified:

       --config-from-file=PATH_TO_FILE
          A path to a YAML or JSON file specifying the logs-based metric to
          create. For an example of the file structure, see
          https://cloud.google.com/logging/docs/logs-based-metrics/distribution-metrics#example.
          Use a full or relative path to a local file containing the value of
          config.

       Or at least one of these can be specified:

         A group of arguments to specify simple counter logs-based metrics.

         --description=DESCRIPTION
            The metric's description.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --log-filter=LOG_FILTER
            The metric's filter expression.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --bucket-name=BUCKET_NAME
            The Log Bucket name which owns the log-based metric.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging metrics create

        $ gcloud beta logging metrics create
```

Adapted (not in the official docs): runnable form of the example(s) above: `$VARIABLE` placeholders are quoted.

```bash
gcloud logging metrics create my_metric \
    --config-from-file="${PATH_TO_FILE}"
```

### gcloud logging metrics delete

```text
NAME
    gcloud logging metrics delete - delete a logs-based metric

SYNOPSIS
    gcloud logging metrics delete METRIC_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a logs-based metric called high_severity_count.

EXAMPLES
    To delete a metric called high_severity_count, run:

        $ gcloud logging metrics delete high_severity_count

POSITIONAL ARGUMENTS
     METRIC_NAME
        The name of the metric to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging metrics delete

        $ gcloud beta logging metrics delete
```

### gcloud logging metrics describe

```text
NAME
    gcloud logging metrics describe - display the definition of a logs-based
        metric

SYNOPSIS
    gcloud logging metrics describe METRIC_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show the definition of a logs-based metric.

EXAMPLES
    To show the definition of a metric called high_severity_count, run:

        $ gcloud logging metrics describe high_severity_count

POSITIONAL ARGUMENTS
     METRIC_NAME
        The name of the metric.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging metrics describe

        $ gcloud beta logging metrics describe
```

### gcloud logging metrics list

```text
NAME
    gcloud logging metrics list - display all logs-based metrics

SYNOPSIS
    gcloud logging metrics list [--filter=EXPRESSION] [--limit=LIMIT]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all logs-based metrics.

EXAMPLES
    To list the top 10 logs-based metrics, run:

        $ gcloud logging metrics list --limit=10

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging metrics list

        $ gcloud beta logging metrics list
```

### gcloud logging metrics update

```text
NAME
    gcloud logging metrics update - update the definition of a logs-based
        metric

SYNOPSIS
    gcloud logging metrics update METRIC_NAME
        (--config-from-file=PATH_TO_FILE | --bucket-name=BUCKET_NAME
          --description=DESCRIPTION --log-filter=LOG_FILTER)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the description or the filter expression of an existing logs-based
    metric.

    For more information, see the logs-based metrics overview at:
    https://cloud.google.com/logging/docs/logs-based-metrics.

EXAMPLES
    To update the description of a metric called high_severity_count, run:

        $ gcloud logging metrics update high_severity_count \
            --description="Count of high-severity log entries."

    To update the filter expression of the metric, run:

        $ gcloud logging metrics update high_severity_count \
            --log-filter="severity >= WARNING"

    Detailed information about filters can be found at:
    https://cloud.google.com/logging/docs/view/logging-query-language

    For advanced features such as user-defined labels and distribution metrics,
    update using a config file:

        $ gcloud logging metrics update high_severity_count \
            --config-from-file=$PATH_TO_FILE

    The config file should be in YAML format. Detailed information about how to
    configure metrics can be found at:
    https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.

    For an example of the file structure for a distribution metric, see:
    https://cloud.google.com/logging/docs/logs-based-metrics/distribution-metrics#example.

    Any top-level fields in the LogMetric definition that aren't specified in
    the config file will not be updated in the metric.

    To update the bucket associated with a bucket log-based metric, run:

        $ gcloud logging metrics update my-bucket-metric \
            --bucket-name="NEW_BUCKET_NAME"

POSITIONAL ARGUMENTS
     METRIC_NAME
        The name of the log-based metric to update.

REQUIRED FLAGS
     Data about the metric to update.

     Exactly one of these must be specified:

       --config-from-file=PATH_TO_FILE
          A path to a YAML file specifying the updates to be made to the
          logs-based metric. For an example of the file structure, see
          https://cloud.google.com/logging/docs/logs-based-metrics/distribution-metrics#example.
          Use a full or relative path to a local file containing the value of
          config.

       Or at least one of these can be specified:

         Arguments to specify information about simple counter logs-based
         metrics.

         --bucket-name=BUCKET_NAME
            The Log Bucket name which owns the log-based metric.

         --description=DESCRIPTION
            A new description for the metric. If omitted, the description is
            not changed.

         --log-filter=LOG_FILTER
            A new filter string for the metric. If omitted, the filter is not
            changed.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging metrics update

        $ gcloud beta logging metrics update
```

Adapted (not in the official docs): runnable form of the example(s) above: `$VARIABLE` placeholders are quoted.

```bash
gcloud logging metrics update high_severity_count \
    --config-from-file="${PATH_TO_FILE}"
```

### gcloud beta logging metrics create

```text
NAME
    gcloud beta logging metrics create - create a logs-based metric

SYNOPSIS
    gcloud beta logging metrics create METRIC_NAME
        (--config-from-file=PATH_TO_FILE
          | [--description=DESCRIPTION --log-filter=LOG_FILTER
          : --bucket-name=BUCKET_NAME]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging metrics delete

```text
NAME
    gcloud beta logging metrics delete - delete a logs-based metric

SYNOPSIS
    gcloud beta logging metrics delete METRIC_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging metrics describe

```text
NAME
    gcloud beta logging metrics describe - display the definition of a
        logs-based metric

SYNOPSIS
    gcloud beta logging metrics describe METRIC_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging metrics list

```text
NAME
    gcloud beta logging metrics list - display all logs-based metrics

SYNOPSIS
    gcloud beta logging metrics list [--filter=EXPRESSION] [--limit=LIMIT]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging metrics update

```text
NAME
    gcloud beta logging metrics update - update the definition of a logs-based
        metric

SYNOPSIS
    gcloud beta logging metrics update METRIC_NAME
        (--config-from-file=PATH_TO_FILE | --bucket-name=BUCKET_NAME
          --description=DESCRIPTION --log-filter=LOG_FILTER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging metrics create

```text
NAME
    gcloud alpha logging metrics create - create a logs-based metric

SYNOPSIS
    gcloud alpha logging metrics create METRIC_NAME
        (--config-from-file=PATH_TO_FILE
          | [--description=DESCRIPTION --log-filter=LOG_FILTER
          : --bucket-name=BUCKET_NAME]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging metrics delete

```text
NAME
    gcloud alpha logging metrics delete - delete a logs-based metric

SYNOPSIS
    gcloud alpha logging metrics delete METRIC_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging metrics describe

```text
NAME
    gcloud alpha logging metrics describe - display the definition of a
        logs-based metric

SYNOPSIS
    gcloud alpha logging metrics describe METRIC_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging metrics list

```text
NAME
    gcloud alpha logging metrics list - display all logs-based metrics

SYNOPSIS
    gcloud alpha logging metrics list [--filter=EXPRESSION] [--limit=LIMIT]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging metrics update

```text
NAME
    gcloud alpha logging metrics update - update the definition of a logs-based
        metric

SYNOPSIS
    gcloud alpha logging metrics update METRIC_NAME
        (--config-from-file=PATH_TO_FILE | --bucket-name=BUCKET_NAME
          --description=DESCRIPTION --log-filter=LOG_FILTER)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/metrics (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
