---
source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/alerts
---

# gcloud monitoring alerts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud monitoring alerts describe

```text
NAME
    gcloud monitoring alerts describe - describe an alert

SYNOPSIS
    gcloud monitoring alerts describe ALERT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an alert.

EXAMPLES
    To describe an alert, run:

        $ gcloud monitoring alerts describe MY-ALERT

    To describe an alert in JSON, run:

        $ gcloud monitoring alerts describe MY-ALERT --format=json

    To describe an alert contained within a specific project, run:

        $ gcloud monitoring alerts describe MY-ALERT --project=MY-PROJECT

    To describe an alert with a fully qualified alert ID, run:

        $ gcloud monitoring alerts describe \
            projects/MY-PROJECT/alerts/MY-ALERT

POSITIONAL ARGUMENTS
     Alert resource - The alert to describe. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument alert on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ALERT
          ID of the alert or fully qualified identifier for the alert.

          To set the alert attribute:
          + provide the argument alert on the command line.

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

        $ gcloud alpha monitoring alerts describe

        $ gcloud beta monitoring alerts describe
```

### gcloud monitoring alerts list

```text
NAME
    gcloud monitoring alerts list - list alerts

SYNOPSIS
    gcloud monitoring alerts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=1000] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List alerts for a project.

EXAMPLES
    To list all open alerts:

        $ gcloud monitoring alerts list --filter="state=OPEN"

    To order alerts by when the alert was opened:

        $ gcloud monitoring alerts list --sort-by=open_time

    To order alerts by when the alert was opened in reverse order:

        $ gcloud monitoring alerts list --sort-by="open_time desc"

    To list alerts for a specific policy:

        $ gcloud monitoring alerts list --filter="policy.display_name="My \
            Policy""

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

     --page-size=PAGE_SIZE; default=1000
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        1000. Paging may be applied before or after --filter and --limit
        depending on the service.

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

        $ gcloud alpha monitoring alerts list

        $ gcloud beta monitoring alerts list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud monitoring alerts list \
    --filter='policy.display_name="My Policy"'
```

### gcloud beta monitoring alerts describe

```text
NAME
    gcloud beta monitoring alerts describe - describe an alert

SYNOPSIS
    gcloud beta monitoring alerts describe ALERT [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring alerts list

```text
NAME
    gcloud beta monitoring alerts list - list alerts

SYNOPSIS
    gcloud beta monitoring alerts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=1000] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring alerts describe

```text
NAME
    gcloud alpha monitoring alerts describe - describe an alert

SYNOPSIS
    gcloud alpha monitoring alerts describe ALERT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring alerts list

```text
NAME
    gcloud alpha monitoring alerts list - list alerts

SYNOPSIS
    gcloud alpha monitoring alerts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=1000] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the "specific policy" example nests double quotes (`--filter="policy.display_name="My Policy""`), so the shell ends the quoting before `Policy` (gcloud 593.0.0: "unrecognized arguments: Policy"); the runnable form single-quotes the filter: `--filter='policy.display_name="My Policy"'`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/alerts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
