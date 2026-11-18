---
source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/snoozes
---

# gcloud monitoring snoozes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud monitoring snoozes cancel

```text
NAME
    gcloud monitoring snoozes cancel - cancels a snooze

SYNOPSIS
    gcloud monitoring snoozes cancel SNOOZE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a snooze.

    If the start time is in the future, then this command is equivalent to:

      o update --start-time="+PT1S" --end-time="+PT1S

    Otherwise, if the start time is past and the ending time is in the future,
    then this command is equivalent to:

      o update --end-time="+PT1S

    For information about the JSON/YAML format of a snooze:
    https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.snoozes

EXAMPLES
    To cancel a snooze, run:

        $ gcloud monitoring snoozes cancel MY-SNOOZE

    To cancel a snooze contained within a specific project, run:

        $ gcloud monitoring snoozes cancel MY-SNOOZE --project=MY-PROJECT

    To cancel a snooze with a fully qualified snooze ID, run:

        $ gcloud monitoring snoozes cancel \
            projects/MY-PROJECT/snoozes/MY-SNOOZE

POSITIONAL ARGUMENTS
     Snooze resource - Name of the Snooze to be canceled. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument snooze on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNOOZE
          ID of the Snooze or fully qualified identifier for the Snooze.

          To set the snooze attribute:
          + provide the argument snooze on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring snoozes cancel

        $ gcloud beta monitoring snoozes cancel
```

### gcloud monitoring snoozes create

```text
NAME
    gcloud monitoring snoozes create - create a new snooze

SYNOPSIS
    gcloud monitoring snoozes create [--snooze-from-file=PATH_TO_FILE]
        [--criteria-filter=CRITERIA_FILTER
          --criteria-policies=CRITERIA_POLICIES,[...]
          --display-name=DISPLAY_NAME
          --end-time=END_TIME --start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new snooze. A snooze can be specified as a JSON/YAML value passed
    in as a file through the --snooze-from-file flag. A snooze can also be
    specified through command line flags. If a snooze is specified through
    --snooze-from-file, and additional flags are supplied, the flags will
    override the snooze's settings.

    For information about the JSON/YAML format of a snooze:
    https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.snoozes

EXAMPLES
    To create a snooze with command-line options, run:

        $ gcloud monitoring snoozes create \
            --criteria-policies=LIST_OF_POLICIES --criteria-filter=FILTER \
            --display-name=DISPLAY_NAME --start-time=START_TIME \
            --end-time=END_TIME

    To create a snooze with a file, run:

        $ gcloud monitoring snoozes create --snooze-from-file=MY-FILE

    Sample contents of MY-FILE:

        criteria:
          policies:
          - projects/MY-PROJECT/alertPolicies/MY-POLICY
          filter: 'resource.labels.zone="us-central1-a" AND resource.labels.instance_id="1234567890"'
        interval:
          startTime: '2024-03-01T08:00:00Z'
          endTime: '2024-03-08T04:59:59.500Z'
        displayName: New Snooze

FLAGS
     --snooze-from-file=PATH_TO_FILE
        The path to a JSON or YAML file containing the snooze. Use a full or
        relative path to a local file containing the value of snooze.

     Snooze Settings. If any of these are specified, they will overwrite fields
     in the --snooze-from-file flags if specified.

     --criteria-filter=CRITERIA_FILTER
        Optional. When you define a Snooze, you can also define a filter for
        that snooze. The filter is a string containing one or more key-value
        pairs. The string uses the standard https://google.aip.dev/160 filter
        syntax. If you define a filter for a snooze, then the snooze can only
        apply to one alert policy. When the snooze is active, incidents won't
        be created when the incident would have key-value pairs (labels) that
        match those specified by the filter in the snooze. Snooze filters
        support resource, metric, and metadata labels. If multiple labels are
        used, then they must be connected with an AND operator. For example:
        resource.labels.instance_id="1234567890" AND
        resource.labels.zone="us-central1-a" AND
        metric.labels.instance_name="test_group" AND
        metadata.user_labels.foo="bar" AND
        metadata.system_labels.region="us-central1"

     --criteria-policies=CRITERIA_POLICIES,[...]
        The policies that the Snooze applies to. Exactly 1 alert policy is
        required if criteria-filter is specified at the same time.

     --display-name=DISPLAY_NAME
        The display name for the Snooze.

     --end-time=END_TIME
        The end time for the Snooze.

     --start-time=START_TIME
        The start time for the Snooze.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring snoozes create

        $ gcloud beta monitoring snoozes create
```

### gcloud monitoring snoozes describe

```text
NAME
    gcloud monitoring snoozes describe - describe a snooze

SYNOPSIS
    gcloud monitoring snoozes describe SNOOZE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a snooze.

EXAMPLES
    To describe a snooze, run:

        $ gcloud monitoring snoozes describe MY-SNOOZE

    To describe a snooze in JSON, run:

        $ gcloud monitoring snoozes describe MY-SNOOZE --format=json

    To describe a snooze contained within a specific project, run:

        $ gcloud monitoring snoozes describe MY-SNOOZE --project=MY-PROJECT

    To describe a snooze with a fully qualified snooze ID, run:

        $ gcloud monitoring snoozes describe \
            projects/MY-PROJECT/snoozes/MY-SNOOZE

POSITIONAL ARGUMENTS
     Snooze resource - Name of the Snooze to be described. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument snooze on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNOOZE
          ID of the Snooze or fully qualified identifier for the Snooze.

          To set the snooze attribute:
          + provide the argument snooze on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring snoozes describe

        $ gcloud beta monitoring snoozes describe
```

### gcloud monitoring snoozes list

```text
NAME
    gcloud monitoring snoozes list - list snoozes

SYNOPSIS
    gcloud monitoring snoozes list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List snoozes.

EXAMPLES
    To order your results first by the snooze's display name and then the end
    time:

        $ gcloud monitoring snoozes list \
            --sort-by=display_name,interval.end_time

    To order your results in reverse order, you can add '~' in front of the
    field name:

        $ gcloud monitoring snoozes list --sort-by="~display_name"

    To return results with expired snoozes only:

        $ gcloud monitoring snoozes list --filter="interval.end_time<+PT1S"

    To return results whose display name contain the word 'cloud':

        $ gcloud monitoring snoozes list --filter="display_name:(cloud)"

    More information can be found at
    https://cloud.google.com/sdk/gcloud/reference/topic/filters

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

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v3 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring snoozes list

        $ gcloud beta monitoring snoozes list
```

### gcloud monitoring snoozes update

```text
NAME
    gcloud monitoring snoozes update - updates a snooze

SYNOPSIS
    gcloud monitoring snoozes update SNOOZE [--snooze-from-file=PATH_TO_FILE]
        [--fields=[field,...] | --display-name=DISPLAY_NAME
          --end-time=END_TIME --start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a snooze.

    If --snooze-from-file is specified, then the update rules depend on the
    value of the (optional) --fields flag:

      o If --fields is specified, then only the specified fields of the
        snooze are updated.
      o Else, all fields of the snooze are replaced. The updated snooze can
        be modified further using the flags from the Snooze Settings group
        below.

    Otherwise, the snooze will be updated with the values specified in the
    flags from the Snooze Settings group.

    For information about the JSON/YAML format of a snooze:
    https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.snoozes

EXAMPLES
    To update a snooze time interval with command-line options, run:

        $ gcloud monitoring snoozes update MY-SNOOZE \
            --start-time=START_TIME --end-time=END_TIME

    To update a snooze display name with a file, run:

        $ gcloud monitoring snoozes update --snooze-from-file=MY-FILE \
            --fields=display_name

    Sample contents of MY-FILE:

        criteria:
          policies:
          - projects/MY-PROJECT/alertPolicies/MY-POLICY
        interval:
          startTime: '2024-03-01T08:00:00Z'
          endTime: '2024-03-08T04:59:59.500Z'
        displayName: New Snooze with New Display Name

POSITIONAL ARGUMENTS
     Snooze resource - Name of the Snooze to be updated. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument snooze on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNOOZE
          ID of the Snooze or fully qualified identifier for the Snooze.

          To set the snooze attribute:
          + provide the argument snooze on the command line.

FLAGS
     --snooze-from-file=PATH_TO_FILE
        The path to a JSON or YAML file containing the snooze. Use a full or
        relative path to a local file containing the value of snooze.

     At most one of these can be specified:

       --fields=[field,...]
          The list of fields to update. Must specify --snooze-from-file if
          using this flag.

       Or at least one of these can be specified:

         Snooze Settings. If any of these are specified, they will overwrite
         fields in the --snooze-from-file flags if specified.

         --display-name=DISPLAY_NAME
            The display name for the Snooze.

         --end-time=END_TIME
            The end time for the Snooze.

         --start-time=START_TIME
            The start time for the Snooze.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring snoozes update

        $ gcloud beta monitoring snoozes update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud monitoring snoozes update MY-SNOOZE \
    --snooze-from-file=MY-FILE \
    --fields=display_name
```

### gcloud beta monitoring snoozes cancel

```text
NAME
    gcloud beta monitoring snoozes cancel - cancels a snooze

SYNOPSIS
    gcloud beta monitoring snoozes cancel SNOOZE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring snoozes create

```text
NAME
    gcloud beta monitoring snoozes create - create a new snooze

SYNOPSIS
    gcloud beta monitoring snoozes create [--snooze-from-file=PATH_TO_FILE]
        [--criteria-filter=CRITERIA_FILTER
          --criteria-policies=CRITERIA_POLICIES,[...]
          --display-name=DISPLAY_NAME
          --end-time=END_TIME --start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring snoozes describe

```text
NAME
    gcloud beta monitoring snoozes describe - describe a snooze

SYNOPSIS
    gcloud beta monitoring snoozes describe SNOOZE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring snoozes list

```text
NAME
    gcloud beta monitoring snoozes list - list snoozes

SYNOPSIS
    gcloud beta monitoring snoozes list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring snoozes update

```text
NAME
    gcloud beta monitoring snoozes update - updates a snooze

SYNOPSIS
    gcloud beta monitoring snoozes update SNOOZE
        [--snooze-from-file=PATH_TO_FILE]
        [--fields=[field,...] | --display-name=DISPLAY_NAME
          --end-time=END_TIME --start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring snoozes cancel

```text
NAME
    gcloud alpha monitoring snoozes cancel - cancels a snooze

SYNOPSIS
    gcloud alpha monitoring snoozes cancel SNOOZE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring snoozes create

```text
NAME
    gcloud alpha monitoring snoozes create - create a new snooze

SYNOPSIS
    gcloud alpha monitoring snoozes create [--snooze-from-file=PATH_TO_FILE]
        [--criteria-filter=CRITERIA_FILTER
          --criteria-policies=CRITERIA_POLICIES,[...]
          --display-name=DISPLAY_NAME
          --end-time=END_TIME --start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring snoozes describe

```text
NAME
    gcloud alpha monitoring snoozes describe - describe a snooze

SYNOPSIS
    gcloud alpha monitoring snoozes describe SNOOZE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring snoozes list

```text
NAME
    gcloud alpha monitoring snoozes list - list snoozes

SYNOPSIS
    gcloud alpha monitoring snoozes list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring snoozes update

```text
NAME
    gcloud alpha monitoring snoozes update - updates a snooze

SYNOPSIS
    gcloud alpha monitoring snoozes update SNOOZE
        [--snooze-from-file=PATH_TO_FILE]
        [--fields=[field,...] | --display-name=DISPLAY_NAME
          --end-time=END_TIME --start-time=START_TIME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--snooze-from-file` update example omits the `SNOOZE` positional argument, which the SYNOPSIS requires (`gcloud monitoring snoozes update SNOOZE`; gcloud 593.0.0: "argument SNOOZE: Must be specified"); the runnable form adds `MY-SNOOZE`, the snooze of the other examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/snoozes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
