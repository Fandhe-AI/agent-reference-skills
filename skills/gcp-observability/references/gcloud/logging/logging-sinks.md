---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/sinks
---

# gcloud logging sinks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging sinks create

```text
NAME
    gcloud logging sinks create - create a log sink

SYNOPSIS
    gcloud logging sinks create SINK_NAME DESTINATION
        [--custom-writer-identity=SERVICE_ACCOUNT_EMAIL]
        [--description=DESCRIPTION] [--disabled]
        [--exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]] [--include-children]
        [--intercept-children] [--log-filter=LOG_FILTER]
        [--use-partitioned-tables]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a log sink used to route log entries to a destination. The sink
    routes all log entries that match its --log-filter flag.

    An empty filter matches all logs.

    Detailed information about filters can be found at:
    https://cloud.google.com/logging/docs/view/logging-query-language

    The sink's destination can be a Cloud Logging log bucket, a Cloud Storage
    bucket, a BigQuery dataset, a Cloud Pub/Sub topic, or a Google Cloud
    project.

    The destination must already exist.

    If creating a log sink to route logs to a destination outside of Cloud
    Logging or to a Cloud Logging log bucket in another project, the log sink's
    service account must be granted permission to write to the destination.

    For more information about destination permissions, see:
    https://cloud.google.com/logging/docs/export/configure_export_v2#dest-auth

    Matching log entries are routed to the destination after the sink is
    created.

EXAMPLES
    To route all Google Compute Engine logs to BigQuery, run:

        $ gcloud logging sinks create my-bq-sink \
            bigquery.googleapis.com/projects/my-project/datasets/\
        my_dataset --log-filter='resource.type="gce_instance"'

    To route "syslog" from App Engine Flexible to a Cloud Storage bucket, run:

        $ gcloud logging sinks create my-gcs-sink \
            storage.googleapis.com/my-bucket \
            --log-filter='logName="projects/my-project/appengine.googleapis.\
        com%2Fsyslog"'

    To route Google App Engine logs with ERROR severity, run:

        $ gcloud logging sinks create my-error-logs \
            bigquery.googleapis.com/projects/my-project/datasets/\
        my_dataset --log-filter='resource.type="gae_app" AND severity=ERROR'

    To route all logs to a log bucket in a different project, run:

        $ gcloud logging sinks create my-sink \
            logging.googleapis.com/projects/my-central-project/locations/\
        global/buckets/my-central-bucket

    To route all logs to another project, run:

        $ gcloud logging sinks create my-sink \
            logging.googleapis.com/projects/my-destination-project

POSITIONAL ARGUMENTS
     SINK_NAME
        The name for the sink.

     DESTINATION
        The destination for the sink.

FLAGS
     --custom-writer-identity=SERVICE_ACCOUNT_EMAIL
        Writer identity for the sink. This flag can only be used if the
        destination is a log bucket in a different project. The writer identity
        is automatically generated when it is not provided for a sink.

     --description=DESCRIPTION
        Description of the sink.

     --disabled
        Sink will be disabled. Disabled sinks do not export logs.

     --exclusion=[description=DESCRIPTION],[disabled=DISABLED],[filter=FILTER],[name=NAME]
        Specify an exclusion filter for a log entry that is not to be exported.
        This flag can be repeated.

        The name and filter attributes are required. The following keys are
        accepted:

         name
            An identifier, such as load-balancer-exclusion. Identifiers are
            limited to 100 characters and can include only letters, digits,
            underscores, hyphens, and periods.

         description
            A description of this exclusion.

         filter
            An advanced log filter that matches the log entries to be excluded.

         disabled
            If this exclusion should be disabled and not exclude the log
            entries.

     --include-children
        Whether to export logs from all child projects and folders. Only
        applies to sinks for organizations and folders.

     --intercept-children
        Whether to intercept logs from all child projects and folders. Only
        applies to sinks for organizations and folders.

     --log-filter=LOG_FILTER
        A filter expression for the sink. If present, the filter specifies
        which log entries to export.

     Settings for sink exporting data to BigQuery.

     --use-partitioned-tables
        If specified, use BigQuery's partitioned tables. By default, Logging
        creates dated tables based on the log entries' timestamps, e.g.
        'syslog_20170523'. Partitioned tables remove the suffix and special
        query syntax
        (https://cloud.google.com/bigquery/docs/querying-partitioned-tables)
        must be used.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the sink to create.

       --folder=FOLDER_ID
          Folder of the sink to create.

       --organization=ORGANIZATION_ID
          Organization of the sink to create.

       --project=PROJECT_ID
          Project of the sink to create.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging sinks create

        $ gcloud beta logging sinks create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud logging sinks create my-bq-sink bigquery.googleapis.com/projects/my-project/datasets/my_dataset \
    --log-filter='resource.type="gce_instance"'

gcloud logging sinks create my-gcs-sink storage.googleapis.com/my-bucket \
    --log-filter='logName="projects/my-project/appengine.googleapis.com%2Fsyslog"'

gcloud logging sinks create my-error-logs bigquery.googleapis.com/projects/my-project/datasets/my_dataset \
    --log-filter='resource.type="gae_app" AND severity=ERROR'

gcloud logging sinks create my-sink logging.googleapis.com/projects/my-central-project/locations/global/buckets/my-central-bucket
```

### gcloud logging sinks delete

```text
NAME
    gcloud logging sinks delete - delete a sink

SYNOPSIS
    gcloud logging sinks delete SINK_NAME
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a sink and halt the export of log entries associated with that sink.
    Deleting a sink does not affect log entries already exported through the
    deleted sink, and will not affect other sinks that are exporting the same
    log(s).

EXAMPLES
    To delete a sync 'my-bq-sync':

        $ gcloud logging sinks delete my-bq-sink

POSITIONAL ARGUMENTS
     SINK_NAME
        The name of the sink to delete.

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the sink to delete.

       --folder=FOLDER_ID
          Folder of the sink to delete.

       --organization=ORGANIZATION_ID
          Organization of the sink to delete.

       --project=PROJECT_ID
          Project of the sink to delete.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging sinks delete

        $ gcloud beta logging sinks delete
```

### gcloud logging sinks describe

```text
NAME
    gcloud logging sinks describe - display information about a sink

SYNOPSIS
    gcloud logging sinks describe SINK_NAME
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display information about a sink.

EXAMPLES
    To describe a sync 'my-bq-sync':

        $ gcloud logging sinks describe my-bq-sink

POSITIONAL ARGUMENTS
     SINK_NAME
        The name of the sink to describe.

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the sink to describe.

       --folder=FOLDER_ID
          Folder of the sink to describe.

       --organization=ORGANIZATION_ID
          Organization of the sink to describe.

       --project=PROJECT_ID
          Project of the sink to describe.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging sinks describe

        $ gcloud beta logging sinks describe
```

### gcloud logging sinks list

```text
NAME
    gcloud logging sinks list - list the defined sinks

SYNOPSIS
    gcloud logging sinks list [--sink-filter=SINK_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the defined sinks.

EXAMPLES
    To list all defined sinks:

        $ gcloud logging sinks list --limit=10

FLAGS
     --sink-filter=SINK_FILTER
        A filter expression passed to the Logging API to constrain the sinks
        returned. For information on accepted values, see
        https://cloud.google.com/logging/docs/reference/v2/rpc/google.logging.v2#listsinksrequest

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the sinks to list.

       --folder=FOLDER_ID
          Folder of the sinks to list.

       --organization=ORGANIZATION_ID
          Organization of the sinks to list.

       --project=PROJECT_ID
          Project of the sinks to list.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

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

        $ gcloud alpha logging sinks list

        $ gcloud beta logging sinks list
```

### gcloud logging sinks update

```text
NAME
    gcloud logging sinks update - update a sink

SYNOPSIS
    gcloud logging sinks update SINK_NAME [DESTINATION]
        [--add-exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]] [--clear-exclusions]
        [--custom-writer-identity=SERVICE_ACCOUNT_EMAIL]
        [--description=DESCRIPTION] [--disabled] [--include-children]
        [--intercept-children] [--log-filter=LOG_FILTER]
        [--remove-exclusions=[EXCLUSION ID,...]]
        [--update-exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]]
        [--use-partitioned-tables]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Change the [DESTINATION] or --log-filter associated with a sink. The new
    destination must already exist and Cloud Logging must have permission to
    write to it.

    Log entries are exported to the new destination immediately.

EXAMPLES
    To only update a sink filter, run:

        $ gcloud logging sinks update my-sink --log-filter='severity>=ERROR'

    Detailed information about filters can be found at:
    https://cloud.google.com/logging/docs/view/logging-query-language

POSITIONAL ARGUMENTS
     SINK_NAME
        The name of the sink to update.

     [DESTINATION]
        A new destination for the sink. If omitted, the sink's existing
        destination is unchanged.

FLAGS
     --add-exclusion=[description=DESCRIPTION],[disabled=DISABLED],[filter=FILTER],[name=NAME]
        Add an exclusion filter for log entries that are not to be routed to
        the sink' destination. This flag can be repeated.

        The name and filter attributes are required. The following keys are
        accepted:

         name
            Required. An identifier, such as load-balancer-exclusion.
            Identifiers are limited to 100 characters and can include only
            letters, digits, underscores, hyphens, and periods.

         description
            Optional. A description of this exclusion.

         filter
            Required. Entries that match this advanced log filter will be
            excluded. Filter cannot be empty.

         disabled
            Optional. By default, an exclusion is not disabled. To disable an
            exclusion, include this key and specify any value.

     --clear-exclusions
        Remove all logging exclusions from the sink.

     --custom-writer-identity=SERVICE_ACCOUNT_EMAIL
        Writer identity for the sink. This flag can only be used if the
        destination is a log bucket in a different project. The writer identity
        is automatically generated when it is not provided for a sink.

     --description=DESCRIPTION
        Description of the sink.

     --disabled
        Disable the sink. Disabled sinks do not route logs to the sink
        destination. Specify --no-disabled to enable a disabled sink. If this
        flag is not specified, the value will not be updated.

     --include-children
        Whether to export logs from all child projects and folders. Only
        applies to sinks for organizations and folders.

     --intercept-children
        Whether to intercept logs from all child projects and folders. Only
        applies to sinks for organizations and folders.

     --log-filter=LOG_FILTER
        A new filter expression for the sink. If omitted, the sink's existing
        filter (if any) is unchanged.

     --remove-exclusions=[EXCLUSION ID,...]
        Specify the name of the Logging exclusion(s) to delete.

     --update-exclusion=[description=DESCRIPTION],[disabled=DISABLED],[filter=FILTER],[name=NAME]
        Update an exclusion filter for a log entry that is not to be exported.
        This flag can be repeated.

        The name attribute is required. The following keys are accepted:

         name
            Required. An identifier, such as load-balancer-exclusion.
            Identifiers are limited to 100 characters and can include only
            letters, digits, underscores, hyphens, and periods.

         description
            Optional. A description of this exclusion.

         filter
            Optional. Entries that match this advanced log filter will be
            excluded. Filter cannot be empty.

         disabled
            Optional. To disable an exclusion, include this key and specify any
            value. To enable a disabled exclusion, include this key, but do not
            specify any value. Do not include this key unless you want to
            change its value.

     Settings for sink exporting data to BigQuery.

     --use-partitioned-tables
        If specified, use BigQuery's partitioned tables. By default, Logging
        creates dated tables based on the log entries' timestamps, e.g.
        'syslog_20170523'. Partitioned tables remove the suffix and special
        query syntax
        (https://cloud.google.com/bigquery/docs/querying-partitioned-tables)
        must be used.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the sink to update.

       --folder=FOLDER_ID
          Folder of the sink to update.

       --organization=ORGANIZATION_ID
          Organization of the sink to update.

       --project=PROJECT_ID
          Project of the sink to update.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging sinks update

        $ gcloud beta logging sinks update
```

### gcloud beta logging sinks create

```text
NAME
    gcloud beta logging sinks create - create a log sink

SYNOPSIS
    gcloud beta logging sinks create SINK_NAME DESTINATION
        [--custom-writer-identity=SERVICE_ACCOUNT_EMAIL]
        [--description=DESCRIPTION] [--disabled]
        [--exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]] [--include-children]
        [--intercept-children] [--log-filter=LOG_FILTER]
        [--use-partitioned-tables]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging sinks delete

```text
NAME
    gcloud beta logging sinks delete - delete a sink

SYNOPSIS
    gcloud beta logging sinks delete SINK_NAME
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging sinks describe

```text
NAME
    gcloud beta logging sinks describe - display information about a sink

SYNOPSIS
    gcloud beta logging sinks describe SINK_NAME
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging sinks list

```text
NAME
    gcloud beta logging sinks list - list the defined sinks

SYNOPSIS
    gcloud beta logging sinks list [--sink-filter=SINK_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging sinks update

```text
NAME
    gcloud beta logging sinks update - update a sink

SYNOPSIS
    gcloud beta logging sinks update SINK_NAME [DESTINATION]
        [--add-exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]] [--clear-exclusions]
        [--custom-writer-identity=SERVICE_ACCOUNT_EMAIL]
        [--description=DESCRIPTION] [--disabled] [--include-children]
        [--intercept-children] [--log-filter=LOG_FILTER]
        [--remove-exclusions=[EXCLUSION ID,...]]
        [--update-exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]]
        [--use-partitioned-tables]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging sinks create

```text
NAME
    gcloud alpha logging sinks create - create a log sink

SYNOPSIS
    gcloud alpha logging sinks create SINK_NAME DESTINATION
        [--custom-writer-identity=SERVICE_ACCOUNT_EMAIL]
        [--description=DESCRIPTION] [--disabled]
        [--exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]] [--include-children]
        [--intercept-children] [--log-filter=LOG_FILTER]
        [--use-partitioned-tables]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging sinks delete

```text
NAME
    gcloud alpha logging sinks delete - delete a sink

SYNOPSIS
    gcloud alpha logging sinks delete SINK_NAME
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging sinks describe

```text
NAME
    gcloud alpha logging sinks describe - display information about a sink

SYNOPSIS
    gcloud alpha logging sinks describe SINK_NAME
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging sinks list

```text
NAME
    gcloud alpha logging sinks list - list the defined sinks

SYNOPSIS
    gcloud alpha logging sinks list [--sink-filter=SINK_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging sinks update

```text
NAME
    gcloud alpha logging sinks update - update a sink

SYNOPSIS
    gcloud alpha logging sinks update SINK_NAME [DESTINATION]
        [--add-exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]] [--clear-exclusions]
        [--custom-writer-identity=SERVICE_ACCOUNT_EMAIL]
        [--description=DESCRIPTION] [--disabled] [--include-children]
        [--intercept-children] [--log-filter=LOG_FILTER]
        [--remove-exclusions=[EXCLUSION ID,...]]
        [--update-exclusion=[description=DESCRIPTION],
          [disabled=DISABLED],[filter=FILTER],[name=NAME]]
        [--use-partitioned-tables]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/sinks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
