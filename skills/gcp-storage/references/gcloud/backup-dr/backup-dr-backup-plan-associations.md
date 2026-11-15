---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plan-associations
---

# gcloud backup-dr backup-plan-associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr backup-plan-associations create

```text
NAME
    gcloud backup-dr backup-plan-associations create - create a new backup plan
        association

SYNOPSIS
    gcloud backup-dr backup-plan-associations create
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT)
        --backup-plan=BACKUP_PLAN --resource=RESOURCE
        --resource-type=RESOURCE_TYPE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new backup plan association in the project. It can only be created
    in locations where Backup and DR is available.

EXAMPLES
    To create a new backup plan association sample-bpa in project
    sample-project and location us-central1 for resource sample-resource-uri
    with backup plan sample-backup-plan, run:

        $ gcloud backup-dr backup-plan-associations create sample-bpa \
            --project=sample-project --location=us-central1 \
            --backup-plan=sample-backup-plan --resource=sample-resource-uri

POSITIONAL ARGUMENTS
     Backup Plan Association resource - Name of the backup plan association to
     be created. Once the backup plan association is created, this name can't
     be changed. The name must be unique for a project and location. To create
     backup plan associations in a project that's different from the backup
     plan, use the --workload-project flag. The arguments in this group can be
     used to specify the attributes of this resource.

     This must be specified.

       BACKUP_PLAN_ASSOCIATION
          ID of the Backup Plan Association or fully qualified identifier for
          the Backup Plan Association.

          To set the name attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Plan Association.

          To set the location attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --workload-project=WORKLOAD_PROJECT
          Cloud project id for the Backup Plan Association.

          To set the workload-project attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line
            with a fully specified name;
          + provide the argument --workload-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

REQUIRED FLAGS
     Backup Plan resource - The backup plan to be applied to the resource.
     E.g.,
     projects/sample-project/locations/us-central1/backupPlans/sample-backup-plan
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-plan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-plan on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --backup-plan=BACKUP_PLAN
          ID of the Backup Plan or fully qualified identifier for the Backup
          Plan.

          To set the name attribute:
          + provide the argument --backup-plan on the command line.

     --resource=RESOURCE
        The resource to which the backup plan is to be applied. E.g.,
        projects/sample-project/zones/us-central1-a/instances/sample-instance

     --resource-type=RESOURCE_TYPE
        Type of resource to which the backup plan should be applied.

        For example:
        * compute.<UNIVERSE_DOMAIN>/Instance for Compute Engine instances.
        * file.<UNIVERSE_DOMAIN>/Instance for Filestore instances.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Creates a new backup plan association

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plan-associations create

        $ gcloud beta backup-dr backup-plan-associations create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud backup-dr backup-plan-associations create sample-bpa \
    --project=sample-project \
    --location=us-central1 \
    --backup-plan=sample-backup-plan \
    --resource=sample-resource-uri \
    --resource-type=compute.googleapis.com/Instance
```

### gcloud backup-dr backup-plan-associations delete

```text
NAME
    gcloud backup-dr backup-plan-associations delete - delete the specified
        backup plan association

SYNOPSIS
    gcloud backup-dr backup-plan-associations delete
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified backup plan association.

EXAMPLES
    To delete a backup plan association sample-bpa in project sample-project
    and location us-central1 , run:

        $ gcloud backup-dr backup-plan-associations delete sample-bpa \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Backup Plan Association resource - Name of the backup plan association to
     delete. The arguments in this group can be used to specify the attributes
     of this resource.

     This must be specified.

       BACKUP_PLAN_ASSOCIATION
          ID of the Backup Plan Association or fully qualified identifier for
          the Backup Plan Association.

          To set the name attribute:
          + provide the argument backup_plan_association on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Plan Association.

          To set the location attribute:
          + provide the argument backup_plan_association on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --workload-project=WORKLOAD_PROJECT
          Cloud project id for the Backup Plan Association.

          To set the workload-project attribute:
          + provide the argument backup_plan_association on the command line
            with a fully specified name;
          + provide the argument --workload-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Delete a specific backup plan association

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plan-associations delete

        $ gcloud beta backup-dr backup-plan-associations delete
```

### gcloud backup-dr backup-plan-associations describe

```text
NAME
    gcloud backup-dr backup-plan-associations describe - show details of the
        backup plan association

SYNOPSIS
    gcloud backup-dr backup-plan-associations describe
        (BACKUP_PLAN_ASSOCIATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show all configuration data associated with the specified backup plan
    association.

EXAMPLES
    To view details for backup plan association BACKUP_PLAN_ASSOCIATION, run:

        $ gcloud backup-dr backup-plan-associations describe \
            BACKUP_PLAN_ASSOCIATION

POSITIONAL ARGUMENTS
     Backup plan association resource - Name of the backup plan association to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup_plan_association on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_PLAN_ASSOCIATION
          ID of the backup_plan_association or fully qualified identifier for
          the backup_plan_association.

          To set the backup_plan_association attribute:
          + provide the argument backup_plan_association on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument backup_plan_association on the command line
            with a fully specified name;
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

        $ gcloud alpha backup-dr backup-plan-associations describe

        $ gcloud beta backup-dr backup-plan-associations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud backup-dr backup-plan-associations describe BACKUP_PLAN_ASSOCIATION \
    --location=us-central1
```

### gcloud backup-dr backup-plan-associations fetch-for-resource-type

```text
NAME
    gcloud backup-dr backup-plan-associations fetch-for-resource-type - fetch
        Backup Plan Associations for a given resource type and location

SYNOPSIS
    gcloud backup-dr backup-plan-associations fetch-for-resource-type
        RESOURCE_TYPE --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Fetch Backup Plan Associations for a given resource type and location. List
    backup plan associations in a specified location and resource type in a
    project.

EXAMPLES
    To list backup plan associations for Cloud SQL with location us-central1,
    run:

        $ gcloud backup-dr backup-plan-associations \
            fetch-for-resource-type sqladmin.googleapis.com/Instance \
            --location="us-central1"

POSITIONAL ARGUMENTS
     RESOURCE_TYPE
        Resource type for which backup plan associations should be fetched.

        For example:
        * compute.<UNIVERSE_DOMAIN>/Instance for Compute Engine instances.
        * file.<UNIVERSE_DOMAIN>/Instance for Filestore instances.

REQUIRED FLAGS
     --location=LOCATION
        Location for which backup plan associations should be fetched.

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

BRIEF
    List backup plan associations in a specified location and resource type in
    a project.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plan-associations \
            fetch-for-resource-type

        $ gcloud beta backup-dr backup-plan-associations \
            fetch-for-resource-type
```

### gcloud backup-dr backup-plan-associations list

```text
NAME
    gcloud backup-dr backup-plan-associations list - list Backup and DR backup
        plan associations

SYNOPSIS
    gcloud backup-dr backup-plan-associations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List backup plan associations in the project for a specified location.

EXAMPLES
    To list backup plan associations for all locations, run:

        $ gcloud backup-dr backup-plan-associations list

    To list backup plan associations in a location my-location, run:

        $ gcloud backup-dr backup-plan-associations list \
            --location=my-location

FLAGS
     Location resource - Location for which backup plan associations should be
     listed. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

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

        $ gcloud alpha backup-dr backup-plan-associations list

        $ gcloud beta backup-dr backup-plan-associations list
```

### gcloud backup-dr backup-plan-associations trigger-backup

```text
NAME
    gcloud backup-dr backup-plan-associations trigger-backup - create an
        on-demand backup for a resource

SYNOPSIS
    gcloud backup-dr backup-plan-associations trigger-backup
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT) [--async]
        [--labels=[KEY=VALUE,...]]
        [--backup-rule-id=BACKUP_RULE_ID
          | --custom-retention-days=CUSTOM_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an on-demand backup for a resource. Trigger an on demand backup for
    the given backup rule.

EXAMPLES
    To trigger an on demand backup for a backup plan association sample-bpa in
    project sample-project and location us-central1 with backup rule
    sample-backup-rule, run:

        $ gcloud backup-dr backup-plan-associations trigger-backup \
            sample-bpa --project=sample-project --location=us-central1 \
            --backup-rule-id=sample-backup-rule

POSITIONAL ARGUMENTS
     Backup Plan Association resource - Name of an existing backup plan
     association to use for creating an on-demand backup. The arguments in this
     group can be used to specify the attributes of this resource.

     This must be specified.

       BACKUP_PLAN_ASSOCIATION
          ID of the Backup Plan Association or fully qualified identifier for
          the Backup Plan Association.

          To set the name attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Plan Association.

          To set the location attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --workload-project=WORKLOAD_PROJECT
          Cloud project id for the Backup Plan Association.

          To set the workload-project attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line
            with a fully specified name;
          + provide the argument --workload-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --labels=[KEY=VALUE,...]
        Labels to be applied to the backup.

     At most one of these can be specified:

       --backup-rule-id=BACKUP_RULE_ID
          Name of an existing backup rule to use for creating an on-demand
          backup.

       --custom-retention-days=CUSTOM_RETENTION_DAYS
          Duration for which backup data will be retained.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Create an on-demand backup.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plan-associations trigger-backup

        $ gcloud beta backup-dr backup-plan-associations trigger-backup
```

### gcloud backup-dr backup-plan-associations update

```text
NAME
    gcloud backup-dr backup-plan-associations update - update a specific backup
        plan within a backup plan association

SYNOPSIS
    gcloud backup-dr backup-plan-associations update
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT)
        --backup-plan=BACKUP_PLAN [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a specific backup plan within a backup plan association.

EXAMPLES
    To update backup plan association sample-bpa in project sample-project and
    location us-central1 with backup plan sample-backup-plan in the same
    project and location, run:

        $ gcloud backup-dr backup-plan-associations update sample-bpa \
            --project=sample-project --location=us-central1 \
            --backup-plan=sample-backup-plan

    To update backup plan association sample-bpa-uri with backup plan
    sample-backup-plan-uri (using full URIs), run:

        $ gcloud backup-dr backup-plan-associations update sample-bpa-uri \
            --backup-plan=sample-backup-plan-uri

    To update backup plan association sample-bpa in location us-central1 with
    backup plan sample-backup-plan-uri, run:

        $ gcloud backup-dr backup-plan-associations update sample-bpa \
            --location=us-central1 --backup-plan=sample-backup-plan-uri

    To update backup plan association sample-bpa in project workload-project
    and location us-central1 with backup plan sample-backup-plan in project
    sample-project, run:

        $ gcloud backup-dr backup-plan-associations update sample-bpa \
            --workload-project=workload-project --location=us-central1 \
            --backup-plan=sample-backup-plan --project=sample-project

POSITIONAL ARGUMENTS
     Backup Plan Association resource - Backup plan association to be updated.
     To update backup plan associations in a project that's different from the
     backup plan, use the --workload-project flag. The arguments in this group
     can be used to specify the attributes of this resource.

     This must be specified.

       BACKUP_PLAN_ASSOCIATION
          ID of the Backup Plan Association or fully qualified identifier for
          the Backup Plan Association.

          To set the name attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Plan Association.

          To set the location attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --workload-project=WORKLOAD_PROJECT
          Cloud project id for the Backup Plan Association.

          To set the workload-project attribute:
          + provide the argument BACKUP_PLAN_ASSOCIATION on the command line
            with a fully specified name;
          + provide the argument --workload-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

REQUIRED FLAGS
     Backup Plan resource - Name of the specific backup plan to be applied to
     the backup plan association. E.g.,
     projects/sample-project/locations/us-central1/backupPlans/sample-backup-plan
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-plan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-plan on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --backup-plan=BACKUP_PLAN
          ID of the Backup Plan or fully qualified identifier for the Backup
          Plan.

          To set the name attribute:
          + provide the argument --backup-plan on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Update a specific backup plan within a backup plan association.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plan-associations update

        $ gcloud beta backup-dr backup-plan-associations update
```

### gcloud beta backup-dr backup-plan-associations create

```text
NAME
    gcloud beta backup-dr backup-plan-associations create - create a new backup
        plan association

SYNOPSIS
    gcloud beta backup-dr backup-plan-associations create
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT)
        --backup-plan=BACKUP_PLAN --resource=RESOURCE
        --resource-type=RESOURCE_TYPE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plan-associations delete

```text
NAME
    gcloud beta backup-dr backup-plan-associations delete - delete the
        specified backup plan association

SYNOPSIS
    gcloud beta backup-dr backup-plan-associations delete
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plan-associations describe

```text
NAME
    gcloud beta backup-dr backup-plan-associations describe - show details of
        the backup plan association

SYNOPSIS
    gcloud beta backup-dr backup-plan-associations describe
        (BACKUP_PLAN_ASSOCIATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plan-associations fetch-for-resource-type

```text
NAME
    gcloud beta backup-dr backup-plan-associations fetch-for-resource-type -
        fetch Backup Plan Associations for a given resource type and location

SYNOPSIS
    gcloud beta backup-dr backup-plan-associations fetch-for-resource-type
        RESOURCE_TYPE --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plan-associations list

```text
NAME
    gcloud beta backup-dr backup-plan-associations list - list Backup and DR
        backup plan associations

SYNOPSIS
    gcloud beta backup-dr backup-plan-associations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plan-associations trigger-backup

```text
NAME
    gcloud beta backup-dr backup-plan-associations trigger-backup - create an
        on-demand backup for a resource

SYNOPSIS
    gcloud beta backup-dr backup-plan-associations trigger-backup
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT) [--async]
        [--labels=[KEY=VALUE,...]]
        [--backup-rule-id=BACKUP_RULE_ID
          | --custom-retention-days=CUSTOM_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plan-associations update

```text
NAME
    gcloud beta backup-dr backup-plan-associations update - update a specific
        backup plan within a backup plan association

SYNOPSIS
    gcloud beta backup-dr backup-plan-associations update
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT)
        --backup-plan=BACKUP_PLAN [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-associations create

```text
NAME
    gcloud alpha backup-dr backup-plan-associations create - create a new
        backup plan association

SYNOPSIS
    gcloud alpha backup-dr backup-plan-associations create
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT)
        --backup-plan=BACKUP_PLAN --resource=RESOURCE
        --resource-type=RESOURCE_TYPE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-associations delete

```text
NAME
    gcloud alpha backup-dr backup-plan-associations delete - delete the
        specified backup plan association

SYNOPSIS
    gcloud alpha backup-dr backup-plan-associations delete
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-associations describe

```text
NAME
    gcloud alpha backup-dr backup-plan-associations describe - show details of
        the backup plan association

SYNOPSIS
    gcloud alpha backup-dr backup-plan-associations describe
        (BACKUP_PLAN_ASSOCIATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-associations fetch-for-resource-type

```text
NAME
    gcloud alpha backup-dr backup-plan-associations fetch-for-resource-type -
        fetch Backup Plan Associations for a given resource type and location

SYNOPSIS
    gcloud alpha backup-dr backup-plan-associations fetch-for-resource-type
        RESOURCE_TYPE --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-associations list

```text
NAME
    gcloud alpha backup-dr backup-plan-associations list - list Backup and DR
        backup plan associations

SYNOPSIS
    gcloud alpha backup-dr backup-plan-associations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-associations trigger-backup

```text
NAME
    gcloud alpha backup-dr backup-plan-associations trigger-backup - create an
        on-demand backup for a resource

SYNOPSIS
    gcloud alpha backup-dr backup-plan-associations trigger-backup
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT) [--async]
        [--labels=[KEY=VALUE,...]]
        [--backup-rule-id=BACKUP_RULE_ID
          | --custom-retention-days=CUSTOM_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-associations update

```text
NAME
    gcloud alpha backup-dr backup-plan-associations update - update a specific
        backup plan within a backup plan association

SYNOPSIS
    gcloud alpha backup-dr backup-plan-associations update
        (BACKUP_PLAN_ASSOCIATION
          : --location=LOCATION --workload-project=WORKLOAD_PROJECT)
        --backup-plan=BACKUP_PLAN [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example passes only `BACKUP_PLAN_ASSOCIATION`; the SYNOPSIS also requires `--location` for the resource (no property sets it), and gcloud 593.0.0 fails with "Error parsing [backup_plan_association]" without it, so the runnable form adds `--location=us-central1`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the create example omits `--resource-type`, which the SYNOPSIS and REQUIRED FLAGS list as required; the runnable form adds `--resource-type=compute.googleapis.com/Instance` (a Compute Engine instance; replace `sample-resource-uri` with that instance's resource name, or use `file.googleapis.com/Instance` and so on for other resource types).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plan-associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
