---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/backup-schedules
---

# gcloud spanner backup-schedules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner backup-schedules add-iam-policy-binding

```text
NAME
    gcloud spanner backup-schedules add-iam-policy-binding - add IAM policy
        binding to a Cloud Spanner backup schedule

SYNOPSIS
    gcloud spanner backup-schedules add-iam-policy-binding
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Cloud Spanner backup schedule. One binding
    consists of a member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com', run:

        $ gcloud spanner backup-schedules add-iam-policy-binding \
            backup-schedule-id --instance=instance-id \
            --database=database-id --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To add an IAM policy binding which expires at the end of the year 2025 for
    the role of 'roles/editor' and the user 'test-user@gmail.com', run:

        $ gcloud spanner backup-schedules add-iam-policy-binding \
            backup-schedule-id --instance=instance-id \
            --database=database-id --member='user:test-user@gmail.com' \
            --role='roles/editor' \
            --condition='expression=request.time <
         timestamp("2026-01-01T00:00:00Z"),title=expires_end_of_2025,descrip\
        tion=Expires at midnight on 2025-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     BackupSchedule resource - The Cloud Spanner backup schedule to which to
     add the IAM policy binding. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backupSchedule or fully qualified identifier for the
          backupSchedule.

          To set the backup_schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The name of the Cloud Spanner database.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

OPTIONAL FLAGS
     At most one of these can be specified:

       --condition=[KEY=VALUE,...]
          A condition to include in the binding. When the condition is
          explicitly specified as None (--condition=None), a binding without a
          condition is added. When the condition is specified and is not None,
          --role cannot be a basic role. Basic roles are roles/editor,
          roles/owner, and roles/viewer. For more on conditions, refer to the
          conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules add-iam-policy-binding

        $ gcloud beta spanner backup-schedules add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud spanner backup-schedules add-iam-policy-binding backup-schedule-id \
    --instance=instance-id \
    --database=database-id \
    --member='user:test-user@gmail.com' \
    --role='roles/spanner.backupAdmin' \
    --condition='expression=request.time < timestamp("2026-01-01T00:00:00Z"),title=expires_end_of_2025,description=Expires at midnight on 2025-12-31'
```

### gcloud spanner backup-schedules create

```text
NAME
    gcloud spanner backup-schedules create - create a Cloud Spanner backup
        schedule

SYNOPSIS
    gcloud spanner backup-schedules create
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --backup-type=[BACKUP_TYPE] --cron=CRON
        --retention-duration=RETENTION_DURATION
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Spanner backup schedule.

EXAMPLES
    To create a Cloud Spanner backup schedule, run:

        $ gcloud spanner backup-schedules create backup-schedule-id \
            --instance=instance-id --database=database-id \
            --cron="0 2 * * *" --retention-duration=2w \
            --backup-type=full-backup

POSITIONAL ARGUMENTS
     Backup schedule resource - The Cloud Spanner backup schedule to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backup-schedule or fully qualified identifier for the
          backup-schedule.

          To set the backup-schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The Cloud Spanner database for the backup-schedule.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The Cloud Spanner instance for the backup-schedule.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     --backup-type=[BACKUP_TYPE]
        Type of backups created by this schedule.

        Supported backup types:

        full-backup A full backup stores the entire contents of the database at
        a given version time.

        incremental-backup An incremental backup contains only the data that
        has changed since a previous backup.

        BACKUP_TYPE must be one of: full-backup, incremental-backup.

     --cron=CRON
        Textual representation of the crontab. User can customize the backup
        frequency and the backup version time using the cron expression. The
        version time must be in UTC timzeone. The backup will contain an
        externally consistent copy of the database at the version time. Allowed
        frequencies are 12 hour, 1 day, 1 week and 1 month. Examples of valid
        cron specifications: * 0 2/12 * * * : every 12 hours at (2, 14) hours
        past midnight in UTC. * 0 2,14 * * * : every 12 hours at (2,14) hours
        past midnight in UTC. * 0 2 * * * : once a day at 2 past midnight in
        UTC. * 0 2 * * 0 : once a week every Sunday at 2 past midnight in UTC.
        * 0 2 8 * * : once a month on 8th day at 2 past midnight in UTC.

     --retention-duration=RETENTION_DURATION
        The retention duration of a backup that must be at least 6 hours and at
        most 366 days. The backup is eligible to be automatically deleted once
        the retention period has elapsed.

OPTIONAL FLAGS
     --encryption-type=ENCRYPTION_TYPE
        The encryption type of the backup. ENCRYPTION_TYPE must be one of:

         customer-managed-encryption
            Use the provided Cloud KMS key for encryption. If this option is
            selected, kms-key must be set.
         google-default-encryption
            Use Google default encryption.
         use-database-encryption
            Use the same encryption configuration as the database.

     KMS key name group

     At most one of these can be specified:

       Key resource - Cloud KMS key(s) to be used to create the Cloud Spanner
       backup. This represents a Cloud resource. (NOTE) Some attributes are not
       given arguments in this group but can be set in other ways.

       To set the kms-project attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       To set the kms-location attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       To set the kms-keyring attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       --kms-keys=[KMS_KEYS,...]
          IDs of the keys or fully qualified identifiers for the keys.

          To set the kms-key attribute:
          + provide the argument --kms-keys on the command line.

       Key resource - Cloud KMS key to be used to create the Cloud Spanner
       backup. The arguments in this group can be used to specify the
       attributes of this resource.

       --kms-key=KMS_KEY
          ID of the key or fully qualified identifier for the key.

          To set the kms-key attribute:
          + provide the argument --kms-key on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --kms-keyring=KMS_KEYRING
          KMS keyring id of the key.

          To set the kms-keyring attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-keyring on the command line.

       --kms-location=KMS_LOCATION
          Cloud location for the key.

          To set the kms-location attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-location on the command line.

       --kms-project=KMS_PROJECT
          Cloud project id for the key.

          To set the kms-project attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-project on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules create

        $ gcloud beta spanner backup-schedules create
```

### gcloud spanner backup-schedules delete

```text
NAME
    gcloud spanner backup-schedules delete - delete a Cloud Spanner backup
        schedule

SYNOPSIS
    gcloud spanner backup-schedules delete
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud Spanner backup schedule.

EXAMPLES
    To delete a Cloud Spanner backup schedule, run:

        $ gcloud spanner backup-schedules delete backup-schedule-id \
            --instance=instance-id --database=database-id

POSITIONAL ARGUMENTS
     Backup schedule resource - The Cloud Spanner backup schedule to delete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backup-schedule or fully qualified identifier for the
          backup-schedule.

          To set the backup-schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The Cloud Spanner database for the backup-schedule.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The Cloud Spanner instance for the backup-schedule.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules delete

        $ gcloud beta spanner backup-schedules delete
```

### gcloud spanner backup-schedules describe

```text
NAME
    gcloud spanner backup-schedules describe - describe a Cloud Spanner backup
        schedule

SYNOPSIS
    gcloud spanner backup-schedules describe
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Spanner backup schedule.

EXAMPLES
    To describe a Cloud Spanner backup schedule, run:

        $ gcloud spanner backup-schedules describe backup-schedule-id \
            --instance=instance-id --database=database-id

POSITIONAL ARGUMENTS
     Backup schedule resource - The Cloud Spanner backup schedule to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backup-schedule or fully qualified identifier for the
          backup-schedule.

          To set the backup-schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The Cloud Spanner database for the backup-schedule.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The Cloud Spanner instance for the backup-schedule.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules describe

        $ gcloud beta spanner backup-schedules describe
```

### gcloud spanner backup-schedules get-iam-policy

```text
NAME
    gcloud spanner backup-schedules get-iam-policy - get the IAM policy for a
        Cloud Spanner backup schedule

SYNOPSIS
    gcloud spanner backup-schedules get-iam-policy
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud spanner backup-schedules get-iam-policy displays the IAM policy
    associated with a Cloud Spanner backup schedule. If formatted as JSON, the
    output can be edited and used as a policy file for set-iam-policy. The
    output includes an "etag" field identifying the version emitted and
    allowing detection of concurrent policy updates; see $ {parent}
    set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given Cloud Spanner backup schedule, run:

        $ gcloud spanner backup-schedules get-iam-policy \
            backup-schedule-id --instance=instance-id --database=database-id

POSITIONAL ARGUMENTS
     BackupSchedule resource - The Cloud Spanner backup schedule for which to
     display the IAM policy. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backupSchedule or fully qualified identifier for the
          backupSchedule.

          To set the backup_schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The name of the Cloud Spanner database.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules get-iam-policy

        $ gcloud beta spanner backup-schedules get-iam-policy
```

### gcloud spanner backup-schedules list

```text
NAME
    gcloud spanner backup-schedules list - list Cloud Spanner backup schedules

SYNOPSIS
    gcloud spanner backup-schedules list
        (--database=DATABASE : --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Spanner backup schedules.

EXAMPLES
    To list Cloud Spanner backup schedules, run:

        $ gcloud spanner backup-schedules list --instance=instance-id \
            --database=database-id

REQUIRED FLAGS
     Database resource - The Cloud Spanner database in which to list schedules.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --database=DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument --database on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument --database on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

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

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules list

        $ gcloud beta spanner backup-schedules list
```

### gcloud spanner backup-schedules remove-iam-policy-binding

```text
NAME
    gcloud spanner backup-schedules remove-iam-policy-binding - remove IAM
        policy binding of a Cloud Spanner backup schedule

SYNOPSIS
    gcloud spanner backup-schedules remove-iam-policy-binding
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding of a Cloud Spanner backup schedule. One
    binding consists of a member, a role, and an optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com', run:

        $ gcloud spanner backup-schedules remove-iam-policy-binding \
            backup-schedule-id --instance=instance-id \
            --database=database-id --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To remove an IAM policy binding which expires at the end of the year 2025
    for the role of 'roles/editor' and the user 'test-user@gmail.com', run:

        $ gcloud spanner backup-schedules remove-iam-policy-binding \
            backup-schedule-id --instance=instance-id \
            --database=database-id --member='user:test-user@gmail.com' \
            --role='roles/editor' \
            --condition='expression=request.time <
         timestamp("2026-01-01T00:00:00Z"),title=expires_end_of_2025,descrip\
        tion=Expires at midnight on 2025-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     BackupSchedule resource - The Cloud Spanner backup schedule to remove the
     IAM policy binding from. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backupSchedule or fully qualified identifier for the
          backupSchedule.

          To set the backup_schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The name of the Cloud Spanner database.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --all
          Remove all bindings with this role and principal, irrespective of any
          conditions.

       --condition=[KEY=VALUE,...]
          The condition of the binding that you want to remove. When the
          condition is explicitly specified as None (--condition=None), a
          binding without a condition is removed. Otherwise, only a binding
          with a condition that exactly matches the specified condition
          (including the optional description) is removed. For more on
          conditions, refer to the conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules remove-iam-policy-binding

        $ gcloud beta spanner backup-schedules remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud spanner backup-schedules remove-iam-policy-binding backup-schedule-id \
    --instance=instance-id \
    --database=database-id \
    --member='user:test-user@gmail.com' \
    --role='roles/spanner.backupAdmin' \
    --condition='expression=request.time < timestamp("2026-01-01T00:00:00Z"),title=expires_end_of_2025,description=Expires at midnight on 2025-12-31'
```

### gcloud spanner backup-schedules set-iam-policy

```text
NAME
    gcloud spanner backup-schedules set-iam-policy - set the IAM policy for a
        Cloud Spanner backup schedule

SYNOPSIS
    gcloud spanner backup-schedules set-iam-policy
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a Cloud Spanner backup schedule given a backup
    schedule ID and a file encoded in JSON or YAML that contains the IAM
    policy.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for a Cloud Spanner backup schedule:

        $ gcloud spanner backup-schedules set-iam-policy \
            backup-schedule-id --instance=instance-id \
            --database=database-id policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     BackupSchedule resource - The Cloud Spanner backup schedule to set the IAM
     policy for. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backupSchedule or fully qualified identifier for the
          backupSchedule.

          To set the backup_schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The name of the Cloud Spanner database.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules set-iam-policy

        $ gcloud beta spanner backup-schedules set-iam-policy
```

### gcloud spanner backup-schedules update

```text
NAME
    gcloud spanner backup-schedules update - update a Cloud Spanner backup
        schedule

SYNOPSIS
    gcloud spanner backup-schedules update
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        (--cron=CRON --encryption-type=ENCRYPTION_TYPE
          --retention-duration=RETENTION_DURATION --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Spanner backup schedule.

EXAMPLES
    To update a Cloud Spanner backup schedule, run:

        $ gcloud spanner backup-schedules update backup-schedule-id \
            --instance=instance-id --database=database-id \
            --cron="0 2 * * *" --retention-duration=2w \
            --encryption-type=GOOGLE_DEFAULT_ENCRYPTION

POSITIONAL ARGUMENTS
     Backup schedule resource - The Cloud Spanner backup schedule to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup_schedule on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_SCHEDULE
          ID of the backup-schedule or fully qualified identifier for the
          backup-schedule.

          To set the backup-schedule attribute:
          + provide the argument backup_schedule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          The Cloud Spanner database for the backup-schedule.

          To set the database attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --database on the command line.

       --instance=INSTANCE
          The Cloud Spanner instance for the backup-schedule.

          To set the instance attribute:
          + provide the argument backup_schedule on the command line with a
            fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     At least one of these must be specified:

       --cron=CRON
          Textual representation of the crontab. User can customize the backup
          frequency and the backup version time using the cron expression. The
          version time must be in UTC timzeone. The backup will contain an
          externally consistent copy of the database at the version time.
          Allowed frequencies are 12 hour, 1 day, 1 week and 1 month. Examples
          of valid cron specifications: * 0 2/12 * * * : every 12 hours at (2,
          14) hours past midnight in UTC. * 0 2,14 * * * : every 12 hours at
          (2,14) hours past midnight in UTC. * 0 2 * * * : once a day at 2 past
          midnight in UTC. * 0 2 * * 0 : once a week every Sunday at 2 past
          midnight in UTC. * 0 2 8 * * : once a month on 8th day at 2 past
          midnight in UTC.

       --encryption-type=ENCRYPTION_TYPE
          The encryption type of the backup. ENCRYPTION_TYPE must be one of:

           customer-managed-encryption
              Use the provided Cloud KMS key for encryption. If this option is
              selected, kms-key must be set.
           google-default-encryption
              Use Google default encryption.
           use-database-encryption
              Use the same encryption configuration as the database.

       --retention-duration=RETENTION_DURATION
          The retention duration of a backup that must be at least 6 hours and
          at most 366 days. The backup is eligible to be automatically deleted
          once the retention period has elapsed.

       KMS key name group

       At most one of these can be specified:

         Key resource - Cloud KMS key(s) to be used to create the Cloud Spanner
         backup. This represents a Cloud resource. (NOTE) Some attributes are
         not given arguments in this group but can be set in other ways.

         To set the kms-project attribute:
          - provide the argument --kms-keys on the command line with a fully
            specified name.

         To set the kms-location attribute:
          - provide the argument --kms-keys on the command line with a fully
            specified name.

         To set the kms-keyring attribute:
          - provide the argument --kms-keys on the command line with a fully
            specified name.

         --kms-keys=[KMS_KEYS,...]
            IDs of the keys or fully qualified identifiers for the keys.

            To set the kms-key attribute:
            - provide the argument --kms-keys on the command line.

         Key resource - Cloud KMS key to be used to create the Cloud Spanner
         backup. The arguments in this group can be used to specify the
         attributes of this resource.

         --kms-key=KMS_KEY
            ID of the key or fully qualified identifier for the key.

            To set the kms-key attribute:
            - provide the argument --kms-key on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --kms-keyring=KMS_KEYRING
            KMS keyring id of the key.

            To set the kms-keyring attribute:
            - provide the argument --kms-key on the command line with a fully
              specified name;
            - provide the argument --kms-keyring on the command line.

         --kms-location=KMS_LOCATION
            Cloud location for the key.

            To set the kms-location attribute:
            - provide the argument --kms-key on the command line with a fully
              specified name;
            - provide the argument --kms-location on the command line.

         --kms-project=KMS_PROJECT
            Cloud project id for the key.

            To set the kms-project attribute:
            - provide the argument --kms-key on the command line with a fully
              specified name;
            - provide the argument --kms-project on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner backup-schedules update

        $ gcloud beta spanner backup-schedules update
```

### gcloud beta spanner backup-schedules add-iam-policy-binding

```text
NAME
    gcloud beta spanner backup-schedules add-iam-policy-binding - add IAM
        policy binding to a Cloud Spanner backup schedule

SYNOPSIS
    gcloud beta spanner backup-schedules add-iam-policy-binding
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules create

```text
NAME
    gcloud beta spanner backup-schedules create - create a Cloud Spanner backup
        schedule

SYNOPSIS
    gcloud beta spanner backup-schedules create
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --backup-type=[BACKUP_TYPE] --cron=CRON
        --retention-duration=RETENTION_DURATION
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules delete

```text
NAME
    gcloud beta spanner backup-schedules delete - delete a Cloud Spanner backup
        schedule

SYNOPSIS
    gcloud beta spanner backup-schedules delete
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules describe

```text
NAME
    gcloud beta spanner backup-schedules describe - describe a Cloud Spanner
        backup schedule

SYNOPSIS
    gcloud beta spanner backup-schedules describe
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules get-iam-policy

```text
NAME
    gcloud beta spanner backup-schedules get-iam-policy - get the IAM policy
        for a Cloud Spanner backup schedule

SYNOPSIS
    gcloud beta spanner backup-schedules get-iam-policy
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules list

```text
NAME
    gcloud beta spanner backup-schedules list - list Cloud Spanner backup
        schedules

SYNOPSIS
    gcloud beta spanner backup-schedules list
        (--database=DATABASE : --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules remove-iam-policy-binding

```text
NAME
    gcloud beta spanner backup-schedules remove-iam-policy-binding - remove IAM
        policy binding of a Cloud Spanner backup schedule

SYNOPSIS
    gcloud beta spanner backup-schedules remove-iam-policy-binding
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules set-iam-policy

```text
NAME
    gcloud beta spanner backup-schedules set-iam-policy - set the IAM policy
        for a Cloud Spanner backup schedule

SYNOPSIS
    gcloud beta spanner backup-schedules set-iam-policy
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backup-schedules update

```text
NAME
    gcloud beta spanner backup-schedules update - update a Cloud Spanner backup
        schedule

SYNOPSIS
    gcloud beta spanner backup-schedules update
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        (--cron=CRON --encryption-type=ENCRYPTION_TYPE
          --retention-duration=RETENTION_DURATION --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules add-iam-policy-binding

```text
NAME
    gcloud alpha spanner backup-schedules add-iam-policy-binding - add IAM
        policy binding to a Cloud Spanner backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules add-iam-policy-binding
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules create

```text
NAME
    gcloud alpha spanner backup-schedules create - create a Cloud Spanner
        backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules create
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --backup-type=[BACKUP_TYPE] --cron=CRON
        --retention-duration=RETENTION_DURATION
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules delete

```text
NAME
    gcloud alpha spanner backup-schedules delete - delete a Cloud Spanner
        backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules delete
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules describe

```text
NAME
    gcloud alpha spanner backup-schedules describe - describe a Cloud Spanner
        backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules describe
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules get-iam-policy

```text
NAME
    gcloud alpha spanner backup-schedules get-iam-policy - get the IAM policy
        for a Cloud Spanner backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules get-iam-policy
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules list

```text
NAME
    gcloud alpha spanner backup-schedules list - list Cloud Spanner backup
        schedules

SYNOPSIS
    gcloud alpha spanner backup-schedules list
        (--database=DATABASE : --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules remove-iam-policy-binding

```text
NAME
    gcloud alpha spanner backup-schedules remove-iam-policy-binding - remove
        IAM policy binding of a Cloud Spanner backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules remove-iam-policy-binding
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules set-iam-policy

```text
NAME
    gcloud alpha spanner backup-schedules set-iam-policy - set the IAM policy
        for a Cloud Spanner backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules set-iam-policy
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backup-schedules update

```text
NAME
    gcloud alpha spanner backup-schedules update - update a Cloud Spanner
        backup schedule

SYNOPSIS
    gcloud alpha spanner backup-schedules update
        (BACKUP_SCHEDULE : --database=DATABASE --instance=INSTANCE)
        (--cron=CRON --encryption-type=ENCRYPTION_TYPE
          --retention-duration=RETENTION_DURATION --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT])
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the conditional binding examples grant `roles/editor`, but the `--condition` description on this page says that with a condition `--role cannot be a basic role` (`roles/editor`, `roles/owner`, `roles/viewer`), and gcloud 593.0.0 rejects the `add-iam-policy-binding` example ("Binding with a condition and a basic role is not allowed"); the runnable forms of `add-iam-policy-binding` and the matching `remove-iam-policy-binding` use `roles/spanner.backupAdmin`, the role of the conditional binding examples of `gcloud spanner backups add-iam-policy-binding`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/backup-schedules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
