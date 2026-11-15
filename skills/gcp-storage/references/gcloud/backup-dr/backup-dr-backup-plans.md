---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plans
---

# gcloud backup-dr backup-plans

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr backup-plans create

```text
NAME
    gcloud backup-dr backup-plans create - creates a new Backup Plan

SYNOPSIS
    gcloud backup-dr backup-plans create (BACKUP_PLAN : --location=LOCATION)
        --backup-vault=BACKUP_VAULT --resource-type=RESOURCE_TYPE [--async]
        [--backup-rule=[PROPERTY=VALUE,...]]
        [--compute-instance-properties=[PROPERTY=VALUE,...]]
        [--description=DESCRIPTION] [--disk-properties=[PROPERTY=VALUE,...]]
        [--labels=[KEY=VALUE,...]] [--log-retention-days=LOG_RETENTION_DAYS]
        [--max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new backup plan in the project. It can only be created in
    locations where Backup and DR is available.

EXAMPLES
    To create a new backup plan sample-backup-plan for Compute Engine instances
    in project sample-project, at location us-central1, with resource-type
    compute.<UNIVERSE_DOMAIN>/Instance and backup-vault backup-vault with 2
    backup-rules:

    run:

        $ gcloud backup-dr backup-plans create sample-backup-plan \
            --project=sample-project --location=us-central1 \
            --resource-type 'compute.<UNIVERSE_DOMAIN>/Instance' \
            --backup-vault <BACKUP-VAULT> --backup-rule <BACKUP-RULE> \
            --backup-rule <BACKUP-RULE>

    To create a new backup plan sample-filestore-backup-plan for Filestore
    instances in project sample-project, at location us-central1, with
    resource-type file.<UNIVERSE_DOMAIN>/Instance and backup-vault backup-vault
    with 1 backup-rule:

    run:

        $ gcloud backup-dr backup-plans create \
            sample-filestore-backup-plan --project=sample-project \
            --location=us-central1 \
            --resource-type 'file.<UNIVERSE_DOMAIN>/Instance' \
            --backup-vault <BACKUP-VAULT> --backup-rule <BACKUP-RULE>

    Backup Rule Examples:

    1. Hourly backup rule with hourly backup frequency of 6 hours and store it
    for 30 days, and expect the backups to run only between 10:00 to 20:00 UTC

    <BACKUP-RULE>:
    rule-id=sample-hourly-rule,retention-days=30,recurrence=HOURLY,hourly-frequency=6,time-zone=UTC,backup-window-start=10,backup-window-end=20

    Properties:
      o rule-id = "sample-hourly-rule"
      o retention-days = 30
      o recurrence = HOURLY
      o hourly-frequency = 6
      o time-zone = UTC
      o backup-window-start = 10
      o backup-window-end = 20

    2. Daily backup rule with daily backup frequency of 6 hours and store it
    for 7 days

    <BACKUP-RULE>:
    rule-id=sample-daily-rule,retention-days=7,recurrence=DAILY,backup-window-start=1,backup-window-end=14

    Properties:
      o rule-id = "sample-daily-rule"
      o retention-days = 7
      o recurrence = DAILY
      o backup-window-start = 1
      o backup-window-end = 14

    3. Weekly backup rule with weekly backup frequency on every MONDAY & FRIDAY
    and store it for 21 days

    <BACKUP-RULE>:
    rule-id=sample-weekly-rule,retention-days=21,recurrence=WEEKLY,days-of-week="MONDAY
    FRIDAY",backup-window-start=10,backup-window-end=20

    Properties:
      o rule-id = "sample-weekly-rule"
      o retention-days: 21
      o recurrence = WEEKLY
      o days-of-week = "MONDAY FRIDAY"
      o backup-window-start = 10
      o backup-window-end = 20

POSITIONAL ARGUMENTS
     Backup Plan resource - Name of the backup plan to be created. Once the
     backup plan is created, this name can't be changed. The name must be
     unique for a project and location. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument BACKUP_PLAN on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_PLAN
          ID of the Backup Plan or fully qualified identifier for the Backup
          Plan.

          To set the name attribute:
          + provide the argument BACKUP_PLAN on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Plan.

          To set the location attribute:
          + provide the argument BACKUP_PLAN on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Backup Vault resource - The backup vault where the backups gets stored
     using this backup plan. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --backup-vault=BACKUP_VAULT
          ID of the Backup Vault or fully qualified identifier for the Backup
          Vault.

          To set the name attribute:
          + provide the argument --backup-vault on the command line.

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

     --backup-rule=[PROPERTY=VALUE,...]
        Backup rule that defines parameters for when and how a backup is
        created. This flag can be repeated to create more backup rules.

        Parameters for the backup rule include:

         rule-id
            Name of the backup rule. The name must be unique and start with a
            lowercase letter followed by up to 62 lowercase letters, numbers,
            or hyphens.

         retention-days
            Duration for which backup data should be retained. It must be
            defined in "days". The value should be greater than or equal to the
            enforced retention period set for the backup vault.

         recurrence
            Frequency for the backup schedule. It must be either: HOURLY,
            DAILY, WEEKLY, MONTHLY or YEARLY.

         backup-window-start
            Start time of the interval during which backup jobs should be
            executed. It can be defined as backup-window-start=2, that means
            backup window starts at 2 a.m. The start time and end time must
            have an interval of 6 hours.

         backup-window-end
            End time of the interval during which backup jobs should be
            executed. It can be defined as backup-window-end=14, that means
            backup window ends at 2 p.m. The start time and end time must have
            an interval of 6 hours.

            Jobs are queued at the beginning of the window and will be marked
            as SKIPPED if they do not start by the end time. Jobs that are in
            progress will not be canceled at the end time.

         time-zone
            The time zone to be used for the backup schedule. The value must
            exist in the IANA tz database (https://www.iana.org/time-zones).
            The default value is UTC. E.g., Europe/Paris

         Following flags are mutually exclusive:

         hourly-frequency
            Frequency for hourly backups. An hourly frequency of 2 means backup
            jobs will run every 2 hours from start time till the end time
            defined. The hourly frequency must be between 4 and 23. The value
            is needed only if recurrence type is HOURLY.

         days-of-week
            Days of the week when the backup job should be executed. The value
            is needed if recurrence type is WEEKLY. E.g., MONDAY,TUESDAY

         days-of-month
            Days of the month when the backup job should be executed. The value
            is needed only if recurrence type is YEARLY. E.g.,"1,5,14"

         months
            Month for the backup schedule. The value is needed only if
            recurrence type is YEARLY. E.g., JANUARY, MARCH

         week-day-of-month
            Recurring day of the week in the month or year when the backup job
            should be executed. E.g. FIRST-SUNDAY, THIRD-MONDAY. The value can
            only be provided if the recurrence type is MONTHLY or YEARLY.
            Allowed values for the number of week - FIRST, SECOND, THIRD,
            FOURTH, LAST. Allowed values for days of the week - MONDAY to
            SUNDAY.

         E.g.,
         "rule-id=sample-daily-rule,recurrence=WEEKLY,backup-window-start=2,backup-window-end=14,retention-days=20,days-of-week='SUNDAY
         MONDAY'"

     --compute-instance-properties=[PROPERTY=VALUE,...]
        Workload-specific properties for Compute Engine instance backups
        generated by this plan.

         guest-flush
            Indicates whether to perform a guest flush operation before taking
            a compute backup. When set to true, the system will attempt to
            ensure application-consistent backups. When set to false, the
            system will create crash-consistent backups. Default value is
            false.

         Following properties are mutually exclusive:

         boot-disk-only
            Indicates whether to backup only the boot disk of the compute
            instance. When set to true, only the boot disk is backed up.

         disk-exclusion-labels
            Key-value pairs of labels used to identify disks to be excluded
            from backup for the compute instance.

            Examples:
            --compute-instance-properties=guest-flush=true,boot-disk-only=true
            --compute-instance-properties=disk-exclusion-labels=backup=exclude

     --description=DESCRIPTION
        Provide a description of the backup plan, such as specific use cases
        and relevant details, in 2048 characters or less.

        E.g., This is a backup plan that performs a daily backup at 6 p.m. and
        retains data for 3 months.

     --disk-properties=[PROPERTY=VALUE,...]
        Workload-specific properties for disk backups generated by this plan.

         guest-flush
            Indicates whether to perform a guest flush operation before taking
            a disk backup. When set to true, the system will attempt to ensure
            application-consistent backups. When set to false, the system will
            create crash-consistent backups. Default value is false.

            Example: --disk-properties=guest-flush=true

     --labels=[KEY=VALUE,...]
        If you have assigned labels to your resources for grouping, you can
        provide the label using this flag.A label is a key-value pair.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (), lowercase characters, and
        numbers.

     --log-retention-days=LOG_RETENTION_DAYS
        Configures how long logs will be stored. It is defined in "days". This
        value should be greater than or equal to minimum enforced retention
        duration of the backup vault.

     --max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS
        Configure the maximum retention period for on-demand backups. The value
        must be greater than or equal to the minimum enforced retention period
        set on the backup vault.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Creates a new backup plan

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plans create

        $ gcloud beta backup-dr backup-plans create
```

### gcloud backup-dr backup-plans delete

```text
NAME
    gcloud backup-dr backup-plans delete - deletes a Backup Plan

SYNOPSIS
    gcloud backup-dr backup-plans delete (BACKUP_PLAN : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Backup Plan.

EXAMPLES
    To delete a backup plan sample-backup-plan in project sample-project and
    location us-central1 , run:

        $ gcloud backup-dr backup-plans delete sample-backup-plan \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Backup Plan resource - Name of the backup plan to delete The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument backup_plan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_PLAN
          ID of the Backup Plan or fully qualified identifier for the Backup
          Plan.

          To set the name attribute:
          + provide the argument backup_plan on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Plan.

          To set the location attribute:
          + provide the argument backup_plan on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
    Deletes a specific backup plan

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plans delete

        $ gcloud beta backup-dr backup-plans delete
```

### gcloud backup-dr backup-plans describe

```text
NAME
    gcloud backup-dr backup-plans describe - show details of the backup plan

SYNOPSIS
    gcloud backup-dr backup-plans describe (BACKUP_PLAN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show all data associated with the specified backup plan.

EXAMPLES
    To view details for backup plan 'BACKUP_PLAN', run:

        $ gcloud backup-dr backup-plans describe BACKUP_PLAN

POSITIONAL ARGUMENTS
     Backup plan resource - Name of the backup plan to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument backup_plan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_PLAN
          ID of the backup_plan or fully qualified identifier for the
          backup_plan.

          To set the backup_plan attribute:
          + provide the argument backup_plan on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument backup_plan on the command line with a fully
            specified name;
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

        $ gcloud alpha backup-dr backup-plans describe

        $ gcloud beta backup-dr backup-plans describe
```

### gcloud backup-dr backup-plans list

```text
NAME
    gcloud backup-dr backup-plans list - list backup plans in the project

SYNOPSIS
    gcloud backup-dr backup-plans list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List backup plans in the project.

EXAMPLES
    To list backup plans for all locations, run:

        $ gcloud backup-dr backup-plans list

    To list backup plans in a location "my-location", run:

        $ gcloud backup-dr backup-plans list --location=my-location

FLAGS
     Location resource - Location for which backup plans should be listed. This
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

        $ gcloud alpha backup-dr backup-plans list

        $ gcloud beta backup-dr backup-plans list
```

### gcloud backup-dr backup-plans update

```text
NAME
    gcloud backup-dr backup-plans update - update a specific backup plan

SYNOPSIS
    gcloud backup-dr backup-plans update (BACKUP_PLAN : --location=LOCATION)
        [--add-backup-rule=[PROPERTY=VALUE,...]] [--async]
        [--backup-rule=[PROPERTY=VALUE,...]]
        [--backup-rules-from-file=PATH_TO_FILE]
        [--compute-instance-properties=[PROPERTY=VALUE,...]]
        [--description=DESCRIPTION] [--disk-properties=[PROPERTY=VALUE,...]]
        [--log-retention-days=LOG_RETENTION_DAYS]
        [--max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS]
        [--remove-backup-rule=RULE-ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a specific backup plan in the project. It can only be updated in
    regions supported by the Backup and DR Service.

EXAMPLES
    To update 2 backup rules and description of an existing backup plan
    sample-backup-plan in project sample-project, at location us-central1:

    run:

        $ gcloud backup-dr backup-plans update sample-backup-plan \
            --project=sample-project --location=us-central1 \
            --backup-rule <BACKUP-RULE> --backup-rule <BACKUP-RULE> \
            --description "This is a sample backup plan"

    To add backup rules to an existing backup plan sample-backup-plan in
    project sample-project, at location us-central1:

    run:

        $ gcloud backup-dr backup-plans update sample-backup-plan \
            --project=sample-project --location=us-central1 \
            --add-backup-rule <BACKUP-RULE> --add-backup-rule <BACKUP-RULE>

    To remove a backup rule with id sample-daily-rule from an existing backup
    plan sample-backup-plan in project sample-project, at location us-central1:

    run:

        $ gcloud backup-dr backup-plans update sample-backup-plan \
            --project=sample-project --location=us-central1 \
            --remove-backup-rule sample-daily-rule

    To override backup rules in an existing backup plan sample-backup-plan in
    project sample-project, at location us-central1, pass a file path
    containing backup rules in YAML or JSON format: This flag is mutually
    exclusive with --add-backup-rule, --remove-backup-rule and --backup-rule
    flags.

    run:        $ gcloud backup-dr backup-plans update sample-backup-plan \
            --project=sample-project --location=us-central1 \
            --backup-rules-fom-file <FILE_PATH>

    Backup Rule Examples:

    1. Hourly backup rule with hourly backup frequency of 6 hours and store it
    for 30 days, and expect the backups to run only between 10:00 to 20:00 UTC

    <BACKUP-RULE>:
    rule-id=sample-hourly-rule,retention-days=30,recurrence=HOURLY,hourly-frequency=6,time-zone=UTC,backup-window-start=10,backup-window-end=20

    Properties:
      o rule-id = "sample-hourly-rule"
      o retention-days = 30
      o recurrence = HOURLY
      o hourly-frequency = 6
      o time-zone = UTC
      o backup-window-start = 10
      o backup-window-end = 20

    2. Daily backup rule with daily backup frequency of 6 hours and store it
    for 7 days

    <BACKUP-RULE>:
    rule-id=sample-daily-rule,retention-days=7,recurrence=DAILY,backup-window-start=1,backup-window-end=14

    Properties:
      o rule-id = "sample-daily-rule"
      o retention-days = 7
      o recurrence = DAILY
      o backup-window-start = 1
      o backup-window-end = 14

    3. Weekly backup rule with weekly backup frequency on every MONDAY & FRIDAY
    and store it for 21 days

    <BACKUP-RULE>:
    rule-id=sample-weekly-rule,retention-days=21,recurrence=WEEKLY,days-of-week="MONDAY
    FRIDAY",backup-window-start=10,backup-window-end=20

    Properties:
      o rule-id = "sample-weekly-rule"
      o retention-days: 21
      o recurrence = WEEKLY
      o days-of-week = "MONDAY FRIDAY"
      o backup-window-start = 10
      o backup-window-end = 20

    YAML and JSON file examples:

    YAML file example:

        backup-rules:
        - rule-id: weekly-rule
          retention-days: 7
          recurrence: WEEKLY
          backup-window-start: 0
          backup-window-end: 23
          days-of-week: [MONDAY, TUESDAY]
          time-zone: UTC
        - rule-id: daily-rule
          retention-days: 1
          recurrence: DAILY
          backup-window-start: 1
          backup-window-end: 24
          time-zone: UTC

    JSON file example:        {
          "backup-rules": [
            {
              "rule-id": "weekly-rule",
              "retention-days": 7,
              "recurrence": "WEEKLY",
              "backup-window-start": 0,
              "backup-window-end": 23,
              "days-of-week": ["MONDAY", "TUESDAY"],
              "time-zone": "UTC"
            },
            {
              "rule-id": "daily-rule",
              "retention-days": 1,
              "recurrence": "DAILY",
              "backup-window-start": 1,
              "backup-window-end": 24,
              "time-zone": "UTC"
            }
          ]
        }

POSITIONAL ARGUMENTS
     Backup Plan resource - Name of the backup plan to be updated. The name
     must be unique for a project and location. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup_plan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_PLAN
          ID of the Backup Plan or fully qualified identifier for the Backup
          Plan.

          To set the name attribute:
          + provide the argument backup_plan on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Plan.

          To set the location attribute:
          + provide the argument backup_plan on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --add-backup-rule=[PROPERTY=VALUE,...]
        Parameters of backup rule to be added to the Backup Plan. This flag can
        be repeated to add more backup rules.

     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --backup-rule=[PROPERTY=VALUE,...]
        Full definition of an existing backup rule with updated values. The
        existing backup rule is replaced by this new set of values. This flag
        can be repeated to update multiple backup rules. It is not allowed to
        pass the same rule-id in this flag more than once in the same command.

        Parameters for the backup rule include:

         rule-id
            Name of the backup rule. The name must be unique and start with a
            lowercase letter followed by up to 62 lowercase letters, numbers,
            or hyphens.

         retention-days
            Duration for which backup data should be retained. It must be
            defined in "days". The value should be greater than or equal to the
            enforced retention period set for the backup vault.

         recurrence
            Frequency for the backup schedule. It must be either: HOURLY,
            DAILY, WEEKLY, MONTHLY or YEARLY.

         backup-window-start
            Start time of the interval during which backup jobs should be
            executed. It can be defined as backup-window-start=2, that means
            backup window starts at 2 a.m. The start time and end time must
            have an interval of 6 hours.

         backup-window-end
            End time of the interval during which backup jobs should be
            executed. It can be defined as backup-window-end=14, that means
            backup window ends at 2 p.m. The start time and end time must have
            an interval of 6 hours.

            Jobs are queued at the beginning of the window and will be marked
            as SKIPPED if they do not start by the end time. Jobs that are in
            progress will not be canceled at the end time.

         time-zone
            The time zone to be used for the backup schedule. The value must
            exist in the IANA tz database (https://www.iana.org/time-zones).
            The default value is UTC. E.g., Europe/Paris

         Following flags are mutually exclusive:

         hourly-frequency
            Frequency for hourly backups. An hourly frequency of 2 means backup
            jobs will run every 2 hours from start time till the end time
            defined. The hourly frequency must be between 4 and 23. The value
            is needed only if recurrence type is HOURLY.

         days-of-week
            Days of the week when the backup job should be executed. The value
            is needed if recurrence type is WEEKLY. E.g., MONDAY,TUESDAY

         days-of-month
            Days of the month when the backup job should be executed. The value
            is needed only if recurrence type is YEARLY. E.g.,"1,5,14"

         months
            Month for the backup schedule. The value is needed only if
            recurrence type is YEARLY. E.g., JANUARY, MARCH

         week-day-of-month
            Recurring day of the week in the month or year when the backup job
            should be executed. E.g. FIRST-SUNDAY, THIRD-MONDAY. The value can
            only be provided if the recurrence type is MONTHLY or YEARLY.
            Allowed values for the number of week - FIRST, SECOND, THIRD,
            FOURTH, LAST. Allowed values for days of the week - MONDAY to
            SUNDAY.

         E.g.,
         "rule-id=sample-daily-rule,recurrence=WEEKLY,backup-window-start=2,backup-window-end=14,retention-days=20,days-of-week='SUNDAY
         MONDAY'"

     --backup-rules-from-file=PATH_TO_FILE
        Path to a YAML or JSON file containing backup rules. Use a full or
        relative path to a local file containing the value of backup_rules.

     --compute-instance-properties=[PROPERTY=VALUE,...]
        Workload-specific properties for Compute Engine instance backups
        generated by this plan.

         guest-flush
            Indicates whether to perform a guest flush operation before taking
            a compute backup. When set to true, the system will attempt to
            ensure application-consistent backups. When set to false, the
            system will create crash-consistent backups. Default value is
            false.

         Following properties are mutually exclusive:

         boot-disk-only
            Indicates whether to backup only the boot disk of the compute
            instance. When set to true, only the boot disk is backed up.

         disk-exclusion-labels
            Key-value pairs of labels used to identify disks to be excluded
            from backup for the compute instance.

            Examples:
            --compute-instance-properties=guest-flush=true,boot-disk-only=true
            --compute-instance-properties=disk-exclusion-labels=backup=exclude

     --description=DESCRIPTION
        Provide a description of the backup plan, such as specific use cases
        and relevant details, in 2048 characters or less.

        E.g., This is a backup plan that performs a daily backup at 6 p.m. and
        retains data for 3 months.

     --disk-properties=[PROPERTY=VALUE,...]
        Workload-specific properties for disk backups generated by this plan.

         guest-flush
            Indicates whether to perform a guest flush operation before taking
            a disk backup. When set to true, the system will attempt to ensure
            application-consistent backups. When set to false, the system will
            create crash-consistent backups. Default value is false.

            Example: --disk-properties=guest-flush=true

     --log-retention-days=LOG_RETENTION_DAYS
        Configures how long logs will be stored. It is defined in "days". This
        value should be greater than or equal to minimum enforced retention
        duration of the backup vault.

     --max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS
        Configure the maximum retention period for on-demand backups. The value
        must be greater than or equal to the minimum enforced retention period
        set on the backup vault.

     --remove-backup-rule=RULE-ID
        Name of an existing backup rule to be removed from the Backup Plan.
        This flag can be repeated to remove more backup rules.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Update a specific backup plan

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-plans update

        $ gcloud beta backup-dr backup-plans update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud backup-dr backup-plans update sample-backup-plan \
    --project=sample-project \
    --location=us-central1 \
    --backup-rules-from-file=FILE_PATH
```

### gcloud beta backup-dr backup-plans create

```text
NAME
    gcloud beta backup-dr backup-plans create - creates a new Backup Plan

SYNOPSIS
    gcloud beta backup-dr backup-plans create
        (BACKUP_PLAN : --location=LOCATION) --backup-vault=BACKUP_VAULT
        --resource-type=RESOURCE_TYPE [--async]
        [--backup-rule=[PROPERTY=VALUE,...]]
        [--compute-instance-properties=[PROPERTY=VALUE,...]]
        [--description=DESCRIPTION] [--disk-properties=[PROPERTY=VALUE,...]]
        [--labels=[KEY=VALUE,...]] [--log-retention-days=LOG_RETENTION_DAYS]
        [--max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plans delete

```text
NAME
    gcloud beta backup-dr backup-plans delete - deletes a Backup Plan

SYNOPSIS
    gcloud beta backup-dr backup-plans delete
        (BACKUP_PLAN : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plans describe

```text
NAME
    gcloud beta backup-dr backup-plans describe - show details of the backup
        plan

SYNOPSIS
    gcloud beta backup-dr backup-plans describe
        (BACKUP_PLAN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plans list

```text
NAME
    gcloud beta backup-dr backup-plans list - list backup plans in the project

SYNOPSIS
    gcloud beta backup-dr backup-plans list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plans update

```text
NAME
    gcloud beta backup-dr backup-plans update - update a specific backup plan

SYNOPSIS
    gcloud beta backup-dr backup-plans update
        (BACKUP_PLAN : --location=LOCATION)
        [--add-backup-rule=[PROPERTY=VALUE,...]] [--async]
        [--backup-rule=[PROPERTY=VALUE,...]]
        [--backup-rules-from-file=PATH_TO_FILE]
        [--compute-instance-properties=[PROPERTY=VALUE,...]]
        [--description=DESCRIPTION] [--disk-properties=[PROPERTY=VALUE,...]]
        [--log-retention-days=LOG_RETENTION_DAYS]
        [--max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS]
        [--remove-backup-rule=RULE-ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plans create

```text
NAME
    gcloud alpha backup-dr backup-plans create - creates a new Backup Plan

SYNOPSIS
    gcloud alpha backup-dr backup-plans create
        (BACKUP_PLAN : --location=LOCATION) --backup-vault=BACKUP_VAULT
        --resource-type=RESOURCE_TYPE [--async]
        [--backup-rule=[PROPERTY=VALUE,...]]
        [--compute-instance-properties=[PROPERTY=VALUE,...]]
        [--description=DESCRIPTION] [--disk-properties=[PROPERTY=VALUE,...]]
        [--labels=[KEY=VALUE,...]] [--log-retention-days=LOG_RETENTION_DAYS]
        [--max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plans delete

```text
NAME
    gcloud alpha backup-dr backup-plans delete - deletes a Backup Plan

SYNOPSIS
    gcloud alpha backup-dr backup-plans delete
        (BACKUP_PLAN : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plans describe

```text
NAME
    gcloud alpha backup-dr backup-plans describe - show details of the backup
        plan

SYNOPSIS
    gcloud alpha backup-dr backup-plans describe
        (BACKUP_PLAN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plans list

```text
NAME
    gcloud alpha backup-dr backup-plans list - list backup plans in the project

SYNOPSIS
    gcloud alpha backup-dr backup-plans list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plans update

```text
NAME
    gcloud alpha backup-dr backup-plans update - update a specific backup plan

SYNOPSIS
    gcloud alpha backup-dr backup-plans update
        (BACKUP_PLAN : --location=LOCATION)
        [--add-backup-rule=[PROPERTY=VALUE,...]] [--async]
        [--backup-rule=[PROPERTY=VALUE,...]]
        [--backup-rules-from-file=PATH_TO_FILE]
        [--compute-instance-properties=[PROPERTY=VALUE,...]]
        [--description=DESCRIPTION] [--disk-properties=[PROPERTY=VALUE,...]]
        [--log-retention-days=LOG_RETENTION_DAYS]
        [--max-custom-on-demand-retention-days=MAX_CUSTOM_ON_DEMAND_RETENTION_DAYS]
        [--remove-backup-rule=RULE-ID] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example that overrides backup rules from a file passes `--backup-rules-fom-file <FILE_PATH>`; the flag is `--backup-rules-from-file` (SYNOPSIS and FLAGS), and `<FILE_PATH>` is a shell redirection when pasted, so the runnable form uses `--backup-rules-from-file=FILE_PATH`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the override-from-file example puts `$ gcloud` on the same line as `run:`; the runnable form starts the command on its own line.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plans (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
