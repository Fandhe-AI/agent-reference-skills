---
source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/dashboards
---

# gcloud monitoring dashboards

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud monitoring dashboards create

```text
NAME
    gcloud monitoring dashboards create - create a new Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud monitoring dashboards create
        (--config=CONFIG | --config-from-file=PATH_TO_FILE) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Monitoring dashboard. A dashboard can be specified as a
    JSON/YAML value passed in as a string through the --config flag or as a
    file through the --config-from-file flag. Validate a dashboard config
    without saving by setting the --validate-only flag.

    For information about the format of a dashboard:
    https://cloud.google.com/monitoring/api/ref_v3/rest/v1/projects.dashboards

EXAMPLES
    To create a dashboard with a YAML config, run:

        $ gcloud monitoring dashboards create --config='''
          displayName: New Dashboard
          gridLayout:
            widgets:
            - text:
                content: Hello World
          '''

    To validate a dashboard and not save it, run:

        $ gcloud monitoring dashboards create --validate-only --config='''
          displayName: New Dashboard
          gridLayout:
            widgets:
            - text:
                content: Hello World
          '''

    To create a dashboard with a JSON config, run:

        $ gcloud monitoring dashboards create --config='''
          {
            "displayName": "New Dashboard",
            "gridLayout": {
              "widgets": [
                {
                  "text": {
                    "content": "Hello World",
                  }
                }
              ]
            },
          }
          '''

    To create a dashboard with a specific dashboard ID, run:

        $ gcloud monitoring dashboards create --config='''
          name: projects/MY-PROJECT/dashboards/MY-DASHBOARD
          displayName: New Dashboard
          gridLayout:
            widgets:
            - text:
                content: Hello World
          '''

    To create a dashboard within a specific project, run:

        $ gcloud monitoring dashboards create --project=MY-PROJECT \
            --config='''
          displayName: New Dashboard
          gridLayout:
            widgets:
            - text:
                content: Hello World
          '''

    To create a dashboard with a file, run:

        $ gcloud monitoring dashboards create --config-from-file=MY-FILE

    Sample contents of MY-FILE:

        displayName: New Dashboard
        gridLayout:
          widgets:
          - text:
              content: Hello World

REQUIRED FLAGS
     Exactly one of these must be specified:

       --config=CONFIG
          Dashboard configuration, in either JSON or YAML format, as a string.

       --config-from-file=PATH_TO_FILE
          Path to a JSON or YAML file containing the dashboard configuration.
          Use a full or relative path to a local file containing the value of
          config.

OPTIONAL FLAGS
     --validate-only
        When set, validate the dashboard but do not save it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring dashboards create

        $ gcloud beta monitoring dashboards create
```

### gcloud monitoring dashboards delete

```text
NAME
    gcloud monitoring dashboards delete - delete a Cloud Monitoring dashboard

SYNOPSIS
    gcloud monitoring dashboards delete DASHBOARD [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Monitoring dashboard.

EXAMPLES
    To delete a dashboard, run:

        $ gcloud monitoring dashboards delete MY-DASHBOARD

    To delete a dashboard contained within a specific project, run:

        $ gcloud monitoring dashboards delete MY-DASHBOARD \
            --project=MY-PROJECT

    To delete a dashboard with a fully qualified dashboard ID, run:

        $ gcloud monitoring dashboards delete \
            projects/MY-PROJECT/dashboards/MY-DASHBOARD

POSITIONAL ARGUMENTS
     Dashboard resource - The dashboard to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dashboard on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DASHBOARD
          ID of the dashboard or fully qualified identifier for the dashboard.

          To set the dashboard attribute:
          + provide the argument dashboard on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring dashboards delete

        $ gcloud beta monitoring dashboards delete
```

### gcloud monitoring dashboards describe

```text
NAME
    gcloud monitoring dashboards describe - describe a Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud monitoring dashboards describe DASHBOARD [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Monitoring dashboard.

EXAMPLES
    To describe a dashboard, run:

        $ gcloud monitoring dashboards describe MY-DASHBOARD

    To describe a dashboard in JSON, run:

        $ gcloud monitoring dashboards describe MY-DASHBOARD --format=json

    To describe a dashboard contained within a specific project, run:

        $ gcloud monitoring dashboards describe MY-DASHBOARD \
            --project=MY-PROJECT

    To describe a dashboard with a fully qualified dashboard ID, run:

        $ gcloud monitoring dashboards describe \
            projects/MY-PROJECT/dashboards/MY-DASHBOARD

POSITIONAL ARGUMENTS
     Dashboard resource - The dashboard to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dashboard on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DASHBOARD
          ID of the dashboard or fully qualified identifier for the dashboard.

          To set the dashboard attribute:
          + provide the argument dashboard on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring dashboards describe

        $ gcloud beta monitoring dashboards describe
```

### gcloud monitoring dashboards list

```text
NAME
    gcloud monitoring dashboards list - list Cloud Monitoring dashboards

SYNOPSIS
    gcloud monitoring dashboards list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Monitoring dashboards.

EXAMPLES
    To list dashboards, run:

        $ gcloud monitoring dashboards list

    To list dashboards for a specific project, run:

        $ gcloud monitoring dashboards list --project=MY-PROJECT

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
    This command uses the monitoring/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring dashboards list

        $ gcloud beta monitoring dashboards list
```

### gcloud monitoring dashboards update

```text
NAME
    gcloud monitoring dashboards update - update a Cloud Monitoring dashboard

SYNOPSIS
    gcloud monitoring dashboards update DASHBOARD
        (--config=CONFIG | --config-from-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Monitoring dashboard. The updated dashboard can be specified as a
    JSON/YAML value passed in as a string through the --config flag or as a
    file through the --config-from-file flag.

    Note: Etags are used to prevent concurrent updates to the same dashboard.
    The latest etag can be found in a describe or list response.

    For information about the format of a dashboard:
    https://cloud.google.com/monitoring/api/ref_v3/rest/v1/projects.dashboards

EXAMPLES
    To update a dashboard with a YAML config, run:

        $ gcloud monitoring dashboards update MY-DASHBOARD --config='''
          displayName: New Dashboard with New Display Name
          etag: 40d1040034db4e5a9dee931ec1b12c0d
          gridLayout:
            widgets:
            - text:
                content: Hello World
          '''

    To update a dashboard with a JSON config, run:

        $ gcloud monitoring dashboards update MY-DASHBOARD --config='''
          {
            "displayName": "New Dashboard with New Display Name",
            "etag": "40d1040034db4e5a9dee931ec1b12c0d",
            "gridLayout": {
              "widgets": [
                {
                  "text": {
                    "content": "Hello World",
                  }
                }
              ]
            },
          }
          '''

    To update a dashboard within a specific project, run:

        $ gcloud monitoring dashboards update MY-DASHBOARD \
            --project=MY-PROJECT --config='''
          displayName: New Dashboard with New Display Name
          etag: 40d1040034db4e5a9dee931ec1b12c0d
          gridLayout:
            widgets:
            - text:
                content: Hello World
          '''

    To update a dashboard with a file, run:

        $ gcloud monitoring dashboards update MY-DASHBOARD \
            --config-from-file=MY-FILE

    Sample contents of MY-FILE:

        displayName: New Dashboard with new Display Name
        etag: 40d1040034db4e5a9dee931ec1b12c0d
        gridLayout:
          widgets:
          - text:
              content: Hello World

POSITIONAL ARGUMENTS
     Dashboard resource - The dashboard to update. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dashboard on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DASHBOARD
          ID of the dashboard or fully qualified identifier for the dashboard.

          To set the dashboard attribute:
          + provide the argument dashboard on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --config=CONFIG
          Dashboard configuration, in either JSON or YAML format, as a string.

       --config-from-file=PATH_TO_FILE
          Path to a JSON or YAML file containing the dashboard configuration.
          Use a full or relative path to a local file containing the value of
          config.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring dashboards update

        $ gcloud beta monitoring dashboards update
```

### gcloud beta monitoring dashboards create

```text
NAME
    gcloud beta monitoring dashboards create - create a new Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud beta monitoring dashboards create
        (--config=CONFIG | --config-from-file=PATH_TO_FILE) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring dashboards delete

```text
NAME
    gcloud beta monitoring dashboards delete - delete a Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud beta monitoring dashboards delete DASHBOARD [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring dashboards describe

```text
NAME
    gcloud beta monitoring dashboards describe - describe a Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud beta monitoring dashboards describe DASHBOARD [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring dashboards list

```text
NAME
    gcloud beta monitoring dashboards list - list Cloud Monitoring dashboards

SYNOPSIS
    gcloud beta monitoring dashboards list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring dashboards update

```text
NAME
    gcloud beta monitoring dashboards update - update a Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud beta monitoring dashboards update DASHBOARD
        (--config=CONFIG | --config-from-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring dashboards create

```text
NAME
    gcloud alpha monitoring dashboards create - create a new Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud alpha monitoring dashboards create
        (--config=CONFIG | --config-from-file=PATH_TO_FILE) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring dashboards delete

```text
NAME
    gcloud alpha monitoring dashboards delete - delete a Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud alpha monitoring dashboards delete DASHBOARD [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring dashboards describe

```text
NAME
    gcloud alpha monitoring dashboards describe - describe a Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud alpha monitoring dashboards describe DASHBOARD
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring dashboards list

```text
NAME
    gcloud alpha monitoring dashboards list - list Cloud Monitoring dashboards

SYNOPSIS
    gcloud alpha monitoring dashboards list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring dashboards update

```text
NAME
    gcloud alpha monitoring dashboards update - update a Cloud Monitoring
        dashboard

SYNOPSIS
    gcloud alpha monitoring dashboards update DASHBOARD
        (--config=CONFIG | --config-from-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/dashboards (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
