---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-templates
---

# gcloud backup-dr restore-templates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr restore-templates create

```text
NAME
    gcloud backup-dr restore-templates create - create a Restore Template

SYNOPSIS
    gcloud backup-dr restore-templates create
        (RESTORE_TEMPLATE : --location=LOCATION) --data-source=DATA_SOURCE
        --resource-type=RESOURCE_TYPE --restore-properties=RESTORE_PROPERTIES
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
          --post-restore-timeout=POST_RESTORE_TIMEOUT]
        [--pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
          --pre-restore-timeout=PRE_RESTORE_TIMEOUT]
        [--verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
          --verification-timeout=VERIFICATION_TIMEOUT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Restore Template.

EXAMPLES
    To create a restore template my-template in location us-central1 for a
    Compute Engine instance, run:

        $ gcloud backup-dr restore-templates create my-template \
            --location=us-central1 \
            --resource-type="compute.googleapis.com/Instance" \
            --data-source="projects/my-project/locations/us-central1/backupV\
        aults/my-vault/dataSources/my-ds" \
            --restore-properties='{"project": "my-project", "zone":
         "us-central1-a", "resource": {"name": "test-vm-{EXECUTION_ID}"}}'

    To create a restore template my-template from a restore properties file,
    run:

        $ gcloud backup-dr restore-templates create my-template \
            --location=us-central1 \
            --resource-type="compute.googleapis.com/Instance" \
            --data-source="projects/my-project/locations/us-central1/backupV\
        aults/my-vault/dataSources/my-ds" \
            --restore-properties=path/to/restore_properties.json

POSITIONAL ARGUMENTS
     Restore Template resource - to create The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_TEMPLATE
          ID of the Restore Template or fully qualified identifier for the
          Restore Template.

          To set the name attribute:
          + provide the argument restore_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Template.

          To set the location attribute:
          + provide the argument restore_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --data-source=DATA_SOURCE
        The full resource name of the DataSource from which backups will be
        selected. Format:
        projects/{project}/locations/{location}/backupVaults/{vault}/dataSources/{dataSource}

     --resource-type=RESOURCE_TYPE
        The type of the Google Cloud resource (e.g.,
        compute.googleapis.com/Instance).

     --restore-properties=RESTORE_PROPERTIES
        Defines the target environment and configuration for restoring the
        resource. Accepts either an inline JSON or YAML string or a path to a
        JSON or YAML file containing the properties.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the restore template.

     --labels=[KEY=VALUE,...]
        Optional resource labels to represent metadata provided by the user.

     Post-restore hook configuration.

     --post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
        The Cloud Run job to execute after the restore operation. Format:
        projects/{project}/locations/{location}/jobs/{job}

     --post-restore-timeout=POST_RESTORE_TIMEOUT
        Timeout for the post-restore hook (e.g., 600s). Must be specified with
        --post-restore-cloud-run-job.

     Pre-restore hook configuration.

     --pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
        The Cloud Run job to execute before the restore operation. Format:
        projects/{project}/locations/{location}/jobs/{job}

     --pre-restore-timeout=PRE_RESTORE_TIMEOUT
        Timeout for the pre-restore hook (e.g., 300s). Must be specified with
        --pre-restore-cloud-run-job.

     Verification hook configuration.

     --verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
        The Cloud Run job to execute to verify the restored workload. Format:
        projects/{project}/locations/{location}/jobs/{job}

     --verification-timeout=VERIFICATION_TIMEOUT
        Timeout for the verification hook (e.g., 300s). Must be specified with
        --verification-cloud-run-job.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Create a restore template.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-templates create

        $ gcloud beta backup-dr restore-templates create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud backup-dr restore-templates create my-template \
    --location=us-central1 \
    --resource-type="compute.googleapis.com/Instance" \
    --data-source="projects/my-project/locations/us-central1/backupVaults/my-vault/dataSources/my-ds" \
    --restore-properties='{"project": "my-project", "zone": "us-central1-a", "resource": {"name": "test-vm-{EXECUTION_ID}"}}'

gcloud backup-dr restore-templates create my-template \
    --location=us-central1 \
    --resource-type="compute.googleapis.com/Instance" \
    --data-source="projects/my-project/locations/us-central1/backupVaults/my-vault/dataSources/my-ds" \
    --restore-properties=path/to/restore_properties.json
```

### gcloud backup-dr restore-templates delete

```text
NAME
    gcloud backup-dr restore-templates delete - delete a Restore Template

SYNOPSIS
    gcloud backup-dr restore-templates delete
        (RESTORE_TEMPLATE : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Restore Template.

EXAMPLES
    To delete a restore template with id my-template in location us-central1,
    run:

        $ gcloud backup-dr restore-templates delete my-template \
            --location=us-central1

POSITIONAL ARGUMENTS
     Restore Template resource - to delete The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_TEMPLATE
          ID of the Restore Template or fully qualified identifier for the
          Restore Template.

          To set the name attribute:
          + provide the argument restore_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Template.

          To set the location attribute:
          + provide the argument restore_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --force
        If set, any child RestoreTemplateExecutions will also be deleted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Delete a restore template.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-templates delete

        $ gcloud beta backup-dr restore-templates delete
```

### gcloud backup-dr restore-templates describe

```text
NAME
    gcloud backup-dr restore-templates describe - show details of the restore
        template

SYNOPSIS
    gcloud backup-dr restore-templates describe
        (RESTORE_TEMPLATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show all configuration data associated with the specified restore template.

EXAMPLES
    To view details for restore template my-template in location us-central1,
    run:

        $ gcloud backup-dr restore-templates describe my-template \
            --location=us-central1

POSITIONAL ARGUMENTS
     Restore template resource - Name of the restore template to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument restore_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_TEMPLATE
          ID of the restore_template or fully qualified identifier for the
          restore_template.

          To set the restore_template attribute:
          + provide the argument restore_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument restore_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-templates describe

        $ gcloud beta backup-dr restore-templates describe
```

### gcloud backup-dr restore-templates list

```text
NAME
    gcloud backup-dr restore-templates list - list Cloud Backup and DR restore
        templates

SYNOPSIS
    gcloud backup-dr restore-templates list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List restore templates in the project.

EXAMPLES
    To list restore templates for all locations, run:

        $ gcloud backup-dr restore-templates list

    To list restore templates in location us-central1, run:

        $ gcloud backup-dr restore-templates list --location=us-central1

FLAGS
     Location resource - Location to list restore templates from. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * default is all locations with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * default is all locations .

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
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-templates list

        $ gcloud beta backup-dr restore-templates list
```

### gcloud backup-dr restore-templates run

```text
NAME
    gcloud backup-dr restore-templates run - run a Restore Template

SYNOPSIS
    gcloud backup-dr restore-templates run
        (RESTORE_TEMPLATE : --location=LOCATION) [--async] [--backup=BACKUP]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Run a Restore Template.

EXAMPLES
    To run a restore template my-template in location us-central1, run:

        $ gcloud backup-dr restore-templates run my-template \
            --location=us-central1

    To run with a specific backup:

        $ gcloud backup-dr restore-templates run my-template \
            --location=us-central1 \
            --backup="projects/p/locations/l/backupVaults/v/dataSources/ds/b\
        ackups/b"

POSITIONAL ARGUMENTS
     Restore Template resource - to run The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_TEMPLATE
          ID of the Restore Template or fully qualified identifier for the
          Restore Template.

          To set the name attribute:
          + provide the argument restore_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Template.

          To set the location attribute:
          + provide the argument restore_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --backup=BACKUP
        The resource name of a specific Backup to restore from. If omitted, the
        latest backup matching the template's backup selection configuration
        will be used. Format:
        projects/{project}/locations/{location}/backupVaults/{vault}/dataSources/{dataSource}/backups/{backup}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Run a restore template on-demand.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-templates run

        $ gcloud beta backup-dr restore-templates run
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud backup-dr restore-templates run my-template \
    --location=us-central1 \
    --backup="projects/p/locations/l/backupVaults/v/dataSources/ds/backups/b"
```

### gcloud backup-dr restore-templates update

```text
NAME
    gcloud backup-dr restore-templates update - update a Restore Template

SYNOPSIS
    gcloud backup-dr restore-templates update
        (RESTORE_TEMPLATE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--restore-properties=RESTORE_PROPERTIES]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
          --post-restore-timeout=POST_RESTORE_TIMEOUT]
        [--pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
          --pre-restore-timeout=PRE_RESTORE_TIMEOUT]
        [--verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
          --verification-timeout=VERIFICATION_TIMEOUT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Restore Template.

EXAMPLES
    To update a restore template my-template with a new description, run:

        $ gcloud backup-dr restore-templates update my-template \
            --location=us-central1 --description="Updated template"

    To update the restore properties of a restore template my-template from a
    file, run:

        $ gcloud backup-dr restore-templates update my-template \
            --location=us-central1 \
            --restore-properties=path/to/restore_properties.json

POSITIONAL ARGUMENTS
     Restore Template resource - to update The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_TEMPLATE
          ID of the Restore Template or fully qualified identifier for the
          Restore Template.

          To set the name attribute:
          + provide the argument restore_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Template.

          To set the location attribute:
          + provide the argument restore_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the restore template.

     --restore-properties=RESTORE_PROPERTIES
        Defines the target environment and configuration for restoring the
        resource. Accepts either an inline JSON or YAML string or a path to a
        JSON or YAML file containing the properties.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud backup-dr restore-templates update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud backup-dr restore-templates update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     Post-restore hook configuration.

     --post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
        The Cloud Run job to execute after the restore operation. Format:
        projects/{project}/locations/{location}/jobs/{job}

     --post-restore-timeout=POST_RESTORE_TIMEOUT
        Timeout for the post-restore hook (e.g., 600s). Must be specified with
        --post-restore-cloud-run-job.

     Pre-restore hook configuration.

     --pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
        The Cloud Run job to execute before the restore operation. Format:
        projects/{project}/locations/{location}/jobs/{job}

     --pre-restore-timeout=PRE_RESTORE_TIMEOUT
        Timeout for the pre-restore hook (e.g., 300s). Must be specified with
        --pre-restore-cloud-run-job.

     Verification hook configuration.

     --verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
        The Cloud Run job to execute to verify the restored workload. Format:
        projects/{project}/locations/{location}/jobs/{job}

     --verification-timeout=VERIFICATION_TIMEOUT
        Timeout for the verification hook (e.g., 300s). Must be specified with
        --verification-cloud-run-job.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Update a restore template.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-templates update

        $ gcloud beta backup-dr restore-templates update
```

### gcloud beta backup-dr restore-templates create

```text
NAME
    gcloud beta backup-dr restore-templates create - create a Restore Template

SYNOPSIS
    gcloud beta backup-dr restore-templates create
        (RESTORE_TEMPLATE : --location=LOCATION) --data-source=DATA_SOURCE
        --resource-type=RESOURCE_TYPE --restore-properties=RESTORE_PROPERTIES
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
          --post-restore-timeout=POST_RESTORE_TIMEOUT]
        [--pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
          --pre-restore-timeout=PRE_RESTORE_TIMEOUT]
        [--verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
          --verification-timeout=VERIFICATION_TIMEOUT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-templates delete

```text
NAME
    gcloud beta backup-dr restore-templates delete - delete a Restore Template

SYNOPSIS
    gcloud beta backup-dr restore-templates delete
        (RESTORE_TEMPLATE : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-templates describe

```text
NAME
    gcloud beta backup-dr restore-templates describe - show details of the
        restore template

SYNOPSIS
    gcloud beta backup-dr restore-templates describe
        (RESTORE_TEMPLATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-templates list

```text
NAME
    gcloud beta backup-dr restore-templates list - list Cloud Backup and DR
        restore templates

SYNOPSIS
    gcloud beta backup-dr restore-templates list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-templates run

```text
NAME
    gcloud beta backup-dr restore-templates run - run a Restore Template

SYNOPSIS
    gcloud beta backup-dr restore-templates run
        (RESTORE_TEMPLATE : --location=LOCATION) [--async] [--backup=BACKUP]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-templates update

```text
NAME
    gcloud beta backup-dr restore-templates update - update a Restore Template

SYNOPSIS
    gcloud beta backup-dr restore-templates update
        (RESTORE_TEMPLATE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--restore-properties=RESTORE_PROPERTIES]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
          --post-restore-timeout=POST_RESTORE_TIMEOUT]
        [--pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
          --pre-restore-timeout=PRE_RESTORE_TIMEOUT]
        [--verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
          --verification-timeout=VERIFICATION_TIMEOUT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-templates create

```text
NAME
    gcloud alpha backup-dr restore-templates create - create a Restore Template

SYNOPSIS
    gcloud alpha backup-dr restore-templates create
        (RESTORE_TEMPLATE : --location=LOCATION) --data-source=DATA_SOURCE
        --resource-type=RESOURCE_TYPE --restore-properties=RESTORE_PROPERTIES
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
          --post-restore-timeout=POST_RESTORE_TIMEOUT]
        [--pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
          --pre-restore-timeout=PRE_RESTORE_TIMEOUT]
        [--verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
          --verification-timeout=VERIFICATION_TIMEOUT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-templates delete

```text
NAME
    gcloud alpha backup-dr restore-templates delete - delete a Restore Template

SYNOPSIS
    gcloud alpha backup-dr restore-templates delete
        (RESTORE_TEMPLATE : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-templates describe

```text
NAME
    gcloud alpha backup-dr restore-templates describe - show details of the
        restore template

SYNOPSIS
    gcloud alpha backup-dr restore-templates describe
        (RESTORE_TEMPLATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-templates list

```text
NAME
    gcloud alpha backup-dr restore-templates list - list Cloud Backup and DR
        restore templates

SYNOPSIS
    gcloud alpha backup-dr restore-templates list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-templates run

```text
NAME
    gcloud alpha backup-dr restore-templates run - run a Restore Template

SYNOPSIS
    gcloud alpha backup-dr restore-templates run
        (RESTORE_TEMPLATE : --location=LOCATION) [--async] [--backup=BACKUP]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-templates update

```text
NAME
    gcloud alpha backup-dr restore-templates update - update a Restore Template

SYNOPSIS
    gcloud alpha backup-dr restore-templates update
        (RESTORE_TEMPLATE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--restore-properties=RESTORE_PROPERTIES]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--post-restore-cloud-run-job=POST_RESTORE_CLOUD_RUN_JOB
          --post-restore-timeout=POST_RESTORE_TIMEOUT]
        [--pre-restore-cloud-run-job=PRE_RESTORE_CLOUD_RUN_JOB
          --pre-restore-timeout=PRE_RESTORE_TIMEOUT]
        [--verification-cloud-run-job=VERIFICATION_CLOUD_RUN_JOB
          --verification-timeout=VERIFICATION_TIMEOUT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
